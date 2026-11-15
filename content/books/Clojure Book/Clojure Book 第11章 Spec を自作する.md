---
title: Clojure Book 第11章 Spec を自作する
description: s/and や s/or で述語を組み合わせ、自分で Spec を定義する
tags: [book-chapter, clojure]
date: 2023-08-18
book: "[[Clojure Book]]"
chapter: 11
---

## TL;DR

- `s/and` は複数の述語を AND 条件で組み合わせた新しい Spec を作る。
- `s/or` を使うと、文字列かキーワードかのような OR 条件の Spec も書ける。

## 内容

Spec は自分で定義することもできる。たとえば次は、値が 0〜100 の間に収まっているかを確かめる Spec である。

```clojure
(def valid-%? (s/and number? #(>= % 0) #(<= % 100)))
```

`s/and` は、渡された複数の[[predicate|述語]]を AND 条件で組み合わせた、**新しい Spec を作る関数**である。ここで使っている **`#(…)` は[[anonymous-function|無名関数]]**の糖衣構文で、**`%` は引数**を表す。

自作した Spec は `valid?` で次のように使える。

```clojure
(s/valid? valid-%? 42)  ; true
(s/valid? valid-%? 105) ; false
```

同じように、文字列かキーワードかを確かめる Spec は次のように書ける。

```clojure
(def string-or-symbol?
  (s/or :string string? :keyword keyword?))
```

## キーワード

- [[clojure-spec|Spec]]
- [[predicate|述語]]
- [[anonymous-function|無名関数]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
