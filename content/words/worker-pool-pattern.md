---
title: Worker Pool pattern
aliases: [Woker Pool pattern, Thread Pool pattern]
description: 一定数の worker を維持し、キューに溜まったタスクを効率よく並列に実行するデザインパターン
tags: [word, 並行処理, デザインパターン]
date: 2025-03-02
---

## TL;DR

一定数の worker（[[thread|スレッド]]や[[process|プロセス]]など）を維持し、タスクを効率よく並列に実行する[[design-pattern|デザインパターン]]。Thread Pool pattern、Replicated workers pattern、Master-Worker pattern、Worker-crew pattern とも呼ばれる。

## なぜ必要か

大量のタスクを並列に処理したいが、使うリソースは制限したい場合に役立つ。worker のプールを事前に作って再利用するので、worker を作る負荷も減らせる。

## 仕組み

タスクはキュー（[[go-channel|チャネル]]やメッセージキューなど）に溜まる。システムは、あらかじめ設定した固定数の worker を起動する。実装によっては、負荷に応じて worker 数の上限を一時的に増やせる。

各 worker はキューからタスクを取り出して処理し、終わったら次のタスクを取り出す。キューが空になると、新しいタスクが来るまで待機状態になる。システムの設計によってはアイドル状態になることもある。

## 例

[[go|Go]] では、[[goroutine|ゴルーチン]]を worker とし、チャネルをキューにして実装できる。

```go
func read(r io.Reader) (int, error) {
	var count int64

	var n = 10
	ch := make(chan []byte, n)

	wg := sync.WaitGroup{}
	wg.Add(n)

	for i := 0; i < n; i++ {
		go func() {
			defer wg.Done()
			for b := range ch {
				v := task(b)
				atomic.AddInt64(&count, int64(v))
			}
		}()
	}

	for {
		b := make([]byte, 1024)
		_, err := r.Read(b)
		if err != nil {
			if err == io.EOF {
				break
			}
			return 0, nil
		}
		ch <- b
	}

	close(ch)
	wg.Wait()

	return int(count), nil
}
```

ほかの実装例は [Go by Example: ワーカープール](https://oohira.github.io/gobyexample-jp/worker-pools.html) にある。

## 注意点

Go のゴルーチンはとても軽量なので、worker を再利用する恩恵はあまり受けられない。Go でプールを使うなら、プールの大きさは `GOMAXPROCS` に合わせるのがよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fork-join-model|Fork-Join model]]
- [[fan-out-pattern|Fan-Out pattern]]
- [[fan-in-pattern|Fan-In pattern]]
- [[waitgroup|WaitGroup]]
- [[atomic-operation|アトミック操作]]

## 出典

- [Go by Example: ワーカープール](https://oohira.github.io/gobyexample-jp/worker-pools.html)
