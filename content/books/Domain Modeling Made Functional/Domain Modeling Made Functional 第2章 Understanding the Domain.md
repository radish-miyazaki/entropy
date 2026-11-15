---
title: Domain Modeling Made Functional › Understanding the Domain
description: 開発者目線を捨ててドメインエキスパートにインタビューし、データベースやクラスの先入観を持ち込まずに、ワークフローとデータ構造をテキストで文書化する章
tags: [book-chapter, ddd, domain-modeling-made-functional]
date: 2024-07-03
book: "[[Domain Modeling Made Functional]]"
chapter: 2
---

## TL;DR

- ドメインを理解するときは開発者目線を捨て、自分の[[mental-model|メンタルモデル]]を押し付けない。データベースやクラスの先入観を設計に持ち込まない。
- [[workflow|ワークフロー]]は、[[domain-expert|ドメインエキスパート]]にも分かるシンプルなテキストで文書化する。

## 内容

### ドメインエキスパートへのインタビュー

[[domain|ドメイン]]を十分に理解するには、ドメインエキスパートにインタビューする必要がある。ドメインエキスパートは忙しいことが多いが、1 つのワークフローに絞った短いインタビューなら何度も行える。

良いインタビューとは、相手の話をしっかり聞くことである。ドメインについて学ぶ最良の方法は、[[preconception|先入観]]を持たないことである。設計を決める前に、人々の仕事ぶりを観察したりユーザビリティテストを行ったりするのが理想である。データベース駆動設計やクラス駆動設計は先入観を持ち込みやすいので、自分のメンタルモデルを押し付けないよう気をつける。

設計に関係のない細かい情報に振り回されるのを避けるため、インタビューの最初は、ワークフローのインプットとアウトプットだけに大まかに焦点を当てる。ワークフローのアウトプットは、そのワークフローが生成するイベントである。このイベントは、他の[[bounded-context|境界づけられたコンテキスト]]でのアクションのトリガーになるものでなければならない。

### データベース駆動設計を持ち込まない

[[domain-driven-design|DDD]] では、データベーススキーマではなくドメインから設計を導く。ユーザはデータがどう永続化されるかを気にしないので、紙で運用されている現実の業務では、「データベース」という概念は[[ubiquitous-language|ユビキタス言語]]に含まれない。DDD では、これを[[persistence-ignorance|永続性非依存]]と呼ぶ。データベースの視点で設計すると、データベースのモデルに合わせて設計を歪めてしまうことが多い。

### クラス駆動設計を持ち込まない

データベース駆動設計と同じく、クラス駆動設計も設計に先入観を持ち込みうる。たとえば、現実の世界には存在しない `OrderBase` のようなクラスを導入してしまう。

### ドメインの文書化

ER 図やクラス図を使わずに、要件をどう記録すればよいか。UML も使えるが、扱いにくく、ドメインの微妙な部分を表現しきれないこともある。

そこで、ドメインモデルを表すシンプルなテキストベースの言語で記録する。これならプログラマ以外のドメインエキスパートとも一緒に作業できる。

- **ワークフロー**: 主にインプットとアウトプットを文書化する。ビジネスロジックは簡単な疑似コードで書く。
- **データ構造**: `Name AND Address` のように `AND` で両方が必須であることを、`Email OR PhoneNumber` のように `OR` でどちらか一方が必須であることを表す。

注文確定のワークフローを例にすると、ワークフローは次のように書ける。

```text
bounded context: Order-Taking

workflow: "Place order" =
    input: UnvalidatedOrder
    output (on success):
        OrderAcknowledgmentSent
        AND OrderPlaced (to send to shipping)
        AND BillableOrderPlaced (to send to billing)
    output (on error):
        ValidationError

    // ステップ 1
    do ValidateOrder
    If order is invalid then:
        return with ValidationError

    // ステップ 2
    do PriceOrder

    // ステップ 3
    do SendAcknowledgmentToCustomer

    // ステップ 4
    create and return the events

substep "ValidateOrder" =
    input: UnvalidatedOrder
    output: ValidatedOrder OR ValidationError
    dependencies: CheckProductCodeExists, CheckAddressExists

    validate the customer name
    check that the shipping and billing address exist
    for each line:
        check product code syntax
        check that product code exists in ProductCatalog

    if everything is OK, then:
        return ValidatedOrder
    else
        return ValidationError

substep "PriceOrder" =
    input: ValidatedOrder
    output: PricedOrder
    dependencies: GetProductPrice

    for each line:
        get the price for the product
        set the price for the line
    set the amount to bill ( = sum of the line prices )

substep "SendAcknowledgmentToCustomer" =
    input: PricedOrder
    output: None

    create acknowledgment letter and send it
    and the priced order to the customer
```

データ構造は次のように書ける。

```text
bounded context: Order-Taking

data WidgetCode = string starting with "W" then 4 digits
data GizmoCode = string starting with "G" then 3 digits
data ProductCode = WidgetCode OR GizmoCode

data UnitQuantity = integer between 1 and 1000
data KilogramQuantity = float between 0.05 and 100.00
data OrderQuantity = UnitQuantity OR KilogramQuantity

data UnvalidatedOrder =
    UnvalidatedCustomerInfo
    AND UnvalidatedShippingAddress
    AND UnvalidatedBillingAddress
    AND list of UnvalidatedOrderLine

data UnvalidatedOrderLine =
    UnvalidatedProductCode
    AND UnvalidatedOrderQuantity

data ValidatedOrder =
    ValidatedCustomerInfo
    AND ValidatedShippingAddress
    AND ValidatedBillingAddress
    AND list of ValidatedOrderLine

data ValidatedOrderLine =
    ValidatedProductCode
    AND ValidatedOrderQuantity

data PricedOrder =
    ValidatedCustomerInfo
    AND ValidatedShippingAddress
    AND ValidatedBillingAddress
    AND list of PricedOrderLine
    AND AmountToBill

data PricedOrderLine =
    ValidatedOrderLine
    AND LinePrice

data PlacedOrderAcknowledgment =
    PricedOrder
    AND AcknowledgmentLetter
```

## キーワード

- [[domain-expert|ドメインエキスパート]]
- [[mental-model|メンタルモデル]]
- [[preconception|先入観]]
- [[workflow|ワークフロー]]
- [[persistence-ignorance|永続性非依存]]
- [[ubiquitous-language|ユビキタス言語]]
- [[bounded-context|境界づけられたコンテキスト]]

## 自分の理解

このテキストの構文は、日本語話者にとってはかなりハードルが高い気がする。それなら、[[japanese-domain-names|ドメインに日本語を使えば]]よいのではないか。
