---
title: Fetch API
aliases: []
description: ネットワーク越しの通信を含め、リソースを取得するための Web 標準のインタフェース
tags: [word, web]
date: 2024-08-23
---

## TL;DR

ネットワーク越しの通信を含め、リソースを取得するための Web 標準のインタフェース。XMLHttpRequest をより強力で柔軟にした置き換えである。

## 仕組み

グローバルメソッドの `fetch()` に取得したいリソースのパスを渡すと、`Promise` が返る。この `Promise` は、サーバがヘッダを返した時点で `Response` に解決される。`fetch()` は `Window` と `Worker` のどちらのコンテキストでも使える。

主なインタフェースは次のとおりである。

- `fetch()`: リソースを取得する
- `Request`: リソースへのリクエストを表す
- `Response`: リクエストに対するレスポンスを表す
- `Headers`: リクエストとレスポンスのヘッダを表す

## 注意点

サーバが 404 や 500 などのエラーのステータスを返しても、`Promise` は `Response` に解決される。リクエストが成功したかどうかは、`Response` を見て判断する必要がある。

`Request()` や `Response()` で直接オブジェクトを作ることもできるが、他の API 呼び出しの結果として受け取るのが望ましい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[route-handler|Route Handler]]: Fetch API の `Request` と `Response` に準拠している
- [[nextjs-extended-fetch|Next.js による fetch の拡張]]
- [[cors|CORS]]

## 出典

- [フェッチ API - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)
