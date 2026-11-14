---
title: Request Memoization
aliases: []
description: Next.js が、同じ URL とオプションを持つ fetch リクエストを 1 回のレンダリングの中で自動的にメモ化する仕組み
tags: [word, next.js]
date: 2024-08-25
---

## TL;DR

[[nextjs-caching|Next.js の 4 種類のキャッシュ]]の 1 つ。同じ URL とオプションを持つ `fetch` リクエストを自動的に[[memoization|メモ化]]し、React のコンポーネントツリーの中でデータを再利用する。

## なぜ必要か

コンポーネントツリーの複数の場所で同じデータが必要になると、同じ `fetch` が何度も呼ばれる。Request Memoization が有効なら、どこで `fetch` を呼んでも、実際のリクエストは 1 回だけで済む。データを親から子へ受け渡さなくても、必要なコンポーネントで直接 `fetch` を呼べる。

## 仕組み

Next.js は [[fetch-api|Fetch API]] を拡張し、同じ URL とオプションを持つリクエストを自動的にメモ化する（[[nextjs-extended-fetch|Next.js による fetch の拡張]]）。名前は Next.js のキャッシュの一つとして並ぶが、実体は [[react|React]] の機能である。

1 回のレンダリングの中では、次の順に動く。

1. 最初のリクエストはメモリにないので、キャッシュは `MISS` になる
2. 実際にデータを取得するか [[data-cache|Data Cache]] を参照し、結果をキャッシュに格納する（`SET`）
3. 同じレンダリングの中で同じリクエストが来ると、キャッシュから結果を返す（`HIT`）
4. レンダリングが終わって Route ができあがると、キャッシュはリセットされる

`fetch` 以外で同じ挙動を実現したい場合は、[[react-cache|React.cache]] を使う。

## 例

次のコードでは、`generateMetadata` と `Page` でクエリパラメータ `take` の値が異なるため、メモ化が効かない。[[data-cache|Data Cache]] の影響を除くため、`cache: "no-store"` を指定している。

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ...
  const res = await fetch(`http://localhost:8082/api/categories/${categoryName}?page=1&take=10`, {
    cache: "no-store",
  })
  // ...
}

export default async function Page({ params, searchParams }: Props) {
  // ...
  const res = await fetch(
    // クエリパラメータが generateMetadata と異なる
    `http://localhost:8082/categories/${categoryName}?page=${page}&take=15`,
    { cache: "no-store" },
  )
  // ...
}
```

`generateMetadata` の `take` を `15` にそろえると、メモ化が効くようになる。

## 注意点

- 対象は `fetch` の `GET` リクエストだけである
- 対象は [[react-server-component|React Server Component]] の中の `fetch` である。[[route-handler|Route Handler]] の `fetch` は、コンポーネントツリーの外にあるので対象にならない
- Next.js 15 から [[data-cache|Data Cache]] はデフォルトで無効になったが、Request Memoization は今も有効である

## 自分の理解

Request Memoization と [[data-cache|Data Cache]] はよく混同してしまう。Data Cache が永続的なのに対し、Request Memoization は 1 回のレンダリングの間しか保持されない。

## 関連

- [[nextjs-caching|Next.js の 4 種類のキャッシュ]]
- [[data-cache|Data Cache]]
- [[react-cache|React.cache]]
- [[nextjs-extended-fetch|Next.js による fetch の拡張]]

## 出典

- [Caching in Next.js - Request Memoization](https://nextjs.org/docs/app/building-your-application/caching#request-memoization)
