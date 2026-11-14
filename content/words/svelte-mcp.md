---
title: Svelte MCP
aliases: []
description: Svelte の公式ドキュメントと静的解析をコーディングエージェントに提供する MCP サーバー
tags: [word, svelte, sveltekit]
date: 2025-12-04
---

## TL;DR

[[svelte|Svelte]] 公式の [[model-context-protocol|MCP]] サーバー。ツール、プロンプト、リソースを通して、コーディングエージェントに Svelte と [[sveltekit|SvelteKit]] の文脈を与える。

## なぜ必要か

生成 AI が書く Svelte のコードには、よくある誤りがある。Svelte MCP は公式ドキュメントから最新の情報を直接取り出し、静的解析でその誤りを直すための材料をエージェントに渡す。

## 仕組み

次の 4 つのツールを提供している。

- `list-sections`: 利用できるドキュメントのセクションの一覧を返す
- `get-documentation`: 指定したセクションの最新のドキュメントを svelte.dev から取得する
- `svelte-autofixer`: 生成された Svelte のコードを静的解析し、修正案を返す
- `playground-link`: 生成したコードを載せた一時的な Svelte Playground のリンクを作る

ローカルで動かす方法と、リモートのサーバーにつなぐ方法がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[sveltekit|SvelteKit]]
- [[svelte-cli|Svelte CLI]]
- [[chrome-devtools-mcp|Chrome DevTools MCP]]
- [[model-context-protocol|Model Context Protocol]]

## 出典

- [Overview - Svelte MCP](https://svelte.dev/docs/mcp/overview)
- [Tools - Svelte MCP](https://svelte.dev/docs/mcp/tools)
