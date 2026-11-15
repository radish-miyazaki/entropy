---
title: Domain Modeling Made Functional › エフェクトの文書化
description: ワークフローの各ステップが起こしうるエラーや I/O を、Result や Async のエフェクトとして型シグネチャに書く
tags: [book-chapter]
date: 2024-07-25
book: "[[Domain Modeling Made Functional]]"
chapter: 7
---

## TL;DR

- 関数が主な出力以外に行うことを、エフェクトとして型シグネチャに書く（[[Domain Modeling Made Functional 第5章 関数によるワークフローのモデリング|関数のシグネチャでエフェクトを文書化する]]）。
- エラーが起こりうるなら `Result`、I/O 処理をするなら `Async` を使う。

## 内容

[[Domain Modeling Made Functional 第7章 Modeling Workflows as Pipelines|Modeling Workflows as Pipelines]] の一節である。[[Domain Modeling Made Functional 第7章 型を使ったワークフローの各ステップのモデリング|型を使ったワークフローの各ステップのモデリング]]で定義した各ステップについて、エラーを返すか（`Result` エフェクト）、I/O 処理をするか（`Async` エフェクト）を考える。

### 検証のステップ

検証のステップには 2 つの[[dependency|依存関係]]がある。製品コードの存在チェック（`CheckProductCodeExists`）はエフェクトを持たない。

```fsharp
type CheckProductCodeExists = ProductCode -> bool
```

住所の存在チェック（`CheckAddressExists`）は外部サービスを使うとする。そのため `Async` と `Result` の両方のエフェクトが必要になる。この 2 つは一緒に使われることが多いので、`AsyncResult` という型にまとめるのが一般的である。

```fsharp
type AsyncResult<'success, 'failure> = Async<Result<'success, 'failure>>

type CheckAddressExists =
    UnvalidatedAddress -> AsyncResult<CheckedAddress, AddressValidationError>
```

こうすると、I/O 処理をすることと、失敗する可能性があることが型シグネチャから分かる。

自律性を持たせるために、住所検証サービスのローカル版を作るべきかという問題もある。可用性のためなら作るのもよい（[[Domain Modeling Made Functional 第1章 境界づけられたコンテキストを利用した解決手段の作成|境界づけられたコンテキストを利用した解決手段の作成]]）。今回のように外部サービスを使う場合は、そのサービスを信頼するか、問題が起きたときの備えをしておく必要がある。

`Result` と同じように、`Async` も呼び出す側のコードすべてに伝わる。そのため、検証のステップ全体の出力も `AsyncResult` になる。

```fsharp
type ValidateOrder =
    CheckProductCodeExists                              // 依存関係
        -> CheckAddressExists                           // 依存関係
        -> UnvalidatedOrder                             // 入力
        -> AsyncResult<ValidatedOrder, ValidationError> // 出力
```

### 価格設定のステップ

依存関係の製品価格の取得（`GetProductPrice`）はエフェクトを持たない。一方、注文の価格計算（`PriceOrder`）自体はエラーを返す可能性がある。たとえば価格が間違っていて、請求額の合計（`AmountToBill`）が非常に大きくなったり、マイナスになったりする場合である。

```fsharp
type PricingError = PricingError of string

type PriceOrder =
    GetProductPrice                          // 依存関係
        -> ValidatedOrder                    // 入力
        -> Result<PricedOrder, PricingError> // 出力
```

### 注文確認のステップ

依存関係は 2 つある。注文確認書の作成（`CreateOrderAcknowledgmentLetter`）はエフェクトを持たない。注文確認の送信（`SendOrderAcknowledgment`）はメールで送るので、`Async` エフェクトを使う。エラーについては気にしないことにする。

```fsharp
type SendOrderAcknowledgment = OrderAcknowledgment -> Async<SendResult>
```

`Async` は親の関数にも伝わるので、ステップ全体の出力も `Async` になる。

```fsharp
type Acknowledgment =
    CreateOrderAcknowledgmentLetter               // 依存関係
        -> SendOrderAcknowledgment                // 依存関係
        -> PricedOrder                            // 入力
        -> Async<OrderAcknowledgmentSent option>  // 出力
```

## キーワード

- [[dependency|依存関係]]
- [[workflow|ワークフロー]]

## 自分の理解

本書は送信時のエラーを気にしないとしているが、仕様次第では考慮したほうがよいと思う。メールアドレスが正しくても、検証から送信までの間にメールアドレスが失効したり、使っている外部のメールサーバが止まっていたりすれば、送信は失敗する。
