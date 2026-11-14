---
title: TanStack Query
aliases: []
description: サーバの状態の取得、キャッシュ、同期、更新を受け持つデータ取得ライブラリ
tags: [word, react, javascript]
date: 2026-11-14
---

## TL;DR

サーバの状態の取得、キャッシュ、同期、更新を受け持つデータ取得ライブラリ。旧称は React Query。

## なぜ必要か

公式ドキュメントによると、サーバの状態はクライアントの状態とはまったく別物である。サーバの状態は自分が制御できない場所にあり、非同期の API でしか取得・更新できない。他人が知らないうちに変更できるので、アプリケーションの中で古くなることもある。

そのため、キャッシュ、同じデータへのリクエストの重複排除、古いデータのバックグラウンドでの更新、データが古くなったことの検知、ページネーションなどが必要になる。従来の状態管理ライブラリはこれらを苦手としており、TanStack Query はこれを設定なしで引き受ける。

## 仕組み

`queryKey` でキャッシュするデータを識別し、`queryFn` でデータを取得する。`useQuery` は読み込み中、エラー、データの状態を返す。

## 例

```tsx
import { useQuery } from "@tanstack/react-query"

function Repo() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repo"],
    queryFn: () => fetch("https://api.github.com/repos/TanStack/query").then((res) => res.json()),
  })

  if (isPending) return "Loading..."
  if (error) return "Error: " + error.message

  return <h1>{data.name}</h1>
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react|React]]
- [[apollo-client|Apollo Client]]
- [[urql|urql]]
- [[stale-while-revalidate|stale-while-revalidate]]
- [[rest-api|REST API]]

## 出典

- [Overview - TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
