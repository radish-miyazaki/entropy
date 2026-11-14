---
title: 完全スライス式（フルスライス式）
aliases: [完全スライス式, フルスライス式]
description: Go でスライシングするときに、結果のスライスのキャパシティも指定する記法
tags: [word, go]
date: 2024-04-17
---

## TL;DR

[[go|Go]] で[[slicing|スライシング]]するときに、結果のスライスのキャパシティも指定する記法。`a[low:high:max]` と書く。

## なぜ必要か

[[100 Go Mistakes and How to Avoid Them]] によると、`append` による予期せぬ副作用を避けるために使う。

## 仕組み

`a[low:high:max]` は、長さと要素が `a[low:high]` と同じスライスを作る。違うのは、キャパシティが `max - low` になる点だけである。インデックスは `0 <= low <= high <= max <= cap(a)` を満たす必要があり、省略できるのは `low` だけである。また、文字列には使えない。

## 例

次のコードでは、`main` の `s` と `f` に渡したスライスが同じ基底配列を参照している。`s[:2]` のキャパシティは 3 なので、`f` の中の `append` は基底配列の 3 番目の要素を書き換え、その変更が `main` にも表れる。

```go
func main() {
	s := []int{1, 2, 3}
	f(s[:2])
	fmt.Println(s) // [1 2 100]
}

func f(s []int) {
	_ = append(s, 100)
}
```

完全スライス式でキャパシティを 2 に制限すると、`append` は新しい配列を確保するので、`main` の `s` は変わらない。

```go
func main() {
	s := []int{1, 2, 3}
	f(s[:2:2])
	fmt.Println(s) // [1 2 3]
}

func f(s []int) {
	_ = append(s, 100)
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[slicing|スライシング]]

## 出典

- [[100 Go Mistakes and How to Avoid Them]]
- [100 Go Mistakes: append による予期しない副作用](https://100go.co/ja/#append-25)
- [The Go Programming Language Specification: Slice expressions](https://go.dev/ref/spec#Slice_expressions)
