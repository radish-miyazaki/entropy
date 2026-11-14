---
title: Authorization
aliases: []
description: 特定のクライアントとだけ通信するときに、認証情報をサーバに伝える HTTP のリクエストヘッダ
tags: [word, http, 認証]
date: 2024-11-05
---

## TL;DR

特定のクライアントとだけ通信を許可するときに、認証情報をサーバに伝える [[http|HTTP]] の[[request-header|リクエストヘッダ]]。1992 年版の [[http-0-9|HTTP/0.9]] から存在する。

## 仕組み

[[rfc|RFC]] で、Basic、Digest、Bearer といった標準的な形式が定められている。

## 注意点

[[aws|AWS]] や [[github|GitHub]] の API のように、Web サービス独自の書き方を求められることもある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[header-field|ヘッダフィールド]]
- [[user-agent|User-Agent]]

## 出典

- [Authorization - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Authorization)
- [HTTP Request fields - W3C](https://www.w3.org/Protocols/HTTP/HTRQ_Headers.html#z9)
