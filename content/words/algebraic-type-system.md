---
title: 代数的な型システム
aliases: []
description: すべての複合型が、より小さな型を AND または OR で合成してできている型システム
tags: [word, 型システム, 関数型プログラミング]
date: 2024-07-12
---

## TL;DR

すべての複合型が、より小さな型を `AND` または `OR` で合成してできている型システム。[[fsharp|F#]] などの[[functional-programming|関数型プログラミング]]言語は、代数的な型システムを内蔵している。

## なぜ必要か

代数的な型システムはドメインモデリングのための優れたツールである。[[Domain Modeling Made Functional 第2章 Understanding the Domain|Domain Modeling Made Functional 第2章]]では、`AND` と `OR` を使ってドメインを文章にしており、それをそのまま型に落とし込める。

## 仕組み

[[Domain Modeling Made Functional]] の著者 Scott Wlaschin によると、代数的な型には 2 種類ある。[[tuple|タプル]]や[[record-type|レコード型]]のような「直積型」と、[[fsharp|F#]] の[[discriminated-union|選択型]]（判別共用体）のような「直和型」である。`AND` で合成するのが直積型、`OR` で合成するのが直和型にあたる。

直積型が取りうる値の数は、構成する型の値の数の積になる。たとえば 4 つの方向と 2 つの速さを組にした `Velocity` は 4 × 2 = 8 通りになる。直和型が取りうる値の数は和になる。4 つの方向と `NotMoving` のどれか 1 つを選ぶ `Movement` は 4 + 1 = 5 通りになる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[algebraic-data-type|代数的データ型]]
- [[fsharp|F#]]
- [[functional-programming|関数型プログラミング]]

## 出典

- [[Domain Modeling Made Functional]]
- [Algebraic type sizes and domain modelling - F# for Fun and Profit](https://fsharpforfunandprofit.com/posts/type-size-and-design/)
