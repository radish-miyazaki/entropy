---
title: Domain Modeling Made Functional 第12章 ドキュメントデータベースを扱う
description: ドキュメントデータベースへの永続化は、DTO への変換、JSON への変換、ストレージ API での CRUD の 3 ステップで済む
tags: [book-chapter]
date: 2024-08-09
book: "[[Domain Modeling Made Functional]]"
chapter: 12
---

## TL;DR

- [[document-database|ドキュメントデータベース]]への[[persistence|永続化]]は、DTO への変換、JSON への変換、ストレージ API での CRUD 操作の 3 ステップで済む。

## 内容

[[Domain Modeling Made Functional 第12章 Persistence|第12章 Persistence]]の実装例の 1 つである。ドキュメントデータベースへの永続化は、次の 3 ステップだけで済む。

1. [[Domain Modeling Made Functional 第11章 Serialization|第11章 Serialization]]の方法で、[[domain-object|ドメインオブジェクト]]を [[dto|DTO]] に変換する
2. DTO を JSON 文字列に変換する
3. ストレージシステムの API を通して CRUD 操作を行う

## キーワード

- [[document-database|ドキュメントデータベース]]
- [[persistence|永続化]]
- [[dto|DTO]]
- [[domain-object|ドメインオブジェクト]]
- [[serialization|シリアライズ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
