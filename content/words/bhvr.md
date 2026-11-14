---
title: bhvr
aliases: []
description: Bun、Hono、Vite、React を組み合わせた、軽量なフルスタック構成のテンプレート
tags: [word, bun, hono, vite, react]
date: 2025-05-22
---

## TL;DR

[[bun|Bun]]、[[hono|Hono]]、[[vite|Vite]]、[[react|React]] を組み合わせた、軽量な Web アプリの構成。

## 仕組み

[[monorepo|モノレポ]]になっていて、`package.json` の workspaces で次の 3 つのパッケージを管理する。

- `client/`: Vite でビルドする React のフロントエンド
- `server/`: Hono のバックエンド
- `shared/`: client と server の両方で使う [[typescript|TypeScript]] の型定義

server が返すレスポンスの型を `shared` に置き、client も同じ型を import する。これで API の型をフロントエンドとバックエンドで共有できる。特定のプロバイダーに依存せず、各パーツを別々の場所にデプロイできる。

## 例

```sh
bun create bhvr@latest
bun run dev    # server、client、shared をまとめて起動
bun run build  # client と shared をビルド
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [bhvr](https://bhvr.dev/)
- [Getting Started - bhvr](https://bhvr.dev/getting-started)
