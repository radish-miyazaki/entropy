---
title: Domain Modeling Made Functional › 関数によるワークフローのモデリング
description: ワークフローは関数の型でモデリングし、複数の入出力はレコード型や選択型で、エフェクトは Result や Async で型シグネチャに表す
tags: [book-chapter, ddd, fsharp]
date: 2024-07-17
book: "[[Domain Modeling Made Functional]]"
chapter: 5
---

## TL;DR

- [[ubiquitous-language|ユビキタス言語]]の名詞は型で、動詞にあたる[[business-process|ビジネスプロセス]]や[[workflow|ワークフロー]]は関数の型でモデリングする。
- 複数の入出力はレコード型や選択型で表し、失敗や非同期といった[[side-effect|エフェクト]]は型シグネチャに書く。

## 内容

### ワークフローは関数の型で表す

[[Domain Modeling Made Functional 第5章 単純な値のモデリング|単純な値のモデリング]]と[[Domain Modeling Made Functional 第5章 複雑なデータのモデリング|複雑なデータのモデリング]]で、ユビキタス言語の名詞はモデリングできるようになった。一方、動詞にあたるビジネスプロセスや、それを構成するワークフローは、関数の型としてモデリングする。たとえば、注文書を検証するワークフローは次のように書ける。

```fsharp
type ValidateOrder = UnvalidatedOrder -> ValidatedOrder
```

### 複数の入力と出力

関数には入力と出力が 1 つずつしかないが、ワークフローには複数の入力や出力（[[domain-event|ドメインイベント]]）を持つものがある。

出力をすべて返す場合は、すべてを格納できる[[record-type|レコード型]]を使う。

```fsharp
type PlaceOrderEvents = {
    AcknowledgmentSent : AcknowledgmentSent
    OrderPlaced : OrderPlaced
    BillableOrderPlaced : BillableOrderPlaced
}
```

出力のどれか 1 つを返す場合は、選択型（[[discriminated-union|判別共用体]]）を使う。

```fsharp
type EnvelopeContents = EnvelopeContents of string
type CategorizedMail =
    | Quote of QuoteForm
    | Order of OrderForm
    // etc
```

同じワークフローに入力の選択肢がある場合も、選択型を使う。複数の入力がすべて必須の場合は、各入力を別々のパラメータとして渡すか、レコード型にまとめる。

```fsharp
type CalculatePrices = OrderForm -> ProductCatalog -> PricedOrder

type CalculatePricesInput = {
    OrderForm : OrderForm
    ProductCatalog : ProductCatalog
}

type CalculatePrices = CalculatePricesInput -> PricedOrder
```

レコード型にするのは、すべての入力が常に必須で、互いに強く結びついている場合だけにする。別々のパラメータとして渡せば、[[dependency-injection|依存性の注入]]ができる。

### 関数のシグネチャでエフェクトを文書化する

検証のように失敗する可能性がある処理は、[[Domain Modeling Made Functional 第4章 省略可能な値、エラー、およびコレクションのモデリング|第4章]]で見た `Result` 型を使って表す。

```fsharp
type ValidateOrder =
    UnvalidatedOrder -> Result<ValidatedOrder, ValidationError list>

type ValidationError = {
    FieldName : string
    ErrorDescription : string
}
```

[[functional-programming|関数型プログラミング]]では、関数が主な出力以外に行うことを[[side-effect|エフェクト]]と呼ぶ。`Result` はエラーのエフェクトを持つ可能性があることを、`Async` は非同期であることを文書化する。複数のエフェクトを組み合わせることもできる。

```fsharp
type ValidateOrder =
    UnvalidatedOrder -> Async<Result<ValidatedOrder, ValidationError list>>
```

ただし、すべてのエフェクトをそのまま書くと読みにくい。[[type-alias|型エイリアス]]を使ってまとめるとよい。

```fsharp
type ValidationResponse<'a> = Async<Result<'a, ValidationError list>>

type ValidateOrder =
    UnvalidatedOrder -> ValidationResponse<ValidatedOrder>
```

## キーワード

- [[ubiquitous-language|ユビキタス言語]]
- [[business-process|ビジネスプロセス]]
- [[workflow|ワークフロー]]
- [[domain-event|ドメインイベント]]
- [[record-type|レコード型]]
- [[discriminated-union|判別共用体]]
- [[dependency-injection|依存性の注入]]
- [[result-type|Result 型]]
- [[side-effect|エフェクト]]
- [[type-alias|型エイリアス]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
