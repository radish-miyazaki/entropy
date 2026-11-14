---
title: シーケンス
aliases: []
description: Clojure で多くのデータ構造の要素を順に扱うための、論理的なリストの抽象
tags: [word, clojure]
date: 2026-11-14
---

## TL;DR

[[clojure|Clojure]] で、多くのデータ構造の要素を順に扱うための抽象。公式リファレンスでは「論理的なリスト」と説明されている。

## なぜ必要か

Clojure は `ISeq` インタフェースを使い、さまざまなデータ構造がその要素をシーケンスとして提供できるようにしている。そのため、シーケンスを扱う関数のライブラリを、さまざまなデータ構造に共通して使える。多くの関数はコレクションを受け取り、そのシーケンスに対して動く。

## 仕組み

シーケンスの基本は次の 3 つの操作である。

- `first`: コレクションの最初の要素を返す
- `rest`: 最初の要素より後ろの要素のシーケンスを返す。要素がなければ、`seq` が `nil` を返す論理的なシーケンスを返す
- `cons`: 要素を先頭に、シーケンスを残りにした新しいシーケンスを返す

シーケンスのライブラリの関数の多くは遅延評価で、シーケンスを返す関数は、消費されるにつれて少しずつ要素を作る。

## 例

[[めだかのclojure.core学校 第1章 clojure.core のコレクションに関する var|めだかのclojure.core学校]] によると、シーケンスが空でないかを確かめるには、`(not (empty? x))` より `seq` を使うほうがよい。`seq` は空のシーケンスには `nil` を返し、そうでなければシーケンスを返す。`empty?` は `(not (seq coll))` で実装されているので、`(not (empty? x))` と書くと `not` を 2 回通ることになる。

```clojure
(seq [])      ;; => nil
(seq [1 2 3]) ;; => (1 2 3)
```

## 注意点

シーケンスはイテレータと違い、永続的で不変である。コレクションの中を指す状態付きのカーソルではない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]
- [[clojure-var|Var]]

## 出典

- [Sequences - Clojure](https://clojure.org/reference/sequences)
- [[めだかのclojure.core学校 第1章 clojure.core のコレクションに関する var|めだかのclojure.core学校 第1章 clojure.core のコレクションに関する var]]
- [[めだかのclojure.core学校 第1章 clojure.core のリストに関する var|めだかのclojure.core学校 第1章 clojure.core のリストに関する var]]
