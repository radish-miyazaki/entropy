---
title: スピンロック
aliases: [spinlock]
description: ロックが解放されるまで待ち続ける（スピンする）方式のロック
tags: [word, 並行処理]
date: 2025-03-09
---

## TL;DR

リソースへのアクセスを制御する仕組みの 1 つで、ロックが解放されるまでループで待ち続ける（スピンする）方式のロック。

## なぜ必要か

[[operating-system|OS]] に頼らず、[[user-space|ユーザ空間]]だけで [[mutex|mutex]] を実現できる。

## 例

[[go|Go]] での実装例。[[atomic-operation|アトミック操作]]の CAS（Compare-And-Swap）でロックを取得する。

```go
type SpinLock int32

func (s *SpinLock) Lock() {
	for !atomic.CompareAndSwapInt32((*int32)(s), 0, 1) {
		// Go scheduler を呼び出して、他のゴルーチンに実行を譲る（yield）
		runtime.Gosched()
	}
}

func (s *SpinLock) Unlock() {
	atomic.StoreInt32((*int32)(s), 0)
}

func NewSpinLock() sync.Locker {
	var lock SpinLock
	return &lock
}
```

## 注意点

ロックを長く占有するなど、リソースの競合が頻繁に起きる場面では、CPU サイクルを無駄に使ってしまう。[[futex]] を使えば改善できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[futex]]
- [[mutex|mutex]]
- [[atomic-operation|アトミック操作]]

## 出典

- [[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス]]
