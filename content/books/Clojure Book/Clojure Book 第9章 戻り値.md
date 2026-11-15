---
title: Clojure Book 第9章 戻り値
description: Clojure の関数は最後に実行した式の値を返し、それより前の式の結果は捨てられることを扱う節
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] の関数は、最後に実行した式の値を返す。それより前の式の計算結果は捨てられる。

## 内容

Clojure では**最後に実行した式の値を返す**。

```clojure
(defn add [a b]
  (+ a b))
(println (add 2 3)) ;; 5
```

別の例を見る。

```clojure
(defn do-math [a b]
  (* a b)
  (+ a b))
```

次を実行すると 8 が返ってくるが、`(* 5 3)` の計算結果は捨てられる。

```clojure
(do-math 5 3)
```

次のように式の順番を変えると、`15` が返ってきて、`(+ 5 3)` の計算結果が捨てられる。

```clojure
(defn do-math [a b]
  (+ a b)
  (* a b))
(do-math 5 3) ;; 15
```

## キーワード

- [[clojure|Clojure]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
