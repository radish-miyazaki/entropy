---
title: 完全性
aliases: []
description: データが正しいビジネスルールに従っていること。Domain Modeling Made Functional では妥当性とも言う
tags: [word, ddd]
date: 2026-11-14
---

## TL;DR

データが正しいビジネスルールに従っていること。[[Domain Modeling Made Functional]] では、完全性（integrity）を妥当性とも言い換えている。

## なぜ必要か

[[Domain Modeling Made Functional]] によると、ドメインモデルは[[bounded-context|境界づけられたコンテキスト]]の中で、常に完全性と[[coherence|整合性]]を保っている必要がある。完全性はデータがビジネスルールに従っていること、整合性はモデルの異なる部分が事実について一致していることである。

## 仕組み

同書は、完全性を型で保証する方法をいくつか示している。

- 単純な値の制約: コンストラクタをプライベートにし、無効な値ならエラーを返すスマートコンストラクタを用意して、不正な値を作れないようにする
- 測定単位: [[fsharp|F#]] では数値に測定単位を付けられ、単位が一致しないとコンパイルエラーになる
- [[invariant|不変条件]]: 「注文には 1 行以上の明細がある」のような条件を、空にならないリストの型で表す
- ビジネスルール: 検証済みと未検証のメールアドレスを別の型に分け、不正な状態を表現できないようにする

## 例

「1 以上 1000 以下」という制約を持つ数量は、スマートコンストラクタで次のように表す。

```fsharp
module UnitQuantity =
    type UnitQuantity = private UnitQuantity of int

    let create qty =
        if qty < 1 then
            Error "UnitQuantity can not be negative"
        else if qty > 1000 then
            Error "UnitQuantity can not be more than 1000"
        else
            Ok (UnitQuantity qty)
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[coherence|整合性]]
- [[invariant|不変条件]]

## 出典

- [[Domain Modeling Made Functional 第6章 Integrity and Consistency in the Domain|Domain Modeling Made Functional 第6章]]
- [[Domain Modeling Made Functional 第6章 単純な値の完全性|Domain Modeling Made Functional 第6章 単純な値の完全性]]
