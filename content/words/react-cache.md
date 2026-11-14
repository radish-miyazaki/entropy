---
title: React.cache
aliases: []
description: データ取得や計算の結果をキャッシュするために、渡された関数をメモ化する React の API
tags: [word, react]
date: 2024-08-27
---

## TL;DR

データ取得や計算の結果をキャッシュするために、渡された関数を[[memoization|メモ化]]する [[react|React]] の API。[[react-server-component|React Server Component]] で使うことを想定している。

## なぜ必要か

[[nextjs|Next.js]] の [[request-memoization|Request Memoization]] は `fetch` にしか効かない。[[prisma-client|Prisma Client]] や [[nextauth-js|NextAuth.js]] など、`fetch` 以外の呼び出しを同じようにメモ化したいときに使う。

## 仕組み

メモ化された関数を呼び出すと、渡された引数を調べ、結果がすでにキャッシュされているかを確かめる。引数の比較は [[shallow-comparison|Shallow comparison]]（`===`）で行う。そのため、プリミティブでない値を渡すときは、同じオブジェクトの参照を渡す必要がある。

キャッシュを共有するには、コンポーネントどうしが同じメモ化された関数を呼び出す必要がある。そのため、メモ化した関数はコンポーネントの外の別ファイルで定義する。

```js
import { cache } from "react"
import { calculateWeekReport } from "./report"

export default cache(calculateWeekReport)
```

```jsx
import getWeekReport from "./getWeekReport"

export default function Temperature({ cityData }) {
  const report = getWeekReport(cityData)
  // ...
}
```

## 例

次のコードでは、`generateMetadata` と `Page` が別々のオブジェクトを引数に渡すので、キャッシュが効かない。

```ts
export const getProfileFromScreenName = async ({ screenName }: Props) => {
  const profile = await prisma.profile.findUnique({
    where: { screenName },
    include: { user: true },
  })
  if (!profile) notFound()

  return profile
}
```

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await getProfileFromScreenName(params)
  return { title: `${profile.user.name}さんの投稿一覧 | ${SITE_NAME}` }
}

export default async function Page({ params }: Props) {
  const profile = await getProfileFromScreenName(params)
  // ...
}
```

関数を `cache` で包み、プリミティブ値を受け取るようにすると、キャッシュが効く。

```ts
export const getProfileFromScreenName = cache(async (screenName: string) => {
  const profile = await prisma.profile.findUnique({
    where: { screenName },
    include: { user: true },
  })
  if (!profile) notFound()

  return profile
})
```

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await getProfileFromScreenName(params.screenName)
  return { title: `${profile.user.name}さんの投稿一覧 | ${SITE_NAME}` }
}

export default async function Page({ params }: Props) {
  const profile = await getProfileFromScreenName(params.screenName)
  // ...
}
```

NextAuth.js のセッション取得も、同じように包める。

```ts
export const getServerSession = cache(async () => {
  return originalGetServerSession(authOptions)
})
```

## 注意点

- メモ化した関数は、プリミティブ値を受け取るようにする
- React Server Component で使う
- コンポーネントの中ではなく、外の別ファイルで定義する。コンポーネントの中で使えるキャッシュには [[unstable-cache|unstable_cache]] がある

## 自分の理解

同じオブジェクトの参照を渡し続けるのはほとんど無理なので、プリミティブ値を渡すようにするのがよさそうだ。

## 関連

- [[request-memoization|Request Memoization]]
- [[shallow-comparison|Shallow comparison]]
- [[unstable-cache|unstable_cache]]
- [[memoization|メモ化]]

## 出典

- [cache - React](https://ja.react.dev/reference/react/cache)
- [cache - React（メモ化された関数がまだ実行される）](https://ja.react.dev/reference/react/cache#memoized-function-still-runs)
