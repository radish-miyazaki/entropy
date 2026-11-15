---
title: Domain Modeling Made Functional › 集約
description: イミュータブルなデータでは子のエンティティの変更も集約ルートのレベルで行う。集約は整合性の境界であり、不変条件と永続化の単位でもある
tags: [book-chapter, ddd, fsharp]
date: 2024-07-18
book: "[[Domain Modeling Made Functional]]"
chapter: 5
---

## TL;DR

- イミュータブルなデータでは、子のエンティティを 1 つ変えるだけでも、トップレベルの[[aggregate-root|集約ルート]]のレベルで作業する必要がある。
- [[aggregate|集約]]は整合性の境界であり、[[invariant|不変条件]]が適用される場所であり、[[persistence|永続化]]の基本単位でもある。

## 内容

### 集約と集約ルート

`Order`（注文）と `OrderLine`（注文明細）を例に考える。`Order` は詳細が時間とともに変わっても同じ注文なので、[[entity|エンティティ]]である。`OrderLine` も、数量や価格が変わっても同じ明細なので、エンティティである。

では、ある明細を変更したら、それが属する注文も変更したことになるのか。[[immutability|イミュータブル]]なデータ構造では、そうなる。イミュータブルな `Order` がイミュータブルな `OrderLine` のコレクションを持つ場合、`Order` 全体を作り直す必要がある。

```fsharp
let changeOrderLinePrice order orderLineId newPrice =
    // 1. orderLineId で変更する明細を探す
    let orderLine = order.OrderLines |> findOrderLine orderLineId
    // 2. 新しい価格を持つ明細を作る
    let newOrderLine = { orderLine with Price = newPrice }
    // 3. 古い明細を置き換えた、新しい明細のリストを作る
    let newOrderLines =
        order.OrderLines |> replaceOrderLine orderLineId newOrderLine
    // 4. 明細のリストを置き換えた、新しい注文を作る
    let newOrder = { order with OrderLines = newOrderLines }
    // 5. 注文を返す
    newOrder
```

このように、子のエンティティを 1 つ変えるだけでも、常に `Order` のレベルで作業する。これはよくあることなので名前が付いている。エンティティのまとまりを[[aggregate|集約]]、`Order` のように集約のトップにあるエンティティを[[aggregate-root|集約ルート]]と呼ぶ。

### 集約による整合性と不変条件の担保

集約は、データが更新されるときの[[coherence|整合性]]の境界として働く。集約のある部分が更新されたら、整合性を保つためにほかの部分も更新する必要がある。たとえば、`Order` に合計金額を保存しているなら、明細の価格が変わったときに合計も更新する。この処理は上の `changeOrderLinePrice` の中で行う。

集約は[[invariant|不変条件]]が適用される場所でもある。たとえば「`Order` には少なくとも 1 つの `OrderLine` がある」という条件である（[[Domain Modeling Made Functional 第6章 Integrity and Consistency in the Domain|第6章]]）。

### 集約の参照

[[domain-object|ドメインオブジェクト]]に、ほかの集約のレコードそのものを持たせてはいけない。次のように `Customer` を持たせると、イミュータブルであるがゆえに、`Customer` を更新するたびに `Order` も更新しなければならなくなる。

```fsharp
type Order = {
    OrderId : OrderId
    Customer : Customer
    OrderLines : OrderLine list
}
```

代わりに、参照（アイデンティティ）を持たせる。

```fsharp
type Order = {
    OrderId : OrderId
    CustomerId : CustomerId
    OrderLines : OrderLine list
}
```

### 永続化の単位

集約は[[persistence|永続化]]の基本単位である。データベースからロード・セーブするときは、集約全体を扱う。[[serialization|シリアライズ]]してネットワークで送るときも同じである。データベースのトランザクションは 1 つの集約だけを扱い、複数の集約を含めたり、集約の境界を越えたりしてはならない。

集約は、単なるエンティティの集まりではない。たとえば `Customers`（`Customer` のリスト）はエンティティの集まりだが、トップレベルのエンティティをルートに持たず、整合性の境界にもならないので、集約ではない。

## キーワード

- [[aggregate|集約]]
- [[aggregate-root|集約ルート]]
- [[entity|エンティティ]]
- [[immutability|イミュータブル]]
- [[coherence|整合性]]
- [[invariant|不変条件]]
- [[domain-object|ドメインオブジェクト]]
- [[persistence|永続化]]
- [[serialization|シリアライズ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
