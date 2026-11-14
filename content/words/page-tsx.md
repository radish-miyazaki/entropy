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

公式ドキュメントによると、`page` はそのルートに固有の UI を定義するファイルで、ルートのサブツリーの末端（leaf）になる。ルートセグメントを公開してアクセスできるようにするには、`page` ファイルが必要である。デフォルトでは [[react-server-component|Server Component]] だが、[[client-component|Client Component]] にもできる。同じセグメントの [[layout-tsx|layout.tsx]]、template.js、[[error-tsx|error.tsx]]、[[loading-tsx|loading.tsx]] に包まれる、最も内側のファイルである。

props として `params` と `searchParams` を受け取る。`params` は [[dynamic-routes|Dynamic Routes]] のパラメータを、`searchParams` は URL の[[query-parameter|クエリパラメータ]]を持つオブジェクトに解決される Promise である。Next.js 15 から Promise になったので、`await` か React の `use` で値を取り出す。

## 例

`params` で、URL の `slug` に応じた内容を表示する例。

```tsx
// app/blog/[slug]/page.tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <h1>Blog Post: {slug}</h1>
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

## 出典

- [File-system conventions: page.js - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/page)
