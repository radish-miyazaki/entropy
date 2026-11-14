---
title: Domain Modeling Made Functional 第12章 永続化を端に追いやる
description: ワークフローの中では I/O や永続化を行わず、純粋なビジネスロジックを中心に、I/O を端に置く構成にする
tags: [book-chapter]
date: 2024-08-09
book: "[[Domain Modeling Made Functional]]"
chapter: 12
---

## TL;DR

- 外部とデータをやり取りする処理は純粋でなく、テストしにくい。そのため、[[workflow|ワークフロー]]の中では I/O や[[persistence|永続化]]を行わない。
- ワークフローを、ビジネスロジックを含む中心部分と、I/O を扱う端の部分に分ける。この構成なら[[repository-pattern|リポジトリパターン]]は要らない。
- 純粋なコードの途中で I/O が必要になったら、小さなワークフローに分割できないかを考える。

## 内容

[[Domain Modeling Made Functional 第12章 Persistence|第12章 Persistence]]のガイドラインの 1 つである。理想はすべての関数を[[pure-function|純粋関数]]にすることだが、外部とデータをやり取りする処理は純粋でなく、テストしにくい。そこで、ワークフローを次の 2 つに分ける。

- ビジネスロジックを含む、[[domain|ドメイン]]の中心部分
- I/O 関連のコードを含む、端の部分

これは[[Domain Modeling Made Functional 第3章 I／O を端に追いやる|I/O を端に追いやる]]と同じ考え方である。

### 請求書の支払いの例

次の処理を考える。

1. DB から請求書を読み込む
2. 支払いを行う
3. 全額支払われたら、DB で「支払い済み」とマークし、「請求書が支払われた」イベントを送る。そうでなければ、DB で「一部支払い済み」とマークし、イベントは送らない

[[fsharp|F#]] でそのまま書くと次のようになる。

```fsharp
let payInvoice invoiceId payment =
    // 1.
    let invoice = loadInvoiceFromDatabase invoiceId

    // 2.
    invoice.ApplyPayment payment

    // 3.
    if invoice.IsFullyPaid then
        markAsFullyPaidInDb invoiceId
        postInvoicePaidEvent invoiceId
    else
        markAsPartiallyPaidInDb invoiceId
```

この関数は純粋でないので、テストしにくい。

### 改善する

まず、純粋なビジネスロジックを関数に切り出す。これでテストが簡単になる。

```fsharp
let applyPaymentToInvoice unpaidInvoice payment : InvoicePaymentResult =
    let updatedInvoice = unpaidInvoice |> applyPayment payment

    if isFullyPaid updatedInvoice then
        FullyPaid
    else
        PartiallyPaid
```

次に、[[bounded-context|境界づけられたコンテキスト]]の境界で、この関数をコマンドハンドラの一部として使う。

```fsharp
type PayInvoiceCommand =
    { InvoiceId: ...
      Payment: ... }

let payInvoice payInvoiceCommand =
    // DB から読み込む（I/O）
    let invoiceId = payInvoiceCommand.InvoiceId
    let unpaidInvoice =
        loadUnpaidInvoiceFromDatabase invoiceId

    // 純粋関数の呼び出し
    let payment = payInvoiceCommand.Payment
    let paymentResult = applyPaymentToInvoice unpaidInvoice payment

    // 結果を処理する（I/O）
    match paymentResult with
    | FullyPaid -> markAsFullyPaidInDb invoiceId
    | PartiallyPaid -> markAsPartiallyPaidInDb invoiceId
```

I/O が端に、ビジネスロジックが中心に来る構造になっている。永続化のロジックは単純なので、この関数を単体でテストする必要はなく、統合テストでカバーすればよい。

それでもテストしたい場合は、I/O を行う関数をすべて依存関係としてパラメータで受け取るようにする（[[Domain Modeling Made Functional 第9章 依存関係の注入|依存関係の注入]]）。

```fsharp
let payInvoice
    loadUnpaidInvoiceFromDatabase // 依存関係
    markAsFullyPaidInDb           // 依存関係
    markAsPartiallyPaidInDb       // 依存関係
    payInvoiceCommand =           // コマンド
    ...
```

### クエリの結果で分岐したいとき

純粋なコードの途中で、データベースから読み込んだ値に基づいて処理を分岐させたいこともある。純粋な関数を不純な I/O 関数で挟む構成も取れる。しかし、[[Domain Modeling Made Functional 第7章 長時間稼働するワークフロー|長時間稼働するワークフロー]]で見たように、ワークフローを小さなワークフローに分割すれば、I/O が端にある状態を保てる。

### リポジトリパターンは要るか

エリック・エヴァンスのドメイン駆動設計は、DB にアクセスするためのパターンとしてリポジトリパターンを紹介している。しかし、[[functional-programming|関数型プログラミング]]ではこのパターンを採用する必要はない。理由は次のとおり。

- リポジトリパターンは、ミュータブルな状態を前提としたオブジェクト指向プログラミングで、永続化を隠蔽するためのパターンである
- すべてを関数としてモデリングし、永続化を端に追いやれば、もう隠蔽する必要はない
- 必要な関数だけをパラメータで受け取って使えるので、保守しやすい

## キーワード

- [[persistence|永続化]]
- [[workflow|ワークフロー]]
- [[pure-function|純粋関数]]
- [[repository-pattern|リポジトリパターン]]
- [[functional-programming|関数型プログラミング]]
- [[bounded-context|境界づけられたコンテキスト]]

## 自分の理解

リポジトリパターンは、エリック・エヴァンスのドメイン駆動設計の第 6 章に書かれている。
