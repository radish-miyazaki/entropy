---
title: Waku
aliases: []
description: React Server Components に対応した、最小構成の React フレームワーク
tags: [word, react]
date: 2025-05-29
---

## TL;DR

「the minimal React framework」を掲げる軽量な [[react|React]] フレームワーク。React 19 の機能、特に [[react-server-component|React Server Components]] に対応している。

## 仕組み

サーバコンポーネントはサーバでだけ動き、データの取得やファイルシステムへのアクセスができる。状態やブラウザの API は使えず、クライアントのバンドルにも含まれない。`'use client'` を付けたクライアントコンポーネントをサーバコンポーネントから import すると、そこがサーバとクライアントの境界になる。

レンダリングは、静的に事前生成する `'static'`（SSG）と、リクエストごとにサーバで描画する `'dynamic'`（SSR）から選ぶ。ルートは `./src/pages` 以下のファイル構成か、`createPages` を使ってコードで定義する。データの更新には `'use server'` を付けたサーバ関数を使う。

デプロイ先は Node.js、静的ホスティング、Vercel、Netlify、Cloudflare Workers などに対応している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react|React]]
- [[react-server-component|React Server Components]]
- [[nextjs|Next.js]]

## 出典

- [Waku](https://waku.gg/)
