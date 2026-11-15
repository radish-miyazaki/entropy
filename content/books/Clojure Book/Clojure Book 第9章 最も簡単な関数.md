---
title: Clojure Book 第9章 最も簡単な関数
description: defn を使って、引数を受け取らずに Hello world! を出力する関数を定義する節
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] の関数は `defn` で定義する。引数を受け取らない関数は、引数のベクタを空の `[]` にする。

## 内容

Hello World という文字列を出力する関数は、**`defn`** を使って次のように定義できる。

```clojure
(defn say-hello []
  (println "Hello world!"))

;; 関数定義
(say-hello)
```

引数を受け取ることもできるが、今回は不要なので何も受け取らない。

```clojure
(defn say-hello []
```

## キーワード

- [[clojure|Clojure]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
