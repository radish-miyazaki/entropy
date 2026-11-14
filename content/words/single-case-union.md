---
title: 単純型
aliases: []
description: ケースが 1 つだけの判別共用体。プリミティブな値を包み、別の意味の値と区別するのに使う
tags: [word, 型システム, fsharp, ddd]
date: 2026-11-14
---

## TL;DR

ケースが 1 つだけの[[discriminated-union|判別共用体]]。[[Domain Modeling Made Functional]] では、プリミティブな値を包むラッパー型として使い、[[value-object|値オブジェクト]]を表すのに役立つとしている。

## なぜ必要か

[[Domain Modeling Made Functional]] によると、`CustomerId` と `OrderId` はどちらも `int` で表せても互換性はない。プリミティブな値を単純型で包むと型が別になり、誤って混同するとコンパイルエラーになる。

## 仕組み

[[fsharp|F#]] では、ケース名をコンストラクタとして使って値を作る。[F# のドキュメント](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/discriminated-unions)によると、判別共用体はドメインモデリングで 1 つの型を包むのによく使われる。ケースが 1 つなら `match` 式を使わずに、パターンで中の値を取り出せる。関数のパラメータで直接取り出すこともできる。

## 例

```fsharp
type CustomerId = CustomerId of int
type OrderId = OrderId of int

let customerId = CustomerId 42
let (CustomerId innerValue) = customerId // 42

let processCustomerId (id: CustomerId) = ()
processCustomerId (OrderId 42) // コンパイルエラー
```

## 注意点

[[Domain Modeling Made Functional]] によると、単純型にはメモリと速度のコストがあるので、必要なら[[type-alias|型エイリアス]]や構造体で代わりにする。また、単純型にも桁数や範囲のような制約があるので、コンストラクタをプライベートにして、無効な値を作れないようにする（スマートコンストラクタ）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[discriminated-union|判別共用体]]
- [[value-object|値オブジェクト]]
- [[newtype-pattern|Newtype パターン]]
- [[domain-primitive|ドメインプリミティブ]]
- [[branded-types|Branded Types]]

## 出典

- [[Domain Modeling Made Functional 第4章 型の合成|Domain Modeling Made Functional 第4章 型の合成]]
- [[Domain Modeling Made Functional 第5章 単純な値のモデリング|Domain Modeling Made Functional 第5章 単純な値のモデリング]]
- [[Domain Modeling Made Functional 第6章 単純な値の完全性|Domain Modeling Made Functional 第6章 単純な値の完全性]]
- [Discriminated Unions - F# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/discriminated-unions)
