---
title: Mutation
aliases: []
description: GraphQL で、サーバ側のデータを書き込んだり変更したりする操作
tags: [word, graphql]
date: 2026-11-14
---

## TL;DR

[[graphql|GraphQL]] で、サーバ側のデータを作成・変更・削除する操作。Query と同じく、ルートの操作型（`Mutation` 型）のフィールドとして定義する。

## なぜ必要か

GraphQL の仕様では、トップレベルの Mutation のフィールド以外は、副作用がなく冪等でなければならないとしている。REST で `GET` を使ってデータを変更しないのと同じように、データを変える操作を Query と分けて明示できる。

## 仕組み

Mutation の引数にはスカラーだけでなく入力オブジェクト型（`input`）を使って構造化した値を渡せる。Mutation がオブジェクト型を返すときは、Query と同じく取得するフィールドを選ぶ。変更した対象に関係する型を返すのが慣習で、クライアントは書き込んだあとの状態をそのまま受け取れる。

1 つのリクエストに複数のフィールドを書いたとき、Query のフィールドは並行して実行されるが、Mutation のフィールドは順番に実行される。そのため、前の Mutation が終わってから次の Mutation が始まり、競合が起きない。

## 例

```graphql
input ReviewInput {
  stars: Int!
  commentary: String
}

type Mutation {
  createReview(episode: Episode, review: ReviewInput!): Review
}
```

汎用的な `updateHuman` のようなフィールドより、`updateHumanName(id: ID!, name: String!): Human` のように用途に合わせたフィールドを作ることが勧められている。

## 注意点

Mutation を順番に実行しても、データベースのトランザクションにはならない。最初の Mutation が成功して 2 つ目が失敗しても、GraphQL には最初の変更を取り消す仕組みはない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[graphql|GraphQL]]
- [[graphql-schema|GraphQL Schema]]
- [[graphql-resolver|Resolver]]
- [[urql|urql]]

## 出典

- [Mutations | GraphQL](https://graphql.org/learn/mutations/)
