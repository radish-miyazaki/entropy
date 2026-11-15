---
title: Domain Modeling Made Functional › Persistence
description: 永続性非依存で設計したドメインモデルと、状態を持続させるインフラストラクチャとのミスマッチを解消するためのガイドラインと実装例を扱う章
tags: [book-chapter, ddd]
date: 2024-08-04
book: "[[Domain Modeling Made Functional]]"
chapter: 12
---

## TL;DR

- 実際のアプリケーションでは、ワークフローの寿命を超えて状態を持続させる必要があり、[[domain|ドメイン]]とインフラストラクチャの間にミスマッチが生じる。
- この章は、[[domain-driven-design|ドメイン駆動設計]]で[[persistence|永続化]]を扱うときのガイドラインと、データベースごとの実装例を示す。

## 内容

ここまでドメインモデルは、[[persistence-ignorance|永続性非依存]]を前提に設計してきた（[[Domain Modeling Made Functional 第2章 Understanding the Domain|ドメインモデリングにデータベース駆動設計を持ち込むな]]）。しかし実際のアプリケーションでは、[[workflow|ワークフロー]]の寿命を超えて状態を持続させる必要がある。このとき、ドメインとインフラストラクチャの間にミスマッチが生じる。この章は、その課題の解決を目標にしている。

### 永続化を扱うときの一般的なガイドライン

- [[Domain Modeling Made Functional 第12章 永続化を端に追いやる|永続化を端に追いやる]]
- [[Domain Modeling Made Functional 第12章 コマンドとクエリを分離する|コマンドとクエリを分離する]]
- [[Domain Modeling Made Functional 第12章 境界づけられたコンテキストは独自のデータストアを所有する|境界づけられたコンテキストは独自のデータストアを所有する]]

### 実装例

- [[Domain Modeling Made Functional 第12章 ドキュメントデータベースを扱う|ドキュメントデータベースを扱う]]
- [[Domain Modeling Made Functional 第12章 リレーショナルデータベースを扱う|リレーショナルデータベースを扱う]]
- [[Domain Modeling Made Functional 第12章 トランザクションを扱う|トランザクションを扱う]]

## キーワード

- [[persistence|永続化]]
- [[persistence-ignorance|永続性非依存]]
- [[domain-driven-design|ドメイン駆動設計]]
- [[domain|ドメイン]]
- [[workflow|ワークフロー]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
