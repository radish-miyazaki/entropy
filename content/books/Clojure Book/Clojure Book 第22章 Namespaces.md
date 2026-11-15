---
title: Clojure Book 第22章 Namespaces
description: ns で名前空間を定義し、同じ名前の変数を文脈ごとに分ける。別の名前空間の値には 名前空間/変数名 でアクセスする
tags: [book-chapter, clojure]
date: 2023-08-21
book: "[[Clojure Book]]"
chapter: 22
---

## TL;DR

- [[clojure|Clojure]] では `ns` で[[namespace|名前空間]]を定義し、同じ単語でも文脈によって意味が違うものを区別する。
- ファイル内で次の `ns` が出てくるまでがその名前空間で、別の名前空間の値には `名前空間/変数名` でアクセスする。

## 内容

_book_ のように、同じ単語でも文脈によって意味が異なる単語がある。この種の違いをコードで区別するために、Clojure は**名前空間**（_namespace_）という機能を提供している。

名前空間は `ns` で定義する。

```clojure
(ns lawyer)
(def about-me "I never speak a truth.")

(ns politician)
(def about-me "I look the nation.")

(ns engineer)
(def about-me "I apply science.")

(println lawyer/about-me)
(println politician/about-me)
(println about-me)

(ns politician)
(println about-me)
```

これを実行すると、以下のように出力される。

```clojure
;; I never speak a truth.
;; I look the nation.
;; I apply science.
;; I look the nation.
```

このコードのように、ファイル内で次の `ns` が出てくるまでが、指定した名前空間になる。

```clojure
(ns lawyer)     ; ここから lawyer 名前空間
(def about-me "I never speak a truth.")

(ns politician) ; ここから politician 名前空間
(def about-me "I look the nation.")

(ns engineer)   ; ここから engineer 名前空間
(def about-me "I apply science.")
```

前に定義した名前空間に、もう一度入ることもできる。

```clojure
(ns politician)
(def about-me "I look the nation.")

(ns engineer)
;; ...

(ns politician)    ; ここから politician 名前空間
(println about-me) ; politician/about-me が呼ばれる
;; "I look the nation."
```

別の名前空間の値にアクセスするには、`名前空間/変数名` のように書く必要がある。

```clojure
(println lawyer/about-me)
(println politician/about-me)
```

## キーワード

- [[clojure|Clojure]]
- [[namespace|名前空間]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
