---
title: Iceberg（Shape Up）
aliases: []
description: Shape Up で、バックエンドと UI のどちらか一方が、もう一方よりずっと複雑な Scope
tags: [word, project-management]
date: 2026-11-16
---

## TL;DR

[[shape-up|Shape Up]] で、見えている UI よりも裏のバックエンドがずっと複雑な [[shape-up-scope|Scope]]。逆に UI のほうがずっと複雑なものもあり、こちらは逆さの Iceberg と呼ぶ。

## 仕組み

[[Shape Up： Stop Running in Circles and Ship Work that Matters 第12章 Map the Scopes|第 12 章]]によると、Iceberg を見つけたら次のように扱う。

- UI の部分を切り離す
- バックエンドの複雑な部分を、いくつかの Scope に分ける
- その複雑さが本当に必要で、これ以上減らせないものかを問い直す

UI の広さで作業量を判断できる [[layer-cake|Layer cake]] とは違い、見た目からは手間が読めない。

## 例

- フォームを送信すると、裏で複雑なビジネスロジックが動く（UI よりバックエンドが重い）
- 何日にもわたる予定を、カレンダーのマス目の中で折り返して表示する（バックエンドより UI が重い）

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[layer-cake|Layer cake]]
- [[shape-up-scope|Scope]]
- [[rabbit-hole|Rabbit hole]]

## 出典

- [[Shape Up： Stop Running in Circles and Ship Work that Matters 第12章 Map the Scopes|Shape Up › Map the Scopes]]
- [Map the Scopes | Shape Up](https://basecamp.com/shapeup/3.3-chapter-12)
- [Glossary | Shape Up](https://basecamp.com/shapeup/4.5-appendix-06)
