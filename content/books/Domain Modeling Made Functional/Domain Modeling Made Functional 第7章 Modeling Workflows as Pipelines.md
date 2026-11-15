---
title: Domain Modeling Made Functional › Modeling Workflows as Pipelines
description: ワークフローを、小さな変換ステップをつないだパイプラインとして型でモデリングする章
tags: [book-chapter, ddd]
date: 2024-07-19
book: "[[Domain Modeling Made Functional]]"
chapter: 7
---

## TL;DR

- [[business-process|ビジネスプロセス]]を、一連のドキュメントの変換として捉え、パイプラインとしてモデリングする。
- パイプラインは小さなステップの集まりで、各ステップは 1 つのものだけを変換する。各ステップはステートレスで[[side-effect|副作用]]を持たない。

## 内容

### 目標

この章では、[[workflow|ワークフロー]]を型でモデリングする。目標は[[Domain Modeling Made Functional 第5章 Domain Modeling with Types|第5章 Domain Modeling with Types]]と同じで、[[domain-expert|ドメインエキスパート]]が読めるものを作ることである。

例として、[[Domain Modeling Made Functional 第2章 Understanding the Domain|第2章]]で文書化した「注文確定」ワークフローを取り上げる。

```text
bounded context: Order-Taking

workflow: "Place order" =
  input: UnvalidatedOrder
  output (on successs):
    OrderAcknowledgmentSent
    AND OrderPlaced (to send to shipping)
    AND BillableOrderPlaced (to send to billing)
  output (on error):
    ValidationError

  // ステップ 1
  do ValidateOrder
  If order is invalid then:
    return with ValidationError

  // ステップ 2
  do PriceOrder

  // ステップ 3
  do SendAcknowledgmentToCustomer

  // ステップ 4
  create and return the events
```

### パイプラインとしてのワークフロー

多くのビジネスプロセスは、一連のドキュメントの変換として考えられる。本書では、ビジネスプロセスをパイプラインで表し、それをさらに小さなパイプの集まりとして表現する。各パイプは 1 つのものだけを変換する。このようなプログラミングスタイルは、変換指向プログラミングとも呼ばれる。

[[functional-programming|関数型プログラミング]]の原則に従い、パイプラインの各ステップはステートレスで副作用がないようにする。こうすると、各ステップを独立してテストし、理解できる。

### 節の構成

- [[Domain Modeling Made Functional 第7章 ワークフローの入力|ワークフローの入力]]
- 状態のモデリング
  - [[Domain Modeling Made Functional 第7章 状態の集合による注文のモデリング|状態の集合による注文のモデリング]]
  - [[Domain Modeling Made Functional 第7章 ステートマシン|ステートマシン]]
- ワークフローのモデリング
  - [[Domain Modeling Made Functional 第7章 型を使ったワークフローの各ステップのモデリング|型を使ったワークフローの各ステップのモデリング]]
  - [[Domain Modeling Made Functional 第7章 エフェクトの文書化|エフェクトの文書化]]
  - [[Domain Modeling Made Functional 第7章 ステップからワークフローを合成する|ステップからワークフローを合成する]]
  - [[Domain Modeling Made Functional 第7章 依存関係をパラメータに含めるか|依存関係をパラメータに含めるか]]
  - [[Domain Modeling Made Functional 第7章 長時間稼働するワークフロー|長時間稼働するワークフロー]]

### 型の置き場所

この章で作る型は、公開 API で使う型と、内部のステップで使う型とで、ファイルを分けるのがよい。

- [公開 API（DomainApi.fsx）](https://github.com/radish-miyazaki/DomainModelingMadeFunctional/blob/main/DomainApi.fsx): 入力（データとコマンド）、出力（イベントとエラー）、ワークフロー関数自身の型
- [内部のステップ（PlaceOrderWorkflow.fsx）](https://github.com/radish-miyazaki/DomainModelingMadeFunctional/blob/main/PlaceOrderWorkflow.fsx): 各ステップの型定義

## キーワード

- [[workflow|ワークフロー]]
- [[business-process|ビジネスプロセス]]
- [[domain-expert|ドメインエキスパート]]
- [[functional-programming|関数型プログラミング]]
- [[side-effect|副作用]]

## 自分の理解

日本語話者の場合、ドメインエキスパートが読めるものにするには、[[japanese-domain-names|ドメインに日本語を使う]]ことも考えたい。
