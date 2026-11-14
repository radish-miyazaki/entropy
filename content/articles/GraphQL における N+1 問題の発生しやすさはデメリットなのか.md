---
title: GraphQL における N+1 問題の発生しやすさはデメリットなのか
description: GraphQL で N+1 問題が起きやすいのはデメリットではなく、クライアントが関連を簡単に解決できる利便性の裏返しである
tags: [article, graphql]
date: 2024-09-23
article-authors: []
site: Software Design 2024年9月号
published:
url: https://gihyo.jp/magazine/SD/archive/2024/202409
---

## TL;DR

[[graphql|GraphQL]] で [[n-plus-one-problem|N+1 問題]]が起きやすいのはデメリットではなく、クライアントがクエリで関連を簡単に解決できる利便性の結果である。[[rest-api|REST API]] でも GraphQL でも、N+1 問題には注意が必要だ。

## 内容

### よく言われるデメリット

「GraphQL は N+1 問題が起きやすいのがデメリット」とよく言われる。データベースの呼び出しを透過的に行えるので N+1 問題に気づきにくくなる、という点で [[orm|ORM]] と似た理屈である。記事では、これはデメリットではなく、クライアントがクエリで関連を簡単に解決できる利便性の結果だと考える。ただし、N+1 問題に注意が必要なことは変わらない。

### なぜ起きやすいか

全ユーザの投稿を取得するクエリで考える。

```graphql
query {
  allUsers {
    posts {
      title
      content
    }
  }
}
```

GraphQL サーバは各フィールドに定義した [[graphql-resolver|Resolver]] という関数を実行する。この例では `posts` フィールドの Resolver がユーザごとに実行され、そのたびに各ユーザの投稿を取得する SQL が発行される。その結果、N+1 問題が起きる。一般には [[dataloader|DataLoader]] などのライブラリを使って解決する。

### REST API の場合

REST API でも同じ問題は起こりうる。リソース指向で API を設計すると、各ユーザの投稿を取得する API の呼び出しが N 回発生する。解決するには、N 回の呼び出しを 1 回で済ませるエンドポイントを作る必要がある。

ただし REST API は返すレスポンスがはっきりしているので、実装の時点で N+1 問題に気づきやすい。一方 GraphQL は、どんなクエリが発行されるかを実装の時点で完全には予測できないので、先を読んだ対策が必要になる。

## キーワード

- [[graphql|GraphQL]]
- [[n-plus-one-problem|N+1 問題]]
- [[graphql-resolver|Resolver]]
- [[dataloader|DataLoader]]
- [[rest-api|REST API]]
- [[orm|ORM]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%
