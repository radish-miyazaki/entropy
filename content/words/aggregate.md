---
title: 集約
aliases: []
description: トップレベルのエンティティをルートとし、単一のユニットとして扱えるドメインオブジェクトのコレクション
tags: [word, ddd]
date: 2024-07-18
---

## TL;DR

トップレベルの[[entity|エンティティ]]が「ルート」として機能し、単一のユニットとして扱える[[domain-object|ドメインオブジェクト]]のコレクション。

## なぜ必要か

集約は集約内のすべてのデータが同時に正しく変更されることを保証する、[[coherence|整合性]]の境界として機能する。

## 仕組み

集約内のオブジェクトに対する変更は、すべて集約ルートであるトップレベルのエンティティを起点にする必要がある。他のエンティティは集約ルートの識別子によってのみ集約を参照する。

集約は永続化、データベーストランザクション、データ転送における[[atomic|アトミック]]な処理単位でもある。アトミックとはすべて実行されるか、何も実行されないかのどちらかになることである。

## 注意点

Microsoft の Azure Architecture Center は、集約を設計するときの決まりとして次の 3 つを挙げている。

- 集約は小さく作る。1 つのトランザクションで整合性を保つ必要のあるデータだけを含める。無関係な更新を 1 つにまとめると、同じロックを奪い合うことになる
- 他の集約は識別子だけで参照する
- 複数の集約にまたがる処理は、1 つのトランザクションではなく[[domain-event|ドメインイベント]]を使い、[[eventual-consistency|結果整合性]]で扱う

子のエンティティを持たず、エンティティ 1 つだけでできた集約もある。集約を集約たらしめているのは、トランザクションの境界である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[entity|エンティティ]]
- [[value-object|値オブジェクト]]
- [[coherence|整合性]]
- [[atomic|アトミック]]

## 出典

- [[Domain Modeling Made Functional 第5章 集約]]
- [Use Tactical DDD to Design Microservices - Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/tactical-domain-driven-design)
