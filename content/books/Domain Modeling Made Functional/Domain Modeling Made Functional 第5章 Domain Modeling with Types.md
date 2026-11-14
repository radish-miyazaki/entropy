---
title: Domain Modeling Made Functional 第5章 Domain Modeling with Types
description: 型システムを使えば、ドメインエキスパートも読めるドキュメントとして機能するコードでドメインモデルを書ける
tags: [book-chapter, ddd, fsharp]
date: 2024-07-16
book: "[[Domain Modeling Made Functional]]"
chapter: 5
---

## TL;DR

- 共有されたモデルはコードにも反映する必要があり、[[type-system|型システム]]を使うとソースコードをドキュメントとして機能させられる。
- [[domain-model|ドメインモデル]]は、単純な値、AND と OR による複雑なデータ、ワークフローという典型的なパターンで組み立てる。

## 内容

### コードをドキュメントにする

[[Domain Modeling Made Functional 第1章 共有されたモデルの重要性|共有されたモデルの重要性]]で見たように、共有されたモデルはコードにも反映される必要がある。理想は、ソースコードがそのままドキュメントとして機能することである。そうすれば、[[domain-expert|ドメインエキスパート]]やほかの非エンジニアも、コードをレビューしたり設計に加わったりできる。[[type-system|型システム]]を使うと、これを実現できる。型で書いたモデルは、[[Domain Modeling Made Functional 第2章 Understanding the Domain|第2章]]で作ったドメインの文書とほとんど同じ形になる。

### ドメインモデルの典型的なパターン

ドメインモデルには、典型的なパターンがある。

1 つ目は単純な値である（[[Domain Modeling Made Functional 第5章 単純な値のモデリング|単純な値のモデリング]]）。文字列や整数などのプリミティブ型で表される基本的な構成要素だが、`int` や `string` ではなく、`OrderId` や `ProductCode` のような[[ubiquitous-language|ユビキタス言語]]の概念として考える。

2 つ目は複雑なデータである（[[Domain Modeling Made Functional 第5章 複雑なデータのモデリング|複雑なデータのモデリング]]）。AND による値の組み合わせは、密接に関連したデータのまとまりを表す。紙の世界でいえば、書類そのものや、名前、住所、注文のような書類の中のひとまとまりの要素にあたる。OR による選択肢は、`Order`（注文）または `Quote`（見積もり）、`UnitQuantity`（個数）または `KilogramQuantity`（キログラム数）のような選択を表す。

3 つ目は[[workflow|ワークフロー]]である（[[Domain Modeling Made Functional 第5章 関数によるワークフローのモデリング|関数によるワークフローのモデリング]]）。入力と出力を持つ[[business-process|ビジネスプロセス]]を表す。

### エンティティ、値オブジェクト、集約

[[domain-driven-design|ドメイン駆動設計]]では、ID のような永続的なアイデンティティを持つオブジェクトを[[entity|エンティティ]]、持たないオブジェクトを[[value-object|値オブジェクト]]と呼ぶ（[[Domain Modeling Made Functional 第5章 アイデンティティの考察： 値オブジェクト|値オブジェクト]]、[[Domain Modeling Made Functional 第5章 アイデンティティの考察： エンティティ|エンティティ]]）。

エンティティの中には、ほかのエンティティのコレクションを持つトップレベルのエンティティもある。ドメイン駆動設計では、このようなエンティティのまとまりを[[aggregate|集約]]、トップレベルのエンティティを[[aggregate-root|集約ルート]]と呼ぶ（[[Domain Modeling Made Functional 第5章 集約|集約]]）。

## キーワード

- [[type-system|型システム]]
- [[domain-model|ドメインモデル]]
- [[domain-expert|ドメインエキスパート]]
- [[ubiquitous-language|ユビキタス言語]]
- [[workflow|ワークフロー]]
- [[business-process|ビジネスプロセス]]
- [[entity|エンティティ]]
- [[value-object|値オブジェクト]]
- [[aggregate|集約]]
- [[aggregate-root|集約ルート]]

## 自分の理解

そもそも、[[Domain Modeling Made Functional 第2章 Understanding the Domain|ドメインの文書化]]で作る文書が日本語話者にはハードルが高いので、なおさらである。[[japanese-domain-names|ドメインに日本語を使う]]を試してみたい。
