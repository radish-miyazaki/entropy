---
title: 部分適用
aliases: []
description: 関数の引数の一部を固定して、引数の少ない別の関数を作ること
tags: [word, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

関数の引数の一部を固定して、引数の少ない（アリティの小さい）別の関数を作ること。[[currying|カリー化]]と混同されやすいが、別の概念である。

## なぜ必要か

[[Domain Modeling Made Functional 第8章 ものとしての関数|Domain Modeling Made Functional 第8章]] によると、部分適用は[[workflow|ワークフロー]]の実装で[[dependency-injection|依存性の注入]]を行うときに使われる。サービスを部分適用してワークフローを組み立てれば、残りの引数だけを受け取る関数として扱える。

## 仕組み

Wikipedia によると、部分適用は既存の関数の引数の一部を固定する。一方、カリー化は、複数の引数を取る関数を、1 引数の関数の連なりに変換する。たとえば、`div(x, y) = x / y` の `x` を 1 に固定すると、1 引数の関数 `div1(y) = 1 / y` になる。これは逆数を求める関数と同じである。

## 例

[[fsharp|F#]] の関数はすべてカリー化されているので、複数のパラメータを取る関数に引数を 1 つだけ渡すと、残りのパラメータを受け取る新しい関数が返る。

```fsharp
let sayGreeting greeting name =
    printfn "%s %s" greeting name

let sayHello = sayGreeting "Hello"

sayHello "Alex"
```

[[effect-ts|Effect]] の多くの API は、引数をまとめて渡す書き方と、部分適用する書き方の両方に対応している（[[effect-dual-api|Dual API]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[currying|カリー化]]
- [[higher-order-function|高階関数]]
- [[function-composition|関数合成]]
- [[functional-programming|関数型プログラミング]]

## 出典

- [Partial application - Wikipedia](https://en.wikipedia.org/wiki/Partial_application)
- [[Domain Modeling Made Functional]]
