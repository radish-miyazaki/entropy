---
title: WaitGroup
aliases: [waitgroup]
description: Go で複数のゴルーチンの完了を待つための同期プリミティブ
tags: [word, go, 並列処理]
date: 2025-02-22
---

## TL;DR

[[go|Go]] で、複数の[[goroutine|ゴルーチン]]の完了を待つための[[synchronization-primitive|同期プリミティブ]]。`sync` パッケージの `WaitGroup` 構造体が提供する。

## 仕組み

`WaitGroup` は内部にカウンタを持ち、次のメソッドでそれを操作する。

- `Add(delta int)`: カウンタに `delta` を足す。`delta` は負でもよい
- `Done()`: カウンタを 1 減らす。`Add(-1)` と同じである
- `Wait()`: カウンタが 0 になるまでブロックする

カウンタが 0 になると、`Wait()` でブロックしていたゴルーチンがすべて再開する。Go 1.25 では、関数を新しいゴルーチンで実行し、そのタスクを `WaitGroup` に加える `Go(f func())` が追加された。`f` が返るとタスクは `WaitGroup` から外れる。公式ドキュメントは `Done()` よりも `Go()` を使うよう勧めている。

## 注意点

- カウンタが負になると、`Add` は panic する
- `WaitGroup` は一度使ったあとにコピーしてはいけない

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[synchronization-primitive|同期プリミティブ]]
- [[barrier|バリア]]
- [[semaphore|セマフォ]]

## 出典

- [sync package - Go Packages](https://pkg.go.dev/sync#WaitGroup)
