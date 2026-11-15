---
title: Clojure Book › Spec
description: Clojure に組み込まれた Spec で値やコレクション、マップの形を検証し、失敗の理由を出力し、関数の事前条件や事後条件に使う章
tags: [book-chapter, clojure]
date: 2023-08-18
book: "[[Clojure Book]]"
chapter: 11
---

## TL;DR

- [[clojure|Clojure]] には、データの型のチェックに役立つ [[clojure-spec|Spec]] というライブラリが組み込まれている。
- `s/valid?` や `s/conform` で値やコレクション、マップを検証し、`s/explain` で失敗の理由を出力できる。
- 関数の事前条件（`:pre`）や事後条件（`:post`）に Spec を使うと、受け取るデータや返すデータを検証できる。

## 内容

Spec を使うと、事前条件として受け取ったデータが想定どおりの値かを確かめたり、事後条件として返すデータが想定どおりの値かをチェックしたりできる。v1.9 で追加された比較的新しい機能なので、古いドキュメントや記事では使われていないが、**データの検証でよく使われる**。各節のまとめは次のページにある。

- [[Clojure Book 第11章 基本]]
- [[Clojure Book 第11章 Spec を自作する]]
- [[Clojure Book 第11章 コレクションの Spec]]
- [[Clojure Book 第11章 Spec に失敗した理由を出力する]]
- [[Clojure Book 第11章 conform 関数]]
- [[Clojure Book 第11章 関数の中で Spec を用いる]]

## キーワード

- [[clojure|Clojure]]
- [[clojure-spec|Spec]]
- [[predicate|述語]]
- [[anonymous-function|無名関数]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
