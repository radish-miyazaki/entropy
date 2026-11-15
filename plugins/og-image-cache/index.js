// @quartz-community/og-image を包み、描く内容が変わったページの OGP 画像だけを作り直す。
//
// 日本語フォントで OGP 画像を描くと 1 枚に約 2 秒かかり、全ページ（約 2000 枚）では 1 時間ほどになる。
// Quartz はビルドのたびに出力フォルダを空にするので、描いた画像を .quartz-cache/og-images/ に取っておき、
// 画像に描かれる情報（題名、説明、日付、本文、タグ、配色、フォントなど）が前回と同じページは、取っておいた画像を写す。

import { createHash } from "node:crypto"
import { createRequire } from "node:module"
import fs from "node:fs/promises"
import path from "node:path"
import { CustomOgImages } from "@quartz-community/og-image"

const require = createRequire(import.meta.url)
const innerVersion = require("@quartz-community/og-image/package.json").version
const CACHE_DIR = path.join("quartz", ".quartz-cache", "og-images")
const ICON_PATH = path.join("quartz", "static", "icon.png")

// 本体の既定は「N min read」なので、日本語にする
const japaneseReadingTime = (minutes) => `約 ${minutes} 分`

const sha256 = (value) => createHash("sha256").update(value).digest("hex")

async function fileHash(p) {
  try {
    return sha256(await fs.readFile(p))
  } catch {
    return ""
  }
}

// 全ページに共通する、画像の見た目を決める情報
async function globalKey(ctx, opts) {
  const cfg = ctx.cfg.configuration
  return sha256(
    JSON.stringify({
      innerVersion,
      opts: Object.fromEntries(
        Object.entries(opts).map(([k, v]) => [k, typeof v === "function" ? v.toString() : v]),
      ),
      theme: cfg.theme,
      locale: cfg.locale,
      baseUrl: cfg.baseUrl,
      pageTitle: cfg.pageTitle,
      pageTitleSuffix: cfg.pageTitleSuffix,
      icon: await fileHash(ICON_PATH),
    }),
  )
}

// ページごとの、画像に描かれる情報。
// 読了時間のもとになる本文は本体が描く直前に作るので、ここではノートのファイルの中身で代える
async function pageKey(base, data) {
  const source = data.filePath ? await fileHash(data.filePath) : ""
  const fm = data.frontmatter ?? {}
  const drawnDate = data.defaultDateType ? data.dates?.[data.defaultDateType] : undefined
  return sha256(
    JSON.stringify({
      base,
      slug: data.slug,
      title: fm.title,
      socialDescription: fm.socialDescription,
      description: fm.description,
      generatedDescription: data.description,
      tags: fm.tags,
      // 画像に描かれるのは defaultDateType の日付だけなので、それだけを鍵に入れる。
      // ほかの日付も入れると、frontmatter に日付がないページの published（ビルドした時刻）で毎回外れる
      defaultDateType: data.defaultDateType,
      date: drawnDate instanceof Date ? drawnDate.toISOString() : drawnDate,
      text: data.text ?? "",
      source,
    }),
  )
}

const outputPath = (ctx, slug) => path.join(ctx.argv.output, `${slug}-og-image.webp`)

export const CachedOgImages = (userOpts = {}) => {
  const opts = { readingTimeText: japaneseReadingTime, ...userOpts }
  const inner = CustomOgImages(opts)

  async function* run(ctx, content, resources, emitInner) {
    const base = await globalKey(ctx, opts)
    await fs.mkdir(CACHE_DIR, { recursive: true })

    const misses = []
    const keyBySlug = new Map()
    let hits = 0
    for (const entry of content) {
      const data = entry[1].data
      if (data.frontmatter?.socialImage !== undefined) continue
      const key = await pageKey(base, data)
      const cached = path.join(CACHE_DIR, `${key}.webp`)
      try {
        const dest = outputPath(ctx, data.slug)
        await fs.mkdir(path.dirname(dest), { recursive: true })
        await fs.copyFile(cached, dest)
        hits++
        yield dest
      } catch {
        keyBySlug.set(data.slug, key)
        misses.push(entry)
      }
    }

    if (misses.length > 0 || hits > 0) {
      console.log(`OG images: ${hits} reused from cache, ${misses.length} to render`)
    }

    for await (const written of emitInner(ctx, misses, resources)) {
      // 描き終えた画像を、次のビルドのために取っておく
      const slug = path
        .relative(ctx.argv.output, String(written))
        .split(path.sep)
        .join("/")
        .replace(/-og-image\.webp$/, "")
      const key = keyBySlug.get(slug)
      if (key) {
        await fs.copyFile(String(written), path.join(CACHE_DIR, `${key}.webp`)).catch(() => {})
      }
      yield written
    }
  }

  return {
    ...inner,
    async *emit(ctx, content, resources) {
      yield* run(ctx, content, resources, (c, m, r) => inner.emit(c, m, r))
    },
    async *partialEmit(ctx, content, resources, changeEvents) {
      // 開発用サーバでの差分ビルドは、変わったページだけが来るので本体に任せ、描いた画像は取っておく
      const changed = changeEvents
        .filter((e) => e.file && (e.type === "add" || e.type === "change"))
        .map((e) => [undefined, e.file])
      yield* run(ctx, changed, resources, (c, m, r) =>
        inner.partialEmit(
          c,
          content,
          r,
          m.map(([, file]) => ({ type: "change", file })),
        ),
      )
    },
  }
}

export const manifest = {
  name: "og-image-cache",
  displayName: "OG Image (cached)",
  description: "@quartz-community/og-image を包み、変わったページの OGP 画像だけを作り直す",
  version: "1.0.0",
  category: "emitter",
  quartzVersion: ">=5.0.0",
}

export default CachedOgImages
