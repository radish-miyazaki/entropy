---
title: Claude Code
aliases: []
description: Anthropic が開発している、コードベースを読み、ファイルを編集し、コマンドを実行するエージェント型のコーディングツール
tags: [word, ai, コーディングエージェント]
date: 2026-11-14
---

## TL;DR

Anthropic が開発している、エージェント型のコーディングツール。コードベースを読み、ファイルを編集し、コマンドを実行し、開発ツールと連携する。ターミナル、IDE、デスクトップアプリ、ブラウザで使える。

## なぜ必要か

公式ドキュメントによると、自然言語で作りたいものを伝えると、Claude Code が方針を立て、複数のファイルにまたがるコードを書き、動くことを確かめる。テストを書く、リントのエラーを直す、マージのコンフリクトを解く、依存を更新するといった、後回しにしがちな作業も任せられる。git を直接扱い、コミットやプルリクエストも作れる。

## 仕組み

- `CLAUDE.md`: プロジェクトのルートに置く Markdown ファイルで、Claude Code がセッションの開始時に読む。コーディング規約や設計の決定を書いておく
- [[model-context-protocol|MCP]]: 外部のデータソースやツールにつなぐためのオープンな標準。Google Drive の設計書を読んだり、Jira のチケットを更新したりできる
- skills と hooks: 繰り返す作業を skills としてまとめたり、Claude Code の操作の前後にシェルのコマンドを実行したりできる
- サブエージェント: 複数のエージェントにタスクの別々の部分を同時に進めさせられる

Unix の哲学に従っていて、`claude -p` でログをパイプで渡したり、CI で動かしたりもできる。

## 例

[[serena-claude-code|Serena を導入し、Claude Code と連携させる]] では、[[serena|Serena]] の MCP サーバを `claude mcp add` で登録した。[[git-worktree|git worktree]] を使うと、Claude Code を並列に動かしやすくなる。

## 注意点

[[openai-codex-cli|Codex CLI]] や [[gemini-cli|Gemini CLI]] と違い、Claude Code は OSS ではない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[gemini-cli|Gemini CLI]]
- [[openai-codex-cli|Codex CLI]]
- [[model-context-protocol|MCP]]
- [[context7|Context7]]
- [[vibe-kanban|Vibe Kanban]]

## 出典

- [Claude Code overview - Claude Code Docs](https://code.claude.com/docs/en/overview)
- [[openai-codex-cli|OpenAI Codex CLI]]
