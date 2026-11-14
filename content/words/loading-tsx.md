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

## 例

```tsx
export default function Loading() {
  return <>...Loading</>
}
```

## 自分の理解

拡張子は `.jsx`（`.js`）でもよい。

## 関連

- [[route-segment|Route Segment]]
- [[suspense|Suspense]]
- [[error-tsx|error.tsx]]
- [[not-found-tsx|not-found.tsx]]

## 出典

- [File Conventions: loading.js - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
