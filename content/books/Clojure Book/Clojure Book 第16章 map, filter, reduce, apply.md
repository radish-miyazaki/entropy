---
title: Clojure Book 第16章 map, filter, reduce, apply
description: シーケンスの各要素に関数を適用する map、述語で絞り込む filter、1 つの値にまとめる reduce、シーケンスを引数として渡す apply の使い方を扱う章
tags: [book-chapter, clojure]
date: 2023-08-19
book: "[[Clojure Book]]"
chapter: 16
---

## TL;DR

- `map` はシーケンスの各要素に関数を適用し、`filter` は[[predicate|述語]]を満たす要素だけを残し、`reduce` はシーケンスを 1 つの値にまとめる。
- `apply` は、受け取ったシーケンスを関数の引数として渡す。
- どの関数にも組み込みの関数、[[anonymous-function|無名関数]]、自作した関数を渡せる。

## 内容

シーケンスに使う `map`、`filter`、`reduce`、`apply` の 4 つの関数を扱う。どの関数にも組み込みの関数、無名関数、自作した関数を渡せる。各節のまとめは次のページにある。

- [[Clojure Book 第16章 map]]
- [[Clojure Book 第16章 filter]]
- [[Clojure Book 第16章 reduce]]
- [[Clojure Book 第16章 apply]]

## キーワード

- [[clojure|Clojure]]
- [[clojure-sequence|シーケンス]]
- [[anonymous-function|無名関数]]
- [[predicate|述語]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
