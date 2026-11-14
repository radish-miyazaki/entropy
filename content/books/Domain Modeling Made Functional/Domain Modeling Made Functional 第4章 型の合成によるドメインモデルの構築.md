---
title: Domain Modeling Made Functional 第4章 型の合成によるドメインモデルの構築
description: 合成可能な型システムを使うと、型を組み合わせるだけで複雑なドメインモデルをすばやく作れる。振る舞いは関数を表す型で定義する
tags: [book-chapter, ddd, fsharp]
date: 2024-07-12
book: "[[Domain Modeling Made Functional]]"
chapter: 4
---

## TL;DR

- 合成可能な型システムは、型を組み合わせるだけで複雑なモデルを作れるので、[[domain-driven-design|ドメイン駆動設計]]の大きな助けになる。
- 型には振る舞いがないので、代わりに関数を表す型を定義する。

## 内容

### 型を組み合わせてモデルを作る

E コマースサイトで支払いを追跡する例で、型を組み合わせて[[domain-model|ドメインモデル]]を作る流れを見る。

まず、小切手番号のようなプリミティブ型のラッパーを[[single-case-union|単純型]]として定義する。

```fsharp
type CheckNumber = CheckNumber of int
type CardNumber = CardNumber of string
```

次に、単純な AND 型や OR 型で低レベルの型を作る。カードの種類、カードの情報、支払い方法がこれにあたる。

```fsharp
type CardType = Visa | Mastercard

type CreditCardInfo = {
    CardType : CardType
    CardNumber : CardNumber
}

type PaymentMethod =
    | Cash                   // 現金
    | Check of CheckNumber   // 小切手
    | Card of CreditCardInfo // カード
```

支払い金額や通貨のような基本的な型も定義する。

```fsharp
type PaymentAmount = PaymentAmount of float
type Currency = EUR | USD
```

最後に、これらを組み合わせてトップレベルの型である支払いを作る。

```fsharp
type Payment = {
    Amount : PaymentAmount
    Currency : Currency
    Method : PaymentMethod
}
```

### 振る舞いは関数の型で表す

ここまでの型はただの型なので、振る舞いを持たない。振る舞いは、関数を表す型として定義する。たとえば、`Payment` を使って未払いの請求書を処理し、支払い済みの請求書を返す処理は次のように書ける。

```fsharp
type PayInvoice =
    UnpaidInvoice -> Payment -> PaidInvoice
```

支払いをある通貨から別の通貨に変換する処理は次のようになる。

```fsharp
type ConvertPaymentCurrency =
    Payment -> Currency -> Payment
```

## キーワード

- [[domain-driven-design|ドメイン駆動設計]]
- [[domain-model|ドメインモデル]]
- [[algebraic-type-system|代数的な型システム]]
- [[single-case-union|単純型]]
- [[record-type|レコード型]]
- [[discriminated-union|判別共用体]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
