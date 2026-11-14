---
title: Serena
aliases: []
description: LSP を使ったシンボル単位のコード解析・編集ツールを提供し、LLM をコードベース上で動くコーディングエージェントにするツールキット
tags: [word, claude-code]
date: 2025-08-01
---

## TL;DR

[[llm|LLM]] を、コードベース上で直接作業できる[[ai-agent|エージェント]]として振る舞わせるための OSS のツールキット。IDE のようなセマンティックなコード検索・編集の機能を LLM に与える。

> Serena is a powerful coding agent toolkit capable of turning an LLM into a fully-featured agent that works directly on your codebase.

## なぜ必要か

[[claude-code|Claude Code]] のパフォーマンス低下が話題になったことをきっかけに注目された。Serena はコードをシンボル単位で理解し、関連するコードだけを扱うので、トークンの消費量を抑えられる。OSS なので、API キーやサブスクリプションもいらない。

## 仕組み

コードのエンティティをシンボル単位で取り出し、その関係を使って効率よく作業する。

> Serena provides essential semantic code retrieval and editing tools that are akin to an IDE's capabilities, extracting code entities at the symbol level and exploiting relational structure.

言語の解析には [[language-server-protocol|LSP]] を使う。そのため [[python|Python]]、[[typescript|TypeScript]]、[[javascript|JavaScript]]、PHP、[[go|Go]]、[[rust|Rust]]、C#、Java、[[elixir|Elixir]]、[[clojure|Clojure]]、C/C++ など多くの言語に対応している。[[ruby|Ruby]]、[[kotlin|Kotlin]]、Dart は直接は対応していないが使える。

[[model-context-protocol|MCP]] サーバとして使えるので、Claude Code、Claude Desktop、[[visual-studio-code|Visual Studio Code]]、[[cursor|Cursor]]、IntelliJ など、さまざまな IDE や拡張機能、エージェントフレームワークと連携できる。プロジェクトの分析から[[design|設計]]、新しいコンポーネントの作成、[[refactoring|リファクタリング]]、テスト、バージョン管理まで、幅広いタスクを自律的にこなせる。

## 例

- [[serena-claude-code|Serena を導入し、Claude Code と連携させる]]

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[claude-code|Claude Code]]
- [[model-context-protocol|Model Context Protocol]]
- [[language-server-protocol|Language Server Protocol]]

## 出典

- [oraios/serena](https://github.com/oraios/serena)
- https://zenn.dev/sc30gsw/articles/ff81891959aaef
- https://note.com/engineers_hub/n/n5d3ad3f617d6
