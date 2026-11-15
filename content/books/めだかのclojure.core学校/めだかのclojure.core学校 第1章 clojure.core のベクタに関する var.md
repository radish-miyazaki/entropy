---
title: めだかのclojure.core学校 › clojure.core のベクタに関する var
description: ベクタの生成と判定を行う clojure.core の vec、vector、vector?、vector-of をまとめた節
tags: [book-chapter, clojure]
date: 2024-11-29
book: "[[めだかのclojure.core学校]]"
chapter: 1
---

## TL;DR

- [[clojure|Clojure]] のベクタは、`clojure.lang.IPersistentVector` インタフェースを実装したインスタンスである。
- `vec` と `vector` でベクタを作り、`vector?` で判定する。`vector-of` を使うと、値を[[boxing|ボクシング]]しない基本型のベクタを作れる。

## 内容

`vec` は、任意のコレクションをベクタに変換する。Java の配列を渡すと、変更できないようにコピーしたベクタを返す。`vector` は、引数の値を要素とする新しいベクタを返し、引数がなければ空のベクタを返す。

```clojure
(vec [1 2 3])   ; [1 2 3]
(vec '(1 2 3))  ; [1 2 3]
(vec #{1 2 3})  ; [1 3 2]
(vec (range 3)) ; [0 1 2]

(vector 1 2 3) ; [1 2 3]
(vector)       ; []
```

`vector?` は、引数が `IPersistentVector` を実装しているかを判定する。

```clojure
(map vector? ['() [] #{} {}])           ; (false true false false)
(map vector? [1 :keyword nil "string"]) ; (false false false false)
```

`vector-of` は、第 1 引数で指定した基本型のベクタを返す。指定できるのは `:int`、`:long`、`:float`、`:double`、`:byte`、`:short`、`:char`、`:boolean` である。続けて要素を渡すと、その値で初期化できる。できたベクタは通常のベクタと同じインタフェースを持つが、内部で値をボクシングしない。そのため、メモリ使用量の削減とパフォーマンスの向上が期待できる。

```clojure
(vector? (vector-of :int))      ; true
(vector-of :int 1 2 3)          ; [1 2 3]
(vector-of :double 1.0 2.0 3.0) ; [1.0 2.0 3.0]

(type [1])                       ; clojure.lang.PersistentVector
(type (conj (vector-of :int 1))) ; clojure.core.Vec
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-var|Var]]
- [[boxing|ボクシング]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
