---
title: Programming Clojure, Third Edition › 同一実体と値
description: 状態は同一実体のある時点での値であり、Clojure はほぼすべてを値として扱い、同一実体を ref、atom、agent、var の 4 つの参照型で表す
tags: [book-chapter, clojure]
date: 2023-09-05
book: "[[Programming Clojure, Third Edition]]"
chapter: 6
---

## TL;DR

- 状態とはある時点での同一実体（identity）の値である。値はイミュータブルな永続的データ構造を指す。
- [[clojure|Clojure]] はほぼすべてのものを値として扱い、同一実体を表すために ref、atom、agent、var の 4 つの参照型を用意している。

## 内容

### 同一実体と値について

状態とはある時点での**同一実体**（identity）の**値**である。値とはイミュータブルな[[persistent-data-structure|永続的データ構造]]を指す。

時間の経過は話をややこしくする。たとえば、今年と去年、1985 年の阪神タイガースの選手表は、値が時間経過とともに変わる、同一実体のひとつである。

**同一実体を更新しても、既に存在する値には影響を与えない。** 先ほどの例で言えば、阪神タイガースが選手全員をトレードしたり、チームそのものが無くなったりしても、過去の阪神タイガースについて考えることに不都合はない。

### Clojure における同一実体と値

Clojure の参照型は同一実体と値を明確に区別する。Clojure にあるほぼすべてのものは値である。しかし、同一実体を表現するために、次の 4 つの参照型を用意している。

- [[clojure-ref|ref]]: 共有状態に対する協調的（coordinated）かつ同期的（synchronous）な変更を管理する
- [[clojure-atom|atom]]: 共有状態に対する非協調的（uncoordinated）かつ同期的な変更を管理する
- [[clojure-agent|agent]]: 共有状態に対する非同期的（asynchronous）な変更を管理する
- [[clojure-var|var]]: スレッドローカルな状態を管理する

並行プログラミングに触れる前に、これらの API が解決しようとしている問題である、ロックを扱うことの複雑さに触れる（[[Programming Clojure, Third Edition 第6章 並行性・並列性・ロック]]）。

## キーワード

- [[immutability|イミュータビリティ]]
- [[persistent-data-structure|永続的データ構造]]
- [[clojure-ref|ref]]
- [[clojure-atom|atom]]
- [[clojure-agent|agent]]
- [[clojure-var|var]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
