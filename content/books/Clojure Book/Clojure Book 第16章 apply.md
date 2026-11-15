---
title: Clojure Book 第16章 apply
description: apply は第 1 引数の関数に、第 2 引数のシーケンスの要素を引数として渡す
tags: [book-chapter, clojure]
date: 2023-08-19
book: "[[Clojure Book]]"
chapter: 16
---

## TL;DR

- `apply` は、第 1 引数で受け取った関数に、第 2 引数で受け取ったシーケンスを引数として渡す。
- `(+ [1 2 3 4])` は例外を投げるが、`(apply + [1 2 3 4])` は `(+ 1 2 3 4)` に置き換わる。

## 内容

`apply` は、第 1 引数で受け取った関数に、第 2 引数で受け取ったシーケンスを引数として渡す。

たとえば、`+` 関数は複数の数値を受け取れる。

```clojure
(+ 1 2 3 4) ; 10
```

しかし、シーケンスを渡すと例外を投げる。

```clojure
(+ [1 2 3 4])
; java.lang.ClassCastException:
;   Cannot cast clojure.lang.PersistentVector to java.lang.Number
```

`apply` を使うと、この問題を解決できる。

```clojure
(apply + [1 2 3 4]) ; 10
```

`apply` を使うと、上のコードは次のように置き換わる。

```clojure
(+ 1 2 3 4)
```

シーケンスはベクタに限らず、リストや集合でもよい。

```clojure
(apply + '(1 2 3 4)) ; 10
```

自作した関数にも適用できる。

```clojure
(defn my-function [arg1 arg2]
  (println "Argument 1:" arg1)
  (println "Argument 2:" arg2))
```

```clojure
(my-function "one" "two")
; Argument 1: one
; Argument 2: two

(my-function ["one" "two"])
; clojure.lang.ArityException:
;   Wrong number of args (1) passed to: user/my-function

(apply my-function ["one" "two"])
; Argument 1: one
; Argument 2: two
```

## キーワード

- [[clojure-sequence|シーケンス]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
