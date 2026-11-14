---
title: "What's in a name?"
description: Go の命名についての発表。名前の長さは、宣言から使う場所までの距離に合わせて決める
tags: [talk, go]
date: 2023-12-27
speakers: [Andrew Gerrand]
company: Google
event: Go talks 2014 (Andrew Gerrand)
held:
slide: https://go.dev/talks/2014/names.slide#1
video:
---

## TL;DR

- 2014 年 10 月の、[[go|Go]] での名前の付け方についての発表。
- 長い名前はコードが何をするのかを[[obscurity|不明瞭]]にする。名前は、宣言から使う場所までの距離が遠いほど長くする。

## 内容

### 長い名前はコードを読みにくくする

発表では、ローカル変数の名前は短くするよう勧めている。長い名前はコードが何をするのかを[[obscurity|不明瞭]]にする。

> Keep them short; long names obscure what the code does.

名前の長さは、宣言とそれを使う場所との距離で決める。距離が遠いほど、名前を長く付ける。

> The greater the distance between a name's declaration and its uses, the longer the name should be.

### 良い例と悪い例

発表では、`index` より `i`、`buffer` より `b` を使うよう勧めている。`RuneCount` という関数の中なら、`runeCount` より `count` でよい。次の関数は `buffer`、`index`、`runeCount` と長い名前を使った悪い例である。

```go
func RuneCount(buffer []byte) int {
	runeCount := 0
	for index := 0; index < len(buffer); {
		if buffer[index] < RuneSelf {
			index++
		} else {
			_, size := DecodeRune(buffer[index:])
			index += size
		}
		runeCount++
	}
	return runeCount
}
```

同じ処理を `b`、`i`、`count` と短い名前で書いた良い例は次のとおり。

```go
func RuneCount(b []byte) int {
	count := 0
	for i := 0; i < len(b); {
		if b[i] < RuneSelf {
			i++
		} else {
			_, n := DecodeRune(b[i:])
			i += n
		}
		count++
	}
	return count
}
```

## キーワード

- [[go|Go]]
- [[obscurity|不明瞭]]

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%
