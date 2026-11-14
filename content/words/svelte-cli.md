---
title: Svelte CLI
aliases: []
description: Svelte アプリケーションの作成と保守のためのコマンドラインツール sv
tags: [word, svelte]
date: 2025-02-02
---

## TL;DR

[[svelte|Svelte]] アプリケーションを作成・保守するためのコマンドラインツール。コマンド名は `sv` である。

## 仕組み

`create`、`add`、`check`、`migrate` のコマンドがある。プロジェクトに `sv` が入っていれば `npx` はそれを使い、入っていなければ最新版を取得してインストールせずに実行する。そのため、新しいプロジェクトを作る `sv create` で特に便利である。

## 例

```sh
npx sv create
```

`pnpm dlx` など、各パッケージマネージャの同等のコマンドでも実行できる。

`sv add` は、既存のプロジェクトに機能を足すコマンドである。[[eslint|ESLint]]、[[prettier|Prettier]]、[[tailwind-css|Tailwind CSS]]、[[drizzle|Drizzle]]、[[vitest|Vitest]]、Playwright などの公式アドオンを、スペース区切りで複数選べる。引数なしで実行すると、対話形式で選べる。

## 注意点

`sv add` では、npm パッケージとして公開されたコミュニティのアドオンも使える。ただし、Svelte のメンテナはそれらに悪意のあるコードがないかを確かめていない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[sveltekit|SvelteKit]]

## 出典

- [sveltejs/cli](https://github.com/sveltejs/cli)
- [Overview - Svelte CLI Docs](https://svelte.dev/docs/cli/overview)
- [sv add - Svelte CLI Docs](https://svelte.dev/docs/cli/sv-add)
