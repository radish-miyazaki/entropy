---
title: urql
aliases: []
description: Apollo Client や Relay より後発で、軽量かつシンプルな GraphQL クライアントライブラリ
tags: [word, javascript, graphql, typescript]
date: 2024-09-25
---

## TL;DR

[[graphql|GraphQL]] のクライアントライブラリ。[[apollo-client|Apollo Client]] や [[relay|Relay]] より後発で、軽量かつシンプルなのが特徴である。

## なぜ必要か

### 軽量

公式ドキュメントの比較では、バンドルサイズは urql が 10kB（バインディング込みで 11kB）、Apollo Client が約 50kB（React hooks 込みで 55kB）、Relay が 45kB（バインディング込みで 66kB）である。

### シンプル

Apollo Client や Relay は、クエリの結果を `id` と `__typename` をキーに正規化してキャッシュする（正規化キャッシュ）。[[graphql-mutation|Mutation]] でデータを更新したときも、キャッシュ上のどのデータを更新すべきか分かるので、ネットワークにアクセスせずにクライアントの状態を更新できる。

一方、urql はデフォルトでドキュメントキャッシュを採用している。Mutation でデータを更新すると、同じ `__typename` を持つクエリのキャッシュを破棄して再取得する。ネットワークへのアクセスは増えるが、更新したデータをすぐ画面に表示する必要がないアプリケーションなら、正規化キャッシュのような高度なキャッシュ戦略は要らない。必要になれば、Graphcache を使って正規化キャッシュに移行できる。

> urql is the only library that provides Offline Support out of the box as part of Graphcache's feature set.

## 仕組み

`Client` インスタンスが、クエリの発行とキャッシュを管理する。`url` には GraphQL サーバの URL を、`exchanges` には Exchange を渡す。Exchange は、urql におけるミドルウェアやプラグインにあたる機能である。

## 例

[[react|React]] で使う例を示す。まずインストールする。

```sh
$ npm install --save urql
```

`Client` を作り、urql の `<Provider>` で包む。これで、Context API を通じてどのコンポーネントからも `Client` を使える。

```tsx
// src/main.tsx
import { cacheExchange, Client, fetchExchange, Provider } from "urql"

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </StrictMode>,
)
```

クエリは `useQuery` で呼び出す。戻り値の `data` がクエリの結果、`error` がエラー、`fetching` が取得中かどうかを表す。

```tsx
import { gql, useQuery } from "urql"

const [result] = useQuery({
  query: gql`
    query posts($tags: [String!]) {
      posts(tags: $tags) {
        title
        body
        author {
          name
        }
      }
    }
  `,
  variables: { tags },
})

const { data, fetching, error } = result
```

## 注意点

`data` の型は `any` になる。型を付けるには、[[graphql-codegen|GraphQL Code Generator]] で型定義を生成する必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[apollo-client|Apollo Client]]
- [[relay|Relay]]
- [[graphql-codegen|GraphQL Code Generator]]
- [[fragment-colocation|Fragment Colocation]]

## 出典

- [urql Documentation](https://commerce.nearform.com/open-source/urql/docs/)
- [Comparison](https://commerce.nearform.com/open-source/urql/docs/comparison/#caching-and-state)
- [API: Client](https://commerce.nearform.com/open-source/urql/docs/api/core/#client)
- [Architecture: The Exchanges](https://commerce.nearform.com/open-source/urql/docs/architecture/#the-exchanges)
- [API: useQuery](https://commerce.nearform.com/open-source/urql/docs/api/urql/#usequery)
