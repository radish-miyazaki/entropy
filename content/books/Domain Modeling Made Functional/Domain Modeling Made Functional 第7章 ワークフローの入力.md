---
title: Domain Modeling Made Functional 第7章 ワークフローの入力
description: ワークフローの入力はコマンドであり、共通のフィールドはジェネリクスで共有し、複数のコマンドは選択型でまとめる
tags: [book-chapter]
date: 2024-07-21
book: "[[Domain Modeling Made Functional]]"
chapter: 7
---

## TL;DR

- [[workflow|ワークフロー]]の本当の入力は[[command|コマンド]]である。
- コマンドに共通するフィールドはジェネリクスで共有し、複数のコマンドは[[discriminated-union|選択型]]で 1 つの型にまとめる。

## 内容

[[Domain Modeling Made Functional 第7章 Modeling Workflows as Pipelines|Modeling Workflows as Pipelines]] の一節である。

### 入力としてのコマンド

ワークフローの本当の入力はコマンドであり、単なる[[domain-object|ドメインオブジェクト]]ではない。コマンドは、[[dto|DTO]] からデシリアライズされた状態で渡される。

注文確定ワークフローでは、コマンドを `PlaceOrder`（注文を確定する）とする。このコマンドは、ワークフローがリクエストを処理するのに必要な情報をすべて含んでいなければならない。その中心はドメインオブジェクトの `UnvalidatedOrder` である。

```fsharp
type UnvalidatedOrder =
    { OrderId: string
      CustomerInfo: UnvalidateCustomerInfo
      ShippingAddress: UnvalidatedAddress }
```

今回は記録や監査のために、誰がコマンドを作ったかとタイムスタンプというメタデータも追跡したい。そこで、次のように型を定義する。

```fsharp
type PlaceOrder =
    { OrderForm: UnvalidatedOrder
      TimeStamp: DateTime
      UserId: string }
```

### ジェネリクスによる共通構造の共有

各コマンドは、タイムスタンプやユーザ ID のような共通のフィールドを持つ。オブジェクト指向プログラミングなら、共通のフィールドを持つ基底クラスを定義し、各コマンドがそれを継承すれば解決できる。[[functional-programming|関数型プログラミング]]では、ジェネリクスを使って解決する。

```fsharp
type Command<'data> = {
    Data: 'data
    TimeStamp: DateTime
    UserId: string
}

type PlacedOrderCommand = Command<UnvalidatedOrder>
```

### 複数のコマンドを 1 つの型にまとめる

[[bounded-context|境界づけられたコンテキスト]]のすべてのコマンドが、同じ入力チャネル（メッセージキュー）で送られることもある。この場合、コマンドを[[serialization|シリアライズ]]できる 1 つのデータ構造にまとめる必要がある。複数のコマンドから 1 つを選ぶので、選択型を使う。

```fsharp
type OrderTakingCommand =
    | Place of PlaceOrder
    | Change of ChangeOrder
    | Cancel of CancelOrder
```

この選択型は DTO に変換され、入力チャネル上でシリアライズとデシリアライズが行われる。そのために、[[onion-architecture|オニオンアーキテクチャ]]のインフラストラクチャ層に、コマンドを振り分けるルーティング（ディスパッチ）の入力ステージを追加する。

## キーワード

- [[workflow|ワークフロー]]
- [[command|コマンド]]
- [[domain-object|ドメインオブジェクト]]
- [[dto|DTO]]
- [[serialization|シリアライズ]]
- [[discriminated-union|選択型]]
- [[bounded-context|境界づけられたコンテキスト]]
- [[onion-architecture|オニオンアーキテクチャ]]

## 自分の理解

ワークフローの入力がドメインオブジェクトそのものではなく、コマンドだという点が大事だと思った。また、コマンドにメタデータを持たせるかどうかは仕様次第で、必須ではない。
