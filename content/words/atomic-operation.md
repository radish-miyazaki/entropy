---
title: アトミック操作
aliases: [atomic operation]
description: 分割できない（アトミックな）単一の操作
tags: [word, 並行処理]
date: 2025-03-09
---

## TL;DR

分割できない（[[atomic|アトミック]]な）単一の操作。[[go|Go]] では [sync/atomic](https://pkg.go.dev/sync/atomic@go1.24.1) パッケージにまとまっている。

## なぜ必要か

整数などの単純な変数の値を更新するだけなら、[[mutex|mutex]] を使うより効率よく処理できる。mutex は、プログラムの一部を逐次処理にしてしまうからである。

## 例

Go で、通常の加算とアトミック操作による加算を比べたベンチマーク。

```go
var total = int64(0)

func BenchmarkNormal(bench *testing.B) {
	for range bench.N {
		total += 1
	}
}

func BenchmarkAtomic(bench *testing.B) {
	for range bench.N {
		atomic.AddInt64(&total, 1)
	}
}
```

```sh
$ go test -bench=. -count 3
goos: darwin
goarch: arm64
pkg: listing12_3
cpu: Apple M2 Max
BenchmarkNormal-12    	538361530	         1.987 ns/op
BenchmarkNormal-12    	606458019	         1.965 ns/op
BenchmarkNormal-12    	603949323	         1.975 ns/op
BenchmarkAtomic-12    	308510485	         3.907 ns/op
BenchmarkAtomic-12    	303942386	         3.967 ns/op
BenchmarkAtomic-12    	307332045	         3.837 ns/op
PASS
ok  	listing12_3	9.182s
```

アトミック操作は、通常の加算のおよそ 2 倍の時間がかかっている。

## 注意点

アトミック操作では、複数の変数を同時に更新できない。

また、通常の方法で変数を更新するほうが、アトミック操作よりはるかに速い。アトミック操作では、コンパイラや CPU の最適化が効かなくなるからである。

たとえば CPU は、よくアクセスする変数をキャッシュに置いて処理を速くする。キャッシュの容量には限りがあるので、必要に応じて変数の内容をメインメモリに書き戻す（フラッシュする）。一方アトミック操作では、並列に動く他の[[thread|スレッド]]が、変数の更新を確実に確認できなければならない。そのため CPU はキャッシュの一貫性（キャッシュコヒーレンシ）を保つ必要があり、メインメモリに書き戻したり、他の CPU がキャッシュしているデータを無効にしたりする。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[atomic|アトミック]]
- [[atomic-variable|アトミック変数]]
- [[mutex|mutex]]
- [[spinlock|スピンロック]]

## 出典

- [sync/atomic](https://pkg.go.dev/sync/atomic@go1.24.1)
