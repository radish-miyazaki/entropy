---
title: On-demand Revalidation
aliases: []
description: Next.js で、任意のタイミングでキャッシュを無効化する仕組み
tags: [word, next.js]
date: 2024-09-16
---

## TL;DR

[[nextjs|Next.js]] で、任意のタイミングでキャッシュを無効化する仕組み。無効化するまでは、キャッシュを返し続ける。

## 仕組み

On-demand Revalidation には 2 つの API がある。

- [`revalidatePath`](https://nextjs.org/docs/app/building-your-application/caching#revalidatepath): 特定のルートのパスでキャッシュを無効化する
- [`revalidateTag`](https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag): `fetch` の `next.tags` で付けたタグでキャッシュを無効化する。ルートに依存しないので、`revalidatePath` よりも効率よく無効化できる

```ts
revalidatePath(`/photos/${photoId}`)

fetch(`https://...`, { next: { tags: ["a", "b", "c"] } })
revalidateTag("a")
```

実行しても、対象のキャッシュがすぐに作り直されるわけではない。作り直されるのは、次に必要になったとき（リクエスト時）である。[[time-based-revalidation|Time-based Revalidation]] は新しいデータを取得するまで古いデータを返すが、On-demand Revalidation は無効化したキャッシュを返さない。

> When an on-demand revalidation is triggered, the appropriate cache entries will be purged from the cache. This is different from time-based revalidation, which keeps the stale data in the cache until the fresh data is fetched.

### キャッシュタグの設計

`revalidateTag` では、タグの文字列をどう決めるかが大事になる。タグが具体的であるほど（「このページの何番目」など）データソースへのアクセス効率は良くなる。タグが抽象的であるほど（ページ全体を指すなど）無効化は楽になる。

## 注意点

`revalidateTag` は [[route-handler|Route Handler]] でも実行できるが、変更をすぐに画面に反映したいなら `router.refresh` との併用が必要である。Route Handler は特定のルートに結び付いていないので、[[client-side-router-cache|Client-side Router Cache]] が無効化されず、古い結果が返るからである。`router.refresh` は今のルートのレンダリングを再リクエストするので、`router.push` で別の画面に移る場合などは無駄なリクエストになる。

そのため、[[server-actions|Server Actions]] を優先して使うほうがよい。Server Actions で実行すると、`router.refresh` なしで Router Cache も無効化される。また [`redirect`](https://nextjs.org/docs/app/building-your-application/routing/redirecting#redirect-function) を使えば、更新と同時に画面を遷移させられる。

ただし、Next.js アプリケーションの外から呼び出すときは Route Handler を使うしかない。たとえば外部の CMS でブログ記事を書き、Next.js がそのデータを取得する構成では、記事の更新時に Webhook から On-demand Revalidation を実行すると、効率よくキャッシュを無効化できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[time-based-revalidation|Time-based Revalidation]]
- [[revalidate|Revalidate]]
- [[data-cache|Data Cache]]
- [[client-side-router-cache|Client-side Router Cache]]
- [[nextjs-caching|Next.js の 4 種類のキャッシュ]]

## 出典

- [On-demand Revalidation - Next.js](https://nextjs.org/docs/app/building-your-application/caching#on-demand-revalidation)
