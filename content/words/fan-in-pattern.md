---
title: Fan-In pattern
aliases: []
description: 複数のゴルーチンの結果（入力チャネル）を 1 つの出力チャネルに集約するデザインパターン
tags: [word, go, 並列処理]
date: 2025-02-26
---

## TL;DR

複数の[[goroutine|ゴルーチン]]の結果（入力[[channel|チャネル]]）を、1 つの出力チャネルに集約する[[design-pattern|デザインパターン]]。分散して処理したデータを集計するときなどに役立つ。

## 仕組み

Go の公式ブログでは、複数の入力チャネルを 1 つのチャネルに多重化し、すべての入力が閉じたらそのチャネルを閉じる関数として説明されている。例として、入力チャネルごとにゴルーチンを立てて出力チャネルへ値を送り、[[waitgroup|WaitGroup]] で全部の送信が終わるのを待ってから出力チャネルを閉じる `merge` 関数が示されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fan-out-pattern|Fan-Out pattern]]: 逆に、1 つのチャネルから複数のゴルーチンが読み込む
- [[pipeline-pattern|Pipeline pattern]]
- [[tee-channel-pattern|Tee channel pattern]]

## 出典

- [[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス]]
- [Go Concurrency Patterns: Pipelines and cancellation - The Go Programming Language](https://go.dev/blog/pipelines)
- https://qiita.com/y-t0910/items/7549f3379b024fdedae1
- https://ittrip.xyz/go/go-channel-patterns#index_id9
- https://ornlu-is.github.io/go_fan_in_pattern/
