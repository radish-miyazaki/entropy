---
title: React Server Component
aliases: [RSC, SC, Server Component]
description: サーバサイドでのみ実行され、JS がブラウザに送られない React のコンポーネント
tags: [word, react, next.js]
date: 2024-08-20
---

## TL;DR

サーバサイドで**のみ**実行される [[react|React]] のコンポーネント。コンポーネントの JavaScript はブラウザに送られない。対になるのは [[client-component|Client Component]]（CC）である。

> クライアントアプリケーションや SSR サーバとは別の環境で、バンドル前に事前にレンダーされます。
>
> React Server Components の “server” とはこの別の環境を指しています。サーバコンポーネントは、CI サーバでビルド時に一度だけ実行することも、ウェブサーバを使用してリクエストごとに実行することもできます。

## なぜ必要か

コンポーネントを非同期関数で書けるので、コンポーネントから直接外部 API のデータを取得してレンダリングできる。

## 仕組み

### Next.js でのレンダリング

[[nextjs|Next.js]] の [[app-router|App Router]] では、コンポーネントはデフォルトで Server Component として扱われる。サーバサイドでは、次の 2 段階でレンダリングする。

1. RSC から [[rsc-payload|RSC Payload]] をレンダリングする。RSC Payload は、複数行の JSON をストリームにしたものである
2. RSC Payload と CC から、初期表示のための HTML をレンダリングする（[[server-side-rendering|SSR]]）

クライアントには、HTML、RSC Payload、CC の JavaScript バンドルを送る。クライアントサイドでは次の順に処理する。

1. HTML を使って、インタラクティブでない画面をすぐに表示する（初回のみ）
2. RSC Payload を使って、RSC と CC のツリーを突き合わせ、DOM を更新する
3. JavaScript で CC を[[hydration|ハイドレーション]]し、インタラクティブにする

レンダリングは常にサーバサイド、クライアントサイドの順に進む。CC がレンダリングされるときには、SC のレンダリングはすでに終わっている。そのため、CC から SC を import することはできない。

```tsx
"use client"

import ServerComponent from "./Server-Component"

// できない
export default function ClientComponent() {
  return (
    <>
      <ServerComponent />
    </>
  )
}
```

一方、SC を props として CC に渡すこと（Composition パターン）はできる。

```tsx
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```

## 例

```tsx
async function getPosts() {
  const data: { posts: Post[] } = await fetch("https://example.com/posts").then((res) => res.json())
  return data.posts
}

export default async function ServerComponent() {
  const posts = await getPosts()
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

`fetch` はコンポーネントの中で直接呼ばず、上の `getPosts` のような関数に切り出す。どんなデータを取得しているかが分かりやすく、[[request-memoization|Request Memoization]] の考慮漏れも起きにくい。

[[request-waterfall|リクエストウォーターフォール]]を避けるには、データを並列に取得する。方法は 2 つある。1 つは `Promise.all` を使う方法である。

```tsx
export default async function Page({ params, searchParams }: Props) {
  const [photos, category] = await Promise.all([getPhotos(), getCategory(params.categoryName)])

  // ...
}
```

もう 1 つは、子の Server Component ごとにデータを取得する方法である。[[colocation|コロケーション]]を意識したやり方になる。

## 注意点

従来の React の SSR では、コンポーネントはブラウザとサーバの両方で実行されていた。RSC はよく SSR と混同されるが、別物である。RSC は RSC Payload を、SSR は HTML を出力する。それぞれ独立しているので、同じプロセスやマシンで動かす必要もない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[client-component|Client Component]]
- [[server-vs-client-components|Server Component vs Client Component]]
- [[use-client-boundary|use client は境界を宣言する]]
- [[rsc-payload|RSC Payload]]
- [[hydration|ハイドレーション]]
- [[server-rendering-strategies|Server Rendering Strategies]]

## 出典

- [[実践Next.js ——App Routerで進化するWebアプリ開発]]
- [Server Components - React](https://ja.react.dev/reference/rsc/server-components)
- [Server Components - Next.js](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Fetching Data: Request Memoization - Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#request-memoization)
- https://zenn.dev/dai_shi/articles/94affd526f4c8a
- https://zenn.dev/yuu104/articles/react-server-component
- https://zenn.dev/frontendflat/articles/nextjs-rscpayload-composition
