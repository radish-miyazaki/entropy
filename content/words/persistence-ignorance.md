---
title: 永続性非依存
aliases: []
description: ドメインモデルはドメイン自体の概念だけに基づき、データベースなどの永続化の仕組みを意識すべきではないという考え方
tags: [word, ddd]
date: 2024-07-11
---

## TL;DR

[[domain-model|ドメインモデル]]は[[domain|ドメイン]]自体の概念だけに基づくべきであり、データベースやその他の[[persistence|永続化]]の仕組みを意識すべきではない、という考え方。

## なぜ必要か

Microsoft の .NET アーキテクチャガイドによると、永続化の技術に左右されない型にしておけば、同じビジネスモデルをいろいろな方法で永続化できる。永続化の選択は時間とともに変わりうる。リレーショナルデータベースから別の技術に移ったり、Redis のキャッシュのような別の永続化先が加わったりする。

## 仕組み

同ガイドでは、永続化される型でありながら、そのコードが永続化技術の選択に影響されない状態を Persistence Ignorance（PI）と呼ぶ。.NET では、特定の基底クラスの継承やインタフェースの実装を必要としない型を POCO（Plain Old CLR Objects）と呼ぶことがある。

## 注意点

同ガイドは、次のような要求をこの原則への違反の例として挙げている。

- 特定の基底クラスやインタフェースの実装を必須にする
- クラス自身に保存の責任を持たせる（Active Record パターンなど）
- 引数なしのコンストラクタや、永続化用の属性を必須にする

こうした要求があると、永続化される型と永続化技術の間に結合が生まれ、将来データアクセスの方法を変えにくくなる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[persistence|永続化]]
- [[domain-model|ドメインモデル]]
- [[domain-driven-design|ドメイン駆動設計]]
- [[repository-pattern|リポジトリパターン]]

## 出典

- [Architectural principles - .NET | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles)
