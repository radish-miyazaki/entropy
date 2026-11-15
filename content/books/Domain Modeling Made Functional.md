---
title: Domain Modeling Made Functional
aliases:
  [
    関数型ドメインモデリング,
    DMMF,
    "Domain Modeling Made Functional: Tackle Software Complexity with Domain-Driven Design and F#",
  ]
description: ドメイン駆動設計と関数型プログラミングを組み合わせ、型を使ってドメインを柔軟かつ簡潔にモデリングする方法を解説する本
tags: [book, fp, ddd]
date: 2023-12-12
book-authors: [Scott Wlaschin]
publisher: Pragmatic Bookshelf
isbn:
---

## TL;DR

- [[domain-driven-design|ドメイン駆動設計]]（DDD）と[[functional-programming|関数型プログラミング]]（FP）を組み合わせた設計の本である。
- FP の中核となる原則を適用することで、OOP のアプローチよりも柔軟かつ簡潔にドメインをモデリングする手法を学ぶ。

## 対象読者

説明に使うプログラミング言語は [[fsharp|F#]] だが、静的型付けの関数型言語であれば、どの言語にも応用できる。2024 年 6 月に、日本語版『[関数型ドメインモデリング ドメイン駆動設計と F# でソフトウェアの複雑さに立ち向かおう](https://www.kadokawa.co.jp/product/302405003608/)』が発売された。

## 目次

本書は大きく 3 つのパートに分かれている。

### Part I: Understanding the Domain

DDD の背後にある考え方と、ドメインを共有することの重要性を扱う。[[event-storming|イベントストーミング]]のようにドメインを共有する手法や、大きなドメインを独立して実装できる小さなコンポーネントに分割する方法を学ぶ。

1. [[Domain Modeling Made Functional 第1章 Introducing Domain-Driven Design|Introducing Domain-Driven Design]]
   - [[Domain Modeling Made Functional 第1章 共有されたモデルの重要性|共有されたモデルの重要性]]
   - [[Domain Modeling Made Functional 第1章 ビジネスイベントを通じてドメインを理解する|ビジネスイベントを通じてドメインを理解する]]
   - [[Domain Modeling Made Functional 第1章 ドメインをサブドメインに分割する|ドメインをサブドメインに分割する]]
   - [[Domain Modeling Made Functional 第1章 境界づけられたコンテキストを利用した解決手段の作成|境界づけられたコンテキストを利用した解決手段の作成]]
   - [[Domain Modeling Made Functional 第1章 ユビキタス言語の創造|ユビキタス言語の創造]]
2. [[Domain Modeling Made Functional 第2章 Understanding the Domain|Understanding the Domain]]
3. [[Domain Modeling Made Functional 第3章 A Functional Architecture|A Functional Architecture]]
   - [[Domain Modeling Made Functional 第3章 自律的なソフトウェアコンポーネントとしての境界づけられたコンテキスト|自律的なソフトウェアコンポーネントとしての境界づけられたコンテキスト]]
   - [[Domain Modeling Made Functional 第3章 境界づけられたコンテキストのコミュニケーション|境界づけられたコンテキストのコミュニケーション]]
   - [[Domain Modeling Made Functional 第3章 境界づけられたコンテキスト間の契約|境界づけられたコンテキスト間の契約]]
   - [[Domain Modeling Made Functional 第3章 境界づけられたコンテキストのワークフロー|境界づけられたコンテキストのワークフロー]]
   - [[Domain Modeling Made Functional 第3章 I／O を端に追いやる|I/O を端に追いやる]]
   - [[Domain Modeling Made Functional 第3章 境界づけられたコンテキストの中のコード構造|境界づけられたコンテキストの中のコード構造]]

### Part II: Modeling the Domain

ドメインから 1 つのワークフローを取り上げ、関数型の手法でモデリングする。OOP のアプローチとの違いや、型を使って要件を表す方法を学ぶ。ここで書くコードは、ドメインの読みやすいドキュメントであると同時に、残りの実装を載せるコンパイル可能な枠組みにもなる。

4. [[Domain Modeling Made Functional 第4章 Understanding Types|Understanding Types]]
   - [[Domain Modeling Made Functional 第4章 関数の理解|関数の理解]]
   - [[Domain Modeling Made Functional 第4章 型と関数|型と関数]]
   - [[Domain Modeling Made Functional 第4章 型の合成|型の合成]]
   - [[Domain Modeling Made Functional 第4章 F＃ の型を扱う|F# の型を扱う]]
   - [[Domain Modeling Made Functional 第4章 型の合成によるドメインモデルの構築|型の合成によるドメインモデルの構築]]
   - [[Domain Modeling Made Functional 第4章 省略可能な値、エラー、およびコレクションのモデリング|省略可能な値、エラー、およびコレクションのモデリング]]
   - [[Domain Modeling Made Functional 第4章 ファイルやプロジェクトでの型の整理|ファイルやプロジェクトでの型の整理]]
5. [[Domain Modeling Made Functional 第5章 Domain Modeling with Types|Domain Modeling with Types]]
   - [[Domain Modeling Made Functional 第5章 単純な値のモデリング|単純な値のモデリング]]
   - [[Domain Modeling Made Functional 第5章 複雑なデータのモデリング|複雑なデータのモデリング]]
   - [[Domain Modeling Made Functional 第5章 関数によるワークフローのモデリング|関数によるワークフローのモデリング]]
   - [[Domain Modeling Made Functional 第5章 アイデンティティの考察： 値オブジェクト|アイデンティティの考察: 値オブジェクト]]
   - [[Domain Modeling Made Functional 第5章 アイデンティティの考察： エンティティ|アイデンティティの考察: エンティティ]]
   - [[Domain Modeling Made Functional 第5章 集約|集約]]
6. [[Domain Modeling Made Functional 第6章 Integrity and Consistency in the Domain|Integrity and Consistency in the Domain]]
   - [[Domain Modeling Made Functional 第6章 単純な値の完全性|単純な値の完全性]]
   - [[Domain Modeling Made Functional 第6章 数値に測定単位を付与する|数値に測定単位を付与する]]
   - [[Domain Modeling Made Functional 第6章 型システムで不変条件を強制する|型システムで不変条件を強制する]]
   - [[Domain Modeling Made Functional 第6章 ビジネスルールを型システムで表現する|ビジネスルールを型システムで表現する]]
   - [[Domain Modeling Made Functional 第6章 1 つの集約内での整合性|1 つの集約内での整合性]]
   - [[Domain Modeling Made Functional 第6章 異なるコンテキスト間での整合性|異なるコンテキスト間での整合性]]
   - [[Domain Modeling Made Functional 第6章 同じコンテキストの集約間の整合性|同じコンテキストの集約間の整合性]]
   - [[Domain Modeling Made Functional 第6章 同一データに作用する複数の集約|同一データに作用する複数の集約]]
7. [[Domain Modeling Made Functional 第7章 Modeling Workflows as Pipelines|Modeling Workflows as Pipelines]]
   - [[Domain Modeling Made Functional 第7章 ワークフローの入力|ワークフローの入力]]
   - [[Domain Modeling Made Functional 第7章 状態の集合による注文のモデリング|状態の集合による注文のモデリング]]
   - [[Domain Modeling Made Functional 第7章 ステートマシン|ステートマシン]]
   - [[Domain Modeling Made Functional 第7章 型を使ったワークフローの各ステップのモデリング|型を使ったワークフローの各ステップのモデリング]]
   - [[Domain Modeling Made Functional 第7章 エフェクトの文書化|エフェクトの文書化]]
   - [[Domain Modeling Made Functional 第7章 ステップからワークフローを合成する|ステップからワークフローを合成する]]
   - [[Domain Modeling Made Functional 第7章 依存関係をパラメータに含めるか|依存関係をパラメータに含めるか]]
   - [[Domain Modeling Made Functional 第7章 長時間稼働するワークフロー|長時間稼働するワークフロー]]

### Part III: Implementing the Domain

モデリングしたワークフローを実装する。その過程で、[[function-composition|関数合成]]や[[partial-application|部分適用]]、[[monad|モナド]]といった関数型プログラミングの一般的なテクニックの使い方を学ぶ。

8. [[Domain Modeling Made Functional 第8章 Understanding Functions|Understanding Functions]]
   - [[Domain Modeling Made Functional 第8章 関数型プログラミングとは何かを理解する|関数型プログラミングとは何かを理解する]]
   - [[Domain Modeling Made Functional 第8章 ものとしての関数|ものとしての関数]]
   - [[Domain Modeling Made Functional 第8章 全域関数|全域関数]]
   - [[Domain Modeling Made Functional 第8章 関数合成|関数合成]]
9. [[Domain Modeling Made Functional 第9章 Implementation： Composing a Pipeline|Implementation: Composing a Pipeline]]
   - [[Domain Modeling Made Functional 第9章 最初のステップの実装|最初のステップの実装]]
   - [[Domain Modeling Made Functional 第9章 各ステップを実装する前に、単純型を実装する|各ステップを実装する前に、単純型を実装する]]
   - [[Domain Modeling Made Functional 第9章 関数の型から実装を導く|関数の型から実装を導く]]
   - [[Domain Modeling Made Functional 第9章 残りのステップの実装|残りのステップの実装]]
   - [[Domain Modeling Made Functional 第9章 パイプラインのステップを 1 つに合成する|パイプラインのステップを 1 つに合成する]]
   - [[Domain Modeling Made Functional 第9章 依存関係の注入|依存関係の注入]]
   - [[Domain Modeling Made Functional 第9章 依存関係のテスト|依存関係のテスト]]
10. [[Domain Modeling Made Functional 第10章 Implementation： Working with Errors|Implementation: Working with Errors]]

- [[Domain Modeling Made Functional 第10章 Result 型を使ってエラーを明示する|Result 型を使ってエラーを明示する]]
- [[Domain Modeling Made Functional 第10章 ドメインエラーを扱う|ドメインエラーを扱う]]
- [[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）|Result を生成する関数の連鎖（bind と errorMap、map）]]
- [[Domain Modeling Made Functional 第10章 実際のパイプラインでの bind と map の利用|実際のパイプラインでの bind と map の利用]]
- [[Domain Modeling Made Functional 第10章 他の種類の関数を 2 トラックモデルに適合させる|他の種類の関数を 2 トラックモデルに適合させる]]
- [[Domain Modeling Made Functional 第10章 コンピュテーション式の導入|コンピュテーション式の導入]]
- [[Domain Modeling Made Functional 第10章 なんとなく理解するモナドとアプリカティブ|なんとなく理解するモナドとアプリカティブ]]
- [[Domain Modeling Made Functional 第10章 非同期エフェクトの追加|非同期エフェクトの追加]]

11. [[Domain Modeling Made Functional 第11章 Serialization|Serialization]]

- [[Domain Modeling Made Functional 第11章 シリアライズのための設計|シリアライズのための設計]]
- [[Domain Modeling Made Functional 第11章 シリアライズコードとワークフローの連携|シリアライズコードとワークフローの連携]]
- [[Domain Modeling Made Functional 第11章 シリアライズの全体例|シリアライズの全体例]]
- [[Domain Modeling Made Functional 第11章 ドメインは DTO を知らない|ドメインは DTO を知らない]]
- [[Domain Modeling Made Functional 第11章 ドメイン型を DTO に変換する方法|ドメイン型を DTO に変換する方法]]
- [[Domain Modeling Made Functional 第11章 単純型を DTO に変換する|単純型を DTO に変換する]]
- [[Domain Modeling Made Functional 第11章 オプション型を DTO に変換する|オプション型を DTO に変換する]]
- [[Domain Modeling Made Functional 第11章 レコード型を DTO に変換する|レコード型を DTO に変換する]]
- [[Domain Modeling Made Functional 第11章 コレクションを DTO に変換する|コレクションを DTO に変換する]]
- [[Domain Modeling Made Functional 第11章 列挙型を DTO に変換する|列挙型を DTO に変換する]]
- [[Domain Modeling Made Functional 第11章 タプルを DTO に変換する|タプルを DTO に変換する]]
- [[Domain Modeling Made Functional 第11章 選択型を DTO に変換する|選択型を DTO に変換する]]
- [[Domain Modeling Made Functional 第11章 レコード型や選択型のマップを使ったシリアライズ|レコード型や選択型のマップを使ったシリアライズ]]
- [[Domain Modeling Made Functional 第11章 ジェネリクスを DTO に変換する|ジェネリクスを DTO に変換する]]

12. [[Domain Modeling Made Functional 第12章 Persistence|Persistence]]

- [[Domain Modeling Made Functional 第12章 永続化を端に追いやる|永続化を端に追いやる]]
- [[Domain Modeling Made Functional 第12章 コマンドとクエリを分離する|コマンドとクエリを分離する]]
- [[Domain Modeling Made Functional 第12章 境界づけられたコンテキストは独自のデータストアを所有する|境界づけられたコンテキストは独自のデータストアを所有する]]
- [[Domain Modeling Made Functional 第12章 ドキュメントデータベースを扱う|ドキュメントデータベースを扱う]]
- [[Domain Modeling Made Functional 第12章 リレーショナルデータベースを扱う|リレーショナルデータベースを扱う]]
- [[Domain Modeling Made Functional 第12章 トランザクションを扱う|トランザクションを扱う]]
- [[Domain Modeling Made Functional 第12章 テーブルはレコード型に直接マッピングする|テーブルはレコード型に直接マッピングする]]
- [[Domain Modeling Made Functional 第12章 選択型をテーブルにマッピングする手法|選択型をテーブルにマッピングする手法]]
- [[Domain Modeling Made Functional 第12章 ネストした型をテーブルにマッピングする手法|ネストした型をテーブルにマッピングする手法]]
- [[Domain Modeling Made Functional 第12章 RDB からの読み取り|RDB からの読み取り]]
- [[Domain Modeling Made Functional 第12章 RDB から選択型を読み取る|RDB から選択型を読み取る]]
- [[Domain Modeling Made Functional 第12章 RDB への書き込み|RDB への書き込み]]

13. [[Domain Modeling Made Functional 第13章 Evolving a Design and Keeping It Clean|Evolving a Design and Keeping It Clean]]

## 感想

[[clojure|Clojure]] でも、Spec を活用すれば同じことができそうだと思った。データ指向プログラミングも参考になりそうだ。

## 関連

- [関数型ドメインモデリング ドメイン駆動設計と F# でソフトウェアの複雑さに立ち向かおう（KADOKAWA）](https://www.kadokawa.co.jp/product/302405003608/)
- [Domain Modeling Made Functional（Pragmatic Bookshelf）](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/)
- https://zenn.dev/labbase/articles/b1c513c32fe15e
- https://qiita.com/yasuabe2613/items/5ab33e103e4105630e4c
- [Domain Modeling Made Functional（koushisa）](https://scrapbox.io/koushisa/Domain_Modeling_Made_Functional)
- [『Domain Modeling Made Functional』（mrsekut-p）](https://scrapbox.io/mrsekut-p/『Domain_Modeling_Made_Functional』)
- [Domain Driven Design with the F# type system（Speaker Deck）](https://speakerdeck.com/swlaschin/domain-driven-design-with-the-f-number-type-system-f-number-unctional-londoners-2014)
- https://www.youtube.com/watch?v=2JB1_e5wZmU
- https://www.youtube.com/watch?v=MlPQ0FsPxPY
