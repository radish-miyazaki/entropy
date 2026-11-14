---
title: page.tsx
aliases: []
description: Next.js の App Router で、特定の URL Segment に置いてその Route の画面を提供する特別なファイル
tags: [word, next.js, app-router]
date: 2024-08-19
---

## TL;DR

[[app-router|App Router]] の `app` ディレクトリに置く特別なファイルの 1 つ。特定の [[url-segment|URL Segment]] に置くと、その Route の画面を提供する。

## 仕組み

`/src/app/company-info/page.tsx` は `/company-info` に対応する。コンポーネントは `export default` する必要がある。

```tsx
// src/app/company-info/page.tsx
export default function Page() {
  return (
    <div>
      <h1>企業概要</h1>
    </div>
  )
}
```

## 自分の理解

拡張子は `.jsx`（`.js`）でもよい。

## 関連

- [[layout-tsx|layout.tsx]]
- [[loading-tsx|loading.tsx]]
- [[not-found-tsx|not-found.tsx]]
- [[error-tsx|error.tsx]]
- [[dynamic-routes|Dynamic Routes]]
