---
title: Route Segment Config
aliases: []
description: Next.js の App Router で、Page、Layout、Route Handler から変数を export してその Route Segment の挙動を設定する仕組み
tags: [word, next.js, app-router]
date: 2024-08-23
---

## TL;DR

[[nextjs|Next.js]] の [[app-router|App Router]] で、[[route-segment|Route Segment]] の挙動を設定する仕組み。[[page-tsx|page.tsx]]、[[layout-tsx|layout.tsx]]、[[route-handler|Route Handler]] から、決まった名前の変数を直接 `export` する。

## 仕組み

現在の公式ドキュメントには、次のオプションが載っている。

| オプション        | 型                                      | デフォルト                           |
| ----------------- | --------------------------------------- | ------------------------------------ |
| `dynamicParams`   | `boolean`                               | `true`                               |
| `runtime`         | `'nodejs' \| 'edge'`（`edge` は非推奨） | `'nodejs'`                           |
| `preferredRegion` | （非推奨）                              | `'auto'`                             |
| `maxDuration`     | `number`                                | デプロイ先のプラットフォームが決める |

## 例

Route Handler をキャッシュしたいときは、`dynamic` を指定する。

```ts
export const dynamic = "force-static"
```

## 注意点

Next.js 16 では、Cache Components を有効にすると `dynamic`、`dynamicParams`、`revalidate`、`fetchCache` が使えなくなる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[route-segment|Route Segment]]
- [[route-handler|Route Handler]]

## 出典

- [Route Segment Config - Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)
