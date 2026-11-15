---
title: Domain Modeling Made Functional › RDB への書き込み
description: ドメインオブジェクトをプリミティブな値に分解し、型プロバイダで挿入や更新のコマンドを実行して RDB に書き込む節
tags: [book-chapter]
date: 2024-08-10
book: "[[Domain Modeling Made Functional]]"
chapter: 12
---

## TL;DR

- RDB に書き込むときは、[[domain-object|ドメインオブジェクト]]を [[dto|DTO]] に変換してから、挿入や更新のコマンドを実行する。

## 内容

[[Domain Modeling Made Functional 第12章 リレーショナルデータベースを扱う|リレーショナルデータベースを扱う]] の一節である。

### 例: 1 件の Contact を挿入する

`Contact` を 1 件挿入する `writeContact` を実装する。型は [[Domain Modeling Made Functional 第12章 選択型をテーブルにマッピングする手法|選択型をテーブルにマッピングする手法]] の `Contact` を使う。

#### 1. すべてのテーブルの型を定義する

```fsharp
type Db = SqlProgrammabilityProvider<connectionString>
```

#### 2. writeContact を実装する

ドメインオブジェクトの `Contact` を受け取り、DB にデータを挿入する。

```fsharp
let writeContact (productionConnection: SqlConnection) (contact: Contact) =
    // ドメインオブジェクトからプリミティブな値を取り出す
    let contactId = contact.ContactId |> ContactId.value
    let isEmail, isPhone, emailAddressOpt, phoneNumberOpt =
        match contact.Info with
        | Email emailAddress ->
            let emailAddressString = emailAddress |> EmailAddress.value
            true, false, Some emailAddressString, None
        | Phone phoneNumber ->
            let phoneNumberString = phoneNumber |> PhoneNumber.value
            false, true, None, Some phoneNumberString

    // 新しい行を作る
    let contactInfoTable = new Db.dbo.Tables.ContactInfo()
    let newRow = contactInfoTable.NewRow()
    newRow.ContactId <- contactId
    newRow.IsEmail <- isEmail
    newRow.IsPhone <- isPhone
    newRow.EmailAddress <- emailAddressOpt
    newRow.PhoneNumber <- phoneNumberOpt

    // テーブルに追加する
    contactInfoTable.Rows.Add newRow

    // DB に変更を反映する
    let recordsAffected = contactInfoTable.Update(productionConnection)
    recordsAffected
```

#### 3. 別案: SQL 文を実行する

[[Domain Modeling Made Functional 第12章 RDB からの読み取り|RDB からの読み取り]] と同じように、`SqlCommandProvider` で SQL 文を直接実行してもよい。

```fsharp
type InsertContact = SqlCommandProvider<"""
    INSERT INTO ContactInfo
    VALUES (@contactId, @isEmail, @isPhone, @emailAddress, @phoneNumber)
    """, connectionString>

let writeContact (productionConnection: SqlConnection) (contact: Contact) =
    let contactId = contact.ContactId |> ContactId.value
    let isEmail, isPhone, emailAddress, phoneNumber =
        match contact.Info with
        | Email emailAddress ->
            let emailAddressString = emailAddress |> EmailAddress.value
            true, false, emailAddressString, null
        | Phone phoneNumber ->
            let phoneNumberString = phoneNumber |> PhoneNumber.value
            false, true, null, phoneNumberString

    use cmd = new InsertContact(productionConnection)
    cmd.Execute(contactId, isEmail, isPhone, emailAddress, phoneNumber)
```

## キーワード

- [[domain-object|ドメインオブジェクト]]
- [[dto|DTO]]
- [[type-provider|型プロバイダ]]
- [[discriminated-union|選択型]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
