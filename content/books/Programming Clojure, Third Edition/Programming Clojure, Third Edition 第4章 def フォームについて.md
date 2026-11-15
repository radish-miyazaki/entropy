---
title: Programming Clojure, Third Edition 第4章 def フォームについて
description: defn や defmacro など var を作る def フォームはすべて def をラップするマクロであり、defonce と defn- のような変種もある
tags: [book-chapter, clojure]
date: 2023-08-27
book: "[[Programming Clojure, Third Edition]]"
chapter: 4
---

## TL;DR

- `defn`、`defmacro`、`defmulti` など、var を作る def フォームは、すべて `def` をラップするマクロである。
- `defonce` は var に初期値が設定されていないときだけ設定し、`defn-` は名前空間の中からだけ参照できるプライベートな束縛を作る。

## 内容

`defn` や `defmacro`、`defmulti` など、[[clojure-var|var]] を作るための様々な種類の def フォームがある。これらはすべて、`def` をラップするマクロである。

`defonce` は、var に初期値が設定されていないときに限り設定する。

```clojure
(defonce a-symbol initial-value?)
```

`defn-` は `defn` と同じように動作するが、定義された名前空間の中からだけ参照できる**プライベートな束縛**を作る。

```clojure
(defn- name & args-as-for-defn)
```

このほかにも、プライベートな束縛を作る `-` の付いたバージョンが用意されている。

## キーワード

- [[clojure-var|var]]
- [[macro|マクロ]]
- [[namespace|名前空間]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
