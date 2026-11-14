---
title: TUI
aliases: [テキストユーザインタフェース]
description: 文字を表示する画面で出力・操作するユーザインタフェース。ターミナルの画面全体を使う
tags: [word, ターミナル]
date: 2026-11-14
---

## TL;DR

文字を表示する画面に出力し、そこで操作するユーザインタフェース。テキストユーザインタフェース、またはターミナルユーザインタフェースの略である。

## なぜ必要か

ターミナルの中で、[[gui|GUI]] に近い操作感を得られる。Wikipedia によると、TUI は画面全体を使い、色やマウス入力、罫線文字によるレイアウトも扱える。行ごとに入力と出力をやり取りする CLI とは違い、TUI は画面全体を占有し、利用者は画面の中を移動して操作する。

## 仕組み

プログラムは普通、curses などの API を通じて画面にアクセスする。カーソルの移動や色の変更には、ANSI X3.64 で定められたエスケープシーケンスを使う。Unix 系の OS では、curses、[[ncurses|ncurses]]、S-Lang などのライブラリで作られることが多い。現在はターミナルエミュレータの中で動かすのが一般的である。

## 例

Wikipedia では、Vim、メールクライアントの mutt、ファイルマネージャの Midnight Commander、Web ブラウザの lynx や w3m などが挙げられている。ほかに、[[rust|Rust]] で TUI を作る [[ratatui|Ratatui]]、TUI のデータベース管理ツール [[lazysql|Lazysql]]、ターミナル上の Web ブラウザ [[browsh|browsh]] がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[gui|GUI]]
- [[ncurses|ncurses]]
- [[ratatui|Ratatui]]
- [[bubble-tea|Bubble Tea]]

## 出典

- [Text-based user interface - Wikipedia](https://en.wikipedia.org/wiki/Text-based_user_interface)
