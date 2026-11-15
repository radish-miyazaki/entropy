---
title: Domain Modeling Made Functional › パイプラインのステップを 1 つに合成する
description: 実装したステップを 1 つのワークフローに合成するとき、入出力の型が合わない問題を部分適用や命令型の書き方で解決する
tags: [book-chapter, ddd, fsharp]
date: 2024-07-31
book: "[[Domain Modeling Made Functional]]"
chapter: 9
---

## TL;DR

- ステップを合成するとき、入力と出力の型が合わない問題によく出くわす。
- 依存関係による余計な入力は、[[partial-application|部分適用]]で取り除ける。依存関係の渡し方は[[Domain Modeling Made Functional 第9章 依存関係の注入]]を参照。
- 部分適用で解決できないときは、関数アダプタを作るか、命令型の書き方にする。

## 内容

### 合成したいワークフロー

[[Domain Modeling Made Functional 第9章 最初のステップの実装]]と[[Domain Modeling Made Functional 第9章 残りのステップの実装]]で実装したステップを、1 つの[[workflow|ワークフロー]]に合成する。目指す形は次のとおりである。

```fsharp
let placeOrder: PlaceOrderWorkflow =
  fun unvalidatedOrder ->
    unvalidatedOrder
    |> validateOrder
    |> priceOrder
    |> acknowledgeOrder
    |> createEvents
```

しかし、このままでは合成できない。`validateOrder` には[[dependency|依存関係]]の入力が 2 つ余計にあるので、前後のステップと入力・出力が一致しない。`priceOrder` も同じである。「形」の異なる関数を合成することは、[[functional-programming|関数型プログラミング]]の主要な課題の 1 つである（[[Domain Modeling Made Functional 第8章 関数合成]]）。解決策には[[monad|モナド]]を使う方法と、部分適用を使う方法がある。

### 部分適用で依存関係を取り除く

関数を値として扱えるので（[[Domain Modeling Made Functional 第8章 ものとしての関数]]）、依存関係のパラメータだけを先に適用して、入力が 1 つだけの関数を作れる。[[fsharp|F#]] ではシャドーイングができるので、同じ名前で定義し直してよい。[[haskell|Haskell]] でよく見るように、末尾に `'` を付けた名前にしてもよい。

```fsharp
let validateOrder =
  validateOrder checkProductCodeExists checkAddressExists

// または
let validateOrder' =
  validateOrder checkProductCodeExists checkAddressExists
```

ワークフロー全体は次のようになる。

```fsharp
let placeOrder: PlaceOrderWorkflow =
  let validateOrder =
    validateOrder checkProductCodeExists checkAddressExists
  let priceOrder =
    priceOrder getProductPrice
  let acknowledgeOrder =
    acknowledgeOrder createOrderAcknowledgmentLetter sendOrderAcknowledgment

  fun unvalidatedOrder ->
    unvalidatedOrder
    |> validateOrder
    |> priceOrder
    |> acknowledgeOrder // ここでエラーになる
    |> createEvents
```

### 部分適用では解決できない問題

まだ問題が残る。`acknowledgeOrder` の出力はイベントであり、`createEvents` の入力と一致しない。この場合は、関数アダプタを書くか、命令型の書き方にすればよい。命令型の書き方では、各ステップの出力を明示的に変数に束縛する。

```fsharp
let placeOrder: PlaceOrderWorkflow =
  fun unvalidatedOrder ->
    let validatedOrder =
      unvalidatedOrder
      |> validateOrder checkProductCodeExists checkAddressExists

    let pricedOrder =
      validatedOrder
      |> priceOrder getProductPrice

    let acknowledgmentOption =
      pricedOrder
      |> acknowledgeOrder createOrderAcknowledgmentLetter sendOrderAcknowledgment

    let events =
      createEvents pricedOrder acknowledgmentOption

    events
```

## キーワード

- [[partial-application|部分適用]]
- [[dependency|依存関係]]
- [[workflow|ワークフロー]]
- [[functional-programming|関数型プログラミング]]
- [[monad|モナド]]
- [[fsharp|F#]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
