---
title: Time-based Revalidation
aliases: []
description: Next.js で、有効期限が切れたキャッシュをバックグラウンドで作り直す Revalidate
tags: [word, next.js]
date: 2024-08-26
---

## TL;DR

[[revalidate|Revalidate]] の 1 つ。指定した有効期限が切れると、[[data-cache|Data Cache]] のデータを裏側で作り直す。

## なぜ必要か

Next.js の ISR（Incremental Static Regeneration）のガイドによると、サイト全体をビルドし直さずに静的なコンテンツを更新できる。ほとんどのリクエストには事前にレンダリングした静的なページを返すので、サーバの負荷も減らせる。

## 仕組み

有効期限内は、キャッシュをそのまま返す。期限が切れた後の最初のリクエストでは、次のことを行う。

1. 期限切れのキャッシュをそのまま返す
2. 裏側でキャッシュを作り直す
3. 次のリクエストから、作り直した新しいキャッシュを返す

有効期限は、`fetch` の `next.revalidate` や [[unstable-cache|unstable_cache]] の `revalidate` で指定する。

## 注意点

期限切れのキャッシュを一度は返す点が、[[on-demand-revalidation|On-demand Revalidation]] と異なる。

ガイドでは、有効期限を長め（1 秒ではなく 1 時間など）にすることを勧めている。より細かく制御したいなら On-demand Revalidation を、リアルタイムのデータが必要なら動的レンダリングを検討する。1 つのルートに `revalidate` の異なる `fetch` が複数あると、ISR には最も短い時間が使われる。作り直しでエラーが起きたときは、最後に生成に成功したデータを返し続け、次のリクエストで作り直しを再び試みる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[revalidate|Revalidate]]
- [[on-demand-revalidation|On-demand Revalidation]]
- [[stale-while-revalidate|Stale-While-Revalidate]]
- [[data-cache|Data Cache]]

## 出典

- [Caching in Next.js - Time-based Revalidation](https://nextjs.org/docs/app/building-your-application/caching#time-based-revalidation)
- [How to implement Incremental Static Regeneration (ISR) - Next.js](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
