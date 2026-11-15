---
title: Domain Modeling Made Functional › RDB から選択型を読み取る
description: 1 つのテーブルに格納した選択型を、フラグでケースを判定しながらドメインオブジェクトに組み立てて読み取る節
tags: [book-chapter]
date: 2024-08-10
book: "[[Domain Modeling Made Functional]]"
chapter: 12
---

## TL;DR

- [[discriminated-union|選択型]]も通常のレコードと同じ手順で読み取れるが、`toDomain` が少し複雑になる。
- ドメインの[[coherence|整合性]]を保てないので、`toDomain` が複雑でも [[orm|ORM]] は使わない。

## 内容

[[Domain Modeling Made Functional 第12章 リレーショナルデータベースを扱う|リレーショナルデータベースを扱う]] の一節である。選択型も [[Domain Modeling Made Functional 第12章 RDB からの読み取り|RDB からの読み取り]] と同じ手順で読み取れるが、少し複雑になる。

### 例: 1 件の Contact を読み取る

`ContactId` を使って 1 件の `Contact` を取得する `readOneContact` 関数を実装する。型は [[Domain Modeling Made Functional 第12章 選択型をテーブルにマッピングする手法|選択型をテーブルにマッピングする手法]] のものを使い、DB ではすべてのケースを同じテーブルに格納している。

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

#### 1. クエリの型を定義する

```fsharp
type ReadOneContact = SqlCommandProvider<"""
    SELECT ContactId, IsEmail, IsPhone, EmailAddress, PhoneNumber
    FROM ContactInfo
    WHERE ContactId = @contactId
    """, connectionString>
```

#### 2. toDomain を実装する

フラグを調べて `ContactInfo` のケースを決め、内側の `result` 式で各ケースのデータを組み立てる。

```fsharp
let toDomain (dbRecord: ReadOneContact.Record): Result<Contact,_> =
    result {
        let! contactId =
            dbRecord.ContactId
            |> ContactId.create

        let! contactInfo =
            if dbRecord.IsEmail then
                result {
                    let! emailAddressString =
                        dbRecord.EmailAddress
                        |> Result.ofOption "Email expected to be non null"
                    let! emailAddress =
                        emailAddressString |> EmailAddress.create
                    return (Email emailAddress)
                }
            else
                result {
                    let! phoneNumberString =
                        dbRecord.PhoneNumber
                        |> Result.ofOption "PhoneNumber expected to be non null"
                    let! phoneNumber =
                        phoneNumberString |> PhoneNumber.create
                    return (Phone phoneNumber)
                }

        let contact =
            { ContactId = contactId
              Info = contactInfo }
        return contact
    }
```

`Result.ofOption` は、`Option` を `Result` に変換するヘルパ関数である。

```fsharp
module Result =
    let ofOption errorValue opt =
        match opt with
        | Some v -> Ok v
        | None -> Error errorValue
```

#### 3. readOneContact を実装する

RDB からの読み取りで作った `convertSingleDbRecord` を使うと、次のように短く書ける。

```fsharp
let readOneContact (productionConnection: SqlConnection) (ContactId contactId) =
    use cmd = new ReadOneContact(productionConnection)
    let tableName = "ContactInfo"

    let records = cmd.Execute(contactId = contactId) |> Seq.toList
    convertSingleDbRecord tableName contactId records toDomain
```

### ORM を使わない理由

`toDomain` が複雑なので、ORM を使いたくなる。しかし ORM では、メールアドレスや注文数の検証、ネストした選択型の処理ができない。[[domain|ドメイン]]の整合性を保てないので、使わないほうがよい。

## キーワード

- [[discriminated-union|選択型]]
- [[orm|ORM]]
- [[domain-object|ドメインオブジェクト]]
- [[coherence|整合性]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
