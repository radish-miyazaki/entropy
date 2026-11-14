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

深さの制限を実現するには、たとえば GraphQL Armor の Max Depth プラグインを使う。

GraphQL の公式サイトによると、多くの GraphQL の実装は、1 つのドキュメントの最大の深さを設定できる。リクエストが上限を超えると、実行を始める前にクライアントへエラーを返す。

## 注意点

GraphQL の公式サイトでは、[[n-plus-one-problem|N+1 問題]]をバッチ処理で解消していても、深くネストしたフィールドはサーバの資源に過剰な負荷をかけうるとしている。リストのフィールドをネストすると、返すデータの量が指数的に増えることがあるので、リストのネストには別に小さい上限をかけることが勧められている。

正当な理由で深いクエリを使うクライアントがいて、すべてのクエリに低い上限をかけられない場合は、レート制限や [[query-cost-analysis|Query Cost Analysis]] のような手法に頼る必要がある。深さが浅くても、トップレベルのフィールドやエイリアスを大量に並べたクエリは重くなりうるので、フィールドの数やエイリアス、バッチの数にも上限をかけるとよい。

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
- [Security - GraphQL](https://graphql.org/learn/security/)
