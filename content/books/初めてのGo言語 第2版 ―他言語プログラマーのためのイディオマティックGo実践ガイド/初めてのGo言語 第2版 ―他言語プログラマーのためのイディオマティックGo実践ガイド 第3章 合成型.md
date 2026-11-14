---
title: "初めてのGo言語 第2版 ―他言語プログラマーのためのイディオマティックGo実践ガイド 第3章 合成型"
description: Go の配列、スライス、文字列、マップ、構造体の性質と、比較・ゼロ値・メモリ共有の注意点を扱う章
tags: [book-chapter, go]
date: 2025-08-15
book: "[[初めてのGo言語 第2版 ―他言語プログラマーのためのイディオマティックGo実践ガイド]]"
chapter: 3
---

## TL;DR

- [[go|Go]] の配列は大きさまで型に含まれ比較できるが、[[slice|スライス]]とマップは比較できず、ゼロ値は `nil` である。
- スライス式で作ったサブスライスは元のスライスとメモリを共有するので、`append` と組み合わせると思わぬ上書きが起きる。

## 内容

### 配列

配列の大きさは型の一部なので、`[3]int` と `[4]int` は別の型である。ただし、スライスを介せば変換できる。範囲外や負のインデックスを指定すると、コンパイルエラーになる。

初期化では `1: 2` のようにインデックスを指定して値を入れられる（スライスも同じ）。リテラルでは `[...]int{10, 20, 30}` のように `...` で長さを省略できる。配列は [comparable](https://pkg.go.dev/builtin#comparable) で、[[zero-value|ゼロ値]]は「すべての要素が要素の型のゼロ値である配列」になる。

```go
var x = [3]int{1: 2}
fmt.Println(x) // [0 2 0]
```

### スライス

スライスは配列と違って比較できず、`==` や `!=` を使うとコンパイルエラーになる。代わりに [`slices.Equal`](https://pkg.go.dev/slices#Equal) や [`slices.EqualFunc`](https://pkg.go.dev/slices#EqualFunc) を使う。ゼロ値は `nil` である。`clear` を使うと、全要素をゼロ値にできる（長さは変わらない）。

### capacity

capacity は、配列やスライスの要素を格納する連続したメモリ領域の大きさである。スライスの長さが capacity に達した状態で `append` すると、ランタイムはより大きい領域を確保し、元の値をすべてコピーしてから新しい値を追加する。拡張のルールは、Go 1.18 の時点で、256 未満なら 2 倍、それ以上なら `(現在の capacity + 768) / 4` ずつ増やすというものである。

### スライスの作り方

スライスを作るときに考えるべきは、capacity の拡張回数をどう減らすかである。

- 大きくなる可能性がない: `var data []int` で `nil` スライスを作る
- 初期値がある、または値が変わらない: スライスリテラル `[]int{2, 4, 6, 8}` を使う
- 大きさが実行するまで分からない: `make` を使う。バッファとして使うなら length を指定する。必要なサイズが分かっていれば、それを length にする。それ以外は length を 0 にして capacity を指定する

### スライス式とメモリ共有

スライス式で作ったサブスライスは、元のスライスとメモリを共有する。`append` が絡むと、さらに分かりにくくなる。

```go
x := []string{"a", "b", "c", "d"}
y := x[:2]
y = append(y, "z")
y = append(y, "1")
y = append(y, "2")
fmt.Println("x:", x) // x: [a b z 1]
fmt.Println("y:", y) // y: [a b z 1 2]
```

これを避けるには、サブスライスで `append` を使わないか、[[full-slice-expression|完全スライス式（フルスライス式）]]で上書きが起きないようにする。`make` と `copy` で独立したスライスを作ってもよい。

配列からスライスへの変換もスライス式で行い、やはりメモリを共有する。逆にスライスから配列へは型変換で行い、データは新しい領域にコピーされる。共有したいときは、`(*[4]int)(xSlice)` のように配列のポインタに変換する。配列をスライスより小さくすることはできるが、大きくすると、コンパイラは検出できず実行時に [[panic|panic]] になる。

### 文字列

Go の文字列は rune ではなくバイトの列である。このバイト列が特定の文字コードであるとは仮定されていない。ただし、文字列リテラルは通常 [[utf-8|UTF-8]] で書かれ、UTF-8 を前提にするライブラリもある。`len` はコードポイントの数ではなくバイト数を返す。

```go
var s string = "Hello ☀"
fmt.Println(len(s)) // 9
```

文字列を操作するときは、スライスやインデックスより `strings` や `unicode/utf8` の関数を使うほうが楽である。[[rune|rune]] や `byte` との間は、`string(a)`、`[]byte(s)`、`[]rune(s)` のように型変換で行き来できる。

### マップ

マップのゼロ値は `nil` で、`nil` マップに書き込むと panic になる。そのため、`map[string]int{}` のように初期値を与えるのが一般的である。`nil` マップと空のマップは別物である。存在しないキーを読むと、値の型のゼロ値が返る。

キーは comparable でなければならないので、マップ、スライス、関数、チャネルはキーにできない。マップ自体も比較できず、代わりに [`maps.Equal`](https://pkg.go.dev/maps#Equal) や [`maps.EqualFunc`](https://pkg.go.dev/maps#EqualFunc) を使う。`clear` にマップを渡すと、長さが 0 になる。

### セット

Go にセットはないが、値が `bool` のマップで代わりにできる。値を空の構造体 `struct{}` にする方法もあるが、存在の確認を [[comma-ok-idiom|comma ok イディオム]]で書く必要があり、コードが長くなる。Go 1.24 でマップの内部実装が [[swiss-table|Swiss Table]] に変わったため、`bool` と空の構造体でメモリ消費量は変わらなくなった（[参考](https://zenn.dev/naoki_kuroda/articles/c225d315a3a5ae)）。

```go
intSet := map[int]struct{}{}
for _, v := range vals {
	intSet[v] = struct{}{}
}
if _, ok := intSet[5]; ok {
	// ...
}
```

### 構造体

初期化で指定しなかったフィールドはゼロ値になる。構造体が comparable かどうかは、各フィールドが comparable かで決まる。[[ruby|Ruby]] や [[python|Python]] のように `==` や `!=` をオーバーライドすることはできない。

ある構造体を別の構造体に型変換できるのは、全フィールドの名前、順番、型が同じ場合だけである。ただし両者は別の型なので、比較するには変換が必要になる。無名構造体なら、フィールドの名前、順番、型が同じであれば、変換なしで代入も比較もできる。

```go
f := firstPerson{name: "Alice", age: 20}
s := secondPerson{name: "Alice", age: 20}
fmt.Println(f == s)              // コンパイルエラー: mismatched types
fmt.Println(f == firstPerson(s)) // true

var g struct {
	name string
	age  int
}
g = f
fmt.Println(f == g)
```

## キーワード

- [[go|Go]]
- [[slice|スライス]]
- [[full-slice-expression|完全スライス式（フルスライス式）]]
- [[zero-value|ゼロ値]]
- [[rune|rune]]
- [[utf-8|UTF-8]]
- [[comma-ok-idiom|comma ok イディオム]]
- [[swiss-table|Swiss Table]]
- [[panic|panic]]

## 自分の理解

capacity の拡張ルールは、Go 1.24 の時点でも同じに見える（[該当コード](https://github.com/golang/go/blob/7f36edc26d4e3becb6d9c9008ff00f260bb19055/src/runtime/slice.go#L289-L321)）。ところが実際に動かすと、計算と結果が合わなかった。

```go
x := make([]int, 1024, 1024)
fmt.Printf("Before append: len %d, cap %d\n", len(x), cap(x))
// Before append: len 1024, cap 1024

x = append(x, 0)
fmt.Printf("After append: len %d, cap %d\n", len(x), cap(x))
// After append: len 1025, cap 1536
// 計算上は 1024 + ((1024 + 768) / 4) = 1472 になるはず
```

コードを見る限り、`roundupsize` でメモリを確保するときに切り上げているようである（[該当コード](https://github.com/golang/go/blob/a8564bd412d4495a6048f981d30d4d7abb1e45a7/src/runtime/msize.go#L16-L36)）。
