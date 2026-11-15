---
title: Domain Modeling Made Functional › Integrity and Consistency in the Domain
description: 境界づけられたコンテキストの中で、ドメインモデルの完全性（妥当性）と整合性を常に保証する方法を扱う章
tags: [book-chapter, ddd, fsharp]
date: 2024-07-19
book: "[[Domain Modeling Made Functional]]"
chapter: 6
---

## TL;DR

- [[domain-model|ドメインモデル]]は、[[bounded-context|境界づけられたコンテキスト]]の中で常に[[integrity|完全性]]と[[coherence|整合性]]を保っている必要がある。
- 完全性はデータがビジネスルールに従っていること、整合性はモデルの異なる部分が事実について一致していることである。

## 内容

ドメインモデルが境界づけられたコンテキストの中で常に完全性と整合性を持つことを保証する必要がある。この章では、その 2 つを順に扱う。

### 完全性

完全性（妥当性）とは、データが正しいビジネスルールに従っていることである。次の節で扱う。

- [[Domain Modeling Made Functional 第6章 単純な値の完全性|単純な値の完全性]]
- [[Domain Modeling Made Functional 第6章 数値に測定単位を付与する|数値に測定単位を付与する]]
- [[Domain Modeling Made Functional 第6章 型システムで不変条件を強制する|型システムで不変条件を強制する]]
- [[Domain Modeling Made Functional 第6章 ビジネスルールを型システムで表現する|ビジネスルールを型システムで表現する]]

### 整合性

整合性とは、ドメインモデルの異なる部分が事実について一致していることである。次の節で扱う。

- [[Domain Modeling Made Functional 第6章 1 つの集約内での整合性|1 つの集約内での整合性]]
- [[Domain Modeling Made Functional 第6章 異なるコンテキスト間での整合性|異なるコンテキスト間での整合性]]
- [[Domain Modeling Made Functional 第6章 同じコンテキストの集約間の整合性|同じコンテキストの集約間の整合性]]
- [[Domain Modeling Made Functional 第6章 同一データに作用する複数の集約|同一データに作用する複数の集約]]

## キーワード

- [[domain-model|ドメインモデル]]
- [[bounded-context|境界づけられたコンテキスト]]
- [[integrity|完全性]]
- [[coherence|整合性]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
