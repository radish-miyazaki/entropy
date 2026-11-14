---
title: Revalidate
aliases: []
description: Next.js で、キャッシュしたデータを破棄して最新のデータを取り直すこと
tags: [word, next.js]
date: 2024-08-26
---

## TL;DR

[[nextjs|Next.js]] で、[[data-cache|Data Cache]] に保存したデータを破棄し、最新のデータを取り直すこと。

## 仕組み

Revalidate には 2 種類ある。

- [[time-based-revalidation|Time-based Revalidation]]: 指定した時間が経つと更新する
- [[on-demand-revalidation|On-demand Revalidation]]: 任意のタイミングで更新する

Time-based Revalidation では、`fetch` の `next.revalidate` に秒数を指定する。`fetch` を使わない関数では `unstable_cache` の `revalidate` を使う。[[route-segment-config|Route Segment Config]] の `revalidate` で、Layout や Page の既定の間隔も決められる。1 つのルートの中では、各 Layout と Page のうち最も小さい `revalidate` が、ルート全体の再検証の間隔になる。

On-demand Revalidation では、[[server-actions|Server Actions]] や [[route-handler|Route Handler]] の中で `revalidateTag` か `revalidatePath` を呼ぶ。`revalidateTag` は `next.tags` で付けたタグを単位に、`revalidatePath` はルートのパスを単位にキャッシュを無効にする。

## 例

```tsx
// 1 時間ごとに再検証する
const data = await fetch("https://...", { next: { revalidate: 3600 } })
```

```ts
import { revalidatePath } from "next/cache"

export async function updateUser(id: string) {
  // データを書き換える
  revalidatePath("/profile")
}
```

## 注意点

この仕組みは、Next.js 16 で `cacheComponents` フラグとして導入された Cache Components を使わない場合のものである。公式ドキュメントでは「Previous Model」として扱われている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[data-cache|Data Cache]]
- [[time-based-revalidation|Time-based Revalidation]]
- [[on-demand-revalidation|On-demand Revalidation]]

## 出典

- [Caching and Revalidating (Previous Model) - Next.js](https://nextjs.org/docs/app/guides/caching-without-cache-components)
- [Caching and Revalidating - Revalidating data](https://nextjs.org/docs/app/building-your-application/data-fetching/caching-and-revalidating#revalidating-data)
