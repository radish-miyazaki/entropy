---
title: "初めてのGo言語 第2版 ―他言語プログラマーのためのイディオマティックGo実践ガイド 第1章 Go環境のセットアップ"
description: Go のセミコロン挿入規則、Go Playground でのファイル分割、Makefile の .PHONY と .DEFAULT_GOAL を扱う章
tags: [book-chapter, go]
date: 2025-08-13
book: "[[初めてのGo言語 第2版 ―他言語プログラマーのためのイディオマティックGo実践ガイド]]"
chapter: 1
---

## TL;DR

- [[go|Go]] の文末の `;` は、コンパイラがセミコロン挿入規則に沿って自動で入れるので、開発者は書かない。
- [[go-playground|Go Playground]] は 1 つの入力欄で複数ファイルを再現でき、[[makefile|Makefile]] では `.PHONY` と `.DEFAULT_GOAL` が便利である。

## 内容

### セミコロン挿入規則

Go も Java などと同じく、各文の終わりに `;` が必要である。ただし開発者が書くことはない。[[effective-go|Effective Go]] に書かれた[セミコロン挿入規則](https://go.dev/doc/effective_go#semicolons)に沿って、コンパイラが挿入するからである。具体的には、改行の直前のトークンが次のどれかのときに `;` が入る。

- 識別子
- 事前宣言された型のリテラル
- `break`、`continue`、`fallthrough`、`return`、`++`、`--`、`)`、`}`

### Go Playground

[Go Playground](https://go.dev/play/) では、`-- filename.go --` という行でファイルを分けられる。`-- calc/calc.go --` のように書けば、サブディレクトリも再現できる。

```go
-- go.mod --
module playground

go 1.24

-- calc/calc.go --
package calc

func Add(a int, b int) int {
	return a + b
}

-- main.go --
package main

import (
	"fmt"
	"playground/calc"
)

func main() {
	fmt.Println(calc.Add(1, 2))
}
```

なお、Playground の時刻は 2009 年 11 月 10 日 23:00:00（UTC）に固定されている。これは [Go が最初に発表された日](https://go.dev/blog/1year)である。

### Makefile

[`.PHONY`](https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html) を使うと、指定したターゲットがファイル名ではないことを明示でき、タスクとして実行できる。また、[`.DEFAULT_GOAL`](https://www.gnu.org/software/make/manual/html_node/Special-Variables.html) でデフォルトのターゲットを指定できる。

```makefile
.DEFAULT_GOAL := build

.PHONY: build

build:
	go build
```

## キーワード

- [[go|Go]]
- [[effective-go|Effective Go]]
- [[go-playground|Go Playground]]
- [[makefile|Makefile]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
