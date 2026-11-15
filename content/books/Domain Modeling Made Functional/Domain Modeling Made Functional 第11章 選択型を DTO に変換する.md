---
title: Domain Modeling Made Functional › 選択型を DTO に変換する
description: 選択型は、使われたケースを示すタグと、ケースごとのデータを持つフィールドからなるレコード型で表現し、フォーマットを自分でコントロールする
tags: [book-chapter]
date: 2024-08-07
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- [[discriminated-union|選択型]]は、使われたケースを示す「タグ」と、ケースごとのデータを持つ「フィールド」からなるレコード型で表現する。
- デシリアライズでは、タグに対応するデータが `null` でないことを必ずチェックする。

## 内容

[[Domain Modeling Made Functional 第11章 ドメイン型を DTO に変換する方法|ドメイン型を DTO に変換する方法]]の 1 つである。

### 選択型は特殊なレコード型で表現する

選択型は、次の 2 つを持つレコード型として表現できる。

- どのケースが使われたかを示す「タグ」
- 各ケースに対応するデータを入れる「フィールド」

シリアライザによっては選択型を直接扱えるものもあるが、出力のフォーマットはたいていコントロールできない。別のシリアライザを使う別の[[bounded-context|境界づけられたコンテキスト]]がそのフォーマットを知らないと、問題になることがある。そのため、フォーマットは明示的にコントロールしたほうがよい（[[Domain Modeling Made Functional 第11章 シリアライズコードとワークフローの連携|シリアライズコードとワークフローの連携]]）。

```fsharp
// ドメイン
type Name =
    { First: String50
      Last: String50 }

type Example =
    | A
    | B of int
    | C of string list
    | D of Name

// DTO
type NameDto =
    { First: string
      Last: string }

type ExampleDto =
    { Tag: string
      BData: Nullable<int>
      CData: string[]
      DData: NameDto }
```

### シリアライズの実装

```fsharp
let nameDtoFromDomain (name: Domain.Name): NameDto =
    let first = name.First |> String50.value
    let last = name.Last |> String50.value
    { First = first; Last = last }

let fromDomain (domainObj: Domain.Example): ExampleDto =
    let nullBData = Nullable()
    let nullCData = null
    let nullDData = Unchecked.defaultof<NameDto>

    match domainObj with
    | A ->
        { Tag = "A"; BData = nullBData; CData = nullCData; DData = nullDData }
    | B i ->
        let bdata = Nullable i
        { Tag = "B"; BData = bdata; CData = nullCData; DData = nullDData }
    | C strList ->
        let cdata = strList |> List.toArray
        { Tag = "C"; BData = nullBData; CData = cdata; DData = nullDData }
    | D name ->
        let ddata = name |> nameDtoFromDomain
        { Tag = "D"; BData = nullBData; CData = nullCData; DData = ddata }
```

ケースごとに `null` の作り方が違う。

- B: `Nullable<_>` には `null` を直接代入できないので、`Nullable` のコンストラクタを使う（[null 許容値型 - F#](https://learn.microsoft.com/ja-jp/dotnet/fsharp/language-reference/nullable-value-types)、[Nullable\<T\> コンストラクター](<https://learn.microsoft.com/ja-jp/dotnet/api/system.nullable-1.-ctor?view=net-8.0#system-nullable-1-ctor(-0)>)）
- C: 配列は .NET のクラスなので、`null` を代入できる
- D: `NameDto` のようなレコードにも `null` を代入できないので、`Unchecked.defaultof<_>` で `null` 値を作る（[Unchecked.defaultof](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-core-operators-unchecked.html#defaultof)）

### デシリアライズの実装

「タグ」フィールドでマッチさせ、ケースごとに処理する。このとき、タグに対応するデータが `null` でないことを必ずチェックする。

```fsharp
let nameDtoToDomain (nameDto: NameDto): Result<Domain.Name,string> =
    result {
        let! first = nameDto.First |> String50.create
        let! last = nameDto.Last |> String50.create
        return { First = first; Last = last }
    }

let toDomain dto: Result<Domain.Example,string> =
    match dto.Tag with
    | "A" -> Ok A
    | "B" ->
        if dto.BData.HasValue then
            dto.BData.Value |> B |> Ok
        else
            Error "B data not expected to be null"
    | "C" ->
        match dto.CData with
        | null -> Error "C data not expected to be null"
        | _ -> dto.CData |> Array.toList |> C |> Ok
    | "D" ->
        match box dto.DData with
        | null -> Error "D data not expected to be null"
        | _ ->
            dto.DData
            |> nameDtoToDomain // Result<Domain.Name,string>
            |> Result.map D    // Result<Example.D,string>
    | _ ->
        let msg = sprintf "Tag '%s' not recognized" dto.Tag
        Error msg
```

## キーワード

- [[dto|DTO]]
- [[discriminated-union|選択型]]
- [[bounded-context|境界づけられたコンテキスト]]
- [[serialization|シリアライズ]]

## 自分の理解

`box` が何をしているのか最初は分からなかった。値を `obj` 型（`System.Object`）に変換することで、`null` でパターンマッチできるようにしているようだ（[オブジェクト - F# 入門](http://www.fsharpintro.net/object.html)）。
