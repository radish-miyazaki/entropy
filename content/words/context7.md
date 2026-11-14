---
title: Context7
aliases: []
description: ライブラリの最新でバージョンに合ったドキュメントを、MCP サーバなどを通じて AI コーディングエージェントに渡すサービス
tags: [word, mcp-server]
date: 2025-09-19
---

## TL;DR

ライブラリやフレームワークの最新のドキュメントを、AI コーディングエージェントに渡すサービス。[[model-context-protocol|MCP]] サーバや `ctx7` CLI から使う。

## なぜ必要か

[[llm|LLM]] は、使っているライブラリについて古い、または一般的な情報に頼りがちである。そのため、古いコード例や存在しない API を生成してしまう。

> LLMs rely on outdated or generic information about the libraries you use.

## 仕組み

Context7 は、最新でバージョンに合ったドキュメントとコード例を元のソースから取ってきて、エージェントに渡す。MCP サーバは次の 2 つのツールを提供する。

- `resolve-library-id`: ライブラリ名を Context7 の ID に変換する
- `query-docs`: ID と質問をもとに、ドキュメントを取得する

## 例

プロンプトの最後に「use context7」と付けると、Context7 からドキュメントを取ってくる。`use library /supabase/supabase` のように ID を書けばライブラリの特定を省け、「Next.js 16」のようにバージョンを書けばそのバージョンのドキュメントを選べる。`CLAUDE.md` や Cursor のルールに「ライブラリや API の質問では Context7 を使う」と書いておけば、毎回指示しなくて済む。

セットアップは `npx ctx7 setup` で行う。手動で設定する場合は、`https://mcp.context7.com/mcp` を MCP サーバとして登録し、API キーを Authorization ヘッダに入れる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[model-context-protocol|Model Context Protocol]]
- [[claude-code|Claude Code]]
- [[cursor|Cursor]]

## 出典

- [Context7](https://context7.com/)
- [upstash/context7](https://github.com/upstash/context7)
