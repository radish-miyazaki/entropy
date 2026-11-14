---
title: Content-Encoding
aliases: []
description: データを圧縮したときに、その圧縮形式を示す HTTP の表現ヘッダ
tags: [word, http]
date: 2024-11-05
---

## TL;DR

データを圧縮したときに、その圧縮形式を示す [[http|HTTP]] の[[representation-header|表現ヘッダ]]。1992 年版の [[http-0-9|HTTP/0.9]] から存在する。

## なぜ必要か

RFC 9110 によると、Content-Encoding は主に、表現のデータを、元の[[mime-type|メディアタイプ]]が何であるかを失わずに圧縮するために使う。

## 仕組み

複数の圧縮形式を重ねてかけたときは、かけた順に並べる。RFC 9110 では、`compress`、`deflate`、`gzip` の 3 つの形式を定義している。Transfer-Encoding と違い、Content-Encoding に並んだ形式は表現そのものの性質であり、表現は圧縮された形で定義される。

## 例

```http
Content-Encoding: gzip
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[content-type|Content-Type]]
- [[content-length|Content-Length]]

## 出典

- [Content-Encoding - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Encoding)
- [Object Header lines - W3C](https://www.w3.org/Protocols/HTTP/Object_Headers.html#content-encoding)
- [RFC 9110 - HTTP Semantics, 8.4. Content-Encoding](https://www.rfc-editor.org/rfc/rfc9110.html#name-content-encoding)
