---
title: ncurses
aliases: []
description: TUI を実装するために必要最低限の API を提供するライブラリ
tags: [word, unix]
date: 2024-09-14
---

## TL;DR

[[tui|TUI]] を実装するために必要最低限の API を提供するライブラリ。ウィンドウの分割、テキストの色付け、カーソル位置の制御などができる。

## なぜ必要か

軽量なので、サーバ環境やリモート接続で使うのに向いている。クロスプラットフォームで、ほとんどの Unix 系システムで利用できる。

## 仕組み

ncurses のマニュアルによると、ncurses は「new curses」の略で、System V Release 4 と 4.4BSD の curses ライブラリの後継である。端末に依存しない形で、キーボードやマウスからの入力と、文字セル単位の画面への出力を扱える。端末の機能は terminfo のデータベースから読む。

変更のたびに画面を描き直すのではなく、`refresh` が呼ばれたときに、前の画面から新しい画面に変えるのに必要な最小限の操作を計算する。画面の内容は、文字セルの長方形であるウィンドウと、画面より大きくできるパッドで管理する。重なったウィンドウを扱う panel、フォームを作る form、メニューを作る menu の各ライブラリも付属している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[sdl2|SDL2]]
- [[lem|Lem]]: ncurses 版が提供されている

## 出典

- [ncurses - Wikipedia](https://ja.wikipedia.org/wiki/Ncurses)
- [Announcing ncurses](https://invisible-island.net/ncurses/announce.html)
- [ncurses(3x) - Linux manual page](https://man7.org/linux/man-pages/man3/ncurses.3x.html)
