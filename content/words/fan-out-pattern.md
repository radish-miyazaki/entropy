---
title: Fan-Out pattern
aliases: []
description: 複数のゴルーチンが 1 つのチャネルから読み込み、処理を分担するデザインパターン
tags: [word, go, 並列処理]
date: 2025-02-28
---

## TL;DR

複数の[[goroutine|ゴルーチン]]が、1 つの[[channel|チャネル]]から読み込む[[design-pattern|デザインパターン]]。

## 仕組み

Go の公式ブログでは、チャネルが閉じられるまで複数の関数が同じチャネルから読み込むことを fan-out と呼んでいる。1 つの入力を複数のワーカーで分け合うことで、CPU や I/O を使う処理を分散できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fan-in-pattern|Fan-In pattern]]: 逆に、複数のチャネルを 1 つのチャネルに集約する
- [[pipeline-pattern|Pipeline pattern]]
- [[worker-pool-pattern|Worker Pool pattern]]

## 出典

- [[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス]]
- [Go Concurrency Patterns: Pipelines and cancellation - The Go Programming Language](https://go.dev/blog/pipelines)
- https://ornlu-is.github.io/go_fan_out_pattern/
