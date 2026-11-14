---
title: map に含まれる chan を delete すると、chan はクローズされる
description: Go で値が chan の map から delete で要素を消すと、その chan はクローズされると考えた演習問題のメモ
tags: [blog, go, チャネル]
date: 2025-02-28
draft: false
---

## TL;DR

[[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス]]の演習問題を解いていて、値が [[channel|チャネル]]の map から `delete` で要素を消すと、その chan はクローズされると気づいた。

## 背景

[[go|Go]] の並行プログラミングの演習問題で、プレイヤーごとの chan を map で管理し、プレイヤーが抜けたら map から消す処理を書いた。

## 検証

`players` は、プレイヤーの ID をキー、そのプレイヤー用の chan を値に持つ map である。データがなくなったプレイヤーは `delete` で map から消す。

```go
func handlePlayer(
	id int,
	moreData bool,
	move string,
	players map[int]chan string,
) {
	if moreData {
		fmt.Printf("Player %d moved %s\n", id, move)
	} else {
		// 要素を削除するタイミングで Value の chan はクローズされる
		delete(players, id)
		fmt.Printf("Player %d left the game. Remaining players %d\n", id, len(players))
	}
}
```

## キーワード

- [[go|Go]]
- [[channel|チャネル]]

## 参考

- [[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス]]
