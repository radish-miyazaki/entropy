---
title: チャネル
aliases: []
description: 並行に動く処理どうしが、決まった型の値を送受信して通信と同期を行う仕組み
tags: [word, go, 並行処理]
date: 2026-11-14
---

## TL;DR

並行に動く関数どうしが、決まった型の値を送受信して通信するための仕組み。[[go|Go]] では言語に組み込まれており、[[rust|Rust]] では標準ライブラリの `std::sync::mpsc` が同等の機能を提供している。

## なぜ必要か

[[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス 第1章 並行プログラミングへの第一歩|Go言語で学ぶ並行プログラミング 第1章]] によると、Go ではメモリ共有の基本操作（Mutex や[[condition-variable|条件変数]]）と、[[csp|CSP]] 方式のチャネルのどちらでもアプリケーションを組み立てられる。チャネルを使うと、分離された[[goroutine|ゴルーチン]]がチャネルで通信と同期を行うので、競合状態のリスクを減らせる。

## 仕組み

Go の言語仕様では、チャネル型を `chan T` と書く。`chan<- T` は送信専用、`<-chan T` は受信専用である。初期化していないチャネルの値は `nil` で、`nil` のチャネルは通信の準備が整うことがない。

チャネルは組み込み関数 `make` で作り、2 つ目の引数で容量（バッファの大きさ）を指定できる。容量が 0 か省略したときはバッファなしのチャネルになり、送信側と受信側の両方が揃ったときにだけ通信が成立する。バッファありのチャネルでは、バッファが満杯でなければ送信が、空でなければ受信がブロックせずに成功する。チャネルは FIFO のキューとして動き、送った順に値を受け取る。組み込み関数 `close` で閉じられる。

Rust の `std::sync::mpsc` は複数の送信側と 1 つの受信側を持つ FIFO のキューである。`channel` 関数はバッファに上限のないチャネルを、`sync_channel` 関数は決まった大きさのバッファを持つチャネルを返す。

## 例

```go
ch := make(chan int, 100)
```

チャネルの上に、[[pipeline-pattern|Pipeline パターン]]、[[fan-in-pattern|Fan-In パターン]]、[[fan-out-pattern|Fan-Out パターン]]、[[worker-pool-pattern|Worker Pool パターン]]、[[quit-channel-pattern|Quit channel パターン]]などのパターンが作られている。

## 注意点

[[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス 第11章 チャネルでのデッドロック|同書 第11章]] によると、[[deadlock|デッドロック]]は Mutex だけの問題ではなく、チャネルでも起こりうる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[csp|CSP]]
- [[goroutine|ゴルーチン]]
- [[semaphore|セマフォ]]
- [[deadlock|デッドロック]]

## 出典

- [The Go Programming Language Specification - Channel types](https://go.dev/ref/spec#Channel_types)
- [std::sync::mpsc - Rust](https://doc.rust-lang.org/std/sync/mpsc/index.html)
- [[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス 第1章 並行プログラミングへの第一歩|Go言語で学ぶ並行プログラミング 第1章 並行プログラミングへの第一歩]]
- [[Effective Rust 項目17 状態共有並列実行には気を付けよう|Effective Rust 項目17 状態共有並列実行には気を付けよう]]
