---
title: Next.js 16
description: Next.js 16 の変更点として、Turbopack のデフォルト化、オプトイン型の Cache Components、React 19.2 の機能のサポート、proxy.ts へのリネーム、React Compiler のサポートなどをまとめたリリース記事
tags: [article, nextjs]
date: 2025-11-29
article-authors: []
site: Next.js Blog
published:
url: https://nextjs.org/blog/next-16
---

## TL;DR

- [[nextjs|Next.js]] 16 の目玉は Cache Components で、キャッシュがオプトインになり、動的なコードはデフォルトでリクエストごとに実行されるようになった。
- ほかに、Turbopack のデフォルト化、React 19.2 の機能のサポート、`middleware.ts` から `proxy.ts` へのリネーム、React Compiler のサポートなどがある。

## 内容

### Turbopack がデフォルトになった

バンドラが Turbopack になった。Webpack を選ぶこともできる。また、Next.js DevTools MCP が導入された。

### Cache Components

Cache Components は実験的な機能だった PPR（Partial Prerendering）に代わる機能である。v15 以前のキャッシュと違い、キャッシュはオプトインになり、動的なコードはデフォルトでリクエストごとに実行されるようになった。キャッシュの種類は、静的、動的、ユーザー固有の 3 つである。動的なデータには [[suspense|Suspense]] が必須になった。

```tsx
export default function Page() {
  return (
    <>
      {/* 静的部分 */}
      <NavBar />

      {/* 動的部分 */}
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults />
      </Suspense>
    </>
  )
}
```

有効にするには、`next.config.ts` に次のように書く。

```ts
const nextConfig = {
  cacheComponents: true,
}

export default nextConfig
```

#### 3 種類のディレクティブ

`use cache` はビルド時にキャッシュされる。全ユーザーで共有するデータに使う。

`use cache: remote` はリクエスト時にキャッシュされる。全ユーザーで共有できるデータに使う。`use cache` が使えない `connection`、`cookies`、`headers` などを呼び出した後でもキャッシュできる。

`use cache: private` はリクエスト時にキャッシュされる。ユーザーごとに異なるデータに使う。`cookies`、`headers`、`searchParams` などにアクセスでき、ランタイムプリフェッチに対応している。

#### キャッシュに関する API

新しく次の API が追加された。

- `cacheTag`: キャッシュしたデータにタグを付ける
- `updateTag`: 引数で受け取ったタグに紐づくキャッシュを、同じリクエストの中で更新する。[[server-actions|Server Actions]] でのみ使える
- `refresh`: Server Actions の中からクライアントをリフレッシュする
- `cacheLife`: キャッシュの有効期限を設定する。`seconds` や `minutes` などの定義済みのプロファイルを指定するか、独自に値を指定する

```ts
cacheLife("minutes")
cacheLife({
  stale: 3600, // クライアントサイドでサーバに確認せずにキャッシュを利用する期間
  revalidate: 900, // サーバサイドでキャッシュを更新する頻度
  expire: 86400, // キャッシュの最大有効期間
})
```

また、引数で受け取ったタグに紐づくキャッシュを無効にする `revalidateTag` は、第 2 引数に `cacheLife` と同じプロファイルを渡せるようになった。

### React 19.2 の機能のサポート

[[react|React]] 19.2 で追加された次の機能に対応した。

- `useEffectEvent`: 副作用から、リアクティブでないロジックを Effect Event と呼ばれる再利用可能な関数に切り出す
- `<ViewTransition>`: クライアントでのナビゲーション時にアニメーションを付けられる
- `<Activity>`: クライアントでのナビゲーション時にステートを保持できる

### middleware.ts から proxy.ts へのリネーム

ネットワークの境界をはっきりさせ、Node.js ランタイムで動くことを明示するために、`middleware.ts` は `proxy.ts` に名前が変わった。

### React Compiler のサポート

React Compiler はビルド時にコードを解析して `useMemo` や `useCallback` を自動で挿入する。有効にするには、`next.config.ts` に次のように書く。

```ts
const nextConfig = {
  reactCompiler: true,
}

export default nextConfig
```

### 非同期リクエスト API への完全な移行

`cookies`、`headers`、`draftMode`、`layout.js` などの `params`、`page.js` の `searchParams` が、完全に非同期の API になった。

## キーワード

- [[nextjs|Next.js]]
- Cache Components
- Turbopack
- React Compiler
- [[suspense|Suspense]]
- [[server-actions|Server Actions]]
- [[nextjs-caching|Next.js の 4 種類のキャッシュ]]
- [[react|React]]

## 自分の理解

今回の目玉は Cache Components だと思う。v13 から v15 まではキャッシュのデフォルトの挙動が変わるたびに追いかけるのが辛かったので、オプトインになって認知的負荷がだいぶ下がった印象である。ただし、これまでの知識の[[unlearn|アンラーン]]は必要になる。それでも、Nuxt や [[sveltekit|SvelteKit]] と比べると、キャッチアップのコストはまだとても高い。

## 関連

- [Next.js Cache回想](https://zenn.dev/akfm/articles/nextjs-caching-history)
- [React 19.2 - React Blog](https://ja.react.dev/blog/2025/10/01/react-19-2)
- [Next.js 日本語ドキュメント](https://nextjsjp.org/)
