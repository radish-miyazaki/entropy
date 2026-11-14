---
title: Mastra
aliases: [mastra]
description: AI エージェントとワークフローを作るための、オープンソースの TypeScript フレームワーク
tags: [word, typescript, ai-agent, framework]
date: 2025-03-17
---

## TL;DR

AI エージェントとワークフローを作るための、オープンソースの [[typescript|TypeScript]] フレームワーク。

## 仕組み

公式サイトでは、主に次の機能が挙げられている。

- エージェント: モデルを選び、指示を書き、ツールをつなぐと、エージェントが外部のシステムを操作できる
- ワークフロー: 型の付いたステップ、分岐、リトライで、決まった順序の処理を組む。人間の入力を待って一時停止し、後から再開できる
- メモリ: 会話をまたいでコンテキストを保持する
- 評価（Evals）: エージェントの出力や振る舞いを、コードやモデルによる判定で採点する
- MCP: エージェントやツールを公開する [[model-context-protocol|MCP]] サーバを作れる

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[model-context-protocol|Model Context Protocol]]
- [[typescript|TypeScript]]

## 出典

- [Mastra](https://mastra.ai/)
- https://zenn.dev/serinuntius/books/4346a0fc6818f3
