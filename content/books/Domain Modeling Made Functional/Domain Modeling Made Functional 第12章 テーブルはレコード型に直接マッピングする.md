---
title: Domain Modeling Made Functional 第12章 テーブルはレコード型に直接マッピングする
description: 関数型のドメインモデルではデータと振る舞いが分かれているので、RDB のテーブルをレコード型に直接マッピングできると説明する節
tags: [book-chapter]
date: 2024-08-10
book: "[[Domain Modeling Made Functional]]"
chapter: 12
---

## TL;DR

- [[functional-programming|関数型プログラミング]]のモデルはデータと振る舞いが分かれているので、RDB と相性が良い。
- テーブルを[[record-type|レコード型]]に直接マッピングする。ただし、プリミティブな値しか保存できない点と、[[discriminated-union|選択型]]を表せない点でミスマッチが起きる。

## 内容

[[Domain Modeling Made Functional 第12章 リレーショナルデータベースを扱う|リレーショナルデータベースを扱う]] の一節である。

関数型のモデルは、データと振る舞いが混在しない。そのため、レコードの保存や取得がオブジェクト指向よりも直接的になり、[[relational-database|リレーショナルデータベース]]との相性が良い。そこで、[[Domain Modeling Made Functional 第11章 Serialization|第11章 Serialization]] にならって、テーブルをレコード型に直接マッピングする戦略を取る。

この戦略には次のメリットがある。RDB のテーブルは、レコードのコレクションに対応する。また、`SELECT` や `WHERE` のような集合指向の操作は、`map` や `filter` のようなリスト指向の操作に似ている。

一方で、次のミスマッチも起きる。

- RDB にはプリミティブな値しか保存できない
- 選択型にはそのまま対応できない

### 例

次の[[domain-model|ドメインモデル]]を考える。

```fsharp
type CustomerId = CustomerId of int
type String50 = String50 of string
type Birthdate = Birthdate of DateTime

type Customer =
    { CustomerId: CustomerId
      Name: String50
      Birthdate: Birthdate }
```

これに対応するテーブルは次のようになる。

```sql
CREATE TABLE Customer (
    CustomerId int NOT NULL,
    Name NVARCHAR(50) NOT NULL,
    Birthdate DATETIME NULL,
    CONSTRAINT PK_Customer PRIMARY KEY (CustomerId)
)
```

## キーワード

- [[functional-programming|関数型プログラミング]]
- [[relational-database|リレーショナルデータベース]]
- [[record-type|レコード型]]
- [[discriminated-union|選択型]]
- [[domain-model|ドメインモデル]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
