---
title: Warp
aliases: []
description: ターミナル、コーディングエージェント、クラウドでの自動化を組み合わせたオープンソースの開発環境
tags: [word, terminal]
date: 2026-11-14
---

## TL;DR

ターミナル、コーディングエージェント、クラウドでの自動化を組み合わせた開発環境。公式ドキュメントでは、オープンソースの Agentic Development Environment と説明されている。

## 仕組み

公式ドキュメントによると、Warp は次の要素からなる。

- Warp ターミナル: コマンドの実行、コードの編集、エージェントとの作業を行うデスクトップアプリ。エージェントの変更を確認するコードビューもある
- Warp Agent: 問題の調査、コードの編集、コマンドの実行など、複数の手順からなる作業を手伝う。Warp ターミナルからも、別のターミナルで Warp Agent CLI からも使える
- Automation Platform: スケジュール、外部サービスとの連携、API をきっかけに、Issue の振り分けやプルリクエストのレビューなどをクラウドのエージェントに任せる

ターミナルでは、コマンドとその出力が Block という 1 つの単位にまとまる。Block ごとに、コマンドや出力だけをコピーしたり、コマンドを再実行したり、出力の中を検索したりできる。

## 注意点

[[warp-to-ghostty|Warp から Ghostty に移行するメモ]] では、マルチバイト文字が認識されないことや、AI 関連など使わない機能が多いことを理由に、Ghostty に移行している。Warp の機能が Oh My Zsh のプラグインと衝突したこともあったという。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Warp Documentation](https://docs.warp.dev/)
- [Blocks - Warp Documentation](https://docs.warp.dev/terminal/blocks)
- [[warp-to-ghostty|Warp から Ghostty に移行するメモ]]
