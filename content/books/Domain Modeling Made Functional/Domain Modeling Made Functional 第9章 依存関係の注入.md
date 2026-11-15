---
title: Domain Modeling Made Functional › 依存関係の注入
description: 関数型プログラミングで依存性の注入を行う方法として、すべての依存関係をトップレベルの関数から明示的に受け渡す方法を解説する
tags: [book-chapter, ddd, fsharp]
date: 2024-07-31
book: "[[Domain Modeling Made Functional]]"
chapter: 9
---

## TL;DR

- [[functional-programming|関数型プログラミング]]で[[dependency-injection|依存性の注入]]を行う方法には、Reader モナドや Free モナドなどがある。本書は、すべての依存関係をトップレベルの関数に渡し、そこから下へ受け渡していく最も単純な方法を使う。
- トップレベルの関数をコンポジションルートと呼び、アプリケーションのエントリポイントの近くに置く。
- 依存関係が多すぎるときは、関数の責務が多すぎることが多い。分割できなければ、低レベルの関数に依存関係を組み込んでから渡す。

## 内容

### 関数型で依存性の注入を行う

トップレベルから、依存関係を必要とする関数（たとえば[[Domain Modeling Made Functional 第9章 最初のステップの実装]]の `toProductCode`）まで、どのように依存関係を渡すかを考える。オブジェクト指向プログラミングでは、依存性の注入や IoC コンテナを使う。関数型プログラミングでは、依存関係が暗黙的になることを好まないので、依存関係を明示的なパラメータとして渡す。

その方法には Reader モナドや Free モナドなどいろいろある（Free モナドについては[この本](https://zenn.dev/zecl/books/d535208d9f6176)が参考になる）。本書では、最も単純な方法にこだわる。すべての依存関係をトップレベルの関数に渡し、そこから必要な関数まで引数で受け渡していく方法である。

### トップレベルから依存関係を受け渡す

[[Domain Modeling Made Functional 第9章 パイプラインのステップを 1 つに合成する]]の例では、トップレベルの関数は[[workflow|ワークフロー]]全体である。オブジェクト指向プログラミングにならって、これをコンポジションルートと呼ぶ。

```fsharp
let placeOrder
  checkProductCodeExists
  checkAddressExists
  getProductPrice
  createOrderAcknowledgmentLetter
  sendOrderAcknowledgment
  : PlaceOrderWorkflow =
    fun unvalidatedOrder ->
      // ...
```

各ステップは、受け取った依存関係をヘルパ関数に渡す。

```fsharp
let validateOrder: ValidateOrder =
  fun checkProductCodeExists checkAddressExists unvalidatedOrder ->
    let shippingAddress =
      unvalidatedOrder.ShippingAddress
      |> toAddress checkAddressExists
    // ...
    let lines =
      unvalidatedOrder.Lines
      |> List.map (toValidatedOrderLine checkProductCodeExists)
```

コンポジションルートは、アプリケーションのエントリポイントにできるだけ近いところに置くべきである。[[suave|Suave]] を使った Web アプリケーションなら、次のようにサービスを設定し、部分適用でワークフローを組み立て、ルーティングに渡す。デシリアライズについては[[Domain Modeling Made Functional 第11章 Serialization]]を参照。

```fsharp
let app: WebPart =
  // ワークフローで使用するサービスの設定
  let checkProductCodeExists = ...
  let checkAddressExists = ...
  let getProductPrice = ...
  let createOrderAcknowledgmentLetter = ...
  let sendOrderAcknowledgment = ...
  let toHttpResponse = ...

  // サービスの部分適用による placeOrder ワークフローの設定
  let placeOrder =
    placeOrder
      checkProductCodeExists
      checkAddressExists
      getProductPrice
      createOrderAcknowledgmentLetter
      sendOrderAcknowledgment

  // 他のワークフローの設定
  let changeOrder = ...
  let cancelOrder = ...

  // ルーティングの設定
  choose [
    POST >=> choose [
      path "/placeOrder"
        >=> deserializeOrder // JSON を未検証の注文に変換
        >=> placeOrder // ワークフローを実行
        >=> postEvents // イベントをキューに投入
        >=> toHttpResponse // 出力に基づきレスポンスを返す
      path "/changeOrder" >=> ...
      path "/cancelOrder" >=> ...
    ]
  ]
```

### 依存関係が多すぎる場合

依存関係が多すぎるときは、関数がやっていることが多すぎる可能性がある。まず、小さく分割できないかを考える。難しければ、依存関係を 1 つのレコードにまとめ、1 つのパラメータとして渡すこともできる。

よくあるのは、子関数の依存関係が複雑になっている場合である。たとえば `checkAddressExists` が、URI のエンドポイントと認証情報を必要とする Web サービスと通信しているとする。

```fsharp
let checkAddressExists endPoint credentials =
  ...
```

素直に書くと、`toAddress` にもこの 2 つのパラメータを渡す必要がある。さらに、その呼び出し元の `validateOrder` も、そのまた呼び出し元も、同じパラメータを受け取らなければならない。

```fsharp
let toAddress checkAddressExists endPoint credentials unvalidatedAddress =
  let checkedAddress = checkAddressExists endPoint credentials unvalidatedAddress
  ...

let validateOrder
  checkProductCodeExists checkAddressExists endPoint credentials unvalidatedOrder =
  ...
```

代わりに、低レベルの関数をトップレベルの関数の外側で設定し、すべての依存関係を組み込んだ関数を渡す。

```fsharp
let placeOrder: PlaceOrderWorkflow =
  let endPoint = ...
  let credentials = ...

  // 認証情報を組み込んだ checkAddressExists を作る
  let checkAddressExists = checkAddressExists endPoint credentials

  // ワークフローのステップを設定する
  let validateOrder =
    validateOrder checkProductCodeExists checkAddressExists
  ...

  // ワークフロー関数を返す
  fun unvalidatedOrder ->
    unvalidatedOrder
    |> validateOrder
    // ...
```

このように、ある関数を別の関数に渡すときのインタフェース（関数の型）は、すべての依存関係を隠し、できるだけ小さくするべきである。

## キーワード

- [[dependency-injection|依存性の注入]]
- [[dependency|依存関係]]
- コンポジションルート
- [[partial-application|部分適用]]
- [[inversion-of-control|制御の反転]]
- [[suave|Suave]]
- [[functional-programming|関数型プログラミング]]

## 自分の理解

トップレベルから依存関係を受け渡していく方法は、React の props のバケツリレー（props drilling）に似ている。
