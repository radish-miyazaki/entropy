---
title: Vite
aliases: []
description: ネイティブ ES Modules を使う開発サーバと、本番向けのビルドコマンドからなるフロントエンドのビルドツール
tags: [word, javascript, ビルドツール]
date: 2026-11-14
---

## TL;DR

フロントエンドのビルドツール。ネイティブの ES Modules を使う開発サーバと、本番向けにコードをまとめるビルドコマンドの 2 つからなる。名前はフランス語で「速い」を意味し、「ヴィート」と読む。

## なぜ必要か

開発中はブラウザのネイティブ ES Modules の上で動くので、[[hmr|HMR]] などの機能を使いながら素早く開発できる。本番用には、最適化された静的ファイルを出力するよう、あらかじめ設定されたビルドコマンドを使える。公式ドキュメントは、Vite が独自の方針を持ち、最初から妥当なデフォルト設定を備えていると説明している。

## 仕組み

開発中の Vite はサーバとして動き、プロジェクトのルートに置いた `index.html` がアプリケーションのエントリポイントになる。本番ビルドでは Rolldown でコードを[[bundler|バンドル]]する。フレームワークへの対応やツールとの連携は、プラグイン API で追加する。

## 例

```sh
npm create vite@latest
```

テンプレートには vanilla、vue、react、preact、lit、svelte、solid、qwik があり、それぞれ [[typescript|TypeScript]] 版もある。[[vue|Vue]] の単一ファイルコンポーネントと [[react|React]] の Fast Refresh には、公式の HMR 連携がある。[[vitest|Vitest]] は Vite を使うプロジェクトに最適化されたテストフレームワークである。[[solidstart|SolidStart]] は Vite でクライアント向けとサーバ向けのビルドを生成し、[[sveltekit|SvelteKit]] も開発に Vite を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[bundler|バンドラ]]
- [[hmr|HMR]]
- [[vitest|Vitest]]

## 出典

- [Getting Started - Vite](https://vite.dev/guide/)
