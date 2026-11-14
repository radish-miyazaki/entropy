---
title: route.ts
aliases: []
description: Next.js の App Router で、Route Handler のエンドポイントになる特別なファイル
tags: [word, next.js, app-router]
date: 2024-08-21
---

## TL;DR

[[nextjs|Next.js]] の [[app-router|App Router]] で、`app` ディレクトリ内に置く特別なファイルの 1 つ。Web API（[[route-handler|Route Handler]]）のエンドポイントになる。

## なぜ必要か

Web 標準の Request と Response の API を使って、ルートごとに独自のリクエストハンドラを作れる。Pages Router の API Routes と違い、`bodyParser` などの追加の設定なしでリクエストボディを読める。

## 仕組み

`route.ts` から HTTP メソッド名（`GET`、`POST`、`PUT`、`PATCH`、`DELETE`、`HEAD`、`OPTIONS`）の関数を export すると、そのメソッドのリクエストを処理する。`OPTIONS` を定義しなければ、Next.js がほかに定義したメソッドをもとに `Allow` ヘッダを設定して自動で実装する。

第 1 引数の `request` は、Web の Request を拡張した `NextRequest` で、Cookie や解析済みの URL（`nextUrl`）を扱いやすい。第 2 引数の `context` の `params` は、[[dynamic-routes|Dynamic Routes]] のパラメータを返す Promise である。ページやレイアウトと同じ [[route-segment-config|Route Segment Config]] も使える。

## 例

```ts
export async function GET(request: Request) {
  return new Response("Hello, Next.js!")
}
```

## 注意点

拡張子は `.ts` でなくてもよく、`.js` でもよい。

Next.js 15 で、`GET` ハンドラのデフォルトのキャッシュは静的から動的に変わり、`context.params` は Promise になった。

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
