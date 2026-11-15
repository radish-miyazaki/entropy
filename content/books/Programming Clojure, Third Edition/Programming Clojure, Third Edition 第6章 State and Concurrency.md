---
title: Programming Clojure, Third Edition 第6章 State and Concurrency
description: Clojure が同一実体と値を区別し、ref、atom、agent、var の 4 つの参照型で状態と並行性を扱う方法を学ぶ章
tags: [book-chapter, clojure]
date: 2023-09-05
book: "[[Programming Clojure, Third Edition]]"
chapter: 6
---

## TL;DR

- 状態とはある時点での同一実体（identity）の値である。[[clojure|Clojure]] は同一実体と値を明確に区別し、ほぼすべてのものを値として扱う。
- 状態の変更は ref（協調的かつ同期的）、atom（非協調的かつ同期的）、agent（非同期的）、var（スレッドローカル）の 4 つの参照型で管理する。
- ref、atom、agent は、直前の状態を更新関数に渡して新しい状態を得る、統一された更新モデルに従う。

## 内容

ロックを扱う複雑さを避けるために Clojure が用意した 4 つの参照型と、それらに共通する更新モデルを扱う。各節のまとめは次のページにある。

- [[Programming Clojure, Third Edition 第6章 同一実体と値]]
- [[Programming Clojure, Third Edition 第6章 並行性・並列性・ロック]]
- [[Programming Clojure, Third Edition 第6章 ref と STM]]
- [[Programming Clojure, Third Edition 第6章 atom を用いた非協調的かつ同期的な更新]]
- [[Programming Clojure, Third Edition 第6章 agent を用いた非同期的な更新]]
- [[Programming Clojure, Third Edition 第6章 var でスレッドごとの状態を管理]]
- [[Programming Clojure, Third Edition 第6章 Clojure におけるモデルのまとめ]]

## キーワード

- [[clojure|Clojure]]
- [[concurrency|並行性]]
- [[immutability|イミュータビリティ]]
- [[software-transactional-memory|STM]]
- [[clojure-ref|ref]]
- [[clojure-atom|atom]]
- [[clojure-agent|agent]]
- [[clojure-var|var]]
- [[dynamic-scope|ダイナミックスコープ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
