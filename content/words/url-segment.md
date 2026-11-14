---
title: URL Segment
aliases: []
description: URL のパスのうち、スラッシュで区切られた一部分
tags: [word, next.js]
date: 2024-08-19
---

## TL;DR

[[url|URL]] の[[url-path|パス]]のうち、スラッシュで区切られた一部分。[[nextjs|Next.js]] のルーティングの用語である。

## 仕組み

[[rfc|RFC]] 3986 では、パスは `/` で区切られたパスセグメント（path segment）の並びと定められている。URL Segment は、このパスセグメントにあたる。

Next.js の App Router では、フォルダが URL Segment に対応する [[route-segment|Route Segment]] を定める。たとえば `/blog/[slug]` というルートは、`/`（Root Segment）、`blog`、`[slug]`（Leaf Segment）の 3 つのセグメントからできている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[route-segment|Route Segment]]
- [[url-path|パス]]
- [[nextjs|Next.js]]

## 出典

- [Routing - Next.js](https://nextjs.org/docs/app/building-your-application/routing#terminology)
- [Layouts and Pages - Next.js](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [RFC 3986 Section 3.3 Path](https://datatracker.ietf.org/doc/html/rfc3986#section-3.3)
