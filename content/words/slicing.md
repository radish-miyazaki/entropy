---
title: スライシング
aliases: []
description: 文字列や配列、スライスから、インデックスの範囲を指定して部分を取り出す操作
tags: [word, go]
date: 2024-04-17
---

## TL;DR

文字列や配列、スライスから、インデックスの範囲を指定して部分を取り出す操作。[[go|Go]] では `a[low:high]` のようなスライス式で書く。

## 仕組み

Go のスライス式 `a[low:high]` は、インデックス `low` から `high` の手前までの要素を持つ、長さ `high - low` の部分文字列またはスライスを作る。`low` を省略すると 0、`high` を省略すると `a` の長さになる。

結果がスライスのとき、元のスライスや配列と基底配列を共有する。そのため、結果の要素を書き換えると元の要素も変わる。

キャパシティも指定したいときは、[[full-slice-expression|完全スライス式]] `a[low:high:max]` を使う。

## 例

```go
a := [5]int{1, 2, 3, 4, 5}
s := a[1:4] // [2 3 4]、長さ 3、キャパシティ 4

a[2:] // a[2:len(a)] と同じ
a[:3] // a[0:3] と同じ
a[:]  // a[0:len(a)] と同じ
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[full-slice-expression|完全スライス式]]

## 出典

- [The Go Programming Language Specification: Slice expressions](https://go.dev/ref/spec#Slice_expressions)
