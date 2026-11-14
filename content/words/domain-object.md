---
title: ドメインオブジェクト
aliases: []
description: ドメインの関心事を記述したオブジェクトで、ある境界づけられたコンテキスト内でのみ使うように設計されたもの
tags: [word, ddd]
date: 2023-11-29
---

## TL;DR

[[domain|ドメイン]]の関心事を記述したオブジェクト。ここでのドメインは、アプリケーションの対象領域を指す。

## 仕組み

より具体的には、ある[[bounded-context|境界づけられたコンテキスト]]の中でのみ使うように設計されたオブジェクトである。ドメインオブジェクトは、[[value-object|値オブジェクト]]と[[entity|エンティティ]]からなる。

英語版 Wikipedia では、[[domain-driven-design|ドメイン駆動設計]]のエンティティを、属性ではなく同一性で区別されるオブジェクトとしている。値オブジェクトは、属性を持つが概念上の同一性を持たない不変のオブジェクトである。また、振る舞いとデータの両方を含むドメインの概念モデルである[[domain-model|ドメインモデル]]は、一般にオブジェクトモデルとして実装される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[domain-driven-design|ドメイン駆動設計]]
- [[value-object|値オブジェクト]]
- [[entity|エンティティ]]
- [[bounded-context|境界づけられたコンテキスト]]

## 出典

- [Domain-driven design - Wikipedia](https://en.wikipedia.org/wiki/Domain-driven_design)
- [Domain model - Wikipedia](https://en.wikipedia.org/wiki/Domain_model)
