---
title: Content-Type
aliases: []
description: データの種類を MIME タイプで指定する HTTP の表現ヘッダ
tags: [word, http]
date: 2024-11-05
---

## TL;DR

データの種類を [[mime-type|MIME タイプ]]と呼ばれる識別子で指定する [[http|HTTP]] の[[representation-header|表現ヘッダ]]。1992 年版の [[http-0-9|HTTP/0.9]] から存在する。

## 仕組み

RFC 9110 によると、Content-Type は、対応する表現のメディアタイプを示す。下の例のように、`charset` などのパラメータを付けられる。

## 例

```http
Content-Type: text/html; charset=ISO-8859-4
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[mime-type|MIME タイプ]]
- [[content-encoding|Content-Encoding]]
- [[content-length|Content-Length]]

## 出典

- [Content-Type - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Type)
- [Object Header lines - W3C](https://www.w3.org/Protocols/HTTP/Object_Headers.html#z16)
- [RFC 9110 - HTTP Semantics, 8.3. Content-Type](https://www.rfc-editor.org/rfc/rfc9110.html#name-content-type)
