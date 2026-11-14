---
title: コーディングエージェント
aliases: [AI コーディングエージェント]
description: コードベースを読み、ファイルを編集し、コマンドを実行してソフトウェア開発の作業を進める AI エージェント
tags: [word, ai]
date: 2026-11-14
---

## TL;DR

ソフトウェア開発の作業を自律的に進める [[ai-agent|AI エージェント]]。コードベースを読み、複数のファイルを編集し、コマンドを実行して、機能の実装やバグの修正を行う。

## なぜ必要か

チャットで質問に答えるだけの AI と違い、コードを書くところから実行やテストで確かめるところまでを任せられる。2025 年 8 月には New York 誌が、ソフトウェア開発を AI エージェントの最も代表的な用途と評した。2025 年 10 月の時点で、AI のビジネス用途の中心はコーディングエージェントとカスタマーサポートだった。

## 仕組み

Claude Code の公式ドキュメントでは、Claude Code を、コードベースを読み、ファイルを編集し、コマンドを実行し、開発ツールと連携するエージェント型のコーディングツールと説明している。やりたいことを自然言語で伝えると、進め方を計画し、複数のファイルにまたがってコードを書き、動くことを確かめる。テストの追加、lint エラーの修正、コミットやプルリクエストの作成も任せられる。外部のツールとは [[model-context-protocol|Model Context Protocol]] でつなぐ。

## 例

- ターミナルで動くもの: Claude Code、[[gemini-cli|Gemini CLI]]、[[openai-codex-cli|OpenAI Codex CLI]]
- IDE: [[cursor|Cursor]]
- 自律型のサービスや OSS: [[devin|Devin]]、[[openhands|OpenHands]]

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ai-agent|AI エージェント]]
- [[devin|Devin]]
- [[openhands|OpenHands]]

## 出典

- [AI agent - Wikipedia](https://en.wikipedia.org/wiki/AI_agent)
- [Claude Code overview - Claude Code Docs](https://code.claude.com/docs/en/overview)
