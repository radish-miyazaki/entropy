---
title: Domain Modeling Made Functional › 関数の型から実装を導く
description: F# で関数を関数型の値として定義し、引数と戻り値の型を関数の型から決める書き方
tags: [book-chapter, ddd, fsharp]
date: 2024-07-30
book: "[[Domain Modeling Made Functional]]"
chapter: 9
---

## TL;DR

- 関数に関数の型を注釈し、`fun` で実装すると、引数と戻り値の型がすべてその型から決まる。

## 内容

[[fsharp|F#]] で、ある関数が特定の関数の型を実装していることを明確にしたいときは、次のように書く。

```fsharp
type MyFunctionSignature = Param1 -> Param2 -> Result

let myFunc: MyFunctionSignature =
  fun param1 param2 ->
    // ...
```

こう書くと、すべての引数と戻り値の型が関数の型によって決まる。[[Domain Modeling Made Functional 第9章 最初のステップの実装]]の `validateOrder` も、この書き方で `ValidateOrder` 型を実装している。

## キーワード

- [[fsharp|F#]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
