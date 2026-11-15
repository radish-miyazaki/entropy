---
title: Clojure Book 第9章 無名関数
description: fn で名前のない関数を定義する方法と、defn が def と fn を組み合わせたシンタックスシュガーであることを扱う節
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] では、`fn` で名前のない関数（[[anonymous-function|無名関数]]）を定義できる。
- `defn` は、`def` で定義した変数に `fn` で作った関数を束縛するシンタックスシュガーである。

## 内容

`fn` を使うと、名前を持たない関数を定義できる。

```clojure
(def print-something
  (fn [something]
    (println something)))
(print-something "something is better than nothing")
;; something is better than nothing
```

上のコードは `something` という引数を 1 つ受け取る**関数を `print-something` という変数に束縛**している。

関数の定義に使う `defn` は、**`def` で定義した変数に関数 `fn` を束縛したもののシンタックスシュガー**である。したがって、先ほどのコードは次と等しい。

```clojure
(defn print-something [something]
	(println something))
```

## キーワード

- [[clojure|Clojure]]
- [[anonymous-function|無名関数]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
