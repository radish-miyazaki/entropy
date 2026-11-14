---
title: Knip
aliases: []
description: JavaScript と TypeScript のプロジェクトで、使われていないファイル、依存関係、export を見つけて直すツール
tags: [word, javascript, typescript]
date: 2025-05-08
---

## TL;DR

[[javascript|JavaScript]] と [[typescript|TypeScript]] のプロジェクトで、使われていないファイル、[[dependency|依存関係]]、`export` を見つけて直すツール。

## なぜ必要か

コードベースが育つと、どこからも使われないファイルや `export`、`package.json` に残ったままの依存がたまっていく。Knip はそれらをまとめて見つけるので、コードベースを整理しやすくなる。

## 仕組み

Knip は、プロジェクトで使っているフレームワークやツールをもとにエントリポイントを決め、そこから解析を始める。[[monorepo|モノレポ]]にも対応している。Astro、[[eslint|ESLint]]、Jest、[[nextjs|Next.js]]、Vite、[[vitest|Vitest]]、webpack など、200 を超えるツール向けのプラグインがある。

## 例

インストールせずにすぐ試すなら、次のコマンドを実行する。

```sh
npx knip
```

設定ファイルを作って導入するなら、`npm init @knip/config` を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Knip](https://knip.dev/)
- [Getting Started - Knip](https://knip.dev/overview/getting-started)
