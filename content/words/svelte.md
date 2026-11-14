---
title: Svelte
aliases: []
description: HTML、CSS、JavaScript で書いたコンポーネントを、コンパイラで最適化された JavaScript に変換する UI フレームワーク
tags: [word, svelte, フロントエンド]
date: 2026-11-14
---

## TL;DR

Web のユーザインタフェースを作るためのフレームワーク。HTML、CSS、[[javascript|JavaScript]] で宣言的に書いたコンポーネントを、コンパイラで無駄のない JavaScript に変換する。

## 仕組み

[Svelte の公式ドキュメント](https://svelte.dev/docs/svelte/overview)によると、コンポーネントはマークアップ、スタイル、スクリプトを 1 つのファイルに書く。これを実行時に解釈するのではなく、ブラウザに届く前にコンパイラが最適化された JavaScript に変換する。単独のコンポーネントにもアプリケーション全体にも使え、フルスタックのアプリケーションには [[sveltekit|SvelteKit]] を組み合わせる。

Svelte 5 では `$state` のように `$` で始まる [[svelte-runes|Rune]] で、リアクティブな状態や振る舞いを明示的に書く。

## 例

- [[sveltekit|SvelteKit]]: Svelte のメタフレームワーク
- [[svelte-cli|Svelte CLI]]: アプリケーションを作成・保守するためのコマンドラインツール（`sv`）
- [[svelte-mcp|Svelte MCP]]: コーディングエージェントに Svelte と SvelteKit の文脈を与える公式の MCP サーバー

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[sveltekit|SvelteKit]]
- [[svelte-runes|Rune]]
- [[react|React]]
- [[container-presentational-pattern|Container/Presentational Pattern]]

## 出典

- [Overview - Svelte Docs](https://svelte.dev/docs/svelte/overview)
