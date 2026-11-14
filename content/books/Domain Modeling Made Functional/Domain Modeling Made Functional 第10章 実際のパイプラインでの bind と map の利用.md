---
title: Domain Modeling Made Functional 第10章 実際のパイプラインでの bind と map の利用
description: 注文確定のパイプラインに Result を導入し、mapError、bind、map で合成し直す。入力が複数ある関数は別の対策が必要になる
tags: [book-chapter, ddd, fsharp]
date: 2024-08-05
book: "[[Domain Modeling Made Functional]]"
chapter: 10
---

## TL;DR

- パイプラインの各ステップに `Result` を導入し、`mapError` でエラー型をそろえ、`bind` と `map` で合成し直す。
- 入力が複数ある関数はこの方法では合成できず、[[Domain Modeling Made Functional 第10章 コンピュテーション式の導入]]で解決する。

## 内容

[[Domain Modeling Made Functional 第9章 Implementation： Composing a Pipeline|第9章]]の各ステップに `Result` を導入し、合成し直す。ここでは `Async` と依存関係は無視する。

「注文の検証」と「価格計算」は失敗する可能性があるので、`Result` を返す。

```fsharp
type ValidateOrder =
  UnvalidatedOrder -> Result<ValidatedOrder, ValidationError>

type PriceOrder =
  ValidatedOrder -> Result<PricedOrder, PricingError>
```

一方、「注文の確認」と「イベントの作成」は常に成功するので、`Result` を返さない。

```fsharp
type AcknowledgeOrder =
  PricedOrder -> OrderAcknowledgmentSent option

type CreateEvents =
  PricedOrder -> OrderAcknowledgmentSent option -> PlaceOrderEvent list
```

合成は 3 段階で行う。まず、`ValidationError` と `PricingError` には互換性がないので、両方をケースに持つ[[discriminated-union|選択型]]を作る。

```fsharp
type PlaceOrderError =
  | Validation of ValidationError
  | Pricing of PricingError
```

次に、`mapError` で合成できる形の関数にする。

```fsharp
let validateOrderAdapted input =
  input
  |> validateOrder
  |> Result.mapError PlaceOrderError.Validation

let priceOrderAdapted input =
  input
  |> priceOrder
  |> Result.mapError PlaceOrderError.Pricing
```

最後に `bind` で合成する。`acknowledgeOrder` と `createEvents` は `Result` を返さないので、`map` で 2 トラックの関数に変換する（[[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）]]）。

```fsharp
// val placeOrder : UnvalidatedOrder -> Result<PlaceOrderEvent list, PlaceOrderError>
let placeOrder unvalidatedOrder =
  unvalidatedOrder
  |> validateOrderAdapted
  |> Result.bind priceOrderAdapted
  |> Result.map acknowledgeOrder
  |> Result.map createEvents
```

ただし、このコードはコンパイルエラーになる。`acknowledgeOrder` の出力は `Result<OrderAcknowledgmentSent option, PlaceOrderError>` だが、`createEvents` は `PricedOrder` と `OrderAcknowledgmentSent option` の 2 つを入力に取るので、一致しない。

## キーワード

- [[railway-oriented-programming|鉄道指向プログラミング]]
- [[discriminated-union|選択型]]
- [[workflow|ワークフロー]]
- [[error-handling|エラー処理]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
