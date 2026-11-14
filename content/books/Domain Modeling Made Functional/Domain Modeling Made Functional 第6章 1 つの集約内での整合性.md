---
title: Domain Modeling Made Functional 第6章 1 つの集約内での整合性
description: 集約は整合性の境界であり永続化の単位なので、派生値の更新は集約ルートの関数の中で行い、同じトランザクションで保存する
tags: [book-chapter, ddd, fsharp]
date: 2024-07-19
book: "[[Domain Modeling Made Functional]]"
chapter: 6
---

## TL;DR

- [[aggregate|集約]]は[[coherence|整合性]]の境界なので、合計金額のような派生値は、明細を更新する関数の中で一緒に更新する。
- 集約は[[persistence|永続化]]の単位でもあり、集約ルートと子のエンティティは同じトランザクションで保存する。

## 内容

### 整合性の境界

[[Domain Modeling Made Functional 第5章 集約|第5章]]で見たように、集約は整合性の境界である。たとえば、注文の合計金額は各明細の金額の合計と同じでなければならない。

これは、値を保存せずに生データから計算するのが一番楽である。ただし、状況によっては追加のデータを永続化する必要もある。トップレベルの `Order` に `AmountToBill` を持たせる場合、データの整合性を保つため、どれかの明細が更新されたら合計も更新する。

```fsharp
let changeOrderLinePrice order orderLineId newPrice =
    let orderLine = order.OrderLines |> findOrderLine orderLineId
    let newOrderLine = { orderLine with Price = newPrice }
    let newOrderLines =
        order.OrderLines |> replaceOrderLine orderLineId newOrderLine
    let newAmountToBill = newOrderLines |> List.sumBy (fun line -> line.Price)
    let newOrder = {
        order with
            OrderLines = newOrderLines
            AmountToBill = newAmountToBill
    }
    newOrder
```

### 永続化の単位

集約は永続化の単位でもある。`Order` を RDB に保存するときは、`Order` 自身と各 `OrderLine` を同じトランザクションで挿入・更新しなければならない。

## キーワード

- [[aggregate|集約]]
- [[coherence|整合性]]
- [[persistence|永続化]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
