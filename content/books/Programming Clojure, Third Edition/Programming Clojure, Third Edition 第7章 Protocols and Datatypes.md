---
title: Programming Clojure, Third Edition 第7章 Protocols and Datatypes
description: Java のインタフェースやクラスを書かずに、プロトコルとデータ型（deftype、defrecord、reify）で抽象化と実装を行い、既存の型にも抽象化を後付けする章
tags: [book-chapter, clojure]
date: 2023-09-11
book: "[[Programming Clojure, Third Edition]]"
chapter: 7
---

## TL;DR

- [[clojure|Clojure]] はプロトコル（Protocols）とデータ型（Datatypes）で、Java のインタフェースやクラスを書かずに抽象化と実装を実現する。
- プロトコルはインタフェースと違い、既にある型に元のコードを触らずに後付けできるので、Expression Problem を回避できる。
- データ型は `deftype`、マップとして扱える `defrecord`、無名の `reify` で作る。

## 内容

Clojure では、プロトコルがインタフェースの代わりに多重メソッドディスパッチを可能にし、データ型がクラスの代わりにプロトコルやインタフェースによる抽象化を実装する。新しい抽象化を定義してそれを実装する新しいデータ型を書くことも、既にあるデータ型に新しい抽象化を後付けすることもできる。各節のまとめは次のページにある。

- [[Programming Clojure, Third Edition 第7章 抽象化へ向けたプログラミング]]
- [[Programming Clojure, Third Edition 第7章 インタフェース]]
- [[Programming Clojure, Third Edition 第7章 プロトコル]]
- [[Programming Clojure, Third Edition 第7章 データ型]]
- [[Programming Clojure, Third Edition 第7章 レコード]]
- [[Programming Clojure, Third Edition 第7章 reify]]

## キーワード

- [[clojure|Clojure]]
- [[abstraction|抽象化]]
- [[interface|インタフェース]]
- [[protocol-clojure|プロトコル]]
- [[expression-problem|Expression Problem]]
- [[record-clojure|レコード]]
- [[polymorphism|ポリモーフィズム]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
