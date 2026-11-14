---
title: 宣言的マクロ
aliases: []
description: macro_rules! で定義し、渡されたコードの構造をパターンと照合して置き換える Rust のマクロ
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

`macro_rules!` で定義する [[rust|Rust]] のマクロ。`match` 式のように、渡されたソースコードの構造をパターンと照合し、一致した腕のコードに置き換える。「macros by example」とも呼ばれ、Rust で最も広く使われる形のマクロである。

## なぜ必要か

The Rust Programming Language によると、関数のシグネチャは引数の数と型を決めなければならないが、マクロは `println!` のように可変個の引数を受け取れる。また、マクロはコンパイラがコードの意味を解釈する前に展開されるので、型にトレイトを実装するような、実行時に呼ばれる関数にはできない処理も書ける。

## 仕組み

照合する値は実行時の値ではなく、マクロに渡された Rust のソースコードそのものである。パターンでは、`$x:expr` が任意の式に一致して `$x` という名前を付け、`$( ... ),*` がカンマ区切りの 0 回以上の繰り返しに一致する。照合と置き換えは、すべてコンパイル時に行われる。

[[Effective Rust]] の項目 28 によると、宣言的マクロは[[hygienic-macro|健全なマクロ]]であり、展開された本体から呼び出し側のローカル変数は使えない。また、定義より後ろのコードでしか使えず、`#[macro_export]` を付けるとクレートのトップレベルから使えるようになる。

## 例

標準ライブラリの `vec!` を簡略化した定義である。

```rust
#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
```

`vec![1, 2, 3]` は、`temp_vec.push(1);` から `temp_vec.push(3);` までを並べたコードに展開される。

## 注意点

マクロの定義は、関数の定義より読みにくく、保守もしにくい。Effective Rust の項目 28 では、マクロの挙動をできるだけ通常の Rust と一致させ、制御フローを外に漏らさず、引数は 1 度だけ評価するよう勧めている。

入力をパターンで照合するだけなので、パターンで表せない複雑な処理には向かない。そうした処理には、`TokenStream` を受け取って Rust のコードで操作する手続き的マクロ（[[function-like-macro|関数的マクロ]]、[[derive-macro|derive マクロ]]、[[attribute-macro|属性マクロ]]）を使う。手続き的マクロは専用のクレートに置く必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[hygienic-macro|健全なマクロ]]
- [[function-like-macro|関数的マクロ]]
- [[derive-macro|derive マクロ]]
- [[attribute-macro|属性マクロ]]

## 出典

- [Macros - The Rust Programming Language](https://doc.rust-lang.org/book/ch20-05-macros.html)
- [[Effective Rust 項目28 分別をもってマクロを使おう|Effective Rust 項目28]]
- [[Effective Rust 項目28 宣言的マクロを利用する上で注意すべきこと|Effective Rust 項目28 宣言的マクロを利用する上で注意すべきこと]]
