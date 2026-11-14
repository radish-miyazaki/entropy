---
title: derive マクロ
aliases: []
description: 構造体や Enum の定義に付けて、生成したコードを追加する Rust の手続き的マクロ
tags: [word, rust, 手続き的マクロ]
date: 2025-01-21
---

## TL;DR

データ構造の定義（構造体と Enum）に付けて、生成したコードを追加する [[rust|Rust]] の[[procedural-macro|手続き的マクロ]]。

## 仕組み

入力は、`#[derive(...)]` を付けた構造体、Enum、union のトークン列である。返したトークン列は元の定義を置き換えず、同じモジュールの中で元の定義の後ろに追加される。定義するには、`proc-macro = true` を設定したクレートで、関数に `#[proc_macro_derive]` 属性を付ける。

```rust
#[proc_macro_derive(AnswerFn)]
pub fn derive_answer_fn(_item: TokenStream) -> TokenStream {
    "fn answer() -> u32 { 42 }".parse().unwrap()
}
```

`#[proc_macro_derive(WithHelperAttr, attributes(helper))]` のように `attributes` を指定すると、フィールドなどに付けるヘルパー属性も宣言できる。

## 注意点

使うときに気を付けることは [[Effective Rust 項目28 derive マクロを利用する上で注意すべきこと]] にまとめている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[function-like-macro|関数的マクロ]]
- [[attribute-macro|属性マクロ]]
- [[Effective Rust 項目28 Rust におけるマクロ]]
- [[Effective Rust 項目28 マクロを使う上でのアドバイス]]

## 出典

- [[Effective Rust]]
- [Procedural Macros - The Rust Reference](https://doc.rust-lang.org/reference/procedural-macros.html)
