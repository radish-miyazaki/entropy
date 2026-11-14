---
title: ClojureScript Koans で詰まった問題
description: ClojureScript Koans を解いていて詰まった問題と、その答えと考え方のメモ
tags: [blog, clojure, clojurescript]
date: 2025-05-24
draft: false
---

## TL;DR

- [ClojureScript Koans](http://clojurescriptkoans.com/) で詰まった問題を、答えと考え方と一緒に残す。
- 関数を返す関数・関数を受け取る関数の問題と、`count`、`iterate`、キーワードの文字列化で詰まった。

## 背景

[[clojurescript|ClojureScript]] の練習として ClojureScript Koans を解いた。思ったより問題が多い。詰まったときは、[リポジトリ](https://github.com/lazerwalker/clojurescript-koans)や、[[clojure|Clojure]] Koans の[解答例](https://github.com/jainsahab/clojure-koans-solutions)を参考にした。

## 検証

### [functions/7](http://clojurescriptkoans.com/#functions/7)

```clojure
(= 9 (((fn [] _)) 4 5))
```

答えは `+` である。`((fn [] +))` を評価すると `+` そのものが得られるので、それに `4` と `5` を渡すと `9` になる。

### [functions/9](http://clojurescriptkoans.com/#functions/9)

```clojure
(= 25 (_ (fn [n] (* n n))))
```

答えは `(fn [f] (f 5))` である。無名関数を受け取り、それに `5` を渡す関数を考えればよい。

### [higher-order-functions/10](http://clojurescriptkoans.com/#higher-order-functions/10)

```clojure
(= "longest"
   (reduce
     (fn [a b] (if (< _) b a))
     ["which" "is" "the" "longest" "word"]))
```

答えは `(count a) (count b)` である。文字列の長さを取る関数は `length` だと思っていたが、`count` だった。

### [lazy-sequences/7](http://clojurescriptkoans.com/#lazy-sequences/7)

```clojure
(= (repeat 100 :foo)
   (take 100 (iterate _ :foo)))
```

答えは `conj` である。

### [destructuring/1](http://clojurescriptkoans.com/#destructuring/1)

```clojure
(= _ ((fn [[a b]] (str b a)) [:foo :bar]))
```

答えは `":bar:foo"` である。キーワードを `str` で文字列にすると、先頭の `:` も残る。これを知らなかった。

## キーワード

- [[clojurescript|ClojureScript]]
- [[clojure|Clojure]]

## 参考

- http://clojurescriptkoans.com/
- https://github.com/lazerwalker/clojurescript-koans
- https://github.com/jainsahab/clojure-koans-solutions
