---
title: Fragment Colocation
aliases: []
description: GraphQL の Fragment と、それを使う UI コンポーネントを同じ場所に置くパターン
tags: [word, graphql]
date: 2024-09-25
---

## TL;DR

[[graphql|GraphQL]] のクエリと UI コンポーネントを一緒に置くパターン。各コンポーネントが、自分の必要とするデータを [[graphql-fragment|Fragment]] で定義する。[[colocation|コロケーション]]は「一緒に（co-）配置する（location）」という意味である。

## なぜ必要か

コンポーネントの変更で必要なデータが増減しても、修正するファイルはそのコンポーネントの中に閉じる。そのため保守性が上がる。また、フィールドの増減に気付きやすいので、[[over-fetching|オーバーフェッチ]]の危険も小さくなる。

## 仕組み

UI コンポーネントのツリーと GraphQL のツリーを相似形にすると、どのコンポーネントがどのデータを必要とするのかをうまく対応付けられる。

```
App                              Query
└ Post component                 └ Post fragment
  └ Author component               └ Author fragment
```

## 例

[[urql]] と [[graphql-codegen|GraphQL Code Generator]] を使う例を示す。まず、コンポーネントごとに Fragment を定義する。

```tsx
// src/Author.tsx
import { graphql } from "./gql"

const AuthorFragment = graphql(`
  fragment AuthorFragment on Author {
    name
  }
`)
```

コンポーネントは、Fragment に対応するデータを Props で受け取る。GraphQL Code Generator が生成した `useFragment` を使うと、Fragment で取得したデータを読み出せる。

```tsx
// src/Post.tsx
import { Author } from "./Author"
import { FragmentType, graphql, useFragment } from "./gql"

const PostFragment = graphql(`
  fragment PostFragment on Post {
    title
    body
    author {
      ...AuthorFragment
    }
  }
`)

export const Post = ({ postFragment }: { postFragment: FragmentType<typeof PostFragment> }) => {
  const post = useFragment(PostFragment, postFragment)

  return (
    <>
      <h2>{post.title}</h2>
      <div>{post.body}</div>
      <Author authorFragment={post.author} />
    </>
  )
}
```

`useFragment` の戻り値には、Fragment に対応する型が付く。そのため、`Post` で `publishedAt` を表示しようとして `{post.publishedAt}` と書くと、型エラーになる。実装者は、Fragment を直して新しいフィールドを取得する必要があると気付ける。

また、`Post` からは `Author` の詳しい情報を読めない。これは GraphQL Code Generator の [[fragment-masking|Fragment Masking]] によるものである。

## 自分の理解

Fragment Masking によって、コンポーネントごとの責務の分離を強制できる。

## 関連

- [[fragment-masking|Fragment Masking]]
- [[colocation|コロケーション]]
- [[relay|Relay]]

## 出典

- [Fragment Colocation - gql.tada](https://gql-tada.0no.co/guides/fragment-colocation)
- [Fragment Masking - GraphQL Code Generator](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#fragment-masking)
- [Fragment Masking で Fragment Colocation を強制する](https://scrapbox.io/wada-blog/Fragment%20Masking%20で%20Fragment%20Colocation%20を強制する)
