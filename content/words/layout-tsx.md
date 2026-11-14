---
title: layout.tsx
aliases: []
description: Next.js の App Router で、ある URL Segment 配下のすべての URL Segment に共通の UI を定義する特別なファイル
tags: [word, next.js, app-router]
date: 2024-08-19
---

## TL;DR

[[app-router|App Router]] の `app` ディレクトリに置く特別なファイルの 1 つ。特定の [[url-segment|URL Segment]] に置くと、その配下のすべての URL Segment に適用される共通の UI になる。

## 仕組み

Layout はネストする。`app` 直下に置いた [[root-layout|Root Layout]] は、すべての Segment に適用される。たとえば次の構成を考える。

```text
app/nested-layout/
├── layout.tsx
├── page.tsx
└── second
    ├── layout.tsx
    ├── page.tsx
    └── third
        ├── fourth
        │   └── page.tsx
        ├── layout.tsx
        └── page.tsx
```

`/second` にアクセスすると、`second` までのすべての `layout.tsx` と `second/page.tsx` が表示される。`/second/third/fourth` にアクセスすると、`third` までのすべての `layout.tsx` と `fourth/page.tsx` が表示される。

## 注意点

[[template-tsx|template.tsx]] と違い、Layout はページ遷移の間も状態を保持し、再レンダリングされない。

## 自分の理解

拡張子は `.jsx`（`.js`）でもよい。

## 関連

- [[root-layout|Root Layout]]
- [[page-tsx|page.tsx]]
- [[template-tsx|template.tsx]]
- [[loading-tsx|loading.tsx]]
- [[error-tsx|error.tsx]]

## 出典

- [File Conventions: layout.js - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/layout)
- [Nesting Layouts - Next.js](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#nesting-layouts)
