---
title: Resolver
aliases: []
description: GraphQL の各操作や型のフィールドに対して、どんな処理をしてどんな値を返すかを定義する関数
tags: [word, graphql]
date: 2024-09-23
---

## TL;DR

[[graphql|GraphQL]] の各操作（Query、Mutation、Subscription）や、各型のフィールド、スカラに対して、どんな処理をしてどんな値を返すかを定義する関数。

## 仕組み

GraphQL サーバはクエリのフィールドごとに対応する Resolver を実行する。`type Query`、`type Mutation`、`type Subscription` などのルート型の直下にあるフィールドの Resolver を、特に Root Resolver と呼ぶ。

## 注意点

Resolver はフィールドごとに実行されるので、一覧の各要素について関連データを取得すると [[n-plus-one-problem|N+1 問題]]が起きやすい（[[GraphQL における N+1 問題の発生しやすさはデメリットなのか|GraphQL における N+1 問題の発生しやすさはデメリットなのか]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[graphql|GraphQL]]
- [[graphql-schema|GraphQL Schema]]
- [[dataloader|DataLoader]]
