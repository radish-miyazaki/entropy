---
title: Domain Modeling Made Functional 第6章 単純な値の完全性
description: 単純型の制約はコンストラクタをプライベートにし、検証してから値を返す関数（スマートコンストラクタ）で守る
tags: [book-chapter, ddd, fsharp]
date: 2024-07-19
book: "[[Domain Modeling Made Functional]]"
chapter: 6
---

## TL;DR

- [[single-case-union|単純型]]にも、桁数や範囲のような制約がある。
- コンストラクタをプライベートにし、無効な値ならエラーを返す関数を用意して、不正な値を作れないようにする（[[smart-constructor|スマートコンストラクタ]]）。

## 内容

### 単純型の制約

単純型にも制約はある。次の例では、制約をコメントで書いている。

```fsharp
type WidgetCode = WidgetCode of string // 先頭が "W" + 数字 4 桁
type UnitQuantity = UnitQuantity of int // 1 以上 1000 以下
type KilogramQuantity = KilogramQuantity of float // 0.05 以上 100.00 以下
```

しかし本当は、制約を満たさない値をそもそも作れないようにしたい。

### スマートコンストラクタ

[[fsharp|F#]] では、コンストラクタをプライベートにして別の関数を用意し、無効な値ならエラーを返すようにする。この方法を[[smart-constructor|スマートコンストラクタ]]と呼ぶ。エラーは [[result-type|Result]] で返す。

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

    // ラップされたデータを取り出す関数
    let value (UnitQuantity qty) = qty
```

使うときは次のようになる。

```fsharp
let unitQtyResult = UnitQuantity.create 1

match unitQtyResult with
| Error msg -> printfn "Failure, Message is %s" msg
| Ok uQty ->
    printfn "Success. Value is %A" uQty
    let innerValue = UnitQuantity.value uQty
    printfn "innerValue is %i" innerValue
```

## キーワード

- [[single-case-union|単純型]]
- [[smart-constructor|スマートコンストラクタ]]
- [[result-type|Result 型]]
- [[integrity|完全性]]

## 自分の理解

スマートコンストラクタは、F# 以外の言語でも再現できる。Dart での例は [naoty さんの記事](https://naoty.dev/posts/496)を参照。
