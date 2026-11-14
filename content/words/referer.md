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

サーバは、このヘッダでページの参照元を知ることができる。

## 注意点

1992 年版の [[http-0-9|HTTP/0.9]] から存在するが、セキュリティのために仕様が大きく変わっている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[header-field|ヘッダフィールド]]
- [[user-agent|User-Agent]]

## 出典

- [Referer - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Referer)
- [HTTP Request fields - W3C](https://www.w3.org/Protocols/HTTP/HTRQ_Headers.html#z14)
