---
title: Clojure Book 第20章 Splitting Large Programs
description: load-file 関数で別の Clojure ファイルを読み込み、そこに定義した関数を呼び出す
tags: [book-chapter, clojure]
date: 2023-08-22
book: "[[Clojure Book]]"
chapter: 20
---

## TL;DR

- `load-file` 関数で別の [[clojure|Clojure]] ファイルを読み込むと、そのファイルに定義された関数を呼び出せる。

## 内容

以下のように関数を定義したファイルがあるとする。

```clojure
;; calc_lib.clj
(defn add [a b]
  (+ a b))

(defn sub [a b]
  (- a b))
```

このファイルに定義された関数を呼び出すには、`load-file` 関数を使って以下のように書く。

```clojure
;; calc_ui.clj
(load-file "calc_lib.clj")

(def a 5)
(def b 3)

(println "a + b = " (add a b))
(println "a - b = " (sub a b))
```

これを `clj` で実行する（`$ clj calc_ui.clj`）と、以下のように出力される。

```clojure
;; a + b =  8
;; a - b =  2
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-cli|Clojure CLI]]

## 自分の理解

`load-file` で読み込んだ関数を使うと、Emacs 上でエラーが出る。これを解消するには、おそらくプロジェクトのパスを設定する必要がありそう。
