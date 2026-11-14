---
title: 型シグネチャ
aliases: []
description: 関数の入力と出力の型を表したもの。F# や Haskell では `int -> int` のように矢印で書く
tags: [word, 型システム, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

関数やメソッドの入力と出力の型を表したもの。関数シグネチャともいう。[[fsharp|F#]] や [[haskell|Haskell]] では、`int -> int` のように入力と出力の型を矢印でつないで書く。

## なぜ必要か

[[Domain Modeling Made Functional]] によると、関数は入力と出力を持つブラックボックスのようなもので、リンゴを受け取ってバナナを返す関数なら `apple -> banana` と書ける。型シグネチャを見れば、関数の中身を読まずに何を受け取り何を返すかが分かる。関数を[[total-function|全域関数]]として設計すると、すべてのエフェクトを型シグネチャで文書化できる。

## 仕組み

Wikipedia によると、型シグネチャは関数の入力と出力を定義し、引数の数、型、順序を含む。Haskell では `関数名 :: 引数1の型 -> 引数2の型 -> ... -> 戻り値の型` と書く。カリー化されているので、最初の引数より後ろの部分全体が戻り値の型になる。`f :: a -> b -> c` なら、`f x` は `b -> c` 型の関数を返す。

関数も型として扱えるので、関数を返す関数の型シグネチャは `someInputType -> (Fruit -> Fruit)` のように書ける。

## 例

Domain Modeling Made Functional の例では、F# の関数の型シグネチャは次のように[[type-inference|推論]]される。

```fsharp
let add1 x = x + 1   // int -> int
let add x y = x + y  // int -> int -> int
```

0 で割ったときに例外を投げる `twelveDivideBy` のシグネチャは `int -> int` だが、`Option` 型を使って `int -> int option` にすると、値が返らない場合があることをシグネチャで表せる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[total-function|全域関数]]
- [[currying|カリー化]]
- [[type-annotation|型アノテーション]]
- [[type-inference|型推論]]

## 出典

- [[Domain Modeling Made Functional 第4章 関数の理解|Domain Modeling Made Functional 第4章 関数の理解]]
- [[Domain Modeling Made Functional 第4章 型と関数|Domain Modeling Made Functional 第4章 型と関数]]
- [Type signature - Wikipedia](https://en.wikipedia.org/wiki/Type_signature)
