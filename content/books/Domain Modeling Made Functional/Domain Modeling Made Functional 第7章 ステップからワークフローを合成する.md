---
title: Domain Modeling Made Functional › ステップからワークフローを合成する
description: 各ステップの入出力の型が一致しないため、そのままではステップを合成してワークフローを作れない
tags: [book-chapter]
date: 2024-07-26
book: "[[Domain Modeling Made Functional]]"
chapter: 7
---

## TL;DR

- 各ステップの入出力の型が一致しないので、ステップからワークフローを合成するのは難しい。
- 解決策は、[[Domain Modeling Made Functional 第8章 関数合成|関数合成]]、[[Domain Modeling Made Functional 第9章 Implementation： Composing a Pipeline|第9章 Implementation: Composing a Pipeline]]、[[Domain Modeling Made Functional 第10章 Implementation： Working with Errors|第10章 Implementation: Working with Errors]] で扱う。

## 内容

[[Domain Modeling Made Functional 第7章 Modeling Workflows as Pipelines|Modeling Workflows as Pipelines]] の一節である。

[[Domain Modeling Made Functional 第7章 型を使ったワークフローの各ステップのモデリング|型を使ったワークフローの各ステップのモデリング]]と[[Domain Modeling Made Functional 第7章 エフェクトの文書化|エフェクトの文書化]]で作ったステップを合成して、[[workflow|ワークフロー]]全体を組み立てたい。しかし、これは一筋縄ではいかない。依存関係を無視して、各ステップの入出力だけを並べてみる。

```fsharp
// 検証
type ValidateOrder =
    UnvalidatedOrder -> AsyncResult<ValidatedOrder, ValidationError>

// 価格設定
type PriceOrder = ValidatedOrder -> Result<PricedOrder, PricingError>

// 注文確認
type Acknowledgment = PricedOrder -> Async<OrderAcknowledgmentSent option>

// 返すイベントの作成
type CreateEvents = PricedOrder -> PlaceOrderEvent list
```

入出力の型がまったく一致していないので、このままでは合成できない。これは型駆動設計でよく起こる問題である。ステップどうしに互換性を持たせ、互いに合うようにする必要がある。

## キーワード

- [[workflow|ワークフロー]]
- [[function-composition|関数合成]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
