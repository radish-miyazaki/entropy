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

代数的な型システムは、ドメインモデリングのための優れたツールである。[[Domain Modeling Made Functional 第2章 Understanding the Domain|Domain Modeling Made Functional 第2章]]では、`AND` と `OR` を使ってドメインを文章にしており、それをそのまま型に落とし込める。

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
