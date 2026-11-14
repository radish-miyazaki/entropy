---
title: HTTP Trailer
aliases: [Trailer]
description: メッセージ本体の後にフィールドを送るとき、どのフィールドを後から送るかを相手に知らせるヘッダ
tags: [word, http]
date: 2024-09-29
---

## TL;DR

いくつかのフィールドをメッセージ本体の後に送りたいときに、どのフィールドを後から送るかを相手に知らせる [[http|HTTP]] のヘッダ。

## なぜ必要か

本体を送りながら動的に作られるメタデータは、本体を送り終えるまで値が決まらない。トレーラーを使うと、そうした値を本体の後に付けて送れる。

## 仕組み

送る側は、先に `Trailer` ヘッダで後から送るフィールド名を宣言し、本体の後にそのフィールドを送る。トレーラーを使えるのはチャンク形式で送るメッセージ（`Transfer-Encoding: chunked`）で、リクエストでは `TE: trailers` を指定する必要がある。

## 例

`Server-Timing` をトレーラーとして送るレスポンス。

```http
HTTP/1.1 200 OK
Transfer-Encoding: chunked
Trailer: Server-Timing

--- response body ---
Server-Timing: custom-metric;dur=123.4
```

## 注意点

- ブラウザは `Server-Timing` を除いてトレーラーを無視する。Fetch API や XHR からも読めない
- [[content-type|Content-Type]]、[[content-encoding|Content-Encoding]]、[[content-length|Content-Length]]、[[authorization-header|Authorization]]、[[host-header|Host]] などは、トレーラーとして送れない
- [[grpc|gRPC]] はトレーラーを多用するが、ブラウザを含む多くの HTTP 実装はトレーラーをサポートしていない。これが [[grpc-web|gRPC Web]] が必要な理由の 1 つである

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[header-field|ヘッダフィールド]]
- [[grpc-web|gRPC Web]]

## 出典

- [Trailer - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Trailer)
- [Trailer - HTTP | MDN（英語版）](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Trailer)
