---
title: めだかのclojure.core学校
aliases: []
description: Clojure の標準ライブラリ clojure.core にある 662 個の Var を分類し、動作例とともに解説する本
tags: [book, clojure]
date: 2024-11-25
book-authors: []
publisher:
isbn:
---

## TL;DR

- [[clojure|Clojure]] の標準ライブラリである [clojure.core](https://clojuredocs.org/clojure.core) にある 662 個の [[clojure-var|Var]] を分類し、動作例とともに解説する本である。
- clojure.core はすべての[[namespace|名前空間]]に自動で読み込まれる。そのため、clojure.core で何が提供されているかを理解することが、Clojure に慣れる第一歩だという立場で書かれている。

## 対象読者

Clojure をこれから身につけたい人向けの本である。Clojure では、データ構造ごとに操作を定義するのではなく、データ構造と操作を独立して定義する。序章では、この考え方を Alan J. Perlis の次の言葉で説明している。

> It is better to have 100 functions operate on one data structure than to have 10 functions operate on 10 data structures.

clojure.core に関数が多いのはこのためで、それらを分類して一通り知っておくと Clojure のコードが読みやすくなる。

## 目次

1. [[めだかのclojure.core学校 第1章 Data Structure|第1章 Data Structure]]
   - [[めだかのclojure.core学校 第1章 clojure.core の数値に関する var|clojure.core の数値に関する var]]
   - [[めだかのclojure.core学校 第1章 clojure.core の識別子に関する var|clojure.core の識別子に関する var]]
   - [[めだかのclojure.core学校 第1章 clojure.core の nil と真偽値に関する var|clojure.core の nil と真偽値に関する var]]
   - [[めだかのclojure.core学校 第1章 clojure.core の文字に関する var|clojure.core の文字に関する var]]
   - [[めだかのclojure.core学校 第1章 clojure.core のコレクションに関する var|clojure.core のコレクションに関する var]]
   - [[めだかのclojure.core学校 第1章 clojure.core のリストに関する var|clojure.core のリストに関する var]]
   - [[めだかのclojure.core学校 第1章 clojure.core のベクタに関する var|clojure.core のベクタに関する var]]
   - [[めだかのclojure.core学校 第1章 clojure.core のセットに関する var|clojure.core のセットに関する var]]
   - [[めだかのclojure.core学校 第1章 clojure.core のマップに関する var|clojure.core のマップに関する var]]
2. Functions
3. Abstractions
4. States
5. Concurrency
6. Clojure
7. References

## 感想

[[Programming Clojure, Third Edition]] を読んでいろいろ触って以降、Clojure から離れていたので、また触るきっかけを作るために購入した。

## 関連

- [[clojure|Clojure]]
- [[Programming Clojure, Third Edition]]
- [技術書典の頒布ページ](https://techbookfest.org/product/f7rPGt7NeeDuqxYdE3Teyc?productVariantID=hATFZbCg6sJxMt5dCXPn4x)
