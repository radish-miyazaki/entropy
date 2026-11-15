---
title: めだかのclojure.core学校 › clojure.core のコレクションに関する var
description: IPersistentCollection を実装したコレクション全般に使える clojure.core の関数と、リスト内包表記の for マクロをまとめた節
tags: [book-chapter, clojure]
date: 2024-11-28
book: "[[めだかのclojure.core学校]]"
chapter: 1
---

## TL;DR

- [[clojure|Clojure]] のコレクションは、`clojure.lang.IPersistentCollection` インタフェースを実装したインスタンスである。
- `empty`、`count`、`conj`、`get` などの関数は、リスト、ベクタ、セット、マップのどれにも使える。`for` マクロでリスト内包表記を書ける。

## 内容

### 関数

コレクションは、[`IPersistentCollection`](https://github.com/clojure/clojure/blob/master/src/jvm/clojure/lang/IPersistentCollection.java) を実装したインスタンスである。`coll?` は、引数がこのインタフェースを実装しているかを判定する。具体的には、リスト、ベクタ、セット、マップで `true` を返す。

```clojure
(map coll? ['() [] #{} {}])           ; (true true true true)
(map coll? [1 :keyword nil "string"]) ; (false false false false)
```

`empty` は、引数と同じ型の空のコレクションを返す。`nil` を渡すと `nil` を返す。

```clojure
(map empty [[1 2 3] '(1 2 3) {:a 1 :b 2 :c 3} #{1 2 3}])
;; ([] () {} #{})
(empty nil) ; nil
```

`empty?` は、引数が空のコレクションかを判定する。ただし、[[clojure-sequence|シーケンス]]が空でないことを確かめるなら `seq` を使うほうがよい。`seq` は、空のシーケンスには `nil` を、そうでなければシーケンスそのものを返す。`empty?` は `(not (seq coll))` で実装されているので、`(not (empty? x))` と書くと `not` を 2 回通る無駄が生じる。

```clojure
(defn empty?
  [coll] (not (seq coll)))
```

`not-empty` は、コレクションが空なら `nil` を、空でなければ引数をそのまま返す。`count` は要素数を返す。`nil` には `0` を返し、文字列や配列、Java のコレクションにも使える。

```clojure
(not-empty [])      ; nil
(not-empty [1 2 3]) ; [1 2 3]

(count {:a 1 :b 2}) ; 2
(count nil)         ; 0
(count "あいうえお") ; 5
```

`conj` は、要素を追加した新しいコレクションを返す。追加される位置はコレクションの種類で異なり、ベクタでは末尾、リストでは先頭になる。`nil` に要素を追加するとリストになり、引数がなければ空のベクタを返す。

```clojure
(conj [1 2 3] 4)  ; [1 2 3 4]
(conj '(1 2 3) 4) ; (4 1 2 3)
(conj #{1 2 3} 4) ; #{1 4 3 2}
(conj nil 1)      ; (1)
(conj)            ; []
```

`get` は、マップ、コレクション、文字列、配列、`ILookup` を実装したインスタンスから、キーに対応する値を取り出す。キーがなければ、第 3 引数の値か `nil` を返す。数値のように取り出せない値を渡してもエラーにならず、`nil` を返す。

```clojure
(get {:a 1 :b 2} :a)   ; 1
(get [1 2 3] 1)        ; 2
(get "foo" 0)          ; \f
(get {:a 1 :b 2} :c 0) ; 0
(get 1 :a)             ; nil
```

### マクロ

`for` はリスト内包表記のマクロである。束縛とコレクション式の組を並べたベクタを受け取り、[[lazy-sequence|遅延シーケンス]]を返す。右側のコレクションほど速く回り、後ろの束縛から前の束縛を参照できる。`:let` で束縛を足したり、`:when` や `:while` で処理する要素を絞ったりできる。

```clojure
(for [x (range 10) y (range 5)]
  [x y])
;; ([0 0] [0 1] [0 2] [0 3] [0 4]
;;  [1 0] [1 1] [1 2] [1 3] [1 4]
;;  ...
;;  [9 0] [9 1] [9 2] [9 3] [9 4])

(for [x (range 3) :when (even? x)]
  (* x x))
;; (0 4)

(for [x (range 10) :while (< x 5) y (range 3) :when (odd? y)]
  [x y])
;; ([0 1] [1 1] [2 1] [3 1] [4 1])
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-var|Var]]
- [[clojure-sequence|シーケンス]]
- [[lazy-sequence|遅延シーケンス]]
- リスト内包表記

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
