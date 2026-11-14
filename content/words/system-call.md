---
title: システムコール
aliases: []
description: アプリケーションがカーネルにサービスを要求するための基本的なインタフェース
tags: [word, os]
date: 2026-11-14
---

## TL;DR

アプリケーションと OS のカーネルの間の基本的なインタフェース。プログラムは、カーネルが管理する機能をシステムコールで要求する。

## 仕組み

[syscalls(2) の man ページ](https://man7.org/linux/man-pages/man2/syscalls.2.html)によると、Linux のシステムコールはふつう直接呼び出さず、glibc などの C ライブラリのラッパー関数を通して呼び出す。多くのラッパーは引数をレジスタに置いてシステムコールを呼び、失敗したら `errno` を設定するだけの薄いものである。ラッパーのないシステムコールは `syscall(2)` で呼び出せる。

## 例

`open`、`read`、`write`、`close`、`mmap`、`fork`、`execve`、`exit`、`kill`、`getpid` などがある。glibc の `chdir()` は同じ名前の `chdir` システムコールを呼び出す。OS は[[process|プロセス]]を生成・開始・終了するシステムコールも提供している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[process|プロセス]]
- [[thread|スレッド]]
- [[futex|futex]]

## 出典

- [syscalls(2) - Linux manual page](https://man7.org/linux/man-pages/man2/syscalls.2.html)
