---
title: Trusted Document
aliases: [Trusted Documents]
description: ビルド時に GraphQL ドキュメントを抽出してサーバに登録し、実行時は documentId だけを受け付ける方式
tags: [word, graphql]
date: 2024-09-25
---

## TL;DR

自社アプリ専用の [[graphql|GraphQL]] API で、あらかじめ登録したドキュメントだけを受け付ける方式。攻撃対象領域を大きく減らし、性能を上げ、帯域の使用量も減らせる。

## 仕組み

アプリのビルド時に、GraphQL ドキュメント（Query、[[graphql-mutation|Mutation]]、Subscription）を抽出して、サーバから使えるようにしておく。実行時は、ドキュメント全体の代わりに documentId を送る。サーバは documentId を持つリクエストだけを受け付ける。

> Use trusted documents if your GraphQL API is only for your own apps (most GraphQL APIs!) for a massively decreased attack-surface, increased performance, and decreased bandwidth usage.

## 注意点

GraphQL API が自社のアプリ専用である場合に向いている。ただし、元の記事によれば、ほとんどの GraphQL API はこれに当てはまる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[persisted-query|Persisted Query]]
- [[signed-query|Signed Query]]
- [[depth-limiting|Depth Limiting]]
- [[query-cost-analysis|Query Cost Analysis]]

## 出典

- [GraphQL Trusted Documents](https://benjie.dev/graphql/trusted-documents)
