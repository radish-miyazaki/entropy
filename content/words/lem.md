---
title: Lem
aliases: []
description: Common Lisp で実装されたテキストエディタ / IDE
tags: [word, common-lisp, エディタ]
date: 2024-09-14
---

## TL;DR

[[common-lisp|Common Lisp]] で実装されたテキストエディタ / IDE。設定も Common Lisp で書ける。

## 仕組み

Common Lisp の IDE という位置づけだが、[[language-server-protocol|LSP]] のサーバを用意すれば、他の多くの言語の開発にも使える。画面の描画には [[ncurses]] 版と [[sdl2|SDL2]] 版がある。

公式サイトによると、多くの言語は Lem に組み込まれた LSP の対応で使える。バージョン 2.0 からは webview か SDL2 を使った GUI 版があり、グラフィックスやマウス操作、180 以上のカラーテーマが使える。SDL2 版は、いずれ webview 版に置き換わる予定である。

Lisp の開発向けには、REPL と対話的なデバッガ、Paredit を備える。エディタを動かしたまま Common Lisp で拡張できる。Emacs や Vim から来た人もなじみやすいとされている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[common-lisp|Common Lisp]]
- [[ncurses]]
- [[sdl2|SDL2]]
- [[language-server-protocol|LSP]]

## 出典

- [Lem](https://lem-project.github.io/)
