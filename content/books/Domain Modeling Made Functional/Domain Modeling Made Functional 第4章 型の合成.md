---
title: Domain Modeling Made Functional › 型の合成
description: F# では AND 型（レコード型）と OR 型（判別共用体）を組み合わせて、小さな型から新しい型を作る
tags: [book-chapter, ddd, fsharp]
date: 2024-07-12
book: "[[Domain Modeling Made Functional]]"
chapter: 4
---

## TL;DR

- [[functional-programming|関数型プログラミング]]では、小さな型を合成して新しい型を作る。
- [[fsharp|F#]] には、AND 型（[[record-type|レコード型]]）と OR 型（[[discriminated-union|判別共用体]]）の 2 つの合成方法がある。

## 内容

関数型プログラミングでは、小さな関数から新しい関数を作るのと同じように、小さな型から新しい型を作る。この合成の考え方に基づく型システムを[[algebraic-type-system|代数的な型システム]]と呼ぶ。F# では 2 つの方法で型を合成できる。

### AND 型

AND 型は、複数の型をすべて組み合わせた型で、直積型とも呼ばれる。F# では[[record-type|レコード型]]で表す。

```fsharp
type FruitSalad = {
    Apple: AppleVariety
    Banana: BananaVariety
    Cherries: CherryVariety
}
```

### OR 型

OR 型は、複数の型のうちどれか 1 つを取る型で、直和型や選択型とも呼ばれる。F# では[[discriminated-union|判別共用体]]で表す。

```fsharp
type FruitSnack =
    | Apple of AppleVariety
    | Banana of BananaVariety
    | Cherries of CherryVariety
```

選択肢が 1 つしかない選択型も定義できる。これを[[single-case-union|単純型]]と呼び、プリミティブな値を内部に持つラッパー型を定義するのに使う。[[value-object|値オブジェクト]]を表すときに役立つ。

```fsharp
type ProductCode =
    | ProductCode of string

// 1 行でも書ける
type ProductCode = ProductCode of string
```

## キーワード

- [[functional-programming|関数型プログラミング]]
- [[fsharp|F#]]
- [[algebraic-type-system|代数的な型システム]]
- [[algebraic-data-type|代数的データ型]]
- [[record-type|レコード型]]
- [[discriminated-union|判別共用体]]
- [[single-case-union|単純型]]
- [[value-object|値オブジェクト]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
