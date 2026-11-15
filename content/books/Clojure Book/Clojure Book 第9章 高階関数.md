---
title: Clojure Book › 高階関数
description: 無名関数を使って、関数を返す高階関数を実装する節
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] では、[[anonymous-function|無名関数]]を使って、関数を返す[[higher-order-function|高階関数]]を実装できる。

## 内容

無名関数を使うと、高階関数（関数を返す関数）を実装できる。

```clojure
(defn multiplier [multiply-with]
  (fn [number]
    (* number multiply-with)))

(def double-it
  (multiplier 2))
(double-it 21) ; 42

(def triple-it
  (multiplier 3))
(double-it 14) ; 42
```

## キーワード

- [[clojure|Clojure]]
- [[higher-order-function|高階関数]]
- [[anonymous-function|無名関数]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
