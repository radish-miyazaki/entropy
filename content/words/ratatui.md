---
title: Ratatui
aliases: []
description: Rust でターミナルの UI（TUI）を作るためのクレート
tags: [word, rust]
date: 2026-02-08
---

## TL;DR

[[rust|Rust]] で [[tui|TUI]] を作るためのクレート。

## なぜ必要か

公式サイトによると、Ratatui は高速で軽量な、表現力の高いターミナルの UI を作るためのライブラリである。描画は 1 ミリ秒未満で終わり、小さな tmux のペインでも大きなターミナルでも表示が崩れない。設計の段階でメモリ安全、スレッド安全、型安全になっている。

## 仕組み

C への依存がない純粋な Rust のライブラリで、イミディエイトモードで描画する。グラフ、スパークライン、表、ゲージ、スクロールできるリスト、プログレスバーなどのウィジェットが用意されている。レイアウトは制約で指定し、ターミナルの大きさに合わせて自動で調整される。`no_std` に対応しており、組み込み向けのターゲットでも使える。

## 例

[[cargo-generate]] 用の[テンプレート](https://github.com/ratatui/templates/)が用意されており、簡単にプロジェクトを作れる。

```sh
cargo generate ratatui/templates
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cargo-generate]]
- [[bubble-tea|Bubble Tea]]: Go で TUI を作るためのフレームワーク

## 出典

- [Ratatui（公式サイト）](https://ratatui.rs/)
- [ratatui/ratatui](https://github.com/ratatui/ratatui)
