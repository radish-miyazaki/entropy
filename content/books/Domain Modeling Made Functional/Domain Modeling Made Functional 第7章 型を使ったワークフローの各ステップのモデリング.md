---
title: Domain Modeling Made Functional 第7章 型を使ったワークフローの各ステップのモデリング
description: 注文確定ワークフローの検証、価格設定、注文確認、イベント作成の各ステップを、依存関係を含む関数の型で表す
tags: [book-chapter]
date: 2024-07-23
book: "[[Domain Modeling Made Functional]]"
chapter: 7
---

## TL;DR

- ワークフローの各ステップを、依存関係、入力、出力を並べた関数の型で表す。
- 依存関係は関数として扱い、その型シグネチャが後で実装するインタフェースになる。
- ワークフローが返すイベントは、[[discriminated-union|選択型]]のリストで表す。

## 内容

[[Domain Modeling Made Functional 第7章 Modeling Workflows as Pipelines|Modeling Workflows as Pipelines]] の一節である。[[state-machine|ステートマシン]]の考え方を使って、注文確定[[workflow|ワークフロー]]の各ステップをモデリングする。

### 検証のステップ

```text
substep "ValidateOrder" =
  input: UnvalidatedOrder
  output: ValidatedOrder OR ValidationError
  dependencies: CheckProduceCodeExists, CheckAddressExists
```

このステップには、入力に加えて 2 つの[[dependency|依存関係]]がある。製品コードが存在するかを調べる関数と、住所が存在するかを調べる関数である。

このような依存関係は、関数（サービス）として扱う。関数の型シグネチャは後で実装する[[interface|インタフェース]]になるので、実装を差し替えられる。

```fsharp
type CheckProductCodeExists = ProductCode -> bool

type CheckedAddress = CheckedAddress of UnvalidatedAddress
type AddressValidationError = AddressValidationError of string

type CheckAddressExists =
    UnvalidatedAddress -> Result<CheckedAddress, AddressValidationError>
```

依存関係を定義できたので、検証のステップは次のように書ける。入出力の型は定義済みとする（[[Domain Modeling Made Functional 第7章 ワークフローの入力|ワークフローの入力]]）。

```fsharp
type ValidateOrder =
    CheckProductCodeExists                         // 依存関係
        -> CheckAddressExists                      // 依存関係
        -> UnvalidatedOrder                        // 入力
        -> Result<ValidatedOrder, ValidationError> // 出力
```

依存関係を先頭に置くのは、[[partial-application|部分適用]]をしやすくするためである。`CheckAddressExists` が `Result` を返すので、この関数全体の戻り値も `Result` にする必要がある。

### 価格設定のステップ

```text
substep "PriceOrder" =
  input: ValidatedOrder
  output: PricedOrder
  dependencies: GetProductPrice
```

このステップには、製品コードを受け取って価格を返す依存関係が 1 つある。

```fsharp
type GetProductPrice =
    ProductCode -> Price

type PriceOrder =
    GetProductPrice       // 依存関係
        -> ValidatedOrder // 入力
        -> PricedOrder    // 出力
```

### 注文確認のステップ

このステップでは、確認書を作って顧客に送る。確認書には、メールで送る HTML 文字列を含める。HTML 文字列も[[single-case-union|単純型]]としてモデリングする。

```fsharp
type HtmlString = HtmlString of string

type OrderAcknowledgment = {
    EmailAddress: EmailAddress
    Letter: HtmlString
}
```

`Letter` は、顧客情報と注文内容をもとにテンプレートのようなものから作られる。これも依存関係として扱う。

```fsharp
type CreateOrderAcknowledgmentLetter = PricedOrder -> HtmlString
```

確認書を送る処理も依存関係として扱う。具体的な実装は考えず、必要なインタフェースに集中する。次の 3 つは良くない例である。

- `OrderAcknowledgment -> unit`: 呼び出し元から、送られたかどうかを判別できない。
- `OrderAcknowledgment -> bool`: `bool` は情報量がとても少ないので避けるべきである。
- `OrderAcknowledgment -> OrderAcknowledgmentSent option`: `OrderAcknowledgmentSent` は[[domain-event|ドメインイベント]]なので、その型を通じて[[domain|ドメイン]]とサービスが結合してしまう。

代わりに、送った（`Sent`）か送っていない（`NotSent`）かを表す選択型を使う。

```fsharp
type SendResult = Sent | NotSent

type SendOrderAcknowledgment =
    OrderAcknowledgment -> SendResult
```

出力としては、「送信した」イベントを返す。確認書が送られない可能性があるので、出力の型は `option` にする。

```fsharp
type OrderAcknowledgmentSent = {
    OrderId: OrderId
    EmailAddress: EmailAddress
}

type AcknowledgeOrder =
    CreateOrderAcknowledgmentLetter        // 依存関係
        -> SendOrderAcknowledgment         // 依存関係
        -> PricedOrder                     // 入力
        -> OrderAcknowledgmentSent option  // 出力
```

### イベントの作成

ワークフローは、`OrderAcknowledgmentSent` のほかに `OrderPlaced` と `BillableOrderPlaced` のイベントも返す必要がある。

```text
workflow: "Place order" =
  input: UnvalidatedOrder
  output (on successs):
    OrderAcknowledgmentSent
    AND OrderPlaced (to send to shipping)
    AND BillableOrderPlaced (to send to billing)
  output (on error):
    ValidationError
```

`OrderPlaced`（注文が確定したイベント）は発送用で、`PricedOrder` の別名にする。`BillableOrderPlaced`（請求可能な注文が確定したイベント）は請求用で、`PricedOrder` の一部のフィールドだけを持つ。

```fsharp
type OrderPlaced = PricedOrder

type BillableOrderPlaced = {
    OrderId: OrderId
    BillingAddress: Address
    AmountToBill: BillingAmount
}
```

返すイベントは、[[record-type|レコード型]]でまとめることもできる。

```fsharp
type PlaceOrderResult = {
    OrderPlaced: OrderPlaced
    BillableOrderPlaced: BillableOrderPlaced
    OrderAcknowledgmentSent: OrderAcknowledgmentSent option
}
```

しかしこの形では、ワークフローに新しいイベントを足すときなどに更新が難しくなる。そこで、ワークフローがイベントのリストを返すようにし、各要素を選択型で表す。こうすればワークフロー全体を壊さずに更新できる。受注ドメインのすべてのイベントをまとめた `OrderTakingDomainEvent` のような、より一般的な型を作ることもできる。

```fsharp
type PlaceOrderEvent =
    | OrderPlaced of OrderPlaced
    | BillableOrderPlaced of BillableOrderPlaced
    | OrderAcknowledgmentSent of OrderAcknowledgmentSent

type CreateEvents =
    PricedOrder -> PlaceOrderEvent list
```

## キーワード

- [[workflow|ワークフロー]]
- [[state-machine|ステートマシン]]
- [[dependency|依存関係]]
- [[interface|インタフェース]]
- [[partial-application|部分適用]]
- [[single-case-union|単純型]]
- [[domain-event|ドメインイベント]]
- [[record-type|レコード型]]
- [[discriminated-union|選択型]]

## 自分の理解

返すイベントをレコード型でまとめると、イベントを足すたびに型を書き換えることになり、[[open-closed-principle|オープン・クローズドの原則]]に反すると考えた。
