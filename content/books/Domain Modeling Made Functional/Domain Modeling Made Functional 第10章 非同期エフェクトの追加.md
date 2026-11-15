---
title: Domain Modeling Made Functional › 非同期エフェクトの追加
description: Async と Result を組み合わせた AsyncResult 型とそのコンピュテーション式を定義し、検証ステップとワークフローに適用する
tags: [book-chapter, ddd, fsharp]
date: 2024-08-06
book: "[[Domain Modeling Made Functional]]"
chapter: 10
---

## TL;DR

- `Async` と `Result` は組み合わせて使うことが多いので、`AsyncResult` 型とその[[computation-expression|コンピュテーション式]]を定義する。
- `asyncResult` 式は `result` 式と同じように使える。`Result` の値は `AsyncResult.ofResult` で[[lift-up|型を持ち上げる]]。

## 内容

### AsyncResult の定義

もともとワークフローでは、`Result` エフェクトだけでなく `Async` エフェクトも使っていた（[[Domain Modeling Made Functional 第7章 エフェクトの文書化]]）。この 2 つは組み合わせて使うことが多いので、専用のコンピュテーション式を定義する。`ofResult` は、`Result` 型の値を `AsyncResult` に持ち上げる関数である。

```fsharp
type AsyncResult<'success, 'failure> = Async<Result<'success, 'failure>>

module AsyncResult =
  let map f (x: AsyncResult<_,_>) : AsyncResult<_,_> =
    Async.map (Result.map f) x

  let mapError f (x: AsyncResult<_,_>) : AsyncResult<_,_> =
    Async.map (Result.mapError f) x

  let retn x : AsyncResult<_,_> =
    x |> Result.Ok |> Async.retn

  let bind (f: 'a -> AsyncResult<'b,'c>) (xAsyncResult: AsyncResult<_,_>) : AsyncResult<_,_> =
    async {
      let! xResult = xAsyncResult
      match xResult with
      | Ok x -> return! f x
      | Error err -> return (Error err)
    }

  let ofResult x : AsyncResult<_,_> =
    x |> Async.retn

type AsyncResultBuilder() =
  member this.Return(x) = AsyncResult.retn x
  member this.Bind(x, f) = AsyncResult.bind f x

let asyncResult = AsyncResultBuilder()
```

### 検証のステップへの適用

`asyncResult` 式は `result` 式と同じように使う。検証のステップは次のように書き換えられる。

```fsharp
let validateOrder: ValidateOrder =
  fun checkProductCodeExists checkAddressExists unvalidatedOrder ->
    asyncResult {
      let! orderId =
        unvalidatedOrder.OrderId
        |> OrderId.create
        |> Result.mapError ValidationError
        |> AsyncResult.ofResult

      let! customerInfo =
        unvalidatedOrder.CustomerInfo
        |> toCustomerInfo
        |> AsyncResult.ofResult

      let! checkedShippingAddress =
        unvalidatedOrder.ShippingAddress
        |> toCheckedAddress checkAddressExists

      let! shippingAddress =
        checkedShippingAddress
        |> toAddress
        |> AsyncResult.ofResult

      let! billingAddress = ...

      let! lines =
        unvalidatedOrder.Lines
        |> List.map (toValidatedOrderLine checkProductCodeExists)
        |> Result.sequence
        |> AsyncResult.ofResult

      let validatedOrder: ValidatedOrder = {
        OrderId = orderId
        CustomerInfo = customerInfo
        ShippingAddress = shippingAddress
        BillingAddress = billingAddress
        OrderLines = lines
      }
      return validatedOrder
    }
```

主な変更点は 2 つある。1 つは、`Result` 型の値を `AsyncResult` に持ち上げていることである。もう 1 つは、住所の検証を 2 つに分けたことである。エフェクトをすべて戻すと、`CheckAddressExists` は `AsyncResult` を返す（エラー型は[[Domain Modeling Made Functional 第10章 Result 型を使ってエラーを明示する]]で定義した `AddressValidationError`）。

```fsharp
type CheckAddressExists =
  UnvalidatedAddress -> AsyncResult<CheckedAddress, AddressValidationError>
```

このシグネチャをワークフローに合わせるには、サービス固有の `AddressValidationError` を、ドメインの `ValidationError` に変換する必要がある。その役目を持つのが `toCheckedAddress` である。

```fsharp
let toCheckedAddress (checkAddress: CheckAddressExists) address =
  address
  |> checkAddress
  |> AsyncResult.mapError (fun addrError ->
    match addrError with
    | AddressNotFound _ -> ValidationError "Address not found"
    | InvalidFormat _ -> ValidationError "Address has bad format")
```

### ワークフロー全体への適用

[[workflow|ワークフロー]]全体の関数も、次のように書き換えられる。

```fsharp
let placeOrder: PlaceOrder =
  fun unvalidatedOrder ->
    asyncResult {
      let! validatedOrder =
        validateOrder checkProductCodeExists checkAddressExists unvalidatedOrder
        |> AsyncResult.mapError PlaceOrderError.Validation
      let! pricedOrder =
        priceOrder getProductPrice validatedOrder
        |> AsyncResult.ofResult
        |> AsyncResult.mapError PlaceOrderError.Pricing

      let acknowledgmentOption = ...
      let events = ...
      return events
    }
```

## キーワード

- [[computation-expression|コンピュテーション式]]
- [[lift-up|型を持ち上げる]]
- [[monad|モナド]]
- [[workflow|ワークフロー]]
- [[fsharp|F#]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
