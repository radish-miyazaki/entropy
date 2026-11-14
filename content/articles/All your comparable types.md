---
title: All your comparable types
description: Go 1.20 で comparable 制約が any を含むすべての比較可能な型で満たされるようになった理由と、その代わりに失った静的な型安全性を解説した Go 公式ブログの記事
tags: [article, go]
date: 2025-09-03
article-authors: [Robert Griesemer]
site: The Go Blog
published: 2023-02-17
url: https://go.dev/blog/comparable
---

## TL;DR

- Go 1.20 から、事前宣言された `comparable` 制約は `any` を含むすべての比較可能な型で満たされるようになった。
- その代わり、`comparable` を使うジェネリックなコードが実行時に panic しうるようになり、静的な型安全性の一部を実行時のチェックと引き換えにした。

## 内容

### 問題

Go 1.20 より前は、`map[any]string` はコンパイルできるのに、同じことをジェネリクスで書いた `genericLookupTable[any, string]` はコンパイルできなかった。この制限が提案されていた `maps.Clone` のようなジェネリックなライブラリの妨げになっていた。

### 型パラメータと制約

Go 1.18 で型パラメータが入り、制約は「型引数として許される型の集合」を表すものになった。インターフェースは型の集合として理解され、`A|B` のような union や `~T` の近似も書ける。型パラメータの値に使える演算は、型集合のすべての型がその演算を持つときだけ許される。

### 比較可能な型

`==` は型の範囲が開いているので、制約の中に列挙できない。そこで事前宣言の `comparable` があるが、その型集合はインターフェース自身を含まないので、`any` は入らない。記事によると、インターフェースの値どうしの比較は実行時に panic しうるので、`comparable` には次の型だけが入る。

> `comparable` contains only types that the compiler guarantees will not panic with `==`.

こうした型を「strictly comparable」と呼ぶ。

### インターフェースの実装と制約の充足を分ける

Go 1.20 は変数への代入に使う「インターフェースの実装」と、型引数を渡すときの「制約の充足」を分けた。前者は変わらない。後者には例外ができ、`interface{ comparable; E }` の形の制約は、`E` を実装する比較可能な型 `T` で満たされる。

> a type that supports `==` also satisfies `comparable` (even though it may not implement it).

ただし、型パラメータにはこの例外がない。`any` で制約された型パラメータは、今も `comparable` を満たさない。

### 影響

この変更は後方互換だが、静的な型安全性の一部を失った。

> We have given up static type safety for a run-time check.

コンパイル時に strictly comparable であることを確かめたいときは、型を型引数ではなく制約として渡せば例外がかからない。Go 1.18 では一時期この挙動に近い実装があり、その後仕様に合わせて変わったので、作者は「一周して戻ってきた」と締めくくっている。

## キーワード

- [[go|Go]]
- ジェネリクス
- 型パラメータ
- 型集合
- comparable
- strictly comparable

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%
