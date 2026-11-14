---
title: リクエストウォーターフォール
aliases: []
description: 前のリクエストが完了するまで次のリクエストを始めない、一連のネットワークリクエスト
tags: [word]
date: 2024-08-21
---

## TL;DR

リクエストが複数あるとき、前のリクエストが完了するまで次のリクエストを始めない、一連のネットワークリクエストのこと。

## 例

```tsx
const revenue = await fetchRevenue()
const latestInvoices = await fetchLatestInvoices() // wait for fetchRevenue() to finish
const { numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices } =
  await fetchCardData() // wait for fetchLatestInvoices() to finish
```

ウォーターフォールを避けるよくある方法は、すべてのリクエストを同時に始めることである。[[javascript|JavaScript]] では、`Promise.all()` や `Promise.allSettled()` ですべての [[promise|Promise]] を同時に始められる。

```ts
const data = await Promise.all([invoiceCountPromise, customerCountPromise, invoiceStatusPromise])
```

## 注意点

Next.js の Learn によると、ウォーターフォールは必ずしも悪いわけではない。たとえば、ユーザの ID とプロフィールを取ってから、その ID で友達の一覧を取るように、前のリクエストの結果に次のリクエストが依存する場合は、ウォーターフォールにする必要がある。ただし、意図せずにウォーターフォールになると、性能が落ちる。

並列に取得しても、1 つのリクエストだけがほかより遅い場合の問題は残る。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-server-component|React Server Component]]: データを並列に取得して避ける方法がある
- [[server-vs-client-components|Server Component vs Client Component]]

## 出典

- [Fetching Data - Next.js Learn](https://nextjs.org/learn/dashboard-app/fetching-data)
