---
title: Content-Length
aliases: []
description: コンテンツのサイズを表す HTTP のペイロードヘッダ
tags: [word, http]
date: 2024-11-05
---

## TL;DR

コンテンツのサイズを表す [[http|HTTP]] のペイロードヘッダ。1992 年版の [[http-0-9|HTTP/0.9]] から存在する。

## 注意点

圧縮されている場合は、圧縮した後のサイズが入る。圧縮形式は [[content-encoding|Content-Encoding]] で示す。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[content-encoding|Content-Encoding]]
- [[content-type|Content-Type]]

## 出典

- [Content-Length - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Length)
- [Object Header lines - W3C](https://www.w3.org/Protocols/HTTP/Object_Headers.html#content-length)
