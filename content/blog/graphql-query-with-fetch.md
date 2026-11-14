---
title: fetch で GraphQL クエリを実行する
description: GraphQL は特別な通信プロトコルを必要としないので、Fetch API で POST リクエストを送るだけでクエリを実行できる
tags: [blog, graphql, javascript]
date: 2024-09-24
draft: false
---

## TL;DR

- [[graphql|GraphQL]] は特別な通信プロトコルを必要としないので、[[fetch-api|Fetch API]] で POST リクエストを送るだけでクエリを実行できる。
- それでもクライアントライブラリを使うのは、Web フレームワークとの統合、リクエストの状態管理とキャッシュ、[[typescript|TypeScript]] の型の自動生成が得られるからだと理解した。

## 検証

### クエリを実行する

クエリを文字列で書き、`JSON.stringify` で `{ query }` をリクエストボディにして POST する。同じことは [[curl|curl]] でもできる（[[graphql-query-with-curl|curl で GraphQL クエリを実行する]]）。

```js
const query = `
  query {
    authors {
      name
      posts {
        id
        tags {
          name
        }
      }
    }
  }`

fetch("localhost:4000/graphql", {
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query }),
  method: "POST",
}).then((res) => res.json())
```

### 変数を渡す

変数を渡すときは、`variables` をボディに加える。

```js
const query = `
  query posts($tags: [String!]) {
    posts(tags: $tags) {
      title
      body
    }
  }`

const variables = {
  tags: ["GraphQL"],
}

fetch("localhost:4000/graphql", {
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query, variables }),
  method: "POST",
}).then((res) => res.json())
```

## 考察

`fetch` でクエリを実行できるのに、[[apollo-client|Apollo Client]] や [[relay|Relay]]、[[urql]] のようなクライアントライブラリを使う理由を、[Software Design 2024年9月号](https://gihyo.jp/magazine/SD/archive/2024/202409)をもとに整理した。

1 つ目は、Web フレームワークとの統合である。[[react|React]] 向けには、ライブラリ独自の [[react-hooks|React Hooks]] が用意されている。

2 つ目は、HTTP リクエストのクライアントライブラリとしての機能で、[[tanstack-query|TanStack Query]] や SWR を使う動機と同じである。リクエストの状態を管理し、通信結果をキャッシュしてアプリケーションの状態として扱える。

3 つ目は、[[schema-first|Schema first]] で開発するときの TypeScript との統合である。クライアントライブラリで型を自動生成すれば型の恩恵を受けられ、Schema の変更にも追従できる。

## キーワード

- [[graphql|GraphQL]]
- [[fetch-api|Fetch API]]
- [[curl|curl]]
- [[apollo-client|Apollo Client]]
- [[relay|Relay]]
- [[urql]]
- [[react-hooks|React Hooks]]
- [[tanstack-query|TanStack Query]]
- SWR
- [[schema-first|Schema first]]
- [[typescript|TypeScript]]

## 参考

- [Software Design 2024年9月号](https://gihyo.jp/magazine/SD/archive/2024/202409)
