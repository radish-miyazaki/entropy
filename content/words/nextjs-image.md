---
title: next/image
aliases: []
description: Next.js が画像の最適化のために提供する、img 要素を拡張した Image コンポーネント
tags: [word, next.js]
date: 2024-09-18
---

## TL;DR

[[nextjs|Next.js]] が画像の最適化のために提供する `<Image>` コンポーネント。`<img>` を拡張したもので、画像形式の変換、[[layout-shift|レイアウトシフト]]の防止、遅延読み込みなどを自動で行う。

## なぜ必要か

画像は [[largest-contentful-paint|Largest Contentful Paint]] のスコアに直結する。`<Image>` は次の最適化を自動で行う。

- [[webp|WebP]] や [[avif|AVIF]] などの新しい画像形式に変換する
- 画像の読み込みによるレイアウトシフトを防ぐ
- ビューポートに入ったときに遅延読み込みする
- 画像サイズをオンデマンドで変更する

## 仕組み

### キャッシュ

最適化した画像はサーバが初回のリクエストで作り、`.next/cache/images` にキャッシュする。そのため初回だけ遅い。キャッシュは [[time-based-revalidation|Time-based Revalidation]] と同じく [[stale-while-revalidate|Stale-While-Revalidate]] の挙動になる。状態は `x-nextjs-cache` ヘッダの `MISS`、`STALE`（TTL 切れで更新中）、`HIT` で分かる。

TTL はデフォルトで無期限で、`minimumCacheTTL` で変えられる。画像ごとに変えるには `Cache-Control` の `max-age` を使う。両方あれば大きい方が使われる。

### 画像形式の選択

[[accept-header|Accept]] ヘッダでブラウザが対応する形式を調べ、`images.formats`（デフォルトは `['image/webp']`）と最初に一致した形式を使う。一致しなければ元の形式のままになる。

## 例

ローカル画像は `import` して `src` に渡す。`width` と `height` はビルド時に決まるので省略できる。

```tsx
import Image from "next/image"
import profilePic from "./me.png"

export default function Page() {
  return <Image src={profilePic} alt="Picture of the author" priority />
}
```

リモート画像は `width` と `height` が必須になる。サイズは `import`、`width` と `height`、`fill` のいずれかで決める。

LCP 要素の画像に `priority` を付けると優先して読み込まれる。付けていないと、開発環境で警告が出る。

## 注意点

- `alt` は必須である。ただし装飾目的の画像では空文字を指定する
- 悪意のある SVG などを防ぐため、リモート画像は `images.remotePatterns` で許可したホストからしか読み込めない
- 前段にプロキシや [[cdn|CDN]] を置くときは、`Accept` ヘッダを転送する
- Next.js 15 の時点では画像のキャッシュを無効にできない。`minimumCacheTTL` を小さくする、`src` にクエリパラメータを付ける、キャッシュを消す、などで回避する

## 自分の理解

画像ごとに `Cache-Control` を指定したいなら、[ミドルウェアで付ける](https://havelog.aho.mu/develop/javascript/e791-nextjs_app_router_apply_cache_control_by_middleware.html)と良さそうだ。

## 関連

- [[nextjs-font|next/font]]
- [[nextjs-script|next/script]]
- [[largest-contentful-paint|Largest Contentful Paint]]
- [[layout-shift|レイアウトシフト]]
- [[avif|AVIF]]

## 出典

- [Image Optimization - Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Image Component - Next.js](https://nextjs.org/docs/app/api-reference/components/image)
