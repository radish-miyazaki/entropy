---
title: VIBE-KANBAN
aliases: [Vibe Kanban]
description: 複数の AI コーディングエージェントを並列に動かし、カンバン形式で計画とレビューを管理するツール
tags: [word]
date: 2025-10-03
---

## TL;DR

複数の AI コーディングエージェントを並列に動かして管理するためのツール。カンバン形式のボードで、人間が計画とレビューを行う。

## なぜ必要か

エージェントがコードを書くようになると、ボトルネックは人間による計画とレビューになる。Vibe Kanban は、その作業をボードに集めて進めやすくする。

## 仕組み

公式サイトによると、[[claude-code|Claude Code]]、[[openai-codex-cli|Codex]]、OpenCode などのエージェントを切り替えながら並列に動かせる。タスクごとに [[git-worktree|git worktree]] を作ってセットアップのスクリプトを実行し、生成されたコードの差分にコメントしてレビューできる。開発サーバを起動し、組み込みのブラウザで動作を確かめることもできる。

`npx vibe-kanban` で起動する。

## 注意点

公式サイトでは、提供を終了（sunsetting）し、今後はコミュニティが保守する OSS として続けると告知されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[git-worktree|git worktree]]
- [[claude-code|Claude Code]]

## 出典

- [Vibe Kanban](https://www.vibekanban.com/)
