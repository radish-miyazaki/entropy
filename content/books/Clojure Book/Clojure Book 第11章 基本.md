---
title: Clojure Book 第11章 基本
description: Spec を require し、s/valid? と string? などの述語で値の型を確かめる
tags: [book-chapter, clojure]
date: 2023-08-18
book: "[[Clojure Book]]"
chapter: 11
---

## TL;DR

- `clojure.spec.alpha` を `s` というエイリアスで `require` して使う。
- `s/valid?` は値に述語を適用し、満たせば `true`、満たさなければ `false` を返す。

## 内容

Spec を使うには、次を `require` する。`spec/something` ではなく `s/something` のように短く呼び出せるよう、`s` というエイリアスを付けている。

```clojure
(require '[clojure.spec.alpha :as s])
```

ある値が文字列かどうかは、次のように確かめられる。

```clojure
(s/valid? string? "Hello") ; true
```

このコードでは **`valid?`** 関数に `string?` という関数を渡している。`string?` は渡された引数が文字列かどうかに応じて `true` か `false` を返す。第 2 引数は文字列 `"Hello"` である。`s/valid?` は `"Hello"` に `string?` を適用し、`true` なら `true` を、そうでなければ `false` を返す。そのため、文字列以外を渡すと `false` が返る。

```clojure
(s/valid? string? 42)
```

同じように、数値（`number?`）、整数（`integer?`）、浮動小数点数（`double?`）、ベクタ（`vector?`）、マップ（`map?`）、集合（`set?`）、キーワード（`keyword?`）もチェックできる。

```clojure
(s/valid? number? 42)               ; true
(s/valid? integer? 123)             ; true
(s/valid? double? 123.45)           ; true
(s/valid? vector? [1 2 3])          ; true
(s/valid? map? { 1 "one" 2 "two" }) ; true
(s/valid? set? #{:apple :orange})   ; true
(s/valid? keyword? :apple)          ; true
```

## キーワード

- [[clojure-spec|Spec]]
- [[predicate|述語]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
