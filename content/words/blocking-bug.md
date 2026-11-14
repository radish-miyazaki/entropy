---
title: ブロッキングバグ
aliases: []
description: ゴルーチンが処理を進めるのを妨げるバグ
tags: [word, golang]
date: 2024-04-11
---

## TL;DR

[[goroutine|ゴルーチン]]が処理を進めるのを妨げるバグ。[[go|Go]] の並行処理のバグを調査した論文「Understanding Real-World Concurrency Bugs in Go」に出てくる言葉である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Understanding Real-World Concurrency Bugs in Go](https://songlh.github.io/paper/go-study.pdf)
