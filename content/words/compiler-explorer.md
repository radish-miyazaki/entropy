---
title: Godbolt compiler explorer
aliases: [Compiler Explorer, Godbolt]
description: コンパイラが生成するアセンブリコードをブラウザで確認できるツール
tags: [word, アセンブリ]
date: 2025-01-13
---

## TL;DR

コンパイラが生成するアセンブリコードを分析するためのツールである。ソースコードがどのような命令に変換されるかを見ることで、コンパイラがどの程度の最適化をしているかを確かめられる。

## 仕組み

公式の README によると、C、C++、C#、F#、[[rust|Rust]]、Go、Haskell、Swift、Python、Java など 30 を超える言語のコードを編集すると、コンパイル後の姿をリアルタイムで見られる。コンパイルは Web サイト側で行うので、手元にツールチェーンを用意しなくてよい。言語ごとに複数のコンパイラを選べ、画面のレイアウトも変えられる。

2012 年に、C++ の構文がどのようなアセンブリに対応するかを見せるために始まった。最初は、`tmux` の片方のペインで `vi` を、もう片方で `watch gcc -S foo.cc -o -` を動かすだけのものだった。Node.js で動く TypeScript のアプリケーションなので、自分の環境で動かすこともできる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[llvm|LLVM]]

## 出典

- [Compiler Explorer](https://godbolt.org/)
- [compiler-explorer/compiler-explorer - GitHub](https://github.com/compiler-explorer/compiler-explorer)
