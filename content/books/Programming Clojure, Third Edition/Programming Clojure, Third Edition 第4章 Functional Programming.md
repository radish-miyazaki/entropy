---
title: Programming Clojure, Third Edition › Functional Programming
description: 関数型プログラミングの概念と Clojure での 6 つのガイドラインを押さえ、遅延シーケンス、シーケンスライブラリの組み合わせ、相互再帰の解き方、トランスデューサによる即時変換を学ぶ章
tags: [book-chapter, clojure]
date: 2023-08-27
book: "[[Programming Clojure, Third Edition]]"
chapter: 4
---

## TL;DR

- 関数型プログラミングは、純粋関数、永続的データ構造、遅延評価、参照透過性に支えられ、コードを読み書きしやすく、テストしやすく、再利用しやすくする。
- JVM は末尾呼び出し最適化を行えないので、Clojure では直接の再帰を避け、`recur`、遅延シーケンス、`trampoline`、メモ化を使い分ける。既存のシーケンス関数を組み合わせて問題を解くのが最も良い。
- 出力先がコレクションのときは、トランスデューサで中間シーケンスを作らずに即時変換し、外部リソースはエダクションで扱う。

## 内容

[[functional-programming|関数型プログラミング]]の概念と、それを Clojure で実践するためのガイドラインを見たあと、再帰と遅延評価、シーケンスライブラリの組み合わせ、即時変換を扱う。各節のまとめは次のページにある。

- [[Programming Clojure, Third Edition 第4章 関数型プログラミング（FP）の概念]]
- [[Programming Clojure, Third Edition 第4章 怠け者になろう]]
- [[Programming Clojure, Third Edition 第4章 もっと怠け者の勧め]]
- [[Programming Clojure, Third Edition 第4章 再帰ふたたび]]
- [[Programming Clojure, Third Edition 第4章 即時変換（Eager Transformations）]]
- [[Programming Clojure, Third Edition 第4章 def フォームについて]]

## キーワード

- [[functional-programming|関数型プログラミング]]
- [[pure-function|純粋関数]]
- [[immutability|イミュータブル]]
- [[persistent-data-structure|永続的データ構造]]
- [[structural-sharing|構造の共有]]
- [[lazy-evaluation|遅延評価]]
- [[lazy-sequence|遅延シーケンス]]
- [[referential-transparency|参照透過性]]
- [[memoization|メモ化]]
- [[tail-call-optimization|末尾呼び出し最適化]]
- [[mutual-recursion|相互再帰]]
- [[trampoline|トランポリン]]
- [[function-composition|関数合成]]
- [[partial-application|部分適用]]
- [[currying|カリー化]]
- [[transducer|トランスデューサ]]
- [[clojure-transient|トランジエント]]
- [[eduction|エダクション]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
