---
title: Bubble Tea
aliases: []
description: The Elm Architecture に基づいて TUI を作る Go のフレームワーク
tags: [word, go]
date: 2025-07-25
---

## TL;DR

TUI を作るための [[go|Go]] のフレームワーク。The Elm Architecture に基づいている。

## 仕組み

アプリケーションは、状態を表す Model と、Model が持つ 3 つのメソッドで構成される。

- `Init`: アプリケーションの初期化で実行する Command（`Cmd`）を返す
- `Update`: Message（`Msg`）を処理して Model を更新する
- `View`: Model の現在の状態から UI を文字列として描画する

`Msg` はキー入力やタイマー、サーバからの応答など「何かが起きた」ことを表す。`Update` も `Cmd` を返して、さらに処理を起こせる。

よく使う UI コンポーネント（テキスト入力、ビューポート、スピナーなど）は、[Bubbles](https://github.com/charmbracelet/bubbles) というライブラリで提供されている。

## 例

採用実績も多く、Microsoft、Daytona、Cockroach Labs、NVIDIA など、1 万を超えるアプリケーションで使われているらしい。

- [チュートリアル](https://github.com/charmbracelet/bubbletea?tab=readme-ov-file#tutorial)
- [Commands のチュートリアル](https://github.com/charmbracelet/bubbletea/tree/main/tutorials/commands/)
- [サンプル](https://github.com/charmbracelet/bubbletea/tree/main/examples)

## 自分の理解

個人的な推しポイントである。Go を書きながら TEA（The Elm Architecture）も学べる、よくばりセットである。書いていて気づいたが、Bubble Tea の Tea は The Elm Architecture から取っているのだろう。

## 関連

- The Elm Architecture
- [[elm|Elm]]
- [[go|Go]]

## 出典

- [charmbracelet/bubbletea](https://github.com/charmbracelet/bubbletea)
