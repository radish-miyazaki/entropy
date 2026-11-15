---
title: Clojure Book › Logic and comparison
description: Clojure の同値演算 =、比較演算 <、<=、>、>=、論理演算 and、or、not を扱う章
tags: [book-chapter, clojure]
date: 2023-08-17
book: "[[Clojure Book]]"
chapter: 6
---

## TL;DR

- [[clojure|Clojure]] の `=` や比較演算子は 2 つ以上の値を受け取れる。比較演算子は、引数が昇順か降順かを確かめる。
- 論理演算には `and`、`or`、`not` を使う。

## 内容

### 同値演算（`=`）

`=` を使えば、値が等しいかを確かめられる。

```clojure
(= 1 1) ; true
(= 1 2) ; false
```

`=` は 2 つ以上の値を受け取り、すべての値が等しい場合だけ `true` を返す。

```clojure
(= 7 7 7) ; true
(= 7 8 7) ; false
```

### 比較演算（`<`、`<=`、`>`、`>=`）

`>` を使えば、最初の引数の値が 2 番目の引数の値よりも大きいかを確かめられる。

```clojure
(> 1 2) ; false
(> 2 1) ; true
```

`>` も 2 つ以上の値を受け取ることができ、引数が降順である場合だけ `true` を返す。

```clojure
(> 3 2 1) ; true
```

同じように `>=` も使える。

```clojure
(>= 5 5) ; true
(>= 6 5) ; true
(>= 6 7) ; false
```

`<` は、引数が昇順である場合だけ `true` を返す。

```clojure
(< 1 2)   ; true
(< 2 1)   ; false

(< 1 2 3) ; true
(< 1 3 2) ; false
```

同じように `<=` も使える。

```clojure
(<= 7 7) ; true
(<= 7 8) ; true
(<= 8 7) ; false
```

### 論理演算

`and` は、渡された引数がすべて `true` であれば `true` を返す。

```clojure
(and true true)  ; true
(and true false) ; false
```

`or` は、渡された引数のうち 1 つが `true` であれば `true` を返す。

```clojure
(or true false)  ; true
(or false false) ; false
```

`not` は、論理値を反転させる。

```clojure
(not true)  ; false
(not false) ; true
```

## キーワード

- [[clojure|Clojure]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
