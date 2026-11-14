---
title: GraphQL Schema ファイルを TypeScript で読み込む
description: GraphQL Tools の loadSchemaSync で .graphql ファイルの GraphQL Schema を読み込み、addResolversToSchema で Resolver を追加する
tags: [blog, typescript, graphql]
date: 2024-09-23
draft: false
---

## TL;DR

- GraphQL Tools の `loadSchemaSync` と `GraphQLFileLoader` を使うと、`.graphql` ファイルに書いた [[graphql-schema|GraphQL Schema]] を [[typescript|TypeScript]] のコードから読み込める。
- 読み込んだ Schema には、`addResolversToSchema` で [[graphql-resolver|Resolver]] を追加できる。

## 検証

[GraphQL Tools のドキュメント](https://the-guild.dev/graphql/tools/docs/schema-loading)に沿って、必要なパッケージをインストールする。

```sh
$ npm i @graphql-tools/graphql-file-loader @graphql-tools/load @graphql-tools/schema
```

`loadSchemaSync` に Schema ファイルのパスと、ローダとして `GraphQLFileLoader` を渡して読み込む。

```ts
// src/index.ts
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadSchemaSync } from "@graphql-tools/load"

const schema = loadSchemaSync("schema.graphql", {
  loaders: [new GraphQLFileLoader()],
})
```

読み込んだ Schema に、`addResolversToSchema` で Resolver を追加する。

```ts
// index.ts
const resolvers = {
  Query: { ... },
  Mutation: { ... },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });
```

あとは、この `schemaWithResolvers` を [[apollo-server|Apollo Server]] などに渡せばよい。

## キーワード

- [[graphql|GraphQL]]
- [[graphql-schema|GraphQL Schema]]
- [[graphql-resolver|Resolver]]
- GraphQL Tools
- [[typescript|TypeScript]]
- [[apollo-server|Apollo Server]]

## 参考

- https://the-guild.dev/graphql/tools/docs/schema-loading
- https://zenn.dev/eringiv3/books/a85174531fd56a/viewer/a8fab6
