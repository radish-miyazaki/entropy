---
title: Domain Modeling Made Functional › 残りのステップの実装
description: 価格設定、注文確認、イベント作成の各ステップを、検証のステップと同じ方法で実装する
tags: [book-chapter, ddd, fsharp]
date: 2024-07-30
book: "[[Domain Modeling Made Functional]]"
chapter: 9
---

## TL;DR

- 価格設定、注文確認、イベント作成のステップを、[[Domain Modeling Made Functional 第9章 最初のステップの実装]]と同じくヘルパ関数を組み合わせて実装する。
- 型の異なるイベントは、共通の選択型、さらにリストへと[[lift-up|型を持ち上げる]]ことで 1 つの戻り値にまとめる。
- 未実装のステップは「未実装」の例外を投げておけば、コンパイルを通せる。

## 内容

### 価格設定のステップ

[[Domain Modeling Made Functional 第7章 型を使ったワークフローの各ステップのモデリング]]で定義した型は次のとおりである。ここでもエフェクトは取り除いている。

```fsharp
type GetProductPrice = ProductCode -> Price
type PriceOrder =
  GetProductPrice // 依存関係
    -> ValidatedOrder // 入力
    -> PricedOrder // 出力
```

実装では、明細行ごとに価格を付け、その合計を請求総額にする。

```fsharp
let priceOrder: PriceOrder =
  fun getProductPrice validatedOrder ->
    let lines =
      validatedOrder.Lines
      |> List.map (toPricedOrderLine getProductPrice)

    let amountToBill =
      lines
      |> List.map (fun line -> line.LinePrice) // 価格のリストを作る
      |> BillingAmount.sumPrices // 合計して請求総額にする

    let pricedOrder: PricedOrder = {
      OrderId = validatedOrder.OrderId
      CustomerInfo = validatedOrder.CustomerInfo
      ShippingAddress = validatedOrder.ShippingAddress
      BillingAddress = validatedOrder.BillingAddress
      Lines = lines
      AmountToBill = amountToBill
    }
    pricedOrder
```

`BillingAmount.sumPrices` は、`Price` のリストを合計し、`BillingAmount` 型に包んで返す。合計が範囲外なら例外を発生させる。合計を `Price` ではなく `BillingAmount` 型にするのは、`Price` とは異なる検証ルールを持つ可能性があるからである。

```fsharp
let sumPrices prices =
  let total = prices |> List.map Price.value |> List.sum
  create total
```

`toPricedOrderLine` は 1 行だけを変換する。数量と単価を掛けるために、`Price.multiply` というヘルパ関数も用意する。

```fsharp
let toPricedOrderLine getProductPrice (line: ValidatedOrderLine) : PricedOrderLine =
  let qty = line.Quantity |> OrderQuantity.value
  let price = line.ProductCode |> getProductPrice
  let linePrice = price |> Price.multiply qty
  {
    OrderLineId = line.OrderLineId
    ProductCode = line.ProductCode
    Quantity = line.Quantity
    LinePrice = linePrice
  }

// Price.multiply
let multiply qty (Price p) = create (qty * p)
```

### 注文確認のステップ

定義した型は次のとおりである。

```fsharp
type HtmlString = HtmlString of string
type CreateOrderAcknowledgmentLetter = PricedOrder -> HtmlString

type OrderAcknowledgment = { EmailAddress: EmailAddress; Letter: HtmlString }
type SendResult = Sent | NotSent
type SendOrderAcknowledgment = OrderAcknowledgment -> SendResult

type OrderAcknowledgmentSent = { OrderId: OrderId; EmailAddress: EmailAddress }
type AcknowledgeOrder =
  CreateOrderAcknowledgmentLetter // 依存関係
    -> SendOrderAcknowledgment // 依存関係
    -> PricedOrder // 入力
    -> OrderAcknowledgmentSent option // 出力
```

確認書を作って送り、送信できたらイベントを `Some` で、できなければ `None` を返す。依存関係である `sendOrderAcknowledgment` の中身は後で考えればよい。それがなくても、コードの大部分はビルドして組み立てられる。

```fsharp
let acknowledgeOrder: AcknowledgeOrder =
  fun createOrderAcknowledgmentLetter sendOrderAcknowledgment pricedOrder ->
    let letter = createOrderAcknowledgmentLetter pricedOrder
    let acknowledgment = {
      EmailAddress = pricedOrder.CustomerInfo.EmailAddress
      Letter = letter
    }

    match sendOrderAcknowledgment acknowledgment with
    | Sent ->
      let event = {
        OrderId = pricedOrder.OrderId
        EmailAddress = pricedOrder.CustomerInfo.EmailAddress
      }
      Some event
    | NotSent -> None
```

### イベントの作成

イベントの型は次のとおりである。

```fsharp
type OrderPlaced = PricedOrder

type BillableOrderPlaced = {
  OrderId: OrderId
  BillingAddress: Address
  AmountToBill: BillingAmount
}

type PlaceOrderEvent =
  | OrderPlaced of OrderPlaced
  | BillableOrderPlaced of BillableOrderPlaced
  | OrderAcknowledgmentSent of OrderAcknowledgmentSent
```

ここに「請求額が 0 より大きいときだけ請求イベントを送る」という仕様を足す。すると `CreateEvents` の定義は次のようになる。

```fsharp
type CreateEvents =
  PricedOrder
    -> OrderAcknowledgmentSent option
    -> PlaceOrderEvent list
```

`BillableOrderPlaced` イベントを作るヘルパ関数 `createBillingEvent` は、イベントを送らない場合もあるので `option` を返す。

```fsharp
let createBillingEvent (pricedOrder: PricedOrder) : BillableOrderPlaced option =
  let billingAmount = pricedOrder.AmountToBill |> BillingAmount.value
  if billingAmount > 0M then
    Some {
      OrderId = pricedOrder.OrderId
      BillingAddress = pricedOrder.BillingAddress
      AmountToBill = pricedOrder.AmountToBill
    }
  else
    None
```

戻り値を組み立てるには、[[Domain Modeling Made Functional 第8章 関数合成]]と同じく、すべての型を含む「最小」の型を考える。まず、すべてのイベントを[[discriminated-union|選択型]] `PlaceOrderEvent` に変換する。`option` の値は `Option.map` で変換する。次に、より一般的な型である `list` に変換する。そのために `option` を `list` に変換するヘルパ関数を用意する。

```fsharp
let listOfOption opt =
  match opt with
  | Some x -> [x]
  | None -> []
```

すべて同じ `PlaceOrderEvent list` 型になったので、1 つのリストに展開して返せる。

```fsharp
let createEvents: CreateEvents =
  fun pricedOrder acknowledgmentEventOpt ->
    let events1 =
      pricedOrder
      |> PlaceOrderEvent.OrderPlaced // 共通の選択型に変換する
      |> List.singleton // リストに変換する

    let events2 =
      acknowledgmentEventOpt
      |> Option.map PlaceOrderEvent.OrderAcknowledgmentSent
      |> listOfOption

    let events3 =
      pricedOrder
      |> createBillingEvent
      |> Option.map PlaceOrderEvent.BillableOrderPlaced
      |> listOfOption

    [
      yield! events1
      yield! events2
      yield! events3
    ]
```

### 未実装のステップがあってもコンパイルを通す

パイプラインに未実装のステップが多くても、プロジェクトのコンパイルは通したい。その場合は「未実装」の例外を発生させておけばよい。

```fsharp
let priceOrder: PriceOrder =
  fun getProductPrice validatedOrder ->
    failwith "not implemented"
```

## キーワード

- [[lift-up|型を持ち上げる]]
- [[discriminated-union|選択型]]
- [[domain-event|ドメインイベント]]
- [[dependency|依存関係]]
- [[fsharp|F#]]

## 自分の理解

イベントを `list` に持ち上げるのは、`CreateEvents` の戻り値が `list` だからだと理解しているが、まだ自信がない。
