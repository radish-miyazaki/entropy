---
title: Effective Rust › 宣言的マクロを利用する上で注意すべきこと
description: 宣言的マクロの可視範囲、健全性、引数の扱い、制御フロー、副作用、フォーマット出力について注意すべき点
tags: [book-chapter, rust]
date: 2025-01-20
book: "[[Effective Rust]]"
chapter: 28
---

## TL;DR

- [[declarative-macro|宣言的マクロ]]は定義より後ろでしか使えず、`#[macro_export]` を付けるとクレートのトップレベルに現れる。
- マクロの挙動は、できるだけ通常の Rust と一致させる。制御フローを外に漏らさず、引数は 1 度だけ評価する。
- 引数をフォーマットして出力するマクロでは `format_args!` を使う。

## 内容

[[Effective Rust 項目28 分別をもってマクロを使おう|項目28 分別をもってマクロを使おう]]のうち、宣言的マクロを使うときの注意点である。

### 可視範囲

マクロの定義を使えるのは、その定義より後ろのコードだけである。

```rust
fn before() {
    println!("square {} is {}", 2, square!(2)); // コンパイルエラー
}

macro_rules! square {
    { $e:expr } => { $e * $e }
}
```

`#[macro_export]` を付けると可視範囲を広げられる。ただし、[[module|モジュール]]の中で定義していても、マクロはクレートのトップレベルに現れる。

```rust
mod submod {
    #[macro_export]
    macro_rules! cube {
        { $e:expr } => { $e * $e * $e }
    }
}

let cubed = crate::cube!(3); // crate::submod::cube! ではない
```

### 健全性

宣言的マクロは[[hygienic-macro|健全なマクロ]]である。展開された本体から、呼び出し側のローカル変数は使えない。

```rust
macro_rules! increment_x {
    {} => { x += 1 };
}

let mut x = 2;
increment_x!(); // コンパイルエラー
```

一方、引数として渡されたものに対しては、生成されたコードの中で何でもできる。参照を通さず、所有している値を直接書き換えることもできる。マクロ名に警告の意味で `!` が付くのはこのためである。展開後のコードは [[cargo-expand]] で確かめられる。

### 制御フローを漏らさない

生成されたコードの中では、ループ、条件分岐、`return`、`?` などの制御フローも使える。しかし、呼び出し側から見て意図せず関数を抜けるのは、[[principle-of-least-astonishment|驚き最小の原則]]に反する。マクロの挙動は通常の Rust と一致させよう。

```rust
macro_rules! check_successful {
    { $e:expr } => {
        if $e.group() != Group::Successful {
            return Err(MyError("HTTP operation failed"));
        }
    }
}
```

この場合は、マクロに `Result` を返させれば、呼び出し側で `check_successful!(rc)?;` と書けて制御フローが明確になる。マクロの目的が Rust と違う挙動をさせることなら、この限りではない。ただし、その違いを文書にして伝える。

### 副作用のある引数

引数を複数回使うマクロに[[side-effect|副作用]]のある式を渡すと、予期しない結果になる。

```rust
let mut x = 1;
let y = square!({
    x += 1;
    x
});
println!("x = {x}, y = {y}"); // x = 2, y = 4 ではなく x = 3, y = 6
```

対策は 2 つある。式を 1 度だけ評価してローカル変数に入れるか、フラグメント指定子 `expr` を `ident` に変えて、そもそも式を受け付けないようにする。

### format_args! を使う

引数をフォーマットして出力するマクロでは、[`format_args!`](https://doc.rust-lang.org/std/macro.format_args.html) を使おう。`println!` や `format!` と同じフォーマット構文を使え、フォーマット引数がコンパイル時に検査されるので型安全である。

```rust
macro_rules! my_log {
    { $($arg:tt)+ } => {
        eprintln!("{}:{}: {}", file!(), line!(), format_args!($($arg)+));
    }
}

let x = 10u8;
my_log!("x = {:#04x}", x); // src/main.rs:9: x = 0x0a
```

## キーワード

- [[declarative-macro|宣言的マクロ]]
- [[hygienic-macro|健全なマクロ]]
- [[cargo-expand]]
- [[principle-of-least-astonishment|驚き最小の原則]]
- [[side-effect|副作用]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
