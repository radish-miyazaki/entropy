---
title: route.ts
aliases: []
description: Next.js の App Router で、Route Handler のエンドポイントになる特別なファイル
tags: [word, next.js, app-router]
date: 2024-08-21
---

## TL;DR

[[nextjs|Next.js]] の [[app-router|App Router]] で、`app` ディレクトリ内に置く特別なファイルの 1 つ。Web API（[[route-handler|Route Handler]]）のエンドポイントになる。

## 例

```ts
export async function GET(request: Request) {
  return new Response("Hello, Next.js!")
}
```

## 注意点

拡張子は `.ts` でなくてもよく、`.js` でもよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[route-segment|Route Segment]]
- [[route-handler|Route Handler]]
- [[page-tsx|page.tsx]]

## 出典

- [route.js - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/route)
