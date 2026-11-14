---
title: Monitor pattern
aliases: [モニター]
description: スレッド間の排他制御と条件待ちをカプセル化した設計パターン
tags: [word, 並列処理, go]
date: 2025-02-17
---

## TL;DR

[[thread|スレッド]]間の[[mutual-exclusion|排他制御]]（[[mutex|ミューテックス]]）と条件待ちを、[[encapsulation|カプセル化]]した[[design-pattern|デザインパターン]]。

## 仕組み

Monitor pattern には次の特徴がある。

- ミューテックスを内包し、データの排他制御を保証する
- [[condition-variable|条件変数]]を使って、スレッドを待機させたり通知したりする
- 同期処理をカプセル化し、外部のスレッドがミューテックスを直接扱わないようにする

## 例

[[go|Go]] では、`sync.Cond` が持つミューテックス（`sync.Locker`）を使うたびに Monitor pattern を適用することになる。次の例では、`stingy` がお金を足して `Signal()` で通知し、`spendy` は残高が 50 未満の間 `Wait()` で待機する。

```go
func stingy(money *int, cond *sync.Cond) {
	for i := 0; i < 1_000_000; i++ {
		cond.L.Lock()
		*money += 10
		cond.Signal()
		cond.L.Unlock()
	}
	fmt.Println("Stingy Done")
}

func spendy(money *int, cond *sync.Cond) {
	for i := 0; i < 200_000; i++ {
		cond.L.Lock()
		// `*money` が 50 未満の間は `cond.Wait()` で待機
		for *money < 50 {
			cond.Wait()
		}
		*money -= 50
		if *money < 0 {
			fmt.Println("Money is negative!")
			os.Exit(1)
		}
		cond.L.Unlock()
	}
	fmt.Println("Spendy Done")
}

func main() {
	money := 100
	mutex := &sync.Mutex{}
	cond := sync.NewCond(mutex)
	go stingy(&money, cond)
	go spendy(&money, cond)
	time.Sleep(2 * time.Second)
	mutex.Lock()
	fmt.Println("Money in bank account:", money)
	mutex.Unlock()
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[condition-variable|条件変数]]
- [[synchronization-primitive|同期プリミティブ]]
