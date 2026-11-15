---
title: Domain Modeling Made Functional › 型と関数
description: 関数型プログラミングにおける型は、関数の入力や出力として使える値の集合に名前を付けたものだと説明する節
tags: [book-chapter, fp]
date: 2024-07-12
book: "[[Domain Modeling Made Functional]]"
chapter: 4
---

## TL;DR

- [[functional-programming|関数型プログラミング]]における型とは、関数の入力や出力として使える値の集合に名前を付けたものである。

## 内容

関数型プログラミングにおける型とは、関数の入力や出力として使える値の集合に名前を付けたものである。オブジェクト指向プログラミングのクラスよりもはるかにシンプルである。

たとえば `int16` は、-32768 から 32767 までの数の集合に付けたラベルである。集合の要素はプリミティブな値に限らず、どんなものでもよい。関数の集合も型として扱える。たとえば、何かを受け取って「`Fruit` を受け取り `Fruit` を返す関数」を返す関数の型シグネチャは、`someInputType -> (Fruit -> Fruit)` になる。

## キーワード

- [[functional-programming|関数型プログラミング]]
- [[type-signature|型シグネチャ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
