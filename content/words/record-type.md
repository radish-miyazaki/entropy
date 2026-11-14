---
title: レコード型
aliases: [レコード]
description: 名前付きの値（フィールド）をまとめた型。複数の型をすべて組み合わせる AND 型にあたる
tags: [word, 型システム, fsharp]
date: 2026-11-14
---

## TL;DR

名前付きの値（フィールド）をまとめた型。[[Domain Modeling Made Functional]] では、複数の型をすべて組み合わせる AND 型（直積型）として紹介されている。

## なぜ必要か

[[functional-programming|関数型プログラミング]]では、小さな型を合成して新しい型を作る。[[Domain Modeling Made Functional]] によると、[[fsharp|F#]] の合成方法は AND 型のレコード型と、OR 型の[[discriminated-union|判別共用体]]の 2 つである。この組み合わせを[[algebraic-type-system|代数的な型システム]]と呼ぶ。

## 仕組み

[F# のドキュメント](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/records)によると、F# のレコードは名前付きの値を単純にまとめたもので、メンバーも持てる。値を作るときは、すべてのフィールドに値を渡す必要がある。

レコードはデフォルトで[[immutability|イミュータブル]]で、値を変えたいときは `with` を使ったコピーと更新の式で新しいレコードを作る。また、クラスが参照の等価性を持つのに対して、レコードは構造的な等価性を持つので、フィールドの値がすべて同じなら等しいとみなされる。

## 例

```fsharp
type Point = { X: float; Y: float; Z: float }

let p1 = { X = 1.0; Y = 1.0; Z = -1.0 }
let p2 = { p1 with Z = 0.0 } // コピーと更新の式
```

## 注意点

[[Domain Modeling Made Functional]] の第 7 章では、状態が変わるものを 1 つのレコード型とフラグで表すと、状態が暗黙的になり、ルールを強制できないとしている。状態ごとに型を分け、判別共用体でまとめるほうがよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[discriminated-union|判別共用体]]: OR 型
- [[algebraic-data-type|代数的データ型]]
- [[value-object|値オブジェクト]]

## 出典

- [[Domain Modeling Made Functional 第4章 型の合成|Domain Modeling Made Functional 第4章 型の合成]]
- [[Domain Modeling Made Functional 第7章 状態の集合による注文のモデリング|Domain Modeling Made Functional 第7章 状態の集合による注文のモデリング]]
- [Records - F# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/records)
