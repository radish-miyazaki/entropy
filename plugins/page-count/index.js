// トップページ（content/index.md）に書いた {{page-count}} を、サイトにあるノートの数に置き換える。
// ビルド時に目印を <span class="entropy-page-count"> にしておき、表示するときに
// static/contentIndex.json（検索とグラフが使う、公開されている全ページの一覧）を数えて数字を入れる。
// 下書きや非公開のページは一覧に入らないので、公開されているノートだけを数えられる。
// タグのページ（tags/…）とフォルダの一覧ページ（…/index）は、ノートではないので数えない。

const TOKEN = "{{page-count}}"
const CLASS = "entropy-page-count"

// hast の木をたどり、TOKEN を含むテキストを span に置き換える
const replaceToken = (node) => {
  if (!Array.isArray(node.children)) return
  const next = []
  for (const child of node.children) {
    if (child.type === "text" && child.value.includes(TOKEN)) {
      const parts = child.value.split(TOKEN)
      parts.forEach((part, i) => {
        if (part) next.push({ type: "text", value: part })
        if (i < parts.length - 1) {
          next.push({
            type: "element",
            tagName: "span",
            properties: { className: [CLASS] },
            children: [{ type: "text", value: "…" }],
          })
        }
      })
    } else {
      replaceToken(child)
      next.push(child)
    }
  }
  node.children = next
}

const rehypePageCount = () => (tree, file) => {
  if (file.data?.slug !== "index") return
  replaceToken(tree)
}

const after = `
(() => {
  const isNote = (slug) => !slug.startsWith("tags/") && slug !== "index" && !slug.endsWith("/index")
  async function setup() {
    const els = document.querySelectorAll(${JSON.stringify("." + CLASS)})
    if (els.length === 0 || typeof fetchData === "undefined") return
    try {
      const data = await fetchData
      const n = Object.keys(data).filter(isNote).length
      for (const el of els) el.textContent = n.toLocaleString("ja-JP")
    } catch {}
  }
  document.addEventListener("nav", setup)
})()
`

export const PageCount = () => ({
  name: "PageCount",
  htmlPlugins() {
    return [rehypePageCount]
  },
  externalResources() {
    return {
      js: [{ loadTime: "afterDOMReady", contentType: "inline", script: after }],
    }
  },
})

export const manifest = {
  name: "page-count",
  displayName: "Page Count",
  description: "トップページの {{page-count}} を、サイトにあるノートの数に置き換える",
  version: "1.0.0",
  category: "transformer",
  quartzVersion: ">=5.0.0",
}

export default PageCount
