---
title: Clojure Book › map
description: map はシーケンスの各要素に関数を適用し、複数の引数を取る関数には引数の数だけシーケンスを渡す
tags: [book-chapter, clojure]
date: 2023-08-19
book: "[[Clojure Book]]"
chapter: 16
---

## TL;DR

- `map` は、シーケンスの各要素に関数を適用した結果のシーケンスを返す。
- [[anonymous-function|無名関数]]や自作した関数も渡せる。2 つ以上の引数を取る関数には、引数の数だけシーケンスを渡す。

## 内容

次は引数を 1 つだけ受け取る関数を各要素に順に適用する例である。

```clojure
(map inc [1 2 3]) ; (2 3 4)
```

無名関数も受け取れる。

```clojure
(map (fn [x] (+ x 1)) [1 2 3]) ; (2 3 4)
```

無名関数は `#(…)` という簡略記法でも書ける。`%` は引数を表す。

```clojure
(map #(+ % 1) [1 2 3]) ; (2 3 4)
```

**2 つ以上の引数を取る関数**も受け取れる。この場合、引数の数だけシーケンスを渡す。

```clojure
(map (fn [x y]
       (+ (Math/pow x 2)
          (Math/pow y 2))) [1 2 3] [2 3 4])
; (5.0 13.0 25.0)
```

自作した関数も渡せる。

```clojure
(defn double-it [x]
	(* x 2))
(defn sum-of-squares [x y]
	(+ (Math/pow x 2)
		 (Math/pow y 2)))
```

```clojure
(map double-it [1 2 3])              ; (2 4 6)
(map sum-of-squares [1 2 3] [2 3 4]) ; (5.0 13.0 25.0)
```

## キーワード

- [[clojure-sequence|シーケンス]]
- [[anonymous-function|無名関数]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
