---
title: Domain Modeling Made Functional › RDB からの読み取り
description: F# の型プロバイダで SQL に合わせた型を作り、DB のレコードをドメインオブジェクトに変換して 1 件を読み取る関数を組み立てる節
tags: [book-chapter]
date: 2024-08-10
book: "[[Domain Modeling Made Functional]]"
chapter: 12
---

## TL;DR

- [[fsharp|F#]] では ORM よりも生の SQL を書くことが多い。`FSharp.Data.SqlClient` の[[type-provider|型プロバイダ]]を使うと、SQL の誤りがコンパイルエラーになる。
- DB のレコードを[[domain-object|ドメインオブジェクト]]に変換する `toDomain` は、DB を信頼するかどうかで書き方が変わる。

## 内容

[[Domain Modeling Made Functional 第12章 リレーショナルデータベースを扱う|リレーショナルデータベースを扱う]] の一節である。

### F# で SQL を実行する

F# では [[orm|ORM]] を使うことは少なく、生の SQL を書くことが多い。方法はいくつかあるが、ここでは [`FSharp.Data.SqlClient`](https://fsprojects.github.io/FSharp.Data.SqlClient/) の型プロバイダを使う。この型プロバイダは、コンパイル時に SQL のクエリやコマンドに合わせた型を作る。そのため、SQL のクエリが正しくなければコンパイルエラーになる。クエリが正しければ、出力と完全に一致する[[record-type|レコード型]]が返る。

### 例: 1 件の Customer を読み取る

`CustomerId` を使って 1 件の `Customer` を取得する `readOneCustomer` 関数を実装する。型は [[Domain Modeling Made Functional 第12章 テーブルはレコード型に直接マッピングする|テーブルはレコード型に直接マッピングする]] のものを使う。

```fsharp
type CustomerId = CustomerId of int
type String50 = String50 of string
type Birthdate = Birthdate of DateTime

type Customer =
    { CustomerId: CustomerId
      Name: String50
      Birthdate: Birthdate }
```

#### 1. クエリの型を定義する

```fsharp
open FSharp.Data

[<Literal>]
let connectionString = @"..."

type ReadOneCustomer = SqlCommandProvider<"""
    SELECT CustomerId, Name, Birthdate
    FROM Customer
    WHERE CustomerId = @customerId
    """, connectionString>
```

#### 2. toDomain を実装する

`toDomain` は、DB から取得したレコードをドメインオブジェクトに変換する関数である。DB を信頼できるデータソースと見なすかどうかで、書き方が変わる。

DB を信頼できないデータソースとして扱う場合は、`result` [[computation-expression|コンピュテーション式]]を使い、戻り値の型を `Result<Customer,_>` にする。

```fsharp
let toDomain (dbRecord: ReadOneCustomer.Record): Result<Customer, _> =
    result {
        let! customerId =
            dbRecord.CustomerId
            |> CustomerId.create

        let! name =
            dbRecord.Name
            |> String50.create

        let! birthdate =
            dbRecord.Birthdate
            |> Result.bindOption Birthdate.create

        let customer =
            { CustomerId = customerId
              Name = name
              Birthdate = birthdate }
        return customer
    }
```

`Birthdate` は `NULL` になりうる。そこで、次の `bindOption` を作り、スイッチ関数を `Option` に対応させる（[[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）|Result を生成する関数の連鎖（bind と errorMap、map）]]）。

```fsharp
let bindOption f xOpt =
    match xOpt with
    | Some x -> f x |> Result.map Some
    | None -> Ok None
```

DB を信頼できるデータソースとして扱う場合は、万が一不正なデータが来たときにパニックを起こす。

```fsharp
let toDomain (dbRecord: ReadOneCustomer.Record): Customer =
    let customerId =
        dbRecord.CustomerId
        |> CustomerId.create
        |> panicOnError "CustomerId"

    let name =
        dbRecord.Name
        |> String50.create
        |> panicOnError "Name"

    let birthdate =
        dbRecord.Birthdate
        |> Birthdate.create
        |> panicOnError "Birthdate"

    { CustomerId = customerId; Name = name; Birthdate = birthdate }
```

`panicOnError` は、`Result` のエラーを例外に変換するヘルパ関数である。

```fsharp
let panicOnError columnName result =
    match result with
    | Ok x -> x
    | Error err ->
        let msg = sprintf "%s: %A" columnName err
        raise (DatabaseError msg)
```

#### 3. readOneCustomer を実装する

```fsharp
type DbReadError =
    | InvalidRecord of string
    | MissingRecord of string

let readOneCustomer (productionConnection: SqlConnection) (CustomerId customerId) =
    use cmd = new ReadOneCustomer(productionConnection)

    let records = cmd.Execute(customerId = customerId) |> Seq.toList

    match records with
    | [] -> // 何も見つからなかった場合
        let msg = sprintf "Not found. CustomerId=%A" customerId
        Error (MissingRecord msg)
    | [dbCustomer] -> // 1 件だけ見つかった場合
        dbCustomer |> toDomain |> Result.mapError InvalidRecord
    | _ -> // 2 件以上見つかった場合
        let msg = sprintf "Multiple records found for CustomerId=%A" customerId
        raise (DatabaseError msg)
```

主キーで検索しているので、複数のレコードが見つかることは起こり得ない。そのため、その場合はパニックを起こしている。

#### 4. 汎用的な関数にする

`readOneCustomer` の中身をすべてパラメータにして、汎用的な関数を作る。テーブル名、ID、レコード、`toDomain` をパラメータとして受け取る。

```fsharp
let convertSingleDbRecord tableName idValue records toDomain =
    match records with
    | [] ->
        let msg = sprintf "Not found. Table=%s Id=%A" tableName idValue
        Error msg
    | [dbRecord] ->
        dbRecord |> toDomain |> Ok
    | _ ->
        let msg = sprintf "Multiple records found. Table=%s Id=%A" tableName idValue
        raise (DatabaseError msg)
```

これを使うと、`readOneCustomer` は短く書ける。

```fsharp
let readOneCustomer (productionConnection: SqlConnection) (CustomerId customerId) =
    use cmd = new ReadOneCustomer(productionConnection)
    let tableName = "Customer"

    let records = cmd.Execute(customerId = customerId) |> Seq.toList
    convertSingleDbRecord tableName customerId records toDomain
```

## キーワード

- [[fsharp|F#]]
- [[type-provider|型プロバイダ]]
- [[orm|ORM]]
- [[record-type|レコード型]]
- [[domain-object|ドメインオブジェクト]]
- [[computation-expression|コンピュテーション式]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
