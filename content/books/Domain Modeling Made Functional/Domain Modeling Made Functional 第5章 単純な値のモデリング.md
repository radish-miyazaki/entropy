---
title: Domain Modeling Made Functional › 単純な値のモデリング
description: プリミティブ値を単一ケースの判別共用体（単純型）で包み、異なる型の混同をコンパイル時に防ぐ。性能が問題なら型エイリアスや構造体を使う
tags: [book-chapter, ddd, fsharp]
date: 2024-07-16
book: "[[Domain Modeling Made Functional]]"
chapter: 5
---

## TL;DR

- 同じ `int` でも `CustomerId` と `OrderId` は別物なので、プリミティブ値を[[single-case-union|単純型]]で包んで区別する。
- 単純型にはメモリと速度のコストがあるので、必要なら[[type-alias|型エイリアス]]や構造体で代替する。

## 内容

### 単一ケースの判別共用体

`ProductCode` や `OrderId` は、どちらも `int` で表せても互換性はない。型が違うことを明確にするため、プリミティブな値をラップする。F# では、ケースが 1 つだけの[[discriminated-union|判別共用体]]（[[single-case-union|単純型]]）を使う。

```fsharp
type CustomerId = CustomerId of int
```

ケース名をコンストラクタ関数として使うと、値を作れる。

```fsharp
let customerId = CustomerId 42
```

こうすると、異なる型を誤って混同するとコンパイルエラーになる。

```fsharp
type CustomerId = CustomerId of int
type OrderId = OrderId of int

let customerId = CustomerId 42
let orderId = OrderId 42

printfn "%b" (orderId = customerId) // コンパイルエラー

let processCustomerId (id : CustomerId) = ...
processCustomerId orderId // コンパイルエラー
```

中の値を取り出すときは、ケースラベルで[[pattern-matching|パターンマッチ]]をする。関数のパラメータで直接取り出すこともできる。

```fsharp
let customerId = CustomerId 42

let (CustomerId innerValue) = customerId
printfn "%i" innerValue // 42

// val processCustomerId: CustomerId -> unit
let processCustomerId (CustomerId innerValue) =
    printfn "innerValue is %i" innerValue
```

### パフォーマンスの問題

単純型は、メモリ使用量と効率を犠牲にする。アプリケーションの種類によっては注意が必要である。代替策は 3 つある。

1 つ目は[[type-alias|型エイリアス]]である。オーバーヘッドはないが、型の安全性は下がる。

```fsharp
type UnitQuantity = int
```

2 つ目は値型（構造体）である。オーバーヘッドは残るが、配列に入れると連続したメモリ領域に置かれるので、キャッシュの効率がよい。

```fsharp
[<Struct>]
type UnitQuantity = UnitQuantity of int
```

3 つ目は、単純型のコレクションではなく、プリミティブ値のコレクション全体を 1 つの型として定義する方法である。

```fsharp
type UnitQuantities = UnitQuantities of int[]
```

ただし一般には、まず最も分かりやすい方法で[[domain|ドメイン]]をモデリングし、その後でチューニングや最適化に取り組むのがよい。

## キーワード

- [[single-case-union|単純型]]
- [[discriminated-union|判別共用体]]
- [[pattern-matching|パターンマッチ]]
- [[type-alias|型エイリアス]]
- [[domain|ドメイン]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
