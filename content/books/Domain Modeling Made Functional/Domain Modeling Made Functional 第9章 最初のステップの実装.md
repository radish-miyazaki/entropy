---
title: Domain Modeling Made Functional 第9章 最初のステップの実装
description: 注文ワークフローの最初のステップ「検証」を、ヘルパ関数と関数アダプタを使って実装する
tags: [book-chapter, ddd, fsharp]
date: 2024-07-29
book: "[[Domain Modeling Made Functional]]"
chapter: 9
---

## TL;DR

- 未検証の型からドメイン型を作るときは、フィールドごとにヘルパ関数を実装する。
- パイプラインで型が合わないときは、関数を別の形の関数に変換する関数アダプタを作って解決する。

## 内容

### 検証のステップ

[[Domain Modeling Made Functional 第7章 型を使ったワークフローの各ステップのモデリング]]で定義した最初のステップ「検証」を実装する。型の定義は次のとおりである。ここでは[[Domain Modeling Made Functional 第7章 エフェクトの文書化|エフェクト]]を意図的に取り除いている。

```fsharp
// 依存関係
type CheckProductCodeExists = ProductCode -> bool
type CheckAddressExists = UnvalidatedAddress -> CheckedAddress

// 検証ステップ
type ValidateOrder =
  CheckProductCodeExists // 依存関係
    -> CheckAddressExists // 依存関係
    -> UnvalidatedOrder // 入力
    -> ValidatedOrder // 出力
```

実装の流れは単純である。未検証の注文の `OrderId` 文字列から `OrderId` ドメイン型を作る。同じように、`CustomerInfo` フィールドから `CustomerInfo` ドメイン型を、`ShippingAddress` フィールドから `Address` ドメイン型を作る（入力の型は[[Domain Modeling Made Functional 第7章 ワークフローの入力]]と[[Domain Modeling Made Functional 第7章 状態の集合による注文のモデリング]]を参照）。すべてのフィールドがそろったら、`ValidatedOrder` レコードを作って返す。

```fsharp
let validateOrder: ValidateOrder =
  fun checkProductCodeExists checkAddressExists unvalidatedOrder ->
    let orderId =
      unvalidatedOrder.OrderId
      |> OrderId.create

    let customerInfo =
      unvalidatedOrder.CustomerInfo
      |> toCustomerInfo

    let shippingAddress =
      unvalidatedOrder.ShippingAddress
      |> toAddress checkAddressExists

    // unvalidatedOrder の各プロパティに対して同様の処理を行う
    let billingAddress = ...
    let lines = ...

    {
      OrderId = orderId
      CustomerInfo = customerInfo
      ShippingAddress = shippingAddress
      BillingAddress = billingAddress
      OrderLines = lines
    }
```

### ヘルパ関数の実装

`toCustomerInfo` と `toAddress` は、未検証の型からドメイン型を作るヘルパ関数である。制約を満たさない値が来たらエラーを発生させる。

`toCustomerInfo` は簡単で、各フィールドについて対応するフィールドを見つけ、ドメイン型に変換するだけである。

```fsharp
let toCustomerInfo (customer: UnvalidatedCustomerInfo) : CustomerInfo =
  // 無効な場合は例外を投げる
  let firstName = customer.FirstName |> String50.create
  let lastName = customer.LastName |> String50.create
  let emailAddress = customer.EmailAddress |> EmailAddress.create

  let name: PersonalName = { FirstName = firstName; LastName = lastName }
  let customerInfo: CustomerInfo = { Name = name; EmailAddress = emailAddress }
  customerInfo
```

`toAddress` は少し複雑である。プリミティブ型をドメイン型に変換するだけでなく、`CheckAddressExists` サービスで住所が存在するかを確かめる必要がある。`String50.createOption` は、入力が `null` や空文字なら `None` を返す。

```fsharp
let toAddress (checkAddressExists: CheckAddressExists) unvalidatedAddress =
  // サービスを呼び出し、内部値を取り出す
  let (CheckedAddress checkedAddress) = checkAddressExists unvalidatedAddress

  let addressLine1 = checkedAddress.AddressLine1 |> String50.create
  let addressLine2 = checkedAddress.AddressLine2 |> String50.createOption
  let addressLine3 = checkedAddress.AddressLine3 |> String50.createOption
  let addressLine4 = checkedAddress.AddressLine4 |> String50.createOption
  let city = checkedAddress.City |> String50.create
  let zipCode = checkedAddress.ZipCode |> String50.create

  let address: Address = {
    AddressLine1 = addressLine1
    AddressLine2 = addressLine2
    AddressLine3 = addressLine3
    AddressLine4 = addressLine4
    City = city
    ZipCode = zipCode
  }
  address
```

### 明細行の作成

まず、1 つの `UnvalidatedOrderLine` を `ValidatedOrderLine` に変換するヘルパ関数 `toValidatedOrderLine` を実装する。

```fsharp
let toValidatedOrderLine checkProductCodeExists (unvalidatedOrderLine: UnvalidatedOrderLine) =
  let orderLineId = unvalidatedOrderLine.OrderLineId |> OrderLineId.create
  let productCode = unvalidatedOrderLine.ProductCode |> toProductCode checkProductCodeExists
  let quantity = unvalidatedOrderLine.Quantity |> toOrderQuantity productCode
  { OrderLineId = orderLineId; ProductCode = productCode; Quantity = quantity }
```

ここで新しいヘルパ関数が 2 つ必要になる。`toOrderQuantity` は、製品コードの種類に応じて数量を変換する。最後に `OrderQuantity` 型に[[lift-up|型を持ち上げる]]のは、2 つの分岐の戻り値の型をそろえるためである。

```fsharp
let toOrderQuantity productCode quantity =
  match productCode with
  | Widget _ ->
    quantity
    |> int // float を int に変換
    |> UnitQuantity.create // ユニット数に変換
    |> OrderQuantity.Unit // OrderQuantity 型に持ち上げる
  | Gizmo _ ->
    quantity
    |> KilogramQuantity.create // キログラム量に変換
    |> OrderQuantity.Kilogram // OrderQuantity 型に持ち上げる
```

`toProductCode` をパイプラインで素直に書くと、`ProductCode` を返したいのに、`checkProductCodeExists` が `bool` を返してしまう。この問題は次の節の関数アダプタで解決する。

```fsharp
let toProductCode (checkProductCodeExists: CheckProductCodeExists) productCode =
  productCode
  |> ProductCode.create
  |> checkProductCodeExists // bool 値を返してしまう
```

`toValidatedOrderLine` と `List.map` を組み合わせると、明細行のリストを一度に変換できる。

```fsharp
let orderLines =
  unvalidatedOrder.Lines
  |> List.map (toValidatedOrderLine checkProductCodeExists)
```

### 関数アダプタの作成

関数アダプタは、元の関数を入力に取り、パイプラインで使いやすい「形」の新しい関数を返す関数である。`List.map` も関数アダプタの一種で、`'a -> 'b` の関数を `'a list -> 'b list` の関数に変換する。

`toProductCode` の問題を解くには、述語関数を「条件を満たせば入力をそのまま返し、満たさなければ例外を投げる」関数に変換すればよい。

```fsharp
let convertToPassthru checkProductCodeExists productCode =
  if checkProductCodeExists productCode then
    productCode
  else
    failwith "Invalid Product Code"
```

この関数のシグネチャは、ジェネリックな `('a -> bool) -> 'a -> 'a` と推論される。そこで、より汎用的な形に書き直す。エラーメッセージを最初の引数にしたのは、部分適用でメッセージを組み込めるようにするためである。

```fsharp
let predicateToPassthru errorMsg f x =
  if f x then x else failwith errorMsg
```

これを `toProductCode` に適用すると、パイプラインが `ProductCode` を返すようになる。

```fsharp
let toProductCode (checkProductCodeExists: CheckProductCodeExists) productCode =
  let checkProduct productCode =
    let errorMsg = sprintf "Invalid: %A" productCode
    predicateToPassthru errorMsg checkProductCodeExists productCode

  productCode
  |> ProductCode.create
  |> checkProduct
```

## キーワード

- [[fsharp|F#]]
- [[workflow|ワークフロー]]
- [[lift-up|型を持ち上げる]]
- [[higher-order-function|高階関数]]
- [[partial-application|部分適用]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
