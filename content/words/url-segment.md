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
