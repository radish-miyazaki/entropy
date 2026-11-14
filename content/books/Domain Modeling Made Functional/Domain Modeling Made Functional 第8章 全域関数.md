---
title: Domain Modeling Made Functional 第8章 全域関数
description: 関数を全域関数として設計すると、すべてのエフェクトを型シグネチャで文書化できる
tags: [book-chapter]
date: 2024-07-26
book: "[[Domain Modeling Made Functional]]"
chapter: 8
---

## TL;DR

- 関数を[[total-function|全域関数]]として設計すると、すべてのエフェクトを型シグネチャで文書化できる。
- 全域関数とは、取りうる各入力にそれぞれ 1 つの出力が対応する関数である。例外を投げるとそうならないので、入力を制限するか `Option` 型を使う。

## 内容

[[Domain Modeling Made Functional 第8章 Understanding Functions|Understanding Functions]] の一節である。

数学の関数は、取りうる各入力にそれぞれ 1 つの出力が対応するものである。これを全域関数と呼ぶ。[[functional-programming|関数型プログラミング]]でも同じように関数を設計するのがよい。そうすると、すべてのエフェクトを型シグネチャで文書化できる。

### 例外を投げる関数は全域関数ではない

12 を入力値で割った結果を返す関数を考える。

```fsharp
let twelveDivideBy n =
    match n with
    | 6 -> 2
    | 5 -> 2
    | 4 -> 3
    | 3 -> 4
    | 2 -> 6
    | 1 -> 12
    | 0 -> ???
```

0 が渡されたときに例外を投げることにすると、シグネチャは `twelveDivideBy : int -> int` になる。

```fsharp
let twelveDivideBy n =
    match n with
    | 6 -> 2
    ...
    | 0 -> failwith "Can't divide by zero"
```

このシグネチャを見ると、`int` を渡せば必ず `int` が返るように思える。しかし実際は例外が起きる可能性があるので、`int` が返るとは限らない。つまり全域関数ではない。

### 全域関数にする方法

シグネチャが明示的になるように、全域関数にしたい。方法は 2 つある。

1 つ目は、入力を制限して不正な値を排除する方法である。0 は入力になりえないので、処理する必要がない（[[Domain Modeling Made Functional 第6章 ビジネスルールを型システムで表現する|ビジネスルールを型システムで表現する]]）。値の作成には[[smart-constructor|スマートコンストラクタ]]を使う。

```fsharp
type NonZeroInteger =
    // ゼロではない整数になるように定義
    private NonZeroInteger of int

let twelveDivideBy n =
    match n with
    | 6 -> 2
    ...
    // 0 は入力になり得ないので処理する必要がない
```

2 つ目は、出力を広げる方法である。`Option` 型を使い、シグネチャを `twelveDivideBy : int -> int option` にする。

```fsharp
let twelveDivideBy n =
    match n with
    | 6 -> Some 2
    ...
    | 0 -> None
```

## キーワード

- [[total-function|全域関数]]
- [[functional-programming|関数型プログラミング]]
- [[smart-constructor|スマートコンストラクタ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
