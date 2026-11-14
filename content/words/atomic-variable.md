---
title: アトミック変数
aliases: [atomic variable]
description: アトミック操作を保証する特別な変数
tags: [word, 並行処理]
date: 2025-03-09
---

## TL;DR

[[atomic-operation|アトミック操作]]を保証する特別な変数。

## なぜ必要か

`x = x + 1` のような通常の変数への操作は、複数の命令に分割される。そのため、[[thread|スレッド]]間で[[data-race|データ競合]]が起きることがある。アトミック変数を使えば、これを 1 つの操作として扱える。

## 例

複数のスレッドが同じカウンタを同時に更新する場面で使う。たとえば、アクセス回数やタスクの完了数を数えるときである。

[[go|Go]] の `sync/atomic` パッケージには、`atomic.Bool`、`atomic.Int64`、`atomic.Pointer[T]`、`atomic.Value` などのアトミックな型がある。`atomic.Int64` のゼロ値は 0 で、`Add` で値を足せる。

```go
var counter atomic.Int64
counter.Add(5)
n := counter.Add(3)
fmt.Println(n) // 8
```

## 注意点

Go のドキュメントは、`sync/atomic` を同期のアルゴリズムを実装するための低レベルの部品としており、正しく使うには細心の注意が要るとしている。特別な場面以外では、[[channel|チャネル]]や `sync` パッケージで同期するほうがよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[atomic|アトミック]]
- [[atomic-operation|アトミック操作]]
- [[data-race|データ競合]]

## 出典

- [atomic package - sync/atomic - Go Packages](https://pkg.go.dev/sync/atomic)
