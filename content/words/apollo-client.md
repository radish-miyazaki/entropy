---
title: Apollo Client
aliases: []
description: GraphQL でローカルとリモートのデータを管理する、JavaScript 向けの状態管理ライブラリ
tags: [word, javascript, typescript, react]
date: 2024-09-06
---

## TL;DR

[[javascript|JavaScript]] 向けの状態管理ライブラリ。[[graphql|GraphQL]] を使ってローカルとリモートのデータを管理し、データの取得、キャッシュ、変更に合わせて UI を自動で更新する。

> Apollo Client is a comprehensive state management library for JavaScript. It enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.

## 仕組み

### ApolloClient の作成

`ApolloClient` のインスタンスを作り、利用するコンポーネントを `<ApolloProvider>` で囲む。`client` には作成した Client を渡す。

```ts
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
```

- `link`: 使用するすべての Link（後述）を `concat` で連結して渡す
- `cache`: クエリの結果をキャッシュとして保存する

```tsx
function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  )
}
```

### Query と Mutation の実行

Query と Mutation は、それぞれ `useQuery` と `useMutation` で実行する。

```jsx
const { loading, error, data } = useQuery(gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`)

const [mutateFunction, { data, loading, error }] = useMutation(gql`
  mutation IncrementCounter {
    currentValue
  }
`)
```

### Link

Link は、GraphQL サーバとの HTTP のリクエストとレスポンスの流れを制御するインタフェースである。ミドルウェアのように動き、リクエストの書き換えやレスポンスの処理、エラーハンドリングを担う。組み込みの Link には次のようなものがある。

- `HttpLink`: HTTP で GraphQL のリクエストを送る。デフォルトで使われる
- `onError`: エラーをキャッチして処理する
- `RetryLink`: ネットワークエラーが起きたときにリクエストを再試行する
- `BatchHttpLink`: 複数のリクエストを 1 つのバッチにまとめて送る

```js
import { onError } from "@apollo/client/link/error"

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})
```

カスタム Link も作れる。次の例は、認証トークンを `Authorization` ヘッダに付ける。

```jsx
import { setContext } from "@apollo/client/link/context"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})
```

## 自分の理解

「包括的な状態管理ライブラリ」とは、状態管理にひととおり必要な機能がそろっているという意味だと理解している。

2022 年ごろからは、同じ機能を持ち [[rest-api|REST API]] にも対応している [[tanstack-query|TanStack Query]] が使われているイメージがある。

関数コンポーネントの外で Query や Mutation を実行したいときは、`ApolloClient` の [`query`](https://www.apollographql.com/docs/react/api/core/ApolloClient#query) と [`mutate`](https://www.apollographql.com/docs/react/api/core/ApolloClient#mutate) メソッドを使えばよさそうだ。

## 関連

- [[apollo-server|Apollo Server]]
- [[graphql|GraphQL]]
- [[react|React]]
- [[tanstack-query|TanStack Query]]

## 出典

- [Apollo Client](https://www.apollographql.com/docs/react)
- [Apollo Link overview](https://www.apollographql.com/docs/react/api/link/introduction)
- [Apollo Client の Link でリクエストやレスポンスを加工する - まくろぐ](https://maku.blog/p/xa62yo4/)
