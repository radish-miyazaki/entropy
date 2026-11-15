---
title: Clojure Book 第9章 複数の引数を受け取る
description: 2 つ以上の引数を受け取る関数と、引数の数によって実行する処理を分けるオーバーロードを扱う節
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] の関数は 2 つ以上の引数を受け取れる。引数の数によって実行する処理を分ける[[function-overloading|オーバーロード]]も書ける。

## 内容

引数は 2 つ以上受け取ることもできる。

```clojure
(defn hypotenuse [a b]
  (Math/sqrt (+ (* a a) (* b b))))

(hypotenuse 3 4) ;; 5.0
```

Clojure では**引数の数によって実行する処理を分ける**（**オーバーロード**）こともできる。

```clojure
(defn multiple-args
  ([arg-1] (println "One argument passed:" arg-1))
  ([arg-1 arg-2] (println "Two arguments passed:" arg-1 arg-2)))

(multiple-args 1)   ; One argument passed: 1
(multiple-args 1 2) ; Two arguments passed: 1 2
```

引数を渡さなかった場合は、例外を投げる。

```clojure
(multiple-args)
;; clojure.lang.ArityException:
;;   Wrong number of args (0) passed to: user/multiple-args
```

## キーワード

- [[clojure|Clojure]]
- [[function-overloading|オーバーロード]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
