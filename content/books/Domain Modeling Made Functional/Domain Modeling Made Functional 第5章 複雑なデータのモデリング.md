---
title: Domain Modeling Made Functional 第5章 複雑なデータのモデリング
description: AND の組み合わせはレコード型で、OR の選択肢は判別共用体で表し、中身が未定の型は Undefined としておく
tags: [book-chapter, ddd, fsharp]
date: 2024-07-16
book: "[[Domain Modeling Made Functional]]"
chapter: 5
---

## TL;DR

- AND で組み合わせるデータは[[record-type|レコード型]]で、OR の選択肢は[[discriminated-union|判別共用体]]で表す。
- 中身がまだ分からない型は、明示的に未定義の型としておけば、モデリング中もコンパイルできる。

## 内容

[[Domain Modeling Made Functional 第4章 型の合成|型の合成]]で見た型システムを使って、[[domain|ドメイン]]をモデリングする。

### レコード型によるモデリング

AND で組み合わせる[[domain-model|ドメインモデル]]は、[[record-type|レコード型]]で表せる。

```fsharp
type Order = {
    CustomerInfo : CustomerInfo
    ShippingAddress : ShippingAddress
    BillingAddress : BillingAddress
    OrderLines : OrderLine list
    AmountToBill : ...
}
```

### 未知の型のモデリング

設計の初期段階では、型の名前は分かっていても、中の構造が分からないことがある。そのときは、明示的に未定義の型としてモデリングする。[[fsharp|F#]] では、例外型の `exn` に `Undefined` という別名を付けるとよい。

```fsharp
type Undefined = exn

type CustomerInfo = Undefined
```

こうしておけば、ドメインのモデリング中もコードをコンパイルできる。

### 選択型によるモデリング

OR で選ぶドメインモデルは、選択型（[[discriminated-union|判別共用体]]）で表せる。

```fsharp
type ProductCode =
    | Widget of WidgetCode
    | Gizmo of GizmoCode
```

## キーワード

- [[record-type|レコード型]]
- [[discriminated-union|判別共用体]]
- [[domain-model|ドメインモデル]]
- [[fsharp|F#]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
