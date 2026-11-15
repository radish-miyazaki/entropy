---
title: Programming Clojure, Third Edition › Unifying Data with Sequences
description: Clojure があらゆるデータ構造をシーケンスという単一の抽象で扱うことと、シーケンスライブラリ、遅延シーケンス、Java のシーカブル、構造に特化した関数を見る章
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 3
---

## TL;DR

- [[clojure|Clojure]] は、リスト、ベクタ、マップ、集合から Java のコレクション、正規表現、ファイル、XML まで、あらゆるデータ構造をシーケンスという単一の抽象で扱う。
- シーカブルなデータなら何でも扱えるシーケンスライブラリが、命令型言語でループが必要な場面の多くを置き換える。シーケンスの多くは遅延評価され、不変である。
- 性能が必要な場面のために、リスト、ベクタ、マップ、集合に特化した関数も用意されている。

## 内容

Clojure はプログラムに何度も現れるデータ構造をシーケンスという単一の抽象で扱う。この章では、シーカブルなコレクションと、それらを扱うシーケンスライブラリを見ていく。各節のまとめは次のページにある。

- [[Programming Clojure, Third Edition 第3章 シーケンスとシーカブル]]
- [[Programming Clojure, Third Edition 第3章 すべてはシーケンスである]]
- [[Programming Clojure, Third Edition 第3章 シーケンスライブラリを活用する]]
- [[Programming Clojure, Third Edition 第3章 遅延シーケンスと無限シーケンス]]
- [[Programming Clojure, Third Edition 第3章 Java をシーカブルとして扱う]]
- [[Programming Clojure, Third Edition 第3章 特定の構造に特化した関数]]

## キーワード

- [[clojure-sequence|シーケンス]]
- [[lazy-sequence|遅延シーケンス]]
- [[lazy-evaluation|遅延評価]]
- [[eager-evaluation|正格評価]]
- [[immutability|不変性]]
- [[list-comprehension|シーケンス内包表記]]
- [[predicate|述語]]
- [[regular-expression|正規表現]]
- [[relational-algebra|関係演算]]
- [[lisp|Lisp]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
