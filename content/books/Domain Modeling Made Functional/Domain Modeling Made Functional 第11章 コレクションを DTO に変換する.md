---
title: Domain Modeling Made Functional › コレクションを DTO に変換する
description: リスト、シーケンス、セットは DTO では配列で表現する。マップなどの複雑なコレクションはシリアライズフォーマットしだい
tags: [book-chapter]
date: 2024-08-07
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- リスト、シーケンス、セットは、[[dto|DTO]] ではどのシリアライズフォーマットでも扱える配列で表現する。
- マップなどの複雑なコレクションをどう変換するかは、シリアライズフォーマットによる。

## 内容

[[Domain Modeling Made Functional 第11章 ドメイン型を DTO に変換する方法|ドメイン型を DTO に変換する方法]]の 1 つである。

リスト、シーケンス、セットは、すべてのシリアライズフォーマットが対応している配列で表現する。

```fsharp
// ドメイン
type Order =
    { ...
      Lines: OrderLine list }

// DTO
type OrderDto =
    { ...
      Lines: OrderLineDto[] }
```

マップなどの複雑なコレクションをどう変換するかは、シリアライズフォーマットによって決まる。たとえば JSON はキーと値の組を扱えるので、マップを直接シリアライズできる。

## キーワード

- [[dto|DTO]]
- [[serialization|シリアライズ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
