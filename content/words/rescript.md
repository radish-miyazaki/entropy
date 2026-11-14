---
title: ReScript
aliases: []
description: 読みやすい JavaScript にコンパイルされる、強い静的型付けの言語
tags: [word, ocaml, altjs]
date: 2026-07-13
---

## TL;DR

JavaScript にコンパイルされる、強い型付けの言語。[[ocaml|OCaml]] と関係の深い altJS の一つ。

## 仕組み

すべてのアプリケーションが完全に型付けされ、どの値にも信頼できる型情報がある。型は単純なものを好み、`any` や暗黙の型、予期しない `undefined` を避ける。出力される JavaScript は、人間や AI ツールが読める素直なコードである。

JavaScript のライブラリをそのまま使え、ReScript のライブラリを JavaScript 向けに公開でき、[[typescript|TypeScript]] の型定義も自動で生成できる。既存の JavaScript プロジェクトに少しずつ導入でき、やめるときはソースを消して出力の JavaScript だけを残せばよい。ビルドが速く、コードベースが大きくてもフィードバックが速い。React のバインディングも公式に提供している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ocaml|OCaml]]
- [[typescript|TypeScript]]

## 出典

- [ReScript](https://www.rescript-lang.org/)
