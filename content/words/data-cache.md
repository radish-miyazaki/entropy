---
title: Data Cache
aliases: []
description: Next.js で fetch の結果を、更新されるまでサーバ上に永続的にキャッシュする仕組み
tags: [word, next.js]
date: 2024-08-26
---

## TL;DR

[[nextjs-caching|Next.js の 4 種類のキャッシュ]]の 1 つ。`fetch` で取得したデータを、更新されるまでリクエストやデプロイをまたいで返し続ける永続的なキャッシュである。

## なぜ必要か

同じデータを何度も取得元から取り直さずに済む。[[request-memoization|Request Memoization]] が 1 回のレンダリングの間しか結果を保持しないのに対し、Data Cache は永続的に保持する。

## 仕組み

サーバサイドのレンダリング中に `fetch` が呼ばれると、次の順に動く。

1. [[request-memoization|Request Memoization]] と Data Cache を順に確認し、どちらにもなければ実際にリクエストする
2. レスポンスを Request Memoization と Data Cache に保存し、呼び出し元に返す
3. 次の `fetch` に `{ cache: 'no-store' }` が付いていれば、Data Cache の確認を飛ばす。このときはオプションが異なるので、Request Memoization もキャッシュを返さない

`fetch` の第 2 引数に `next.revalidate` を指定すると、キャッシュの有効期限を秒単位で決められる。デフォルトは `false` で、期限なしでキャッシュし続ける。

```ts
fetch("https://...", { next: { revalidate: 3600 } })
```

このようにキャッシュを更新する操作を [[revalidate|Revalidate]] という。有効期限で更新するものを [[time-based-revalidation|Time-based Revalidation]]、任意のタイミングで更新するものを [[on-demand-revalidation|On-demand Revalidation]] と呼ぶ。

`fetch` 以外で同じ挙動を実現したい場合は、[[unstable-cache|unstable_cache]] を使う。

## 注意点

Next.js 14 まではデフォルトで有効だったが、15 からはデフォルトで無効になった。14 以前と同じようにキャッシュするには、第 2 引数で指定する。

```ts
fetch("https://...", { cache: "force-cache" })
```

[[request-memoization|Request Memoization]] とは目的も違う。Request Memoization は React のコンポーネントツリーの中でデータを再利用するためのもので、[[route-handler|Route Handler]] の中では動かないといった制約がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nextjs-caching|Next.js の 4 種類のキャッシュ]]
- [[request-memoization|Request Memoization]]
- [[revalidate|Revalidate]]
- [[unstable-cache|unstable_cache]]

## 出典

- [Caching in Next.js - Data Cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache)
- [Next.js 15 へのアップグレード - fetch requests](https://nextjs.org/docs/app/building-your-application/upgrading/version-15#fetch-requests)
- [Route Segment Config - revalidate](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate)
