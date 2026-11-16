---
title: 抽象化
aliases: []
description: ある実体を単純化して捉え、重要でない細部を省いたもの
tags: [word, 設計]
date: 2023-12-19
---

## TL;DR

計算機科学では、詳細を捨象し、一度に注目すべき概念を減らすことと、その仕組みを指す。[[A Philosophy of Software Design]] の定義では、ある実体を単純化して捉えたもので、重要でない細部は省かれている。

> 抽象化とは、ある実体を単純化して捉えたもので、重要でない細部は省かれている。
>
> An abstraction is a simplified view of an entity, which omits unimportant details.

## なぜ必要か

抽象化は複雑な物事について考えたり、操作したりすることを簡単にしてくれるので有用である。

> Abstractions are useful because they make it easier for us to think about and manipulate complex things.

Wikipedia によると、細部を隠すとプログラマが一度に把握すべき事柄が減るので、一部の問題に集中しながら大きなシステムを作れる。データ抽象化でインタフェースを固定して実装を隠せば、内部を変えてもそれを使うコードに影響しにくくなる。

## 仕組み

Wikipedia によると、抽象化は大きく制御抽象化（動作の抽象化）とデータ抽象化（データ構造の抽象化）に分けられる。サブルーチンは制御抽象化の例で、同じ処理を毎回書き直す必要をなくす。

## 注意点

抽象化で下位の構造を完全に隠せることはない、という批判もある。Joel Spolsky の「漏れのある抽象化」がその例である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[deep-module|深いモジュール]]
- [[information-hiding|情報隠蔽]]
- [[complexity|複雑さ]]
- [[level-of-abstraction|抽象度（Shape Up）]]

## 出典

- [[A Philosophy of Software Design]]
- [抽象化 (計算機科学) - Wikipedia](<https://ja.wikipedia.org/wiki/抽象化_(計算機科学)>)
