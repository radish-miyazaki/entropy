---
title: Domain Modeling Made Functional › 依存関係をパラメータに含めるか
description: 公開 API の関数では依存関係を隠し、内部の関数では依存関係をパラメータとして明示する
tags: [book-chapter]
date: 2024-07-26
book: "[[Domain Modeling Made Functional]]"
chapter: 7
---

## TL;DR

- [[dependency|依存関係]]をパラメータに含めるかは、その型を公開 API にするかで決まる。
- 公開する型（[[workflow|ワークフロー]]など）では、呼び出し側が知る必要がないので依存関係を含めない。
- 公開しない型（ワークフローの各ステップなど）では、各ステップが必要とするものを文書化できるので依存関係を含める。

## 内容

[[Domain Modeling Made Functional 第7章 Modeling Workflows as Pipelines|Modeling Workflows as Pipelines]] の一節である。

[[Domain Modeling Made Functional 第7章 エフェクトの文書化|エフェクトの文書化]]では、依存関係をはっきりさせるため、各ステップでパラメータとして表した。

```fsharp
type ValidateOrder =
    CheckProductCodeExists                              // 依存関係
        -> CheckAddressExists                           // 依存関係
        -> UnvalidatedOrder                             // 入力
        -> AsyncResult<ValidatedOrder, ValidationError> // 出力

type PriceOrder =
    GetProductPrice                          // 依存関係
        -> ValidatedOrder                    // 入力
        -> Result<PricedOrder, PricingError> // 出力
```

一方で、処理の中身は隠すべきだという意見もある。その場合、型は次のようになる。

```fsharp
type ValidateOrder =
    UnvalidatedOrder                                    // 入力
        -> AsyncResult<ValidatedOrder, ValidationError> // 出力

type PriceOrder =
    ValidatedOrder                           // 入力
        -> Result<PricedOrder, PricingError> // 出力
```

どちらの方法でもよいが、次の指針に従うとよい。

- **公開する関数では、依存関係を隠す。** 呼び出し側は依存関係を知る必要がないので、たとえばワークフローを表す型は `type PlaceOrderWorkflow = PriceOrder -> AsyncResult<PlaceOrderEvent list, PlaceOrderError>` とする（[[A Philosophy of Software Design 第4章 Modules Should Be Deep|A Philosophy of Software Design 第4章]]）。
- **内部で使う関数では、依存関係を明示する。** たとえば `ValidateOrder` や `PriceOrder` のようなステップの型である。こうすると、各ステップが実際に必要とするものを文書化できる。また、あるステップの依存関係が変わったときは、そのステップの関数の型を変え、それに合わせて実装も変えることになる。

## キーワード

- [[dependency|依存関係]]
- [[workflow|ワークフロー]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
