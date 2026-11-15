---
title: Domain Modeling Made Functional › 列挙型を DTO に変換する
description: データを持たないケースだけの選択型は、DTO では整数の列挙型で表現し、デシリアライズでは値が定義済みかを必ずチェックする
tags: [book-chapter]
date: 2024-08-07
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- データを持たないケースだけの選択型は、[[dto|DTO]] では一般に整数の列挙型で表現する。
- デシリアライズするときは、値が定義済みのものかを必ずチェックする。

## 内容

[[Domain Modeling Made Functional 第11章 ドメイン型を DTO に変換する方法|ドメイン型を DTO に変換する方法]]の 1 つである。

[[domain-object|ドメインオブジェクト]]を、余計なデータを持たない[[discriminated-union|選択型]]で表現することがある（[[Domain Modeling Made Functional 第4章 型の合成|型の合成]]）。

```fsharp
type Color =
    | Red
    | Blue
    | Green
```

このような型の DTO は、一般に整数の列挙型で表現する。

```fsharp
type Color =
    | Red = 1
    | Blue = 2
    | Green = 3
```

列挙型には定義していない整数も入りうるので、デシリアライズするときは、値が定義済みのものかを必ずチェックする。

```fsharp
let toDomain dto: Result<Color,_> =
    match dto with
    | Color.Red -> Ok Domain.Color.Red
    | Color.Blue -> Ok Domain.Color.Blue
    | Color.Green -> Ok Domain.Color.Green
    | _ -> Error (sprintf "Color %O is not one of Red, Green, Blue" dto)
```

## キーワード

- [[dto|DTO]]
- [[discriminated-union|選択型]]
- [[domain-object|ドメインオブジェクト]]

## 自分の理解

文字列で表現してもよいが、名前が変わったときに手間がかかる。
