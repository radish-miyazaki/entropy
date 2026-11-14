---
title: GraphQL Code Generator
aliases: [GraphQL-Codegen]
description: GraphQL のエンドポイントやスキーマから TypeScript の型を生成するツール
tags: [word, typescript, graphql]
date: 2024-09-25
---

## TL;DR

[[graphql|GraphQL]] のエンドポイントや [[graphql-schema|GraphQL Schema]] から、[[typescript|TypeScript]] の型定義を生成するツール。[[the-guild|The Guild]] が開発している。

## なぜ必要か

[[apollo-client|Apollo Client]] や [[urql]] をクライアントに使うと、クエリ結果の型がそのままでは付かない。GraphQL Code Generator で型を生成すると、クエリの結果に型が付く。[[relay|Relay]] には relay-compiler という独自の仕組みがあるので、これを使う必要はない。

## 例

### セットアップ

インストールし、`package.json` にスクリプトを足す。

```sh
$ npm install -D @graphql-codegen/cli @graphql-codegen/client-preset
```

```json
{
  "scripts": {
    "codegen": "graphql-codegen"
  }
}
```

設定ファイル `codegen.ts` を作る。

```ts
import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "http://localhost:4000",
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
}

export default config
```

`npm run codegen` を実行すると、`src/gql` ディレクトリに型定義ファイルが生成される。

### urql で使う

生成されたファイルで定義されている `graphql` でクエリを書く。戻り値は型情報を持つクエリなので、そのまま `useQuery` に渡せば、`data` に型が付く。

```tsx
const PostQuery = graphql(`
  query posts($tags: [String!]) {
    posts(tags: $tags) {
      title
      body
      author {
        name
      }
    }
  }
`)

const [result] = useQuery({
  query: PostQuery,
  variables: { tags },
})

const { data, fetching, error } = result
```

## 注意点

スキーマやクエリを変えるたびに生成コマンドを実行しなければならない。自動で実行する仕組みが必要である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[urql]]
- [[fragment-colocation|Fragment Colocation]]
- [[fragment-masking|Fragment Masking]]

## 出典

- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
- [Codegen Options Config](https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config)
- [urql: TypeScript integration](https://commerce.nearform.com/open-source/urql/docs/basics/typescript-integration/)
