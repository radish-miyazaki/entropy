---
title: Referer
aliases: []
description: クライアントがリクエストを送るときに、それまで見ていたページの URL を送る HTTP のリクエストヘッダ
tags: [word, http]
date: 2024-11-05
---

## TL;DR

クライアントがリクエストを送るときに、それまで見ていたページの [[url|URL]] を送る [[http|HTTP]] の[[request-header|リクエストヘッダ]]。

## なぜ必要か

サーバは、このヘッダでページの参照元を知ることができる。MDN によると、このデータは分析、ログ、キャッシュの最適化などに使われる。

## 仕組み

リンクをクリックしたときは、そのリンクを含むページのアドレスが入る。別のドメインにリソースを要求したときは、そのリソースを使うページのアドレスが入る。オリジン、パス、クエリ文字列を含められるが、フラグメント（`#section`）や `username:password` は含まない。

## 注意点

1992 年版の [[http-0-9|HTTP/0.9]] から存在するが、セキュリティのために仕様が大きく変わっている。

ヘッダ名の referer は、英語の referrer の綴り間違いだが、仕様にそのまま残っている。また、このヘッダはユーザのセキュリティやプライバシーに望ましくない影響を与えることがある。どこまでの情報を含めるかは、リクエストのリファラーポリシー（`Referrer-Policy`）で決まる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[header-field|ヘッダフィールド]]
- [[user-agent|User-Agent]]

## 出典

- [Referer - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Referer)
- [Referer header - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referer)
- [HTTP Request fields - W3C](https://www.w3.org/Protocols/HTTP/HTRQ_Headers.html#z14)
