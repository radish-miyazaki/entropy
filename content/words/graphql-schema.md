---
title: GraphQL Schema
aliases: []
description: GraphQL が受け付けるクエリを、GraphQL Schema Language で定義したもの
tags: [word, graphql]
date: 2024-09-09
---

## TL;DR

[[graphql|GraphQL]] が受け付けるクエリを定義した仕様書。GraphQL Schema Language という独自の言語で書く。拡張子は `.graphqls`、`.graphql`、`.gql` である。

## なぜ必要か

独自の言語で書くので、特定のプログラミング言語やフレームワークに依存せずに開発を進められる。

## 仕組み

### オブジェクト型

1 つ以上のフィールドからなる型で、クライアントが取得できるデータの構造を表す。フィールドの中に別のオブジェクトをネストできる。`!` は NULL を許容しないことを表す。

```graphql
type Task {
  id: Int!
  name: String!
  dueDate: String!
  status: String!
  description: String
}
```

### スカラ型

単一のフィールドに付ける型。組み込みで `Int`（整数）、`Float`（浮動小数点数）、`String`（文字列）、`Boolean`（論理値）、`ID`（一意な識別子）の 5 つがある。`DateTime` のような独自の型も、カスタムスカラとして定義できる。

```graphql
scalar DateTime
```

### リスト型

フィールドが複数の値からなるときに使う型。

```graphql
type Query {
  getTasks: [Task!]!
}
```

### 列挙型とユニオン型

列挙型（Enum）は、あらかじめ列挙した値だけを取る。ユニオン型は、複数の型のうちいずれかであることを表す。

```graphql
enum Color {
  RED
  BLUE
  GREEN
}

union SearchResult = Human | Droid | Starship
```

### Query 型と Mutation 型

Query 型はデータの取得、Mutation 型はデータの更新のエントリポイントを定義するルート型である。どちらも引数を受け取れる。クライアントは `query` と `mutation` で呼び出す。実際にデータを扱うには [[graphql-resolver|Resolver]] を実装する。

```graphql
type Query {
  getTasks: [Task!]!
  getTask(id: Int!): Task
}

type Mutation {
  createTask(id: Int!, name: String!): Task!
  deleteTask(id: Int!): Task!
}
```

## 注意点

リスト型の `!` は、付ける場所によって意味が変わる。

| 型           | リスト自体          | 要素                |
| ------------ | ------------------- | ------------------- |
| `[String]!`  | 必ず存在する        | NULL の可能性がある |
| `[String!]`  | NULL の可能性がある | NULL にならない     |
| `[String!]!` | 必ず存在する        | NULL にならない     |
| `[String]`   | NULL の可能性がある | NULL の可能性がある |

また、1 つのクエリで同じフィールドを異なる引数で取得しようとすると、`Fields "post" conflict because they have differing arguments.` というエラーになる。この場合はエイリアスを付けて回避する。

```graphql
query FirstQuery {
  post1: post(id: "1") {
    title
  }
  post2: post(id: "2") {
    title
  }
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[graphql|GraphQL]]
- [[graphql-resolver|Resolver]]
- [[schema-first|Schema first]]
- [[code-first|Code first]]
- [[graphql-schema-typescript-loading|GraphQL Schema ファイルを TypeScript で読み込む]]

## 出典

- [Schemas and Types - GraphQL](https://graphql.org/learn/schema/)
