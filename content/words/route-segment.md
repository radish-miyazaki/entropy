---
title: Route Segment
aliases: []
description: Next.js で、特定の URL パスに対応する URL Segment。App Router ではフォルダが Route Segment になる
tags: [word, next.js, app-router]
date: 2024-08-19
---

## TL;DR

[[nextjs|Next.js]] で、特定の[[url-path|パス]]に対応する [[url-segment|URL Segment]] のこと。[[app-router|App Router]] では、フォルダが Route Segment を定める。

## 仕組み

一番上のセグメントを Root Segment、子を持たないセグメントを Leaf Segment と呼ぶ。フォルダ名を角括弧で囲むと（`[slug]` など）、パスパラメータに動的な値を持つ [[dynamic-routes|Dynamic Routes]] になる。

各セグメントは [[page-tsx|page.tsx]] や [[layout-tsx|layout.tsx]] を持ってもよいし、持たなくてもよい。セグメントに置ける特別なファイルには次のものがある。

- [[page-tsx|page.tsx]]
- [[layout-tsx|layout.tsx]]
- [[loading-tsx|loading.tsx]]
- [[not-found-tsx|not-found.tsx]]
- [[error-tsx|error.tsx]]
- [[route-ts|route.ts]]
- [[template-tsx|template.tsx]]
- [[default-tsx|default.tsx]]
- [[global-error-tsx|global-error.tsx]]

App Router では、ページを移動したときに、変わった Route Segment だけを再レンダリングする（[[soft-navigation|Soft navigation]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[url-segment|URL Segment]]
- [[dynamic-routes|Dynamic Routes]]
- [[soft-navigation|Soft navigation]]

## 出典

- [Route Segments - Next.js](https://nextjs.org/docs/app/building-your-application/routing#route-segments)
- [File Conventions - Next.js](https://nextjs.org/docs/app/building-your-application/routing#file-conventions)
