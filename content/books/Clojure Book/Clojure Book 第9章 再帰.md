---
title: Clojure Book › 再帰
description: 関数名で自分自身を呼ぶ再帰と recur を使う再帰、末尾再帰の制約、デフォルト引数の代わりにラッパー関数を作る方法を扱う節
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 9
---

## TL;DR

- [[clojure|Clojure]] の[[recursion|再帰]]では、関数名の代わりに `recur` を使うとメモリ効率が良くなる。`recur` は関数内で最後に実行する式（[[tail-recursion|末尾再帰]]）でなければならない。
- Clojure にはデフォルト引数がないので、初期値を渡すラッパー関数を作る。

## 内容

次のような、カウントダウンする関数を考える。

```clojure
(defn count-down [number]
  (println number)
  (if (pos? (dec number))
    (count-down (dec number))))

(count-down 5) ; nil
;; 5
;; 4
;; 3
;; 2
;; 1
```

上のように関数名を指定する代わりに、**`recur`** を使うこともできる。

```clojure
(defn count-down [number]
  (println number)
  (if (pos? (dec number))
    (recur (dec number))))
```

`recur` を使うと、[最適化により**メモリ効率**が良くなる](https://clojurebridgelondon.github.io/community-docs/docs/clojure/recur/)。また、`recur` は**関数内で最後に実行すべき文（末尾再帰）である必要**がある。

次は渡された整数のシーケンスの合計を計算する関数である。

```clojure
(defn sum [numbers total]
  (if (empty? numbers)
    total
    (recur (rest numbers) (+ total (first numbers)))))
(println (sum [1 2 3 4 5] 0))
```

シーケンスだけを渡して合計を返す関数がほしいときは、次のようなラッパー関数を実装すればよい。Clojure には、**デフォルト引数は存在しない**。

```clojure
(defn collection-sum [collection]
  (sum collection 0))

(collection-sum [1 2 3 4 5]) ; 15
```

## キーワード

- [[clojure|Clojure]]
- [[recursion|再帰]]
- [[tail-recursion|末尾再帰]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
