---
title: Clojure Book 第11章 conform 関数
description: "s/conform は成功すると値そのものを、失敗すると :clojure.spec.alpha/invalid を返す"
tags: [book-chapter, clojure]
date: 2023-08-18
book: "[[Clojure Book]]"
chapter: 11
---

## TL;DR

- `s/conform` もデータが Spec を満たすかを確かめるが、成功したときは値そのものを返す。
- 失敗したときは、プログラムを中断せずに `:clojure.spec.alpha/invalid` を返す。

## 内容

`valid?` 関数とは別に、`conform` という関数もある。この関数もデータが Spec を満たしているかを確かめるが、**成功したときは値そのもの**を返し、**失敗したときは `invalid` を返す**点が違う。`invalid` はデータの検証に使われる値で、**プログラムを中断せず、データが無効であることだけを知らせる**。

```clojure
(s/conform number? 42) ; 42
(s/conform number? "42") ; :clojure.spec.alpha/invalid
(s/conform number-or-string? :56) ; :clojure.spec.alpha/invalid
```

## キーワード

- [[clojure-spec|Spec]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
