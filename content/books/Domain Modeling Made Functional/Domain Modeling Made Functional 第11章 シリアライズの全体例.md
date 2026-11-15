---
title: Domain Modeling Made Functional › シリアライズの全体例
description: ドメインオブジェクトと DTO の相互変換を DTO 側のモジュールに実装し、JSON シリアライザをラップしてシリアライズとデシリアライズのパイプラインを組む例
tags: [book-chapter]
date: 2024-08-03
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- [[Domain Modeling Made Functional 第11章 ドメインは DTO を知らない|ドメインは DTO を知らない]]ので、[[domain-object|ドメインオブジェクト]]と [[dto|DTO]] の相互変換は DTO のモジュールに実装する。
- シリアライザが[[functional-programming|関数型プログラミング]]と相性が悪ければ、ラップして使う。
- [[serialization|シリアライズ]]は必ず成功するが、デシリアライズは失敗する可能性がある。
- DTO は境界づけられたコンテキスト間の契約なので、複数バージョンの DTO を管理する必要が出ることもある。

## 内容

[[Domain Modeling Made Functional 第11章 Serialization|第11章 Serialization]]の一部である。

### シリアライズの具体例

ドメインオブジェクトから JSON へのシリアライズと、JSON からドメインオブジェクトへのデシリアライズの具体例を見る。次の `Person` を[[persistence|永続化]]したいとする。

```fsharp
module Domain =
    open System
    type Person =
        { First: String50
          Last: String50
          Birthdate: Birthdate }
```

`String50` と `Birthdate` は制約を持つ単純型である（[[Domain Modeling Made Functional 第9章 各ステップを実装する前に、単純型を実装する|各ステップを実装する前に、単純型を実装する]]）。これらは直接シリアライズできないので、すべてのフィールドがプリミティブ型の DTO を作る。

```fsharp
module Dto =
    open System

    type Person =
        { First: string
          Last: string
          Birthdate: DateTime }
```

次に、相互変換のヘルパ関数 `toDomain` と `fromDomain` を実装する。ドメインは DTO を知らないはずなので、`Dto` モジュールの中にドメイン名のサブモジュール（`Person`）を作り、そこに置く。

```fsharp
module Dto =
    module Person =
        let fromDomain (person: Domain.Person): Dto.Person =
            let first = person.First |> String50.value
            let last = person.Last |> String50.value
            let birthdate = person.Birthdate |> Birthdate.value

            { First = first; Last = last; Birthdate = birthdate }

        let toDomain (dto: Dto.Person): Result<Domain.Person, string> =
            result {
                let! first = dto.First |> String50.create "First"
                let! last = dto.Last |> String50.create "Last"
                let! birthdate = dto.Birthdate |> Birthdate.create

                return { First = first; Last = last; Birthdate = birthdate }
            }
```

`fromDomain` は常に成功する。一方、`toDomain` は制約に違反すると失敗するので、戻り値の型は `Result` になる。エラーの流れを扱うために、`result` [[computation-expression|コンピュテーション式]]を使っている（[[Domain Modeling Made Functional 第10章 コンピュテーション式の導入|コンピュテーション式の導入]]）。

### JSON シリアライザのラップ

サードパーティ製の JSON や XML のシリアライザは、戻り値が `Result` でないなど、関数型プログラミングと相性が悪いことがある。.NET の JSON ライブラリ `Newtonsoft.Json` もその 1 つである。この場合は、次のようにラップすればよい。

```fsharp
module Json =
    open Newtonsoft.Json

    let serialize obj =
        JsonConvert.SerializeObject obj

    let deserialize<'a> str =
        try
            JsonConvert.DeserializeObject<'a> str
            |> Result.Ok
        with
        | ex -> Result.Error ex
```

[[fsharp|F#]] に特化したシリアライザには、[FsPickler](https://mbraceproject.github.io/FsPickler/) や [Chiron](https://github.com/xyncro/chiron) がある。

### パイプライン全体

シリアライズのパイプラインは次のように書ける。

```fsharp
let jsonFromDomain (person: Domain.Person) =
    person
    |> Dto.Person.fromDomain
    |> Json.serialize
```

デシリアライズのパイプラインでは、`Json.deserialize` と `Dto.Person.toDomain` が異なるエラー型の `Result` を返す。そこで、共通の[[discriminated-union|選択型]]を作り、`Result.mapError` で[[lift-up|型を持ち上げる]]（[[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）|Result を生成する関数の連鎖（bind と errorMap、map）]]）。

```fsharp
type DtoError =
    | ValidationError of string
    | DeserializationException of exn

let jsonToDomain jsonString : Result<Domain.Person, DtoError> =
    result {
        let! deserializedValue =
            jsonString
            |> Json.deserialize
            |> Result.mapError DeserializationException

        let! domainValue =
            deserializedValue
            |> Dto.Person.toDomain
            |> Result.mapError ValidationError

        return domainValue
    }
```

複数のエラーをまとめて返したい場合は、[[applicative|アプリカティブ]]を使うとよい（[Validation using applicative style](https://fsharpforfunandprofit.com/posts/elevated-world-3/#validation-using-applicative-style)）。

### 複数バージョンのシリアライズ型を扱う

設計は時間とともに変わる。ドメインオブジェクトにフィールドを追加・削除したり、名前を変えたりすると、DTO の型にも影響が及ぶことがある。DTO は[[Domain Modeling Made Functional 第3章 境界づけられたコンテキスト間の契約|境界づけられたコンテキスト間の契約]]として機能する。本書は次のように述べている。

> ドメインイベントまたは DTO の定義を変更する場合、影響を受ける他のコンテキストの所有者と協議してから行う必要がある

DTO が契約として機能するので、この契約を破らないように、複数バージョンの DTO を管理しなければならない場合もある。

## キーワード

- [[serialization|シリアライズ]]
- [[dto|DTO]]
- [[domain-object|ドメインオブジェクト]]
- [[computation-expression|コンピュテーション式]]
- [[lift-up|型を持ち上げる]]
- [[applicative|アプリカティブ]]
- [[fsharp|F#]]
- [[persistence|永続化]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
