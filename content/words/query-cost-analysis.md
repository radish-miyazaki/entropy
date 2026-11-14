---
title: Query Cost Analysis
aliases: []
description: GraphQL のクエリのコスト（複雑度）をあらかじめ計算し、しきい値を超えたリクエストを失敗させる仕組み
tags: [word, graphql]
date: 2024-09-25
---

## TL;DR

[[graphql|GraphQL]] のクエリのコスト（複雑度）をあらかじめ決めた方法で計算し、しきい値を超えたらリクエストを失敗させる仕組み。

## 例

### Shopify

Shopify では、クライアントに一定時間ごとにポイントが割り当てられ、リクエストのたびにそのポイントを消費する。ポイントがなくなると、リクエストは失敗する。

消費するポイントは、次の要素から計算される。

- [[graphql-mutation|Mutation]] かどうか
- クエリするフィールドが、どの種類の値を返すか
- `interface` や `union` を含むか
- Connection でいくつのデータを取得するか。Connection は関連するオブジェクトのリストを返すフィールドで、`first` や `last` の引数で取得する件数を指定する。その件数によってコストが変わる

消費したポイントは、レスポンスの `extensions` で確認できる。

```json
{
  "extensions": {
    "cost": {
      "requestedQueryCost": 101,
      "actualQueryCost": 46,
      "throttleStatus": {
        "maximumAvailable": 1000,
        "currentlyAvailable": 954,
        "restoreRate": 50
      }
    }
  }
}
```

`requestedQueryCost` は予測した消費ポイント、`actualQueryCost` は実際の消費ポイントである。`maximumAvailable` はクライアントに割り当てられるポイントの上限、`currentlyAvailable` は残りのポイント、`restoreRate` は 1 秒ごとに回復するポイントを表す。

### GitHub

[[github|GitHub]] の GraphQL API にも、同様のレート制限がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[depth-limiting|Depth Limiting]]
- [[trusted-documents|Trusted Document]]

## 出典

- [Shopify API rate limits](https://shopify.dev/docs/api/usage/rate-limits#cost-calculation)
- [GraphQL API のレート制限とノード制限](https://docs.github.com/ja/graphql/overview/rate-limits-and-node-limits-for-the-graphql-api)
