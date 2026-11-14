---
title: 関数合成
aliases: []
description: ある関数の出力を次の関数の入力につないで、単純な関数からより複雑な関数を組み立てること
tags: [word, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

ある関数の出力を次の関数の入力につないで、単純な関数からより複雑な関数を組み立てること。数学では、写像 f と g から (g∘f)(x) = g(f(x)) で定める合成写像にあたる。

## なぜ必要か

[[Domain Modeling Made Functional 第8章 関数合成|Domain Modeling Made Functional]] によると、合成すると、関数が小さな関数からできていることや、小さな関数が何を扱っていたかを隠せる。基本的な関数を合成してサービスを、サービスを合成して[[workflow|ワークフロー]]を作り、最終的にアプリケーション全体を組み立てられる。オブジェクト指向では継承や Decorator パターンでコードを再利用するが、[[functional-programming|関数型プログラミング]]では関数を合成して再利用する。

## 仕組み

数学の合成は結合的なので、h∘(g∘f) = (h∘g)∘f が成り立つ。一方、一般に g∘f と f∘g は等しくない。記号では g∘f と書くが、先に適用するのは f である。

プログラミング言語の中には、合成のための演算子を持つものがある。[[haskell|Haskell]] では `foo = f . g` が「g の後に f」を意味する。Ruby 2.6 では `<<` と `>>` が入った。

## 例

[[fsharp|F#]] では、パイプ演算子 `|>` でつなげる。

```fsharp
let add1 x = x + 1
let square x = x * x
let add1ThenSquare x =
    x |> add1 |> square

add1ThenSquare 5 // 36
```

## 注意点

一方の関数の出力の型が、もう一方の関数の入力の型と合わないことがある。Domain Modeling Made Functional では、`int` と `Option<int>` のような場合、両方の型を含む「最小」の型にそろえてから合成するとしている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[higher-order-function|高階関数]]
- [[functor|ファンクタ]]
- [[monad|モナド]]

## 出典

- [[Domain Modeling Made Functional 第8章 関数合成]]
- [関数の合成 - Wikipedia](https://ja.wikipedia.org/wiki/関数の合成)
- [Function composition (computer science) - Wikipedia](<https://en.wikipedia.org/wiki/Function_composition_(computer_science)>)
- [[Domain Modeling Made Functional 第8章 関数型プログラミングとは何かを理解する]]
