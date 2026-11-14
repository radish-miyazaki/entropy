---
title: template.tsx
aliases: []
description: Next.js の App Router で、配下の URL Segment に共通の UI を、ページ遷移のたびに作り直して適用する特別なファイル
tags: [word, next.js, app-router]
date: 2024-08-21
---

## TL;DR

[[nextjs|Next.js]] の [[app-router|App Router]] で、`app` ディレクトリ内に置く特別なファイルの 1 つ。置いた [[url-segment|URL Segment]] 配下のすべての URL Segment に、共通の UI を適用する。

## 仕組み

[[layout-tsx|layout.tsx]] と違い、ページ遷移の間で状態を保持しない。遷移するたびに再レンダリングされる。

## 例

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

## 注意点

拡張子は `.tsx` でなくてもよく、`.jsx` や `.js` でもよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[route-segment|Route Segment]]
- [[layout-tsx|layout.tsx]]

## 出典

- [template.js - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/template)
