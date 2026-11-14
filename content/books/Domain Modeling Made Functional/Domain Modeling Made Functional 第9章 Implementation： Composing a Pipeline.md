---
title: "Domain Modeling Made Functional 第9章 Implementation: Composing a Pipeline"
description: 第7章で設計したパイプラインを F# で実装する。各ステップを独立した関数として実装し、それらを合成する
tags: [book-chapter, ddd]
date: 2024-07-29
book: "[[Domain Modeling Made Functional]]"
chapter: 9
---

## TL;DR

- [[Domain Modeling Made Functional 第7章 Modeling Workflows as Pipelines|Modeling Workflows as Pipelines]] で設計したパイプラインを [[fsharp|F#]] で実装する。
- 各ステップを独立した関数として実装してから、それらを[[function-composition|関数合成]]する。合成を難しくする依存関係とエフェクトのうち、この章では依存関係を扱う。

## 内容

### 実装の 2 つの段階

実装は 2 つの段階に分かれる。

1. パイプラインの各ステップを、独立した関数として実装する。各ステップはステートレスで[[side-effect|副作用]]がないようにし、独立してテストし理解できるようにする。
2. 1 で作った関数を合成する。

ただし、次の 2 つの理由から、関数は簡単には合成できない。

- **[[dependency|依存関係]]**: パイプラインの一部ではないが、実装に必要な追加のパラメータがある。この章では、[[functional-programming|関数型プログラミング]]で[[dependency-injection|依存性の注入]]と同じことを実現する方法を扱う。
- **エフェクト**: 出力に `Result` のようなエフェクトを使うと、中身のデータを入力とする関数と合成できない。これは[[Domain Modeling Made Functional 第10章 Implementation： Working with Errors|第10章 Implementation: Working with Errors]] で扱う。

実際にコードを書くときも、本書の流れと同じように、`Result` や `Async` などのエフェクトを気にせず、まずすべてのステップを実装するとよい。そうすれば合成の基本に集中できる。

### 実装の流れ

- 前準備
  - [[Domain Modeling Made Functional 第9章 各ステップを実装する前に、単純型を実装する|各ステップを実装する前に、単純型を実装する]]（`SimpleTypes.fs` など、実装とは別のファイルに書く）
- 各ステップの実装
  - [[Domain Modeling Made Functional 第9章 関数の型から実装を導く|関数の型から実装を導く]]
  - [[Domain Modeling Made Functional 第9章 最初のステップの実装|最初のステップの実装]]
  - [[Domain Modeling Made Functional 第9章 残りのステップの実装|残りのステップの実装]]
- ステップの合成
  - [[Domain Modeling Made Functional 第9章 パイプラインのステップを 1 つに合成する|パイプラインのステップを 1 つに合成する]]
  - [[Domain Modeling Made Functional 第9章 依存関係の注入|依存関係の注入]]
- テスト
  - [[Domain Modeling Made Functional 第9章 依存関係のテスト|依存関係のテスト]]

### ファイルの構成

ファイルは[[workflow|ワークフロー]]ごとに作る。

```fsharp
module ワークフロー名 =
    // 1. 設計 （型定義）

    // 2. 各ステップの実装

    // 3. メインとなるワークフローの関数
```

## キーワード

- [[fsharp|F#]]
- [[function-composition|関数合成]]
- [[side-effect|副作用]]
- [[dependency|依存関係]]
- [[dependency-injection|依存性の注入]]
- [[functional-programming|関数型プログラミング]]
- [[workflow|ワークフロー]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
