---
title: Domain Modeling Made Functional › トランザクションを扱う
description: 複数の集約をまとめて更新する必要があるとき、データストアのトランザクションを使うか、補償トランザクションで不整合を直すかを説明する節
tags: [book-chapter]
date: 2024-08-09
book: "[[Domain Modeling Made Functional]]"
chapter: 12
---

## TL;DR

- 一般的には「1 つの[[aggregate|集約]]につき 1 つの[[transaction|トランザクション]]」だが、複数の集約を更新しなければならない場合もある。
- データストアがトランザクションを提供していればそれを使い、提供していなければ[[compensating-transaction|補償トランザクション]]で対処する。

## 内容

[[Domain Modeling Made Functional 第12章 Persistence|第12章 Persistence]] の一節である。

### 複数の集約を更新するケース

これまでは「1 つの集約 = 1 つのトランザクション」という形を取ってきた（[[Domain Modeling Made Functional 第6章 同じコンテキストの集約間の整合性|同じコンテキストの集約間の整合性]]）。

> 一般的には「1 つのトランザクションにつき 1 つの集約のみを更新する」

しかし、2 つの口座間の送金のように、複数の集約を更新しなければならない場合もある。この場合はトランザクションが必要になる。

### データストアがトランザクションを提供している場合

一般的な RDBMS を使っている場合などは、API からトランザクションを開始する。

```fsharp
let connection = new SqlConnection()
let transaction = connection.BeginTransaction()

markAsFullyPaid connection invoiceId
markPaymentComplete connection paymentId

transaction.Commit()
```

DBMS によっては、複数の操作を 1 回の呼び出しにまとめないとトランザクションにできないこともある。

### データストアがトランザクションを提供していない場合

異なる RDBMS や外部サービスをまたぐ場合は、データストアのトランザクションを使えない。システム間のトランザクションはオーバーヘッドや調整のコストが大きく時間がかかるので、[スターバックスは2フェーズコミットを使わない](https://code.google.com/archive/p/gregors-ramblings-ja/wikis/18_starbucks.wiki) にあるように、ビジネスでは異なるシステム間のトランザクションを必要としないはずである。

代わりに、大抵の処理はうまくいくと想定する。そのうえで、不整合を見つける調整プロセスと、エラーを打ち消す補償アクション（補償トランザクション）を用意する。

```fsharp
markAsFullyPaid connection invoiceId
let result = markPaymentComplete connection paymentId

match result with
| Error err ->
    // エラーを補償する
    unmarkAsFullyPaid connection invoiceId
| Ok _ -> ...
```

## キーワード

- [[aggregate|集約]]
- [[transaction|トランザクション]]
- [[compensating-transaction|補償トランザクション]]
- [[coherence|整合性]]

## 自分の理解

複数の操作を 1 回の呼び出しにまとめないとトランザクションにできない DBMS は、見たことがない。
