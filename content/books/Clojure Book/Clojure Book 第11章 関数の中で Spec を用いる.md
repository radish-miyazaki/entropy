---
title: Clojure Book › 関数の中で Spec を用いる
description: "関数の事前条件（:pre）や事後条件（:post）に Spec を使い、渡されたデータの整合性をチェックする"
tags: [book-chapter, clojure]
date: 2023-08-18
book: "[[Clojure Book]]"
chapter: 11
---

## TL;DR

- Clojure ではオブジェクトの代わりにベクタやマップなどのシンプルなデータ型を関数に渡すことが多いので、関数の中でデータの整合性をチェックする必要がある。
- 事前条件（`:pre`）や事後条件（`:post`）に Spec を使う。

## 内容

Clojure では一般に、オブジェクトを関数に渡す代わりに、**ベクタやマップ、集合などのシンプルなデータ型を渡すことが好まれる**。そのため、関数の中でデータの整合性をチェックする必要があり、そこで Spec がとても役に立つ。具体的には、事前条件（`:pre`）や事後条件（`:post`）として Spec を使う。

```clojure
(defn add-two-numbers [a b]
  {:pre [{s/valid? number? a
          s/valid? number? b}]}
  (+ a b))

(add-two-numbers 1 2) ; 3

(add-two-numbers 3 "5")
;; java.lang.ClassCastException:
;;   class java.lang.String cannot be cast to class java.lang.Number
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-spec|Spec]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
