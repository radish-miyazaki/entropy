---
title: Clojure Book › filter
description: filter は渡された述語を満たす要素だけを持つシーケンスを返す
tags: [book-chapter, clojure]
date: 2023-08-19
book: "[[Clojure Book]]"
chapter: 16
---

## TL;DR

- `filter` は、渡された[[predicate|述語]]を満たす要素だけを持つシーケンスを返す。
- [[anonymous-function|無名関数]]や自作した関数も渡せる。

## 内容

`filter` は、渡された述語を満たす要素だけを持つシーケンスを返す。

```clojure
(filter odd? (range 1 11))  ; (1 3 5 7 9)
(filter even? (range 1 11)) ; (2 4 6 8 10)
```

`map` と同じく、無名関数も渡せる。

```clojure
(filter (fn [x] (> x 5)) (range 1 11))  ; (6 7 8 9 10)
(filter #(> % 5) (range 1 11))          ; (6 7 8 9 10)
```

自作した関数も渡せる。

```clojure
(defn greater-than-five? [x]
  (> x 5))
(filter greater-than-five? (range 1 11)) ; (6 7 8 9 10)
```

## キーワード

- [[clojure-sequence|シーケンス]]
- [[predicate|述語]]
- [[anonymous-function|無名関数]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
