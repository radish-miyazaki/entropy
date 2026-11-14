---
title: Domain Modeling Made Functional 第10章 コンピュテーション式の導入
description: F# のコンピュテーション式で result ビルダーを自作し、bind や map を意識せずに Result を扱う。Result のリストは sequence で変換する
tags: [book-chapter, ddd, fsharp]
date: 2024-08-05
book: "[[Domain Modeling Made Functional]]"
chapter: 10
---

## TL;DR

- [[fsharp|F#]] の[[computation-expression|コンピュテーション式]]を使うと、`Result` で包まれていることを意識せずにコードを書ける。`bind` や `map` の呼び出しや、深くネストした `Result` から解放される。
- `Result` を無視した実装から、構造をほとんど変えずに移行できる。ただし `Result` 用のコンピュテーション式は標準で提供されていないので、自作する。
- `Result` のリストをリストの `Result` に変換するには、`prepend` を使った `sequence` 関数を用意する。

## 内容

### なぜコンピュテーション式が必要か

[[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）]]のやり方では、コードが複雑になると手間が増える。`Result.bind` や `map` を何度も呼び、深くネストした `Result` を扱うことになる。こうした[[complexity|複雑さ]]は隠したい。

F# では、コンピュテーション式で解決できる。しかし、`Result` 用のコンピュテーション式は[組み込みでは提供されていない](https://learn.microsoft.com/ja-jp/dotnet/fsharp/language-reference/computation-expressions#built-in-computation-expressions)ので、[自分で定義する](https://learn.microsoft.com/ja-jp/dotnet/fsharp/language-reference/computation-expressions#creating-a-new-type-of-computation-expression)。ここでは[[monad|モナド]]として扱うので、`Bind` と `Return` だけを実装する。

```fsharp
type ResultBuilder() =
  member this.Return(x) = Ok x
  member this.Bind(x, f) = Result.bind f x

let result = ResultBuilder()
```

### どう変わるか

導入前は、`Result.bind` と `Result.map` でステップをつないでいた。

```fsharp
let placeOrder unvalidatedOrder =
  unvalidatedOrder
  |> validateOrderAdapted
  |> Result.bind priceOrderAdapted
  |> Result.map acknowledgeOrder
  |> Result.map createEvents
```

導入後は、全体を `result` 式で包み、`bind` を `let!` に置き換える。それ以外は通常の構文で書けて、`Result.map` は要らない。これで、`validateOrder` や `priceOrder` の出力を、`Result` を意識せずに直接扱える。[[Domain Modeling Made Functional 第10章 実際のパイプラインでの bind と map の利用]]で合成できなかった、入力が 2 つある `createEvents` もそのまま呼べる。

```fsharp
let placeOrder unvalidatedOrder =
  result {
    let! validatedOrder =
      validateOrder unvalidatedOrder
      |> Result.mapError PlaceOrderError.Validation

    let! pricedOrder =
      priceOrder validatedOrder
      |> Result.mapError PlaceOrderError.Pricing

    let acknowledgmentOption =
      acknowledgeOrder pricedOrder

    let events =
      createEvents pricedOrder acknowledgmentOption

    return events
  }
```

[`let!`](https://learn.microsoft.com/ja-jp/dotnet/fsharp/language-reference/computation-expressions#let) は結果をアンラップして内部値を取り出す。たとえば `validatedOrder` は、`priceOrder` に直接渡せる普通の値である。エラー型はブロック全体でそろえる必要があるので、`Result.mapError` で共通の型に[[lift-up|型を持ち上げる]]。[`return`](https://learn.microsoft.com/ja-jp/dotnet/fsharp/language-reference/computation-expressions#return) は値をラップして呼び出し元に返す。

### コンピュテーション式の合成

コンピュテーション式の魅力の 1 つは、合成できることである。2 つの `result` 式があれば、それらをより大きな `result` 式の中で使える。

```fsharp
let validateOrder input = result {
  let! validatedOrder = ...
  return validatedOrder
}

let priceOrder input = result {
  let! pricedOrder = ...
  return pricedOrder
}

let placeOrder unvalidatedOrder = result {
  let! validatedOrder = validateOrder unvalidatedOrder
  let! pricedOrder = priceOrder validatedOrder
  ...
}
```

### 既存の関数を置き換える

`Result` を無視して書いた「検証のステップ」（[[Domain Modeling Made Functional 第9章 最初のステップの実装]]）は、ヘルパ関数が `Result` を返すようになると動かなくなる。たとえば `OrderId.create` は `Result<OrderId, string>` を返すようになる。しかし `result` 式を使えば、実装の構造をほとんど変えずに対応できる。変更点は、全体を `result` 式で包むこと、`let` を `let!` にすること、`Result.mapError` でエラーを共通の[[discriminated-union|選択型]]に持ち上げることの 3 つである。ここでは、`toCustomerInfo` と `toAddress` のエラー型はもともと `ValidationError` だと仮定し、`mapError` を呼んでいない。

```fsharp
let validateOrder: ValidateOrder =
  fun checkProductCodeExists checkAddressExists unvalidatedOrder ->
    result {
      let! orderId =
        unvalidatedOrder.OrderId
        |> OrderId.create
        |> Result.mapError ValidationError

      let! customerInfo =
        unvalidatedOrder.CustomerInfo
        |> toCustomerInfo

      let! shippingAddress =
        unvalidatedOrder.ShippingAddress
        |> toAddress checkAddressExists

      let! billingAddress = ...
      let! lines = ...

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

### Result のリストを扱う

`Result` を無視していたときは、明細行は `List.map` を呼ぶだけで検証できた。しかし `toValidatedOrderLine` が `Result` を返すようになると、欲しいのはリストの `Result`（`Result<ValidatedOrderLine list, ValidationError>`）なのに、得られるのは `Result` のリスト（`Result<ValidatedOrderLine, ValidationError> list`）になる。

そこで、`Result` のリストをリストの `Result` に変換する関数を作る。方針は、1 つでも失敗があれば全体をエラーにし、すべて成功すれば成功値のリストにすることである。F# のリストは連結リストなので、まず 1 つの `Result` と `Result` のリストを受け取り、先頭に要素を追加（cons）する `prepend` を実装する。両方が `Ok` なら中身を cons して `Result` で包み直し、それ以外はエラーを返す。

```fsharp
// val prepend:
//   firstR: Result<'a,'b> -> restR: Result<'a list,'b> -> Result<'a list,'b>
let prepend firstR restR =
  match firstR, restR with
  | Ok first, Ok rest -> Ok (first :: rest)
  | Error err1, Ok _ -> Error err1
  | Ok _, Error err2 -> Error err2
  | Error err1, Error err2 -> Error err1
```

`prepend` を使い、`List.foldBack` で末尾から順に畳み込めば `sequence` を実装できる。`bind` や `map`、`mapError` と同じく、`Result` モジュールに置く。

```fsharp
module Result =
  // val sequence: aListOfResults: Result<'a,'b> list -> Result<'a list,'b>
  let sequence aListOfResults =
    let initialValue = Ok []
    List.foldBack prepend aListOfResults initialValue

type IntOrError = Result<int, string>

let listOfSuccesses: IntOrError list = [Ok 1; Ok 2]
Result.sequence listOfSuccesses // Ok [1; 2]

let listOfErrors: IntOrError list = [Error "bad"; Error "terrible"]
Result.sequence listOfErrors // Error "bad"
```

この実装では最初のエラーしか残らない。すべてのエラーを残したい場合は、[[applicative|アプリカティブ]]を使う（[参考](https://fsharpforfunandprofit.com/posts/elevated-world-3/#validation-using-applicative-style)）。

```fsharp
let apply fResult xResult =
  match fResult, xResult with
  | Success f, Success x -> Success (f x)
  | Failure errs, Success x -> Failure errs
  | Success f, Failure errs -> Failure errs
  | Failure errs1, Failure errs2 -> Failure (List.concat [errs1; errs2])
```

`validateOrder` では、`List.map` の後に `Result.sequence` を通せばよい。

```fsharp
let! lines =
  unvalidatedOrder.Lines
  |> List.map (toValidatedOrderLine checkProductCodeExists)
  |> Result.sequence
```

パフォーマンスが気になるなら、`List.map` と `Result.sequence` を 1 つにまとめる。一般に `traverse` と呼ばれる関数で、次のような型の関数を作るイメージである（[参考](https://fsharpforfunandprofit.com/posts/elevated-world-4/)）。

```fsharp
(UnvalidatedOrderLine -> Result<ValidatedOrderLine, ValidationError>)
  -> UnvalidatedOrderLine list
  -> Result<ValidatedOrderLine list, ValidationError>
```

## キーワード

- [[computation-expression|コンピュテーション式]]
- [[monad|モナド]]
- [[applicative|アプリカティブ]]
- [[lift-up|型を持ち上げる]]
- [[railway-oriented-programming|鉄道指向プログラミング]]
- [[fsharp|F#]]

## 自分の理解

「コンピュテーション式は、F# でモナドやアプリカティブを表現するためのツール」という説明は、自分の中ではまだ解像度が低い。

`traverse` は [[haskell|Haskell]] でも `Traversable`（データ構造を走査する型クラス）のメソッドとして提供されている。

```haskell
traverse :: (Traversable t, Applicative f) => (a -> f b) -> t a -> f (t b)
```
