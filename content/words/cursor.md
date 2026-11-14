---
title: Cursor
aliases: []
description: AI がコードの作成や編集を支援するコーディングエージェント兼エディタ
tags: [word, ide, ai]
date: 2025-01-11
---

## TL;DR

AI がコードの作成や編集を支援するコーディングエージェントである。デスクトップの IDE のほか、CLI やクラウドでも使える。

## なぜ必要か

公式ドキュメントでは、Cursor を使う場面として次のものを挙げている。

- コードを理解する: リポジトリの各部分がどうつながっているかをたどり、手を付ける場所を探す
- 機能を計画して作る: Plan Mode で変更の範囲を決め、大きな作業を進める
- バグを見つけて直す: 問題を再現し、根本原因を絞り込み、修正を確かめる
- 変更をレビューする: 差分を確認し、チェックを実行して、マージ前に問題を見つける

## 仕組み

公式サイトでは、次の使い方が紹介されている。

- デスクトップアプリ: IDE の画面で、AI がコードの作成や編集を支援する
- CLI: ターミナルから同じエージェント機能を使う
- クラウドエージェント: 複数のエージェントを並行して動かし、実装からテストまで任せる
- 連携: Slack でのやり取りや、GitHub のプルリクエストのレビューに対応する

使う AI モデルは、GPT、Claude、Gemini などから用途に合わせて選べる。

プラグイン、スキル、MCP、ルールを追加して Cursor をカスタマイズできる。GitHub、GitLab、Slack、Linear などのツールとも連携する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[windsurf|Windsurf]]
- [[codeium]]
- [[devin|Devin]]
- [[alloy|Alloy]]: Cursor と組み合わせて仕様を検証する活用事例がある

## 出典

- [Cursor](https://www.cursor.com/)
- [Cursor チュートリアル](https://cursorpractice.com/ja/cursor-tutorials)
- [Cursor Docs](https://cursor.com/docs)
