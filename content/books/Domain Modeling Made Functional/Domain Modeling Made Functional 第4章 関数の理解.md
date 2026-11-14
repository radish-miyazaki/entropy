---
title: Domain Modeling Made Functional 第4章 関数の理解
description: 関数を入力と出力を持つブラックボックスとして捉え、F# の型シグネチャと型推論、ジェネリクス型を説明する節
tags: [book-chapter, fp, fsharp]
date: 2024-07-12
book: "[[Domain Modeling Made Functional]]"
chapter: 4
---

## TL;DR

- 関数は、入力と出力を持つブラックボックスのようなものである。`apple -> banana` のような表記を[[type-signature|型シグネチャ]]（関数シグネチャ）と呼ぶ。
- [[fsharp|F#]] では[[type-inference|型推論]]が効くので、型を明示的に書く必要はほとんどない。

## 内容

### 型シグネチャ

関数は、入力と出力を持つブラックボックスのようなものである。リンゴを受け取ってバナナを返す関数なら、`apple -> banana` と書く。この表記を[[type-signature|型シグネチャ]]（または関数シグネチャ）と呼ぶ。

```fsharp
let add1 x = x + 1
let add x y = x + y

let squarePlusOne x =
    let square = x * x
    square + 1
```

F# は入力と出力の型を気にするが、[[type-inference|型推論]]が効くので、型を明示的に書く必要はほとんどない。上の例では、`add1` の型シグネチャは `int -> int`、`add` は `int -> int -> int`、`squarePlusOne` は `int -> int` と推論される（[型の推論 - F#](https://learn.microsoft.com/ja-jp/dotnet/fsharp/language-reference/type-inference)）。

### ジェネリクス型

関数がどんな型でも動くときは、F# はそれを[[generics|ジェネリクス]]型として推論する。F# では、`'a` のように先頭にアポストロフィが付いた型がジェネリクス型を表す。

```fsharp
// areEqual : 'a -> 'a -> bool
let areEqual x y =
    (x = y)
```

## キーワード

- [[fsharp|F#]]
- [[type-signature|型シグネチャ]]
- [[type-inference|型推論]]
- [[generics|ジェネリクス]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
