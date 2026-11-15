---
title: Clojure Book › 引数を受け取る
description: 引数を 1 つ受け取る関数として、名前を出力する say-hello と円の面積を求める circle-area を定義する節
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] の関数が受け取る引数は、`defn` の関数名の後ろのベクタに書く。

## 内容

先ほどの `say-hello` を、`name` を引数として受け取って出力するように変えると、次のように書ける。

```clojure
(defn say-hello [name]
  (println "Hello" name "!"))

(say-hello "Radish")
```

同じように、円の面積を求める関数も定義する。

```clojure
(defn circle-area [radius]
  (* Math/PI (Math/pow radius 2)))

(circle-area 7) ;; 153.93804002589985
```

この `circle-area` は、次のようにしたほうが読みやすい（**[[refactoring|リファクタリング]]**）。

```clojure
(defn circle-area [radius]
  (* Math/PI radius radius 2))
```

## キーワード

- [[clojure|Clojure]]
- [[refactoring|リファクタリング]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
