---
title: TLS
aliases: [SSL]
description: インターネット上の 2 者の間に、認証、機密性、完全性を備えた安全な通信路を作るプロトコル
tags: [word, ネットワーク, セキュリティ]
date: 2026-11-14
---

## TL;DR

Transport Layer Security の略。インターネット上のクライアントとサーバの間に、盗聴、改ざん、なりすましを防ぐ安全な通信路を作るプロトコル。前身は SSL（Secure Sockets Layer）。

## なぜ必要か

TLS 1.3 を定めた RFC 8446 によると、TLS の主な目的は、通信する 2 者の間に安全な通信路を作ることである。その通信路は次の 3 つの性質を持つ。

- 認証: サーバは常に認証される。クライアントの認証は任意である
- 機密性: データは両端からしか見えない。ただし、データの長さは隠さない
- 完全性: データの改ざんを検知できる

## 仕組み

TLS は、下の層に信頼できる順序どおりのデータの流れ（[[tcp|TCP]] など）があればよい。TLS は 2 つの部分からなる。ハンドシェイクプロトコルは、通信相手を認証し、暗号のパラメータを決め、共有の鍵を確立する。レコードプロトコルは、その鍵を使って通信をレコード単位で保護する。

## 注意点

SSL 3.0 は十分に安全ではなく、RFC 7568 で使用が禁止された。TLS 1.0 が 1999 年に SSL 3.0 を置き換えている。RFC 8446 は TLS 1.2 以前を廃止したが、RFC Editor のページによると、RFC 8446 自体も RFC 9846 で置き換えられている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[tcp|TCP]]
- [[http|HTTP]]
- [[ietf|IETF]]
- [[rfc|RFC]]

## 出典

- [RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446)
- [RFC 7568: Deprecating Secure Sockets Layer Version 3.0](https://www.rfc-editor.org/rfc/rfc7568)
