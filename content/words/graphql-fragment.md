---
title: Fragment
aliases: []
description: GraphQL のクエリで、フィールドの集まりに名前を付けて再利用できるようにする単位
tags: [word, graphql]
date: 2026-11-14
---

## TL;DR

[[graphql|GraphQL]] のクエリで、フィールドの集まりに名前を付けて、必要な場所で再利用できるようにする単位。`fragment 名前 on 型` で定義し、スプレッド演算子 `...` で展開する。

## なぜ必要か

同じフィールドの組を何か所でも取得するクエリでは、Fragment がないと同じフィールドを何度も書くことになり、クエリが長く管理しにくくなる。Fragment を使うと、複雑なデータ要件を小さな単位に分けられる。多くの UI コンポーネントがそれぞれ必要なフィールドを持ち、それを 1 回の取得にまとめる場面で特に役立つ。

## 仕組み

Fragment は、適用する型（型条件）を必ず指定する。型条件にはオブジェクト型、インタフェース、ユニオンを指定でき、スカラーや列挙型、入力オブジェクトには指定できない。Fragment の中のフィールドは、実際に返ってきたオブジェクトの型が型条件に合うときだけ値を返す。

`...` で Fragment を展開すると、Fragment が選ぶフィールドがその位置にすべて加わる。また、選択セットの中に `... on Droid { primaryFunction }` のように名前のない Fragment（インライン Fragment）を書くこともできる。インライン Fragment は、インタフェースやユニオンを返すフィールドで具体的な型ごとのフィールドを取得するときに使う。

## 例

```graphql
query {
  user(id: 4) {
    friends(first: 10) {
      ...friendFields
    }
  }
}

fragment friendFields on User {
  id
  name
}
```

[[relay|Relay]] では、各コンポーネントが必要なデータを Fragment で宣言する（[[fragment-colocation|Fragment Colocation]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[graphql|GraphQL]]
- [[fragment-colocation|Fragment Colocation]]
- [[fragment-masking|Fragment Masking]]
- [[relay|Relay]]

## 出典

- [Queries | GraphQL](https://graphql.org/learn/queries/)
- [GraphQL Specification (October 2021) - Fragments](https://spec.graphql.org/October2021/#sec-Language.Fragments)
