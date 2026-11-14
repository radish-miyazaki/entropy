---
title: Domain Modeling Made Functional 第7章 状態の集合による注文のモデリング
description: 状態を持つ注文を、フラグ付きの単一のレコード型ではなく、状態ごとの型と、それらをまとめる選択型でモデリングする
tags: [book-chapter]
date: 2024-07-23
book: "[[Domain Modeling Made Functional]]"
chapter: 7
---

## TL;DR

- 状態が変わるものを 1 つの[[record-type|レコード型]]とフラグで表すと、状態が暗黙的になり、ルールを強制できない。
- 状態ごとに型を作り、それらを[[discriminated-union|選択型]]でまとめると、どの時点の状態も表現できる。

## 内容

[[Domain Modeling Made Functional 第7章 Modeling Workflows as Pipelines|Modeling Workflows as Pipelines]] の一節である。

次の[[workflow|ワークフロー]]では、注文（Order）がさまざまな状態に遷移する。

```text
workflow: "Place order" =
  input: OrderForm
  output:
    OrderPlaced event (put on a pile to send to other teams)
    OR InvalidOrder (put on appropriate pile)

  // ステップ 1
  do ValidateOrder
  If order is invalid then:
    add InvalidOrder to pile
    stop

  // ステップ 2
  do PriceOrder

  // ステップ 3
  do SendAcknowledgmentToCustomer

  // ステップ 4
  return OrderPlaced event (if no errors)
```

注文は、未検証、検証済み、価格計算済み、と状態を変えていく。これをどうモデリングするかを考える。

### 単一のレコード型で表す

1 つのレコード型に、状態を表すフラグを持たせる方法がある。

```fsharp
type Order = {
    ...
    IsValidated: bool          // 検証時後に true
    IsPriced: bool             // 価格計算後に true
    AmountToBill: float option // 価格計算後に設定
}
```

この方法には 3 つの問題がある。

1. 状態が暗黙的なので、処理するのに多くの条件分岐が必要になる。
2. 状態によって必要なフィールドが異なるので、1 つのレコード型で表すと複雑になる。フィールドを `option` にして省略可能にしなければならない。
3. どのフィールドがどのフラグに対応するのかが明確でない。`IsPriced` が設定されていれば `AmountToBill` も設定されている必要があるが、このルールは強制できず、コメントで促すしかない。

### 状態ごとに型を作る

状態ごとに新しい型を作る方法がよい。既存のコードを壊さずに新しい状態を追加できるので、[[open-closed-principle|オープン・クローズドの原則]]にも沿う。

```fsharp
// 検証済みの注文
type ValidatedOrder =
    { OrderId: OrderId
      CustomerInfo: CustomerInfo
      ShippingAddress: Address
      BillingAddress: Address
      OrderLines: ValidatedOrderLine list }

// 価格計算済みの注文
type PricedOrder =
    { OrderId: OrderId
      CustomerInfo: CustomerInfo
      ShippingAddress: Address
      BillingAddress: Address
      OrderLines: ValidatedOrderLine list
      AmountToBill: BillingAmount }
```

取りうる状態の型をすべて作ったら、そこから 1 つを選ぶトップレベルの型を作れる。

```fsharp
type Order =
    | Unvalidated of UnvalidatedOrder
    | Validated of ValidatedOrder
    | Priced of PricedOrder
```

この型は、注文のライフサイクルのどの時点の状態でも表現できる。ストレージに[[persistence|永続化]]したり、他のコンテキストとやり取りしたりするのに使える。

## キーワード

- [[workflow|ワークフロー]]
- [[record-type|レコード型]]
- [[discriminated-union|選択型]]
- [[open-closed-principle|オープン・クローズドの原則]]
- [[persistence|永続化]]
- [[state-machine|ステートマシン]]

## 自分の理解

状態ごとに型を作るのは、言われてみれば当然のやり方だと感じた。
