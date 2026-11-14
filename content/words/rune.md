---
title: rune
aliases: []
description: Go で Unicode のコードポイントを表す型。int32 の別名
tags: [word, go]
date: 2026-11-14
---

## TL;DR

[[go|Go]] で Unicode のコードポイントを表す型。`int32` の別名である。

## なぜ必要か

[The Go Blog](https://go.dev/blog/strings) によると、Go の文字列は実質的に読み取り専用のバイトのスライスで、インデックスでアクセスすると文字ではなくバイトが取り出される。日本語のように UTF-8 で 3 バイトになる文字を 1 文字として扱うには、rune を使う。rune の値は整数だが、型を `rune` にすると、その整数がコードポイントであることをプログラムの上で示せる。

## 仕組み

Unicode 標準では、1 つの値で表される要素を「コードポイント」と呼ぶ。Go の rune はコードポイントと同じ意味である。他の言語で文字定数と呼ぶものは、Go では rune 定数と呼ぶ。たとえば `'⌘'` は `rune` 型で、整数値は `0x2318` である。

文字列を `for range` で回すと、各反復で UTF-8 でエンコードされた rune を 1 つずつデコードする。ループのインデックスは、その rune の開始位置をバイト単位で表す。同じデコードは `unicode/utf8` の `DecodeRuneInString` でもでき、rune と、その UTF-8 でのバイト数を返す。

## 例

```go
for i, r := range "日本語" {
    fmt.Printf("%d: %c\n", i, r) // 0: 日, 3: 本, 6: 語
}
```

[[初めてのGo言語 第2版 ―他言語プログラマーのためのイディオマティックGo実践ガイド]] によると、文字列と rune や `byte` の間は、`[]rune(s)` や `string(a)` のように型変換で行き来できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[go|Go]]

## 出典

- [Strings, bytes, runes and characters in Go - The Go Blog](https://go.dev/blog/strings)
- [[初めてのGo言語 第2版 ―他言語プログラマーのためのイディオマティックGo実践ガイド 第3章 合成型|初めてのGo言語 第2版 第3章 合成型]]
