---
title: デザインパターン
aliases: []
description: 設計上のよくある問題に対する、名前の付いた標準的な解決策。価値は名前による相互理解にある
tags: [word, 設計]
date: 2024-07-21
---

## TL;DR

設計でよく出会う問題に対する、名前の付いた標準的な解決策。重要なのはコードではなく、その意図である。

## なぜ必要か

Uncle Bob は『Functional Design: Principles, Patterns, and Practices』で、デザインパターンの価値を次のように述べている。

> デザインパターンの価値は、名前と解決策が標準的であり、それを知っている人たちが名前を見ただけで相互理解できる点である。

## 注意点

[[abstraction|抽象化]]と同じく、パターンがなぜそうなっているのか（Why）を大事にする必要がある。

デザインパターンには、[[object-oriented-programming|オブジェクト指向プログラミング]]の制約を回避するために生まれた面もある。ただし、Uncle Bob によれば、すべてのパターンがそうではなく、そのようなパターンであっても[[functional-programming|関数型プログラミング]]に適用できる一般的な形を持っていることがある。

## 自分の理解

デザインパターンを関数型プログラミングにまで適用する価値は、十分にあると考えている。パターンの理解を深めるために、静的型付けのオブジェクト指向言語（[[kotlin|Kotlin]]、[[scala|Scala]]）、動的型付けのオブジェクト指向言語（[[python|Python]]）、静的型付けの関数型言語（[[ocaml|OCaml]]、[[fsharp|F#]]）、動的型付けの関数型言語（[[clojure|Clojure]]）でサンプルコードを書いてみたい。

## 関連

- [[abstraction|抽象化]]
- [[repository-pattern|リポジトリパターン]]
- [[newtype-pattern|Newtype パターン]]

## 出典

- Robert C. Martin『Functional Design: Principles, Patterns, and Practices』
