---
title: OpenHands
aliases: []
description: コーディングエージェントやオートメーションを自分の環境で動かすための OSS
tags: [word, oss, ai]
date: 2025-02-27
---

## TL;DR

[[ai-coding-agent|コーディングエージェント]]やオートメーションを動かすための、開発者向けの OSS。MIT ライセンスで GitHub に公開されている。

## 仕組み

README では、コーディングエージェントを、セルフホストで常に動いているエンジニアリングチームのように使えるものとして紹介されている。OpenHands 自身のエージェントのほか、Claude Code、Codex、Gemini など、Agent Client Protocol（ACP）に対応したエージェントを使える。エージェントはローカルでも、リモートやクラウドのバックエンドでも動かせる。

公式ドキュメントによると、OpenHands は、ブラウザから使うクライアントの Agent Canvas、コードを扱うエージェントを作るための Python ライブラリの Software Agent SDK、エージェントの実行を REST と WebSocket の API で提供する Agent Server、マネージドサービスの OpenHands Cloud などからなる。以前の CLI と、`openhands serve` で起動するローカルの GUI は非推奨になっていて、ローカルで使うなら Agent Canvas が勧められている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[devin|Devin]]
- [[cursor|Cursor]]

## 出典

- [All-Hands-AI/OpenHands - GitHub](https://github.com/All-Hands-AI/OpenHands)
- [Introduction - OpenHands Docs](https://docs.openhands.dev/overview/introduction)
