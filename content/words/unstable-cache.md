---
title: unstable_cache
aliases: []
description: Next.js で、fetch 以外の処理の結果を Data Cache にキャッシュする関数
tags: [word, next.js]
date: 2024-08-27
---

## TL;DR

[[nextjs|Next.js]] で、`fetch` 以外の処理でも [[data-cache|Data Cache]] を作れるようにする関数。重いデータベースクエリなどの結果をキャッシュし、複数のリクエストで再利用できる。

## なぜ必要か

Data Cache は `fetch` の結果にしか効かない。[[prisma-client|Prisma Client]] のように `fetch` を使わずにデータを取る場合に、この関数で同じようにキャッシュする。

## 仕組み

```ts
import { unstable_cache } from "next/cache"

const data = unstable_cache(fetchData, keyParts, options)()
```

- `fetchData`: キャッシュするデータを取得する非同期関数
- `keyParts`: キャッシュを一意に識別するキーとして使う文字列の配列
- `options`: キャッシュの動作を制御するオブジェクト。[[on-demand-revalidation|On-demand Revalidation]] に使う `tags` や、[[time-based-revalidation|Time-based Revalidation]] に使う `revalidate` を指定できる

## 例

```tsx
import { unstable_cache } from "next/cache"

export default async function Page({ params }: { params: { userID: string } }) {
  const getCachedUser = unstable_cache(
    async () => {
      return { id: params.userID }
    },
    [params.userID],
    {
      tags: ["cached-user-tag"],
      revalidate: 60,
    },
  )
  // ...
}
```

[[react-cache|React.cache]] と違い、コンポーネントの中で使える。

## 注意点

Next.js 15 の時点でも不安定な機能なので、名前や使い方が変わるかもしれない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[data-cache|Data Cache]]
- [[react-cache|React.cache]]
- [[revalidate|Revalidate]]

## 出典

- [unstable_cache - Next.js](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)
