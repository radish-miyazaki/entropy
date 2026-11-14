---
title: Pragmatic Functional Programming in TypeScript
description: Dmitrii Kovanikov 氏の FP の 5 原則を契約による設計の視点で整理し、TypeScript での実装例と、クラスベースのレイヤードアーキテクチャへの組み込み方を示す発表
tags: [talk, typescript, 関数型プログラミング]
date: 2025-05-30
speakers: [yasaichi]
company: 株式会社EARTHBRAIN
event: TSKaigi 2025
held: 2025-05-24
slide: https://decks.yasaichi.com/20250524/pragmatic-functional-programming-in-typescript
video:
---

## TL;DR

- FP の理論と実務のギャップを埋める指針として、Parse, don't validate、Make illegal states unrepresentable、Errors as values、Functional core, imperative shell、Smart constructor の 5 原則を紹介する。
- 5 原則は事後条件や不変表明を型で厳密に表し、コードの信頼性と保守性を上げる。
- クラスベースの OOP で書かれた既存のコードベースにも組み込める。

## 内容

### FP の理論と実務のギャップ

[[functional-programming|FP]] の本では、純粋関数、[[higher-order-function|高階関数]]、[[algebraic-data-type|代数的データ型]]、[[monad|モナド]]などの概念を学べる。しかし実務では、成果が導入に見合うか、チーム全員が保守できるか、クラスベースの OOP が主流のアーキテクチャに組み込めるか、という課題がある。発表者は特に 3 つ目のギャップが大きいと考えている。

### 5 原則と評価の枠組み

発表者は、Bertrand Meyer の[[design-by-contract|契約による設計]]の事後条件と不変表明のどちらを型で表すかで原則を分類し、ISO/IEC 25010 の信頼性と保守性を改善するかで評価する。

- Parse, don't validate: 検証の結果を boolean ではなく検証済みの専用型で返す。例では、Zod でメールアドレスを[[branded-types|ブランド型]]にし、readonly にしてカプセル化を不要にする。
- Make illegal states unrepresentable: 型で不正な状態を表せないようにする。例では、「メールか電話のどちらかが必須」のフォームを判別可能なユニオン型で書く。
- Smart constructor: 制約を満たすときだけ値を作れるようにする。例では、フリーメールのドメインを禁止する `UserEmail` の生成を `create` に集める。
- Errors as values: 例外を投げずに値として返し、失敗への対処を呼び出し側に強制する。例では、neverthrow の Result 型を返す。

### クラスベースのアーキテクチャへの統合

API ゲートウェイの書き直しの経験をもとに、[[deno|Deno]]、[[nestjs|NestJS]]、[[effect-ts|Effect]] を使った例を示す。題材は、施工現場への招待を再送する機能である。

戦術的 DDD の[[layered-architecture|レイヤードアーキテクチャ]]で、ドメイン層の[[value-object|値オブジェクト]]は [[effect-schema|Effect Schema]] で検証してブランド型を返す。[[entity|エンティティ]]は招待の状態（未承諾、期限切れ、承諾済み）ごとのクラスのユニオン型にし、承諾済みには `resend` を定義しないので、再送できない。[[repository-pattern|リポジトリ]]とアプリケーションサービスは、見つからない場合や承諾済みの場合のエラーを型で返す。

Functional core, imperative shell は、純粋関数の Core と副作用を担う Shell を分けるパターンである。副作用のない判定をドメインサービスに切り出せば Core は広がるが、この原則を守るためだけに切り出すとドメインモデル貧血症を招くので、推奨しない。コントローラーが Shell に当たり、型で表したエラーを HTTP のエラーに変換して副作用を実行する。

## キーワード

- [[functional-programming|関数型プログラミング]]
- [[typescript|TypeScript]]
- [[design-by-contract|契約による設計]]
- [[branded-types|ブランド型]]
- [[algebraic-data-type|代数的データ型]]
- [[zod|Zod]]
- [[effect-ts|Effect]]
- [[effect-schema|Effect Schema]]
- [[nestjs|NestJS]]
- [[deno|Deno]]
- [[domain-driven-design|ドメイン駆動設計]]
- [[layered-architecture|レイヤードアーキテクチャ]]
- [[value-object|値オブジェクト]]
- [[entity|エンティティ]]
- [[repository-pattern|リポジトリパターン]]
- Parse, don't validate
- Make illegal states unrepresentable
- Errors as values
- Functional core, imperative shell
- Smart constructor

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]
- [[functional-programming|関数型プログラミング]]
