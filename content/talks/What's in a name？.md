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

発表では、長い名前がコードの意図を[[obscurity|不明瞭]]にすると述べている。

> Long names obscure what the code does.

名前の長さは、宣言とそれを使う場所との距離で決める。距離が遠いほど、名前を長く付ける。

> The greater the distance between a name's declaration and its uses, the longer the name should be.

### 良い例と悪い例

次の関数では、`i`、`n`、`b` は宣言のすぐ近くでしか使わないので、短い名前で十分である。

```go
func RuneCount(b []byte) int {
	i, n := 0, 0
	for i < len(b) {
		if b[i] < RuneSelf {
			i++
		} else {
			_, size := DecodeRune(b[i:])
			i += size
		}
		n++
	}
	return n
}
```

同じ処理で `buffer`、`index`、`count` のような長い名前を使うと、かえって読みにくくなる。

```go
func RuneCount(buffer []byte) int {
	index, count := 0, 0
	for index < len(buffer) {
		if buffer[index] < RuneSelf {
			index++
		} else {
			_, size := DecodeRune(buffer[index:])
			index += size
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
