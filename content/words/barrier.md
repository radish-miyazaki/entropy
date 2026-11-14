---
title: バリア
aliases: [barrier]
description: 複数のスレッドやプロセスが特定の地点にそろうまで待ち、そろったら一斉に先へ進む同期手法
tags: [word, 並列処理, go]
date: 2025-02-23
---

## TL;DR

複数の[[thread|スレッド]]や[[process|プロセス]]が特定の地点に到達するまで待機し、全員がそろったところで一斉に次の処理へ進む同期手法。

## 仕組み

バリアは、管理する処理の数と、待機中の処理の数を持つ。処理がバリアに到達すると待機中の数が増え、それが管理する数に達したら、待っていた処理をすべて再開させる。同期したタイミングでカウンタは 0 に戻るので、同じバリアを何度でも使える。

### WaitGroup との違い

[[go|Go]] の [[waitgroup|WaitGroup]] は、すべての[[goroutine|ゴルーチン]]の完了を待つ。たとえば飛行機の出発では、乗客が全員空港のターミナルに到着するまで待ち、全員そろったら出発する。

一方、バリアは、すべての処理が任意の地点に到達するのを待ち、到達したら処理を再開させる。処理の終わりに限らず、好きな場所で同期できる。たとえば出発前の点検では、燃料補給、荷物の積み込み、乗客の搭乗がすべて終わるのを待ってから次に進む。

## 例

Go の標準パッケージにはバリアがないので、自分で実装する必要がある。[[condition-variable|条件変数]]（`sync.Cond`）を使うと、次のように書ける。

```go
type Barrier struct {
	// バリアで管理するゴルーチン数
	size int
	// 待機中のゴルーチン数
	waitCount int
	// 条件変数
	cond *sync.Cond
}

func NewBarrier(size int) *Barrier {
	return &Barrier{
		size, 0, sync.NewCond(&sync.Mutex{}),
	}
}

func (b *Barrier) Wait() {
	b.cond.L.Lock()
	b.waitCount++
	if b.waitCount == b.size {
		// すべてのゴルーチンがバリアに達した場合、全ゴルーチンを再開させる
		b.waitCount = 0
		b.cond.Broadcast()
	} else {
		b.cond.Wait()
	}
}
```

使い道の 1 つに正方行列の掛け算がある。行ごとにゴルーチンを立て、main ゴルーチンが行列を用意したらバリアで計算を始めさせ、すべての行の計算が終わるまでもう一度バリアで待つ。

```go
func main() {
	var matrixA, matrixB, result [matrixSize][matrixSize]int

	barrier := NewBarrier(matrixSize + 1)
	for row := range matrixSize {
		go rowMultiply(&matrixA, &matrixB, &result, row, barrier)
	}

	for range 3 {
		generateRandMatrix(&matrixA)
		generateRandMatrix(&matrixB)

		// ゴルーチンが計算できるようにバリアを開放
		barrier.Wait()

		// ゴルーチンが計算を完了するまで待機
		barrier.Wait()

		for i := range matrixSize {
			fmt.Println(matrixA[i], matrixB[i], result[i])
		}
		fmt.Println("")
	}
}

func generateRandMatrix(matrix *[matrixSize][matrixSize]int) {
	for row := range matrixSize {
		for col := range matrixSize {
			matrix[row][col] = rand.Intn(10) - 5
		}
	}
}

func rowMultiply(
	matrixA,
	matrixB,
	result *[matrixSize][matrixSize]int,
	row int,
	barrier *Barrier,
) {
	for {
		// main ゴルーチンが行列を読み込むまで待機
		barrier.Wait()

		for col := range matrixSize {
			sum := 0
			for i := range matrixSize {
				sum += matrixA[row][i] * matrixB[i][col]
			}
			result[row][col] = sum
		}

		// すべての行の計算が終わるまで待機
		barrier.Wait()
	}
}
```

## 自分の理解

[[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス]] の図がとても分かりやすかった。

## 関連

- [[waitgroup|WaitGroup]]
- [[condition-variable|条件変数]]
- [[synchronization-primitive|同期プリミティブ]]

## 出典

- [[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス]]
- [バリア (計算機科学)](<https://pedia.3rd-in.co.jp/wiki/バリア%20(計算機科学)>)
