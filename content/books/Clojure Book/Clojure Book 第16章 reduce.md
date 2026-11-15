---
title: Clojure Book › reduce
description: reduce は渡された関数を使ってシーケンスを 1 つの値にまとめる
tags: [book-chapter, clojure]
date: 2023-08-19
book: "[[Clojure Book]]"
chapter: 16
---

## TL;DR

- `reduce` は、渡された関数を使ってシーケンスを 1 つの値やオブジェクトにまとめる。

## 内容

`reduce` は、渡された関数を使ってシーケンスを 1 つの値やオブジェクトにまとめる関数である。

```clojure
(reduce + [1 2 3 4]) ; 10
```

次の関数を定義して、

```clojure
(defn add [a b]
  (+ a b))
```

次のように `reduce` に渡すと、

```clojure
(reduce add [1 2 3 4])
```

内部では次のようなコードが作られる。

```clojure
(add 4 (add 3 (add 2 (add 1))))
```

次はシーケンスのすべての値を掛け合わせる式である。

```clojure
(defn multiply [a b]
  (* a b))
(reduce multiply [1 2 3 4]) ; 24
```

## キーワード

- [[clojure-sequence|シーケンス]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
