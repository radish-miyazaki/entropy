---
title: Domain Modeling Made Functional › レコード型を DTO に変換する
description: レコード型は、各フィールドを DTO の型に変換したレコードで表現する
tags: [book-chapter]
date: 2024-08-07
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- レコード型は、各フィールドを [[dto|DTO]] の型に変換したレコードで表現する。

## 内容

[[Domain Modeling Made Functional 第11章 ドメイン型を DTO に変換する方法|ドメイン型を DTO に変換する方法]]の 1 つである。レコード型は、各フィールドを DTO 用の型に変換したレコードで表現する。たとえば、次のドメインの型を考える。

```fsharp
type OrderLineId = OrderLineId of int
type OrderLineQty = OrderLineQty of int
type OrderLine =
    { OrderLineId: OrderLineId
      ProductCode: ProductCode
      Quantity: OrderLineQty option
      Description: string option }
```

単純型はプリミティブ型に、値型のオプションは `Nullable` に、参照型のオプションはそのままの型にする。DTO は次のようになる。

```fsharp
type OrderLineDto =
    { OrderLineId: int
      ProductCode: string
      Quantity: Nullable<int>
      Description: string }
```

フィールドごとの変換方法は、[[Domain Modeling Made Functional 第11章 単純型を DTO に変換する|単純型を DTO に変換する]]と[[Domain Modeling Made Functional 第11章 オプション型を DTO に変換する|オプション型を DTO に変換する]]に書いた。

## キーワード

- [[dto|DTO]]
- [[serialization|シリアライズ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
