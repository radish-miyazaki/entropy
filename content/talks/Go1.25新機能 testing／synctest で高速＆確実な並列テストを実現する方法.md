---
title: Go1.25新機能 testing/synctest で高速＆確実な並列テストを実現する方法
description: testing/synctest の bubble と durably blocked の仕組みで、非同期処理のテストを速く確実に書く方法の解説
tags: [talk, go]
date: 2025-09-28
speakers: []
company:
event: "[[Go Conference 2025]]"
held: 2025-09-28
slide:
video:
---

## TL;DR

- `testing/synctest` は、bubble と呼ばれる環境の中で偽の時計を使い、非同期処理のテストを待ち時間なしで確実に実行する。
- bubble 内のすべてのゴルーチンが durably blocked になると時刻が進む。`Wait` で非同期処理が落ち着くのを待ってから検証する。

## 内容

### 導入の経緯

非同期処理のテストは難しい。`time.Sleep` で待つとテストに時間がかかり、待ち時間が足りないと [[flaky-test|Flaky test]] になりやすい。この問題を解決するために、Go 1.24 で `testing/synctest` パッケージが導入された。

### Test 関数

処理を待つ時間は無駄なので、短くしたい。これを実現するのが `synctest.Test` 関数である。`Test` は、渡された関数を bubble の中で実行する。すべてのゴルーチンがブロックされ、タイマーもスケジュールされていなければ panic を起こす。

bubble 内の時刻は偽の時計（fake clock）で、UTC の 2000-01-01 から始まる。**bubble 内のすべての[[goroutine|ゴルーチン]]が durably blocked になると、bubble 内の時刻が進む。** `time.Sleep` や[[channel|チャネル]]の送受信は、ゴルーチンを durably blocked にする。これらを bubble の外から操作すると panic になる。

### Wait 関数

非同期処理の完了を確かめてから検証するには、`synctest.Wait` を使う。`Wait` は、現在の bubble 内で、呼び出したゴルーチン以外のすべてのゴルーチンが durably blocked になるまでブロックする。ゴルーチンの終了を待つわけではない点に注意する。bubble の外から呼んだり、同じ bubble 内の 2 つのゴルーチンから同時に呼んだりすると panic になる。

### Go 1.24 からの変更点

- `Run` が `Test` になり、引数で `*testing.T` を受け取れるようになった。
- bubble のルートゴルーチンが終了したら、時刻の進行を止めるようになった。
- スタックトレースが改善された。

## キーワード

- [[go|Go]]
- [[goroutine|ゴルーチン]]
- [[channel|チャネル]]
- [[flaky-test|Flaky test]]

## 自分の理解

bubble と durably blocked が、synctest を理解するうえで重要な概念だと思った。

## 関連

- [発表のページ](https://gocon.jp/2025/talks/958977/)
- [関連記事](https://zenn.dev/canary_techblog/articles/ec8a96b4541685)
- [testing/synctest のドキュメント](https://pkg.go.dev/testing/synctest)
- [Testing concurrent code with testing/synctest（Go Blog）](https://go.dev/blog/synctest)
- [参考記事](https://future-architect.github.io/articles/20250805a/)
