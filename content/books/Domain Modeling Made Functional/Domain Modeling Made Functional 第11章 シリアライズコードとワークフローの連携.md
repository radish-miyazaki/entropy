---
title: Domain Modeling Made Functional › シリアライズコードとワークフローの連携
description: ワークフローの前にデシリアライズ、後にシリアライズのステップをつなぎ、境界づけられたコンテキスト間の契約となる DTO の形を自分たちで管理する
tags: [book-chapter]
date: 2024-08-03
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- デシリアライズは[[workflow|ワークフロー]]の前、[[serialization|シリアライズ]]はワークフローの後につなげる。
- [[dto|DTO]] は他の[[bounded-context|境界づけられたコンテキスト]]との契約になるので、変更には慎重であるべきだ。シリアライズの方法はライブラリ任せにせず、自分たちで管理する。

## 内容

[[Domain Modeling Made Functional 第11章 Serialization|第11章 Serialization]]の一部である。

### ワークフローの前後にステップを足す

ワークフローの前にデシリアライズのステップを、後にシリアライズのステップを追加する。たとえば、次のワークフローを考える。

```fsharp
type MyInputType = ...
type MyOutputType = ...

type Workflow = MyInputType -> MyOutputType
```

このとき、デシリアライズのステップは、JSON 文字列を DTO に変換する関数と、DTO を入力の型に変換する関数の 2 つになる。

```fsharp
type JsonString = string
type MyInputDto = ...

type DeserializeInputDto = JsonString -> MyInputDto
type InputDtoToDomain = MyInputDto -> MyInputType
```

同じように、シリアライズのステップは、出力の型を DTO に変換する関数と、DTO を JSON 文字列に変換する関数になる。

```fsharp
type MyOutputDto = ...

type OutputDtoFromDomain = MyOutputType -> MyOutputDto
type SerializeOutputDto = MyOutputDto -> JsonString
```

これらの関数は 1 本のパイプラインでつながる。インフラストラクチャ層に公開されるのは、この関数である。

```fsharp
let workflowWithSerialization jsonString =
    jsonString
    |> deserializeInputDto  // JSON から DTO
    |> inputDtoToDomain     // DTO からドメインオブジェクト
    |> workflow             // ドメインのコアワークフロー
    |> outputDtoFromDomain  // ドメインオブジェクトから DTO
    |> serializeOutputDto   // DTO から JSON
```

### 境界づけられたコンテキスト間の契約としての DTO

ワークフローが受け取る[[command|コマンド]]は、他の境界づけられたコンテキストの出力である[[domain-event|ドメインイベント]]によってトリガされる。そして、このワークフローの出力が、さらに別の境界づけられたコンテキストの入力になる。

このドメインイベントとコマンドによって、境界づけられたコンテキストが従うべき契約の形が決まる（[[Domain Modeling Made Functional 第3章 境界づけられたコンテキスト間の契約|境界づけられたコンテキスト間の契約]]）。境界づけられたコンテキスト同士の密結合は避けたいので、この契約は厳しいものではない。それでも、DTO を変更するときは慎重であるべきだ。

そのためには、ライブラリの暗黙の変換に任せず、DTO を自分たちで管理する必要がある。大事なのは、シリアライズされる形をこちらでコントロールすることである。

## キーワード

- [[serialization|シリアライズ]]
- [[workflow|ワークフロー]]
- [[dto|DTO]]
- [[command|コマンド]]
- [[domain-event|ドメインイベント]]
- [[bounded-context|境界づけられたコンテキスト]]

## 自分の理解

DTO の変更に慎重であるべきなのは、DTO がコマンドをシリアライズしたフォーマットであり、変更が他のコンテキストに影響を及ぼしうるからだと理解した（ここは少し自信がない）。

「シリアライズライブラリを使うな」ということではない。シリアライズされる形をこちらでコントロールすることが大事なのであって、実際に[[Domain Modeling Made Functional 第11章 シリアライズの全体例|シリアライズの全体例]]では `Newtonsoft.Json` を使っている。
