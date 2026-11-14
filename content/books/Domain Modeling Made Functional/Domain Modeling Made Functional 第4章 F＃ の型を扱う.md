---
title: "Domain Modeling Made Functional 第4章 F# の型を扱う"
description: F# では型の定義と値の構築の書き方が似ており、レコードは分割代入やドット記法で、判別共用体はパターンマッチで値を取り出す
tags: [book-chapter, ddd, fsharp]
date: 2024-07-12
book: "[[Domain Modeling Made Functional]]"
chapter: 4
---

## TL;DR

- [[fsharp|F#]] では、型を定義する書き方と値を構築する書き方がよく似ている。
- レコードは分割代入やドット記法で、判別共用体は[[pattern-matching|パターンマッチ]]で値を取り出す。

## 内容

### レコードの場合

[[record-type|レコード型]]の定義と値の構築は、次のように書く。

```fsharp
type Person = {First:string; Last:string}
let aPerson = {First="Alex"; Last="Adam"}
```

値は分割代入で取り出せる。

```fsharp
let {First=first; Last=last} = aPerson
```

ドット記法でフィールドにアクセスすることもできる。

```fsharp
let first = aPerson.First
let last = aPerson.Last
```

### 選択型（判別共用体）の場合

[[Domain Modeling Made Functional 第4章 型の合成|型の合成]]で見た選択型（[[discriminated-union|判別共用体]]）は、次のように定義する。

```fsharp
type OrderQuantity =
    | UnitQuantity of int
    | KilogramQuantity of float
```

値を構築するときは、ケースラベルのどれかをコンストラクタ関数として使う。

```fsharp
let anOrderQtyInUnits = UnitQuantity 10
let anOrderQtyInKg = KilogramQuantity 2.5
```

値を分解するときは、[[pattern-matching|パターンマッチ]]を使う。

```fsharp
let printQuantity aOrderQty =
    match aOrderQty with
    | UnitQuantity uQty -> printfn "%i units" uQty
    | KilogramQuantity kgQty -> printfn "%g kg" kgQty

printQuantity anOrderQtyInUnits // 10 units
printQuantity anOrderQtyInKg    // 2.5 kg
```

## キーワード

- [[fsharp|F#]]
- [[record-type|レコード型]]
- [[discriminated-union|判別共用体]]
- [[pattern-matching|パターンマッチ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
