---
title: Domain Modeling Made Functional 第11章 単純型を DTO に変換する
description: 単純型は DTO では元のプリミティブ型で表現する
tags: [book-chapter]
date: 2024-08-07
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- 単純型は、[[dto|DTO]] では元のプリミティブ型で表現する。

## 内容

[[Domain Modeling Made Functional 第11章 ドメイン型を DTO に変換する方法|ドメイン型を DTO に変換する方法]]の 1 つである。単純型は、ラップしている元のプリミティブ型で表現する。たとえば、次の `ProductCode` は DTO では `string` になる。

```fsharp
type ProductCode = ProductCode of string
```

## キーワード

- [[dto|DTO]]
- [[serialization|シリアライズ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
