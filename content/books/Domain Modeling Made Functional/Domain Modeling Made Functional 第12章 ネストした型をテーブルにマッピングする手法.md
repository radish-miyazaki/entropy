---
title: Domain Modeling Made Functional › ネストした型をテーブルにマッピングする手法
description: ネストした型は、エンティティなら別のテーブルに、値オブジェクトなら同じテーブルに保存する
tags: [book-chapter]
date: 2024-08-10
book: "[[Domain Modeling Made Functional]]"
chapter: 12
---

## TL;DR

- ネストした型は、[[entity|エンティティ]]なら別のテーブルに、[[value-object|値オブジェクト]]なら同じテーブルに保存する。

## 内容

[[Domain Modeling Made Functional 第12章 リレーショナルデータベースを扱う|リレーショナルデータベースを扱う]] の一節である。

ネストした型をテーブルにマッピングする一般的な方法は 2 つある。ネストした型がエンティティの場合は、別のテーブルに保存する。ネストした型が値オブジェクトの場合は、親と同じテーブルに保存する。

## キーワード

- [[entity|エンティティ]]
- [[value-object|値オブジェクト]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
