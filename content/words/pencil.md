---
title: Pencil
aliases: []
description: 開発環境の中で AI エージェントと一緒にデザインできるベクターデザインツール。現在の名前は pen.dev
tags: [word, ai]
date: 2026-02-07
---

## TL;DR

> Design as Code

開発環境に組み込んで使うベクターデザインツール。AI エージェントと一緒にキャンバス上でデザインできる。現在は pen.dev に名前が変わっている。

## なぜ必要か

デザインと開発を同じ環境に置くことで、両者の間の溝を埋める。コンポーネントをデザインしてコードと同期し、AI アシスタントに一貫性を保たせる。

## 仕組み

IDE の中で使えるほか、デスクトップアプリや、GUI なしで使える CLI もある。デザインは `.pen` という JSON の形式で保存され、スキーマが公開されているので、エージェントが直接扱える。MCP を通して [[cursor|Cursor]] や Claude Code、Codex などのエージェントからデザインできる。フレームは HTML と CSS（Tailwind）に書き出せる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[model-context-protocol|Model Context Protocol]]

## 出典

- [pen.dev（旧 pencil.dev）](https://www.pencil.dev/)
- [pen.dev ドキュメント](https://docs.pencil.dev/)
