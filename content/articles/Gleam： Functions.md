---
title: "Gleam: Functions"
description: Gleam Language Tour の Functions の章。関数の宣言、高階関数、無名関数、関数キャプチャの書き方
tags: [article, gleam]
date: 2024-08-01
article-authors: []
site: Gleam
published:
url: https://tour.gleam.run/
---

## TL;DR

- [[Gleam Language Tour|Gleam Language Tour]] の Functions の章。[[gleam|Gleam]] の関数の書き方を扱う。
- Gleam では関数は値なので、変数に束縛したり、他の関数に渡したりできる。`add(1, _)` のような関数キャプチャで、無名関数を短く書ける。

## 内容

### 関数

関数は `fn` で宣言する。`pub` を付けない関数は [[module|モジュール]]の外から使えないプライベート関数になる。引数と戻り値の型注釈は任意だが、付けると設計の意図を伝えられる。

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

[[anonymous-function|無名関数]]は `let add_one = fn(a) { a + 1 }` のように書き、`add_one(1)` のように名前付きの関数と同じく呼び出せる。無名関数は定義したときにスコープにあった変数を参照できるので、[[closure|クロージャ]]になる。

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
- [[module|モジュール]]
- [[higher-order-function|高階関数]]
- [[anonymous-function|無名関数]]
- [[closure|クロージャ]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[Gleam Language Tour|Gleam Language Tour]]
- [[Gleam： Basics|Gleam: Basics]]
