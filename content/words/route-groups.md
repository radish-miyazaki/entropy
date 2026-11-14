---
title: Route Groups
aliases: []
description: Next.js の App Router で、フォルダ名を ( ) で囲み、URL のパスに影響させずにルートをまとめる仕組み
tags: [word, next.js, app-router]
date: 2024-08-22
---

## TL;DR

[[nextjs|Next.js]] の [[app-router|App Router]] で、フォルダ名を `( )` で囲み、URL の[[url-path|パス]]に影響させずにルートをまとめる仕組み。

## なぜ必要か

通常、Next.js の `app/` ディレクトリ配下の階層構造は、そのまま URL のパスになる。用途ごとに異なる [[layout-tsx|layout.tsx]] を適用したいときは、パスを変えずにフォルダを分けたい。フォルダ名を `( )` で囲むと、そのフォルダはパスに含まれなくなる。

## 仕組み

フォルダ名を `( )` で囲むと、そのフォルダは URL のパスに現れない。グループごとに別の `layout.tsx` を置ける。

似た仕組みに Private Folder がある。ルーティングの対象から外したいディレクトリは、`_components` のように名前の先頭に `_` を付ける。[[colocation|コロケーション]]のために使われる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[route-segment|Route Segment]]
- [[dynamic-routes|Dynamic Routes]]
- [[colocation|コロケーション]]

## 出典

- [Route Groups - Next.js](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
- [Project Organization and File Colocation - Next.js（Private Folders）](https://nextjs.org/docs/app/building-your-application/routing/colocation#private-folders)
