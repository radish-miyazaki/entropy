---
title: Signed Query
aliases: []
description: クエリの HMAC を共通鍵で検証して、信頼されたクエリだけを GraphQL サーバで実行する方式
tags: [word, graphql]
date: 2024-09-23
---

## TL;DR

[[trusted-documents|Trusted Document]] を実現する方式の 1 つ。[[persisted-query|Persisted Query]] のようにクエリをサーバに事前登録するのではなく、共通鍵で計算した [[hmac|HMAC]] によってクエリが信頼できるかを検証する。スタディサプリの開発チームによる実装パターンである。

## なぜ必要か

Persisted Query では、クライアントが使うクエリを事前に [[graphql|GraphQL]] サーバへ登録する必要がある。Signed Query では、共通鍵を共有できる状態を一度作れば、この登録の手間がなくなる。クエリの信頼性を保ったまま、クライアントアプリをいつでもリリースできる。

## 仕組み

1. クライアントのビルド時に、[[graphql-codegen|GraphQL Code Generator]] などのツールでアプリが使うクエリを集め、それぞれの HMAC を計算してアプリに埋め込む
2. クライアントは、クエリと対応する HMAC をサーバに送る
3. サーバは、事前に共有した共通鍵で HMAC を検証し、信頼されたクエリなら実行する。信頼されていないクエリにはエラーを返す

```json
{
  "query": "query Home { ...}",
  "operationName": "Home",
  "variables": {},
  "extensions": {
    "signedQuery": {
      "signature": "xxxxxxxxxx"
    }
  }
}
```

## 注意点

共通鍵の管理には十分注意する。たとえば、鍵を AWS Secrets Manager に保存し、ビルド時にだけ参照するようにする。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[persisted-query|Persisted Query]]
- [[trusted-documents|Trusted Document]]
- [[hmac|HMAC]]

## 出典

- [スタディサプリ Product Team Blog（2024-04-15）](https://blog.studysapuri.jp/entry/2024/04/15/100000)
