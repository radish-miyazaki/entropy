---
title: 属性マクロ
aliases: [attribute macro]
description: プログラムの要素に付けて、その要素のトークン列を入力に受け取る Rust の手続き的マクロ
tags: [word, rust, 手続き的マクロ]
date: 2025-01-21
---

## TL;DR

関数などプログラムの要素に付けて、その要素のトークン列を入力として受け取る [[rust|Rust]] の[[procedural-macro|手続き的マクロ]]。[[function-like-macro|関数的マクロ]]と同じく、任意のトークン列を返す。

## 仕組み

関数的マクロとは異なり、引数を **2 つ**受け取る。1 つ目は属性に渡されたトークン列、2 つ目は属性が付けられた要素のトークン列である。返したトークン列は、属性が付けられた要素と置き換わる。

```rust
pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream
```

定義するには、`proc-macro = true` を設定したクレートで、関数に `#[proc_macro_attribute]` 属性を付ける。引数の解析には syn クレートが役立つ。

## 例

関数に付ける場合は次のように書く。

```rust
#[log_invocation]
fn add_three(x: u32) -> u32 {
    x + 3
}
```

## 注意点

属性マクロは、`#![...]` の形の内部属性としては使えない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[function-like-macro|関数的マクロ]]
- [[derive-macro|derive マクロ]]
- [[Effective Rust 項目28 Rust におけるマクロ]]

## 出典

- [[Effective Rust]]
- [Procedural Macros - The Rust Reference](https://doc.rust-lang.org/reference/procedural-macros.html)
