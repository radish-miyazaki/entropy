---
title: ドメイン駆動設計
aliases: [DDD]
description: ドメインの専門家の知見をもとに、ソフトウェアをドメインのモデルに合わせて設計する手法
tags: [word]
date: 2023-12-12
---

## TL;DR

[[domain|ドメイン]]の専門家の知見をもとに、ソフトウェアをドメインに合わせてモデリングする設計手法。Eric Evans が 2003 年の著書『Domain-Driven Design: Tackling Complexity in the Heart of Software』で名付けた。

## なぜ必要か

英語版 Wikipedia によると、DDD は次の 3 つを前提にしている。

- プロジェクトの主な関心を、中核となるドメインとそのロジックに置く
- 複雑な設計を、ドメインの[[domain-model|モデル]]に基づいて行う
- 技術者と[[domain-expert|ドメインエキスパート]]が協力し、繰り返しの中で概念モデルを洗練させる

## 仕組み

英語版 Wikipedia では、DDD の主な用語を次のように説明している。モデルは、ドメインの選ばれた側面を記述する抽象の体系である。[[ubiquitous-language|ユビキタス言語]]は、ドメインエキスパート、ユーザ、開発者が共有する語彙で、ドメインモデルとシステムの要件の両方で使う。[[bounded-context|境界づけられたコンテキスト]]は、あるドメインモデルが一貫して有効である範囲を定める。

モデルの構成要素には、属性ではなく同一性で区別される[[entity|エンティティ]]や、属性を持つが概念上の同一性を持たない不変の[[value-object|値オブジェクト]]がある。

## 注意点

英語版 Wikipedia によると、モデルを純粋で有用に保つには、開発者が多くの分離とカプセル化を実装しなければならないという批判がある。Microsoft は、モデルが共通理解を作るのに明らかに役立つ、複雑なドメインに限って DDD を勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[domain-object|ドメインオブジェクト]]
- [[bounded-context|境界づけられたコンテキスト]]
- [[value-object|値オブジェクト]]
- [[entity|エンティティ]]

## 出典

- [Domain-driven design - Wikipedia](https://en.wikipedia.org/wiki/Domain-driven_design)
