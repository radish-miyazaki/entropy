---
title: REST API
aliases: []
description: REST という設計原則に従って作られた Web API
tags: [word]
date: 2024-09-09
---

## TL;DR

REST という設計原則に従って作られた Web API。エンドポイント（URI）と HTTP メソッドの組み合わせで処理が決まる。

## 注意点

エンドポイントが大量に作られやすい。また、リソースの取り方に柔軟性がない。必要のないデータまで返してしまうこと（[[over-fetching|Over-fetching]]）や、ネストしたデータを取るために別のエンドポイントを呼ぶ必要があること（[[under-fetching|Under-fetching]]）が起きる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[graphql|GraphQL]]
- [[grpc|gRPC]]
- [[schema-first|Schema first]]
- [[code-first|Code first]]

## 出典

- [REST API とは - Red Hat](https://www.redhat.com/ja/topics/api/what-is-a-rest-api)
- [Software Design 2024年9月号](https://gihyo.jp/magazine/SD/archive/2024/202409)
- [Web APIの設計](https://www.shoeisha.co.jp/book/detail/9784798167015)
- [NestJS × Reactで学ぶフルスタックGraphQLアプリケーション開発](https://www.udemy.com/course/nestjs-react-graphql/)
