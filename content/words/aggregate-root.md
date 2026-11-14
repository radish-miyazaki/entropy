---
title: 集約ルート
aliases: []
description: 集約のトップにあるエンティティ。集約の外からの変更と参照の入り口になる
tags: [word, ddd]
date: 2026-11-14
---

## TL;DR

[[aggregate|集約]]のトップにある[[entity|エンティティ]]。[[Domain Modeling Made Functional 第5章 集約|Domain Modeling Made Functional 第5章]]の例では、`OrderLine`（注文明細）のコレクションを持つ `Order`（注文）が集約ルートにあたる。

## なぜ必要か

[[Domain Modeling Made Functional 第5章 集約|Domain Modeling Made Functional 第5章]] によると、イミュータブルなデータでは、子のエンティティを 1 つ変えるだけでも、集約ルートのレベルで作業する必要がある。明細の価格を変えたら、新しい明細のリストを持つ新しい注文を作り直すことになる。変更の入り口を集約ルートにまとめると、注文の合計金額のように、集約の中で整合性を保つべき値も同じ処理の中で更新できる。

## 仕組み

集約内のオブジェクトへの変更はすべて集約ルートを起点にする。ほかのエンティティは集約ルートの識別子によってだけ集約を参照する。たとえば `Order` には `Customer` のレコードそのものではなく `CustomerId` を持たせる。レコードを持たせると、`Customer` を更新するたびに `Order` も更新しなければならなくなる。

## 注意点

エンティティを集めただけでは集約にならない。`Customer` のリストはエンティティの集まりだが、ルートとなるトップレベルのエンティティを持たず、整合性の境界にもならないので、集約ではない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[aggregate|集約]]
- [[entity|エンティティ]]
- [[invariant|不変条件]]
- [[domain-driven-design|ドメイン駆動設計]]

## 出典

- [[Domain Modeling Made Functional 第5章 集約]]
