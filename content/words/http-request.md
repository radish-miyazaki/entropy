---
title: HTTP リクエスト
aliases: []
description: クライアントがサーバに送る HTTP メッセージで、リクエストライン、ヘッダ、ボディから成る
tags: [word, http]
date: 2026-11-14
---

## TL;DR

クライアントがサーバに送る [[http-message|HTTP メッセージ]]である。HTTP メソッド、対象のリソース、HTTP のバージョンを書いたリクエストラインで始まり、ヘッダと任意のボディが続く。

## 仕組み

[RFC 9112](https://httpwg.org/specs/rfc9112.html) の定義では、[[http-1-1|HTTP/1.1]] のメッセージはスタートラインと CRLF で始まり、0 個以上のヘッダの行、ヘッダの終わりを示す空行、任意のメッセージボディが続く。リクエストでは、スタートラインがリクエストラインになる。

```text
HTTP-message = start-line CRLF *( field-line CRLF ) CRLF [ message-body ]
request-line = method SP request-target SP HTTP-version
```

リクエストラインは、メソッド、空白 1 文字、リクエストの対象（request-target）、空白 1 文字、プロトコルのバージョンの順に並ぶ。ヘッダの各行は、大文字と小文字を区別しないフィールド名、`:`、値の形で書く。

## 例

RFC 9112 には、次のリクエストの例がある。

```http
GET /where?q=now HTTP/1.1
Host: www.example.org
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[http-message|HTTP メッセージ]]
- [[http-response|HTTP レスポンス]]
- [[http|HTTP]]
- [[host-header|Host]]
- [[connection-header|Connection]]

## 出典

- [RFC 9112: HTTP/1.1](https://httpwg.org/specs/rfc9112.html)
