---
title: error.tsx
aliases: []
description: Next.js の App Router で、page.tsx を包む Error Boundary のフォールバックを定義する特別なファイル
tags: [word, next.js, app-router]
date: 2024-08-21
---

## TL;DR

[[app-router|App Router]] の `app` ディレクトリに置く特別なファイルの 1 つ。[[page-tsx|page.tsx]] を包む [[error-boundary|Error Boundary]] コンポーネントのフォールバックとして表示される。

## 仕組み

Error Boundary コンポーネントは自動で挿入される。[[layout-tsx|layout.tsx]] はその外側（親の階層）に位置するので、layout.tsx で発生した例外は、1 つ上の階層の error.tsx で捕捉される。

```tsx
<Layout>
  <ErrorBoundary fallback={<Error />}>
    <Suspense>
      <Page />
    </Suspense>
  </ErrorBoundary>
</Layout>
```

## 例

他の特別なファイルと違い、[[client-component|Client Component]] として定義する必要がある。

```tsx
"use client"

import { useEffect } from "react"

export default function Error({ error, reset }) {
  useEffect(() => console.error(error), [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

## 自分の理解

拡張子は `.jsx`（`.js`）でもよい。

## 関連

- [[route-segment|Route Segment]]
- [[error-boundary|Error Boundary]]
- [[global-error-tsx|global-error.tsx]]
- [[loading-tsx|loading.tsx]]
- [[not-found-tsx|not-found.tsx]]

## 出典

- [File Conventions: error.js - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/error)
