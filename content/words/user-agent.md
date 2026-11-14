---
title: User-Agent
aliases: []
description: クライアントが自分のアプリケーション名をサーバに伝える HTTP のリクエストヘッダ
tags: [word, http]
date: 2024-11-05
---

## TL;DR

クライアントからサーバに送る [[http|HTTP]] の[[request-header|リクエストヘッダ]]。クライアントが自分のアプリケーション名を入れる。

## 仕組み

1992 年版の [[http-0-9|HTTP/0.9]] から存在するヘッダである。

## 例

curl の場合は `curl/7.48.0` のような値が入る。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[header-field|ヘッダフィールド]]
- [[referer|Referer]]
- [[authorization-header|Authorization]]

## 出典

- [User-Agent - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/User-Agent)
- [HTTP Request fields - W3C](https://www.w3.org/Protocols/HTTP/HTRQ_Headers.html#user-agent)
