---
title: Depth Limiting
aliases: []
description: GraphQL で、再帰的にネストできるオブジェクト型のクエリの深さを制限するセキュリティ対策
tags: [word, graphql]
date: 2024-09-25
---

## TL;DR

[[graphql|GraphQL]] で、再帰的にネストできるオブジェクト型について、クエリのネストの深さを制限すること。特に外部に公開する GraphQL サーバで役立つセキュリティ対策である。

## なぜ必要か

サーバは各フィールドを計算し直す必要がある。そのため、ネストが深くなるほど処理の回数やデータ量が増え、レスポンスを返すまでの時間が延びる。深さに上限がないと、極端に深いクエリでサーバに負荷をかけられてしまう。

## 例

次のスキーマでは、`Author` と `Post` が互いを参照している。

```graphql
type Author {
  authorId: ID!
  posts: [Post!]!
}

type Post {
  postId: ID!
  title: String!
  author: Author!
}

type Query {
  author(id: ID!): Author!
}
```

このため、次のようにいくらでも深くネストしたクエリを実行できる。

```graphql
query NestingQuery {
  author(id: "123") {
    authorId
    posts {
      postId
      author {
        authorId
        posts {
          postId
          author {
            authorId
            posts {
              postId
            }
          }
        }
      }
    }
  }
}
```

実現するには、たとえば GraphQL Armor の Max Depth プラグインを使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[query-cost-analysis|Query Cost Analysis]]
- [[trusted-documents|Trusted Document]]

## 出典

- [Cyclic Queries and Depth Limit](https://escape.tech/blog/cyclic-queries-and-depth-limit/)
- [GraphQL Armor: Max Depth](https://escape.tech/graphql-armor/docs/plugins/max-depth/)
