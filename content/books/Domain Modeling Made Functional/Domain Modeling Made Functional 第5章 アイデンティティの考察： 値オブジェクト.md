---
title: "Domain Modeling Made Functional 第5章 アイデンティティの考察: 値オブジェクト"
description: アイデンティティを持たず交換可能なデータを値オブジェクトと呼び、F# の型はデフォルトでフィールドベースの等値性を持つ
tags: [book-chapter, ddd, fsharp]
date: 2024-07-17
book: "[[Domain Modeling Made Functional]]"
chapter: 5
---

## TL;DR

- ID のようなアイデンティティを持たず、交換可能なデータを[[value-object|値オブジェクト]]と呼ぶ。
- [[fsharp|F#]] の型はデフォルトでフィールドベースの等値性を持つので、値オブジェクトをそのまま表せる。

## 内容

### 値オブジェクトとは

扱うデータの多くは、ID のようなアイデンティティを持たず、交換可能である。このようなオブジェクトを[[value-object|値オブジェクト]]と呼ぶ。逆に、アイデンティティを持つオブジェクトは[[entity|エンティティ]]である。

値オブジェクトは[[domain-model|ドメインモデル]]に頻繁に現れる。[[single-case-union|単純型]]の場合もあれば、[[Domain Modeling Made Functional 第5章 複雑なデータのモデリング|複雑な型]]の場合もある。たとえば、`"W1234"` という `WidgetCode` や、個人名、住所は値オブジェクトである。

```fsharp
let widgetCode1 = WidgetCode "W1234"
let widgetCode2 = WidgetCode "W1234"
printfn "%b" (widgetCode1 = widgetCode2) // true

let name1 = {FirstName="Alex"; LastName="Adams"}
let name2 = {FirstName="Alex"; LastName="Adams"}
printfn "%b" (name1 = name2) // true

let address1 = {StreetAddress="123 Main St"; City="New York"; Zip="90001"}
let address2 = {StreetAddress="123 Main St"; City="New York"; Zip="90001"}
printfn "%b" (address1 = address2) // true
```

値オブジェクトかどうかは、「同じ〜を持っている」と言えるかどうかで判断できる。

> Chris has the same name as me.（クリスは私と同じ名前を持っている）

> Pat has the same postal address as me.（パットは私と同じ住所を持っている）

### 等値性の実装

F# の[[algebraic-type-system|代数的な型システム]]で[[domain|ドメイン]]をモデリングすると、作った型はデフォルトでフィールドベースの等値性を持つ。同じ型の 2 つのレコード値は、フィールドがすべて等しければ等しい。同じ型の 2 つの選択型の値は、ケースが同じで、そのフィールドの値が等しければ等しい。これを[[structural-equality|構造的等値性]]と呼ぶ。

## キーワード

- [[value-object|値オブジェクト]]
- [[entity|エンティティ]]
- [[domain-model|ドメインモデル]]
- [[single-case-union|単純型]]
- [[algebraic-type-system|代数的な型システム]]
- [[structural-equality|構造的等値性]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
