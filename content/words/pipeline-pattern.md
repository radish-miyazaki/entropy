---
title: Pipeline pattern
aliases: []
description: チャネルでつないだ一連のステージでデータを順に処理する、Go の並行処理のパターン
tags: [word, go, 並列処理]
date: 2025-02-28
---

## TL;DR

[[channel|チャネル]]でつないだ一連のステージで、データを順に処理する [[go|Go]] の並行処理のパターン。

## 仕組み

Go の公式ブログによると、Go にパイプラインの正式な定義はない。くだけて言えば、チャネルでつながった一連のステージである。各ステージは同じ関数を実行する[[goroutine|ゴルーチン]]の集まりで、上流から値を受け取って処理し、結果を下流へ送る。最初のステージをソース、最後のステージをシンクと呼ぶ。

各ステージは、すべての送信を終えたら出力チャネルを閉じ、入力チャネルが閉じられるまで受信を続ける。そのため、ステージは `range` ループで書け、いくつでもつなげられる。

ステージの間では、[[fan-out-pattern|Fan-Out pattern]] で処理を複数のゴルーチンに分けたり、[[fan-in-pattern|Fan-In pattern]] で結果を 1 つのチャネルにまとめたりできる。

## 注意点

下流のステージが途中で受信をやめると、上流のゴルーチンは送信でブロックしたままになり、リソースがリークする。これを防ぐには、[[quit-channel-pattern|Quit channel pattern]] のように、`done` チャネルを閉じて全ステージに終了を伝える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fan-in-pattern|Fan-In pattern]]
- [[fan-out-pattern|Fan-Out pattern]]
- [[quit-channel-pattern|Quit channel pattern]]
- [[tee-channel-pattern|Tee channel pattern]]

## 出典

- [Go Concurrency Patterns: Pipelines and cancellation - The Go Programming Language](https://go.dev/blog/pipelines)
