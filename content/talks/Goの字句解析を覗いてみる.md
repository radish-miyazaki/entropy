---
title: Goの字句解析を覗いてみる
description: Go のソースコードがどのようにトークンに分けられるかを、言語仕様をもとに見ていく
tags: [talk, go]
date: 2025-09-28
speakers: [masa0110]
company:
event: "[[Go Conference 2025]]"
held: 2025-09-27
slide: https://speakerdeck.com/masa0110/gonozi-ju-jie-xi-wosi-itemiru-8458b8d5-7222-49b5-ba43-bb2116e757e3
video:
---

## TL;DR

- Go の字句解析で、ソースコードがどのようにトークンに分けられるかを、言語仕様をもとに見ていく。

## 内容

[[go|Go]] の[[lexical-analysis|字句解析]]では、トークンを識別子（identifiers）、キーワード（keywords）、演算子と区切り記号（operators and punctuation）、リテラル（literals）の 4 種類に分類する。

識別子は 1 つ以上の文字と数字からなり、最初の 1 文字は文字でなければならない。トークンの間の空白は、区切りが自明でないときだけ必要になる。たとえば、次のコードはコンパイルが通る。

```go
func hoge(foo...string) {}
```

## キーワード

- [[go|Go]]
- [[lexical-analysis|字句解析]]

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [発表のページ](https://gocon.jp/2025/talks/958892/)
- [The Go Programming Language Specification](https://go.dev/ref/spec)
