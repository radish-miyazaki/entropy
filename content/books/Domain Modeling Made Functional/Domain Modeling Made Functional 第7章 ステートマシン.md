---
title: Domain Modeling Made Functional 第7章 ステートマシン
description: ドメインモデルの状態と遷移をステートマシンとして捉え、F# の選択型と状態遷移関数で実装する
tags: [book-chapter]
date: 2024-07-23
book: "[[Domain Modeling Made Functional]]"
chapter: 7
---

## TL;DR

- ドメインモデルの状態と、[[command|コマンド]]による状態間の遷移は[[state-machine|ステートマシン]]として表せる。
- [[fsharp|F#]] では、状態を[[discriminated-union|選択型]]で、遷移を「選択型を受け取って選択型を返す関数」で実装する。

## 内容

[[Domain Modeling Made Functional 第7章 Modeling Workflows as Pipelines|Modeling Workflows as Pipelines]] の一節である。

### ステートマシンとは

[[domain-model|ドメインモデル]]はさまざまな状態を持つ（[[Domain Modeling Made Functional 第7章 状態の集合による注文のモデリング|状態の集合による注文のモデリング]]）。ある状態から別の状態への遷移は、何らかのコマンドによって引き起こされる。これはステートマシンとして知られている。

ここで扱うステートマシンは、言語のパーサや正規表現で使われるような、数十から数百の状態を持つ複雑なものではない。状態は数個で、遷移もそれより少し多い程度である。次のような例がある。

- メールアドレス: 「未検証」と「検証済み」
- ショッピングカート: 「空」「アクティブ」「支払い済み」
- 荷物の配達: 「未配達」「配達中」「配達完了」

### なぜステートマシンを使うのか

理由は 3 つある。

1. **状態ごとに受け付ける処理を変えられる。** ショッピングカートなら、支払いができるのは「アクティブ」のときだけである。状態ごとに別の型を使えば、この要件を関数のシグネチャに直接書ける。すると、ビジネスルールが守られていることをコンパイラで確かめられる（[[Domain Modeling Made Functional 第6章 ビジネスルールを型システムで表現する|ビジネスルールを型システムで表現する]]）。
2. **すべての状態が明示的に文書化される。** 暗黙の了解のまま文書化されていない状態はよくある。ショッピングカートの「空」と「アクティブ」の区別は、あまり文書化されない。
3. **起こりうる状況をすべて考えて設計するよう促される。** 状態の観点で設計すると、エッジケースの考慮漏れに気づける。たとえば、検証済みのメールアドレスをもう一度検証したらどうなるか。空のカートから商品を取り出そうとしたらどうなるか。すでに発送済みの商品を発送しようとしたらどうなるか。

### F# でシンプルなステートマシンを実装する

ビジネス向けのシンプルなステートマシンに、特別なツールやライブラリは要らない。

まず、各状態を独自の型で表し、関連するデータがあれば持たせる。

```fsharp
type Item = ...
type ActiveCartData = { UnpaidItems: Item list }
type PaidCartData = { PaidItems: Item list; Payment: float }
```

一連の状態は、各状態をケースに持つ選択型で表す。

```fsharp
type ShoppingCart =
    | EmptyCart
    | ActiveCart of ActiveCartData
    | PaidCart of PaidCartData
```

状態間の遷移（コマンドハンドラ、状態遷移関数）は、ステートマシン全体（選択型）を受け取り、更新した選択型を返す関数として実装する。受け取った値をそのまま返すこともある。カートに商品を追加する関数は次のようになる。

```fsharp
let addItem cart item =
    match cart with
    | EmptyCart ->
        ActiveCart { UnpaidItems = [ item ] }
    | ActiveCart { UnpaidItems = existingItems } ->
        ActiveCart { UnpaidItems = item :: existingItems }
    | PaidCart _ ->
        cart
```

カートの商品を支払う関数は次のようになる。

```fsharp
let makePayment cart payment =
    match cart with
    | EmptyCart ->
        cart
    | ActiveCart { UnpaidItems = existingItems } ->
        PaidCart
            { PaidItems = existingItems
              Payment = payment }
    | PaidCart _ ->
        cart
```

## キーワード

- [[state-machine|ステートマシン]]
- [[domain-model|ドメインモデル]]
- [[command|コマンド]]
- [[fsharp|F#]]
- [[discriminated-union|選択型]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
