---
title: 実例から学ぶ！モバイルアプリ開発における「AIの使いどころ」
description: Claude Code を中心にした iOS 開発の実例と、モバイルアプリから Web への横展開で使った Claude Code の実践術を紹介する勉強会
tags: [talk, ai]
date: 2025-08-26
speakers: []
company:
event: Findy 実例から学ぶ！モバイルアプリ開発における「AIの使いどころ」
held:
slide:
video:
---

## TL;DR

- iOS 開発でも、[[claude-code|Claude Code]] に実装タスクをすべて任せる開発が実践されている。
- Claude Code の実践術を積み重ねても、開発者ごとの活用度の差やレビューの負荷といった課題が残り、自社エージェントの開発で解決を図っている。

## 内容

### ふつうの AI 駆動 iOS 開発

現在は Claude Code と Xcode で開発している。プランは Max で、モデルは Opus に固定している。以前は [[cursor|Cursor]] や ChatGPT の Mac アプリを使い分けていた。実装タスクは基本的にすべて AI に任せている。[[model-context-protocol|MCP]] は今のところあまり使っていない。

以前は新しいツールをすべてキャッチアップしていた。しかし、AI による生産性向上で何を目指すかを決めて、優先順位をつけるとよい。

### モバイルアプリから Web への横展開を加速した話

Claude Code の実践術として、まず MCP の活用が紹介された。社内の Ubie UI MCP、Figma MCP、GitHub MCP を使っている（[記事](https://zenn.dev/ubie_dev/articles/f927aaff02d618)）。設計を重視するため、Plan Mode と UltraThink を組み合わせて開発する。リポジトリは、どのプロジェクトからもコンテキストを理解しやすい[[monorepo|モノレポ]]にしている。カスタムスラッシュコマンドも追加し、コードレビュー、フォーマット、PR の作成をさせたり、移行に必要なコンテキストを素早く理解させたりしている。溜まったコンテキストは `/clear` と `/compact` で解放する。

一方で、課題も残った。開発者によって活用の度合いに差が出る。並列実行するとコンテキストが足りなくなる。レビューや受け入れテストに時間がかかる。作業が特定の開発者に偏る。これらを解決するため、リファインメントから実装までを指示すると PR を作成してくれる自社エージェントを実装した。

## キーワード

- [[claude-code|Claude Code]]
- [[cursor|Cursor]]
- [[model-context-protocol|MCP]]
- [[monorepo|モノレポ]]

## 自分の理解

実装のフローは、Web 開発とそこまで変わらない。

## 関連

- [イベントのページ](https://findy.connpass.com/event/363471/)
