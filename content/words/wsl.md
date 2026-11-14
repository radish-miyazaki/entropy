---
title: WSL
aliases: [Windows Subsystem for Linux]
description: 仮想マシンやデュアルブートなしで、Windows 上で Linux 環境を動かす Windows の機能
tags: [word, windows, linux]
date: 2025-05-30
---

## TL;DR

Windows Subsystem for Linux の略。別の仮想マシンやデュアルブートを用意せずに、Windows 上で Linux 環境を動かせる Windows の機能である。

## なぜ必要か

Windows と Linux の両方を同時に使いたい開発者のために作られている。Ubuntu や Debian などのディストリビューションを入れ、Bash や `grep`、`sed` などのコマンド、vim や tmux などのツール、各種言語の処理系やデータベースを Linux 上でそのまま使える。Unix 系のシェルから Windows のアプリケーションを呼び出すこともできる。

## 仕組み

現在の既定は WSL 2 である。WSL 2 は軽量な仮想マシンの中で本物の Linux カーネルを動かし、各ディストリビューションはその中で隔離されたコンテナとして動く。以前の WSL 1 と比べて、ファイルシステムの性能が上がり、システムコールと完全に互換になった。

ディストリビューションごとに WSL 1 と WSL 2 を選べ、いつでも切り替えられる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [What is Windows Subsystem for Linux - Microsoft Learn](https://learn.microsoft.com/en-us/windows/wsl/about)
