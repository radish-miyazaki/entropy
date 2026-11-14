---
title: loading.tsx
aliases: []
description: Next.js の App Router で、page.tsx を包む Suspense のフォールバックを定義する特別なファイル
tags: [word, next.js, app-router]
date: 2024-08-21
---

## TL;DR

[[app-router|App Router]] の `app` ディレクトリに置く特別なファイルの 1 つ。[[page-tsx|page.tsx]] を包む [[suspense|Suspense]] コンポーネントのフォールバックとして表示される。

## 仕組み

Suspense コンポーネントは自動で挿入される。[[layout-tsx|layout.tsx]] はその外側（親の階層）に位置する。

```tsx
<Layout>
  <ErrorBoundary fallback={<Error />}>
    <Suspense>
      <Page />
    </Suspense>
  </ErrorBoundary>
</Layout>
```

通常は [[react-server-component|Server Component]] だが、[[client-component|Client Component]] にもできる。props は受け取れない。

公式ドキュメントによると、`loading.tsx` はナビゲーションのときにすぐ表示される読み込み中の UI を作るためのもので、ルートセグメントの中身がストリーミングで届くと自動で差し替わる。同じ階層の `layout.tsx`、`template.tsx`、`error.tsx` は Suspense で包まない。フォールバックの UI はプリフェッチされるので、プリフェッチが終わっていればナビゲーションはすぐに切り替わる。ナビゲーションは中断でき、読み込みが終わるのを待たずに別のルートへ移れる。共通のレイアウトは新しいセグメントの読み込み中も操作できる。

## 例

```tsx
export default function Loading() {
  return <>...Loading</>
}
```

## 注意点

公式ドキュメントによると、レイアウトが `cookies()` や `headers()`、キャッシュしない `fetch` などの実行時のデータを使うと、`loading.tsx` のフォールバックは表示されない。ナビゲーションをすぐに切り替えるには、そのデータの取得を `page.tsx` に移すか、レイアウトの中で別の `<Suspense>` で包む。

ストリーミングのレスポンスは `200` のステータスコードで始まる。ストリーミングが始まったあとに `notFound` などを呼んでも、ステータスコードは変わらない。

## 自分の理解

拡張子は `.jsx`（`.js`）でもよい。

## 関連

- [[route-segment|Route Segment]]
- [[suspense|Suspense]]
- [[error-tsx|error.tsx]]
- [[not-found-tsx|not-found.tsx]]

## 出典

- [File Conventions: loading.js - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
