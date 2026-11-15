---
title: Domain Modeling Made Functional › 選択型をテーブルにマッピングする手法
description: 選択型を 1 段の継承階層と見なし、全ケースを 1 つのテーブルに入れる方法と、ケースごとにテーブルを分ける方法を比べる節
tags: [book-chapter]
date: 2024-08-10
book: "[[Domain Modeling Made Functional]]"
chapter: 12
---

## TL;DR

- [[discriminated-union|選択型]]は、オブジェクトの継承階層を RDB にマッピングする手法でテーブルにできる。
- 基本はすべてのケースを同じテーブルに格納し、ケース間の共通点が少ないときだけケースごとにテーブルを分ける。

## 内容

[[Domain Modeling Made Functional 第12章 リレーショナルデータベースを扱う|リレーショナルデータベースを扱う]] の一節である。

選択型を 1 段の継承階層と見なすと、オブジェクト階層を RDB のモデルにマッピングする手法を使える。

> オブジェクト階層を RDB のモデルにマッピングするアプローチ
> https://agiledata.org/essays/mappingObjects.html

その中で特に有効なのが、次に挙げる 2 つの方法である。例として、次の選択型を使う。

```fsharp
type Contact =
    { ContactId: ContactId
      Info: ContactInfo }

and ContactInfo =
    | Email of EmailAddress
    | Phone of PhoneNumber
and EmailAddress = EmailAddress of string
and PhoneNumber = PhoneNumber of string
and ContactId = ContactId of int
```

### 1. すべてのケースを同じテーブルに格納する

```sql
CREATE TABLE ContactInfo (
    ContactId int NOT NULL,
    IsEmail bit NOT NULL,
    IsPhone bit NOT NULL,
    EmailAddress NVARCHAR(100),
    PhoneNumber NVARCHAR(25),
    CONSTRAINT PK_ContactInfo PRIMARY KEY (ContactId)
)
```

どのケースが使われているかを示すフラグが必要になる。一部のケースでしか使わないカラムは `NULL` を許容する。

### 2. ケースごとに別のテーブルに格納する

```sql
CREATE TABLE ContactInfo (
    ContactId int NOT NULL,
    IsEmail bit NOT NULL,
    IsPhone bit NOT NULL,
    CONSTRAINT PK_ContactInfo PRIMARY KEY (ContactId)
)

CREATE TABLE ContactEmail (
    ContactId int NOT NULL,
    EmailAddress NVARCHAR(100) NOT NULL,
    CONSTRAINT PK_ContactEmail PRIMARY KEY (ContactId)
)

CREATE TABLE ContactPhone (
    ContactId int NOT NULL,
    PhoneNumber NVARCHAR(25) NOT NULL,
    CONSTRAINT PK_ContactPhone PRIMARY KEY (ContactId)
)
```

メインのテーブルと、ケースごとの子テーブルを作る。メインのテーブルは、どのケースが有効かを示す ID やフラグを持つ。子テーブルは、各ケースのデータを持つ。どのテーブルも主キーに同じ値を使う。テーブルの数は増えるが、`NOT NULL` のような適切な制約をかけられる。

### どちらを選ぶか

基本は 1 つ目の「すべてのケースを同じテーブルに格納する」方法を使う。ケース間の共通点が少ないときだけ、2 つ目の「ケースごとに別のテーブルに格納する」方法を選ぶとよい。

## キーワード

- [[discriminated-union|選択型]]
- [[relational-database|リレーショナルデータベース]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
