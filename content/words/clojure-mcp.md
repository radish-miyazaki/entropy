---
title: Clojure MCP
aliases: []
description: プロジェクトで動いている nREPL にコーディングエージェントをつなぐ MCP サーバ
tags: [word, clojure]
date: 2025-08-28
---

## TL;DR

プロジェクトで動いている nREPL に、[[claude-code|Claude Code]] や [[openai-codex-cli|Codex]] などのコーディングエージェントをつなぐ [[model-context-protocol|MCP]] サーバ。エージェントが [[clojure|Clojure]] の REPL と持続的な接続を持てるようにする。

## 仕組み

中心になるのは REPL との連携で、次のツールを提供する。

- `clojure_eval`: 持続的な nREPL の接続でコードを評価する。評価の前に、閉じ忘れなどで対応の取れていない括弧を直す
- `list_nrepl_ports`: マシン上で動いている nREPL サーバを見つけ、エージェントが REPL を切り替えられるようにする
- `paren_repair`: テキストの編集では直しにくい括弧の問題を直す

推奨の設定は `:repl` プロファイルである。以前は構造を理解する独自の編集ツール（`clojure_edit` など）も提供していた。しかし最新のモデルは Claude Code や Codex の組み込みのエディタで Clojure を確実に編集できるようになったため、これらは保守のみの状態で、いずれ廃止される予定である。

## 例

- [[try-clojure-mcp|Clojure MCP を触ってみる]]

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]
- [[model-context-protocol|Model Context Protocol]]
- [[repl-driven-development|REPL駆動開発]]

## 出典

- [bhauman/clojure-mcp](https://github.com/bhauman/clojure-mcp)
