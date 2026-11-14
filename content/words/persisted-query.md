---
title: Persisted Query
aliases: []
description: 使うクエリを事前に GraphQL サーバへ登録し、登録されたクエリだけの実行を許可する方式
tags: [word, graphql]
date: 2024-09-23
---

## TL;DR

[[trusted-documents|Trusted Document]] を実現する方式の 1 つ。クライアントが使うクエリを事前に [[graphql|GraphQL]] サーバへ登録し、登録されたクエリだけの実行を許可する。

## 仕組み

1. [[graphql-codegen|GraphQL Code Generator]] などのツールで、クライアントアプリが使うクエリを集める。それぞれのハッシュ値を計算し、元のクエリと一緒にサーバへ保存する
2. クライアントは、クエリの代わりにハッシュ値を使ってリクエストする
3. サーバは、ハッシュ値に対応するクエリを探して実行する。見つからなければ、想定していないクエリとしてエラーを返す

```json
{
  "operationName": "GetUser",
  "variables": {},
  "extensions": {
    "persistedQuery": {
      "version": 1,
      "sha256Hash": "xxxxxxxxxx"
    }
  }
}
```

## 注意点

クエリを事前にサーバへ登録する手間がかかる。[[signed-query|Signed Query]] は、登録の代わりに [[hmac|HMAC]] でクエリを検証することで、この手間をなくしている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[signed-query|Signed Query]]
- [[trusted-documents|Trusted Document]]

## 出典

- [GraphQL の Persisted Queries について - wada-blog](https://scrapbox.io/wada-blog/GraphQL_%E3%81%AE_Persisted_Queries_%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [Persisted queries - Apollo Kotlin](https://www.apollographql.com/docs/kotlin/advanced/persisted-queries/)
- [Quramy さんの Qiita 記事](https://qiita.com/Quramy/items/b3943a0c27f3ade2c57d)
- [スタディサプリ Product Team Blog（2024-04-15）](https://blog.studysapuri.jp/entry/2024/04/15/100000)
