---
title: "Gleam: Functions"
description: Gleam Language Tour の Functions の章を読み、関数の宣言、高階関数、無名関数、関数キャプチャをまとめた
tags: [blog, gleam]
date: 2024-08-01
draft: false
---

## TL;DR

- [[gleam-language-tour|Gleam Language Tour]] の Functions の章を読み、[[gleam|Gleam]] の関数の書き方をまとめた。
- Gleam では関数は値なので、変数に束縛したり、他の関数に渡したりできる。`add(1, _)` のような関数キャプチャで、無名関数を短く書ける。

## 背景

[[gleam-basics|Gleam: Basics]] に続いて、Gleam Language Tour の Functions の章を読んだ。

## 検証

### 関数

関数は `fn` で宣言する。`pub` を付けない関数は、[[module|モジュール]]の外から使えないプライベート関数になる。引数と戻り値の型注釈は任意だが、付けると設計の意図を伝えられる。

```gleam
fn double(a: Int) -> Int {
  multiply(a, 2)
}

fn multiply(a: Int, b: Int) -> Int {
  a * b
}
```

### 高階関数

Gleam では関数は値なので、変数に束縛したり、他の関数に渡したりできる。次は [[higher-order-function|高階関数]]の例である。関数の型も `fn(Int) -> Int` のように `fn` で書く。

```gleam
fn twice(argument: Int, passed_function: fn(Int) -> Int) -> Int {
  passed_function(passed_function(argument))
}

fn add_one(argument: Int) -> Int {
  argument + 1
}
```

### 無名関数

[[anonymous-function|無名関数]]は `let add_one = fn(a) { a + 1 }` のように書き、`add_one(1)` のように名前付きの関数と同じく呼び出せる。無名関数は、定義したときにスコープにあった変数を参照できるので、[[closure|クロージャ]]になる。

```gleam
let secret_number = 42
let print_secret = fn() { io.println(int.to_string(secret_number)) }
print_secret() // 42
```

### 関数キャプチャ

関数キャプチャは Gleam の省略記法の 1 つで、引数を 1 つ受け取り、その引数を渡して別の関数をすぐに呼び出す無名関数を作る。`some_function(..., _, ...)` は、無名関数 `fn(a) { some_function(..., a, ...) }` と同じ意味になる。

```gleam
fn add(a: Int, b: Int) -> Int {
  a + b
}

let add_one = add(1, _)
add_one(2) // 3
```

## キーワード

- [[gleam|Gleam]]
- [[gleam-language-tour|Gleam Language Tour]]
- [[module|モジュール]]
- [[higher-order-function|高階関数]]
- [[anonymous-function|無名関数]]
- [[closure|クロージャ]]
