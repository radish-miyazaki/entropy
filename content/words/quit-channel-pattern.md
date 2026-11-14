---
title: Quit channel pattern
aliases: []
description: 共有のチャネルを閉じることで、複数のゴルーチンに処理の終了を一斉に伝える Go のパターン
tags: [word, go, 並列処理]
date: 2025-03-01
---

## TL;DR

共有の[[channel|チャネル]]（`done` チャネル）を閉じることで、複数の[[goroutine|ゴルーチン]]に処理の終了を一斉に伝える [[go|Go]] のパターン。

## なぜ必要か

[[pipeline-pattern|Pipeline pattern]] で下流が途中で受信をやめると、上流のゴルーチンは送信でブロックしたままになり、リソースがリークする。明示的に終了を伝える手段が必要になる。

## 仕組み

閉じたチャネルからの受信は、すぐに要素型のゼロ値を返して進む。そのため、`done` チャネルを閉じることは、全ゴルーチンへのブロードキャストとして働く。各ステージは送信と一緒に `done` からの受信を `select` で待ち、`done` が閉じられたらすぐに return する。`main` で `defer close(done)` と書けば、どの経路で return しても終了が伝わる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[pipeline-pattern|Pipeline pattern]]

## 出典

- [Go Concurrency Patterns: Pipelines and cancellation - The Go Programming Language](https://go.dev/blog/pipelines)
