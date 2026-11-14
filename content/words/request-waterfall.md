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

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-server-component|React Server Component]]: データを並列に取得して避ける方法がある
- [[server-vs-client-components|Server Component vs Client Component]]
