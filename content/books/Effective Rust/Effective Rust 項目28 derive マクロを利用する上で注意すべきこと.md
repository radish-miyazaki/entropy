---
title: Effective Rust 項目28 derive マクロを利用する上で注意すべきこと
description: derive マクロは入力を置き換えずにコードを追加し、ヘルパ属性を宣言でき、入力のパースには syn クレートが使える
tags: [book-chapter, rust]
date: 2025-01-21
book: "[[Effective Rust]]"
chapter: 28
---

## TL;DR

- [[derive-macro|derive マクロ]]は入力のトークンを置き換えず、生成したコードを追加する。データ構造の定義はそのまま残る。
- derive マクロはヘルパ属性を宣言できる。入力のトークン列のパースは、ほとんど syn クレートに任せられる。

## 内容

[[Effective Rust 項目28 分別をもってマクロを使おう|項目28 分別をもってマクロを使おう]]のうち、derive マクロを使うときの注意点である。

### コードを追加する

derive マクロは、入力のトークンを置き換えるのではなく、生成したコードを追加する。つまり、付けた先のデータ構造の定義は変わらない。

### ヘルパ属性

derive マクロは、関連するヘルパ属性（helper attributes）を宣言できる。たとえば [serde](https://github.com/serde-rs/serde/tree/master/serde_derive) の `Deserialize` derive マクロは、`serde` というヘルパ属性を持つ。この属性が、デシリアライズの処理を制御するためのメタデータになる。

```rust
fn generate_value() -> String {
    "unknown".to_string()
}

#[derive(Debug, Deserialize)]
struct MyData {
    // デシリアライズ時に `value` がなければ、`generate_value` の結果を入れる
    #[serde(default = "generate_value")]
    value: String,
}
```

### 入力のパース

入力のトークン列をパースして [[abstract-syntax-tree|AST]] のノードにする作業は、大半を syn クレートがやってくれる。たとえば [`syn::parse_macro_input!`](https://docs.rs/syn/latest/syn/macro.parse_macro_input.html) は、アイテムのトークン列を、`proc_macro::TokenStream` より扱いやすい [`syn::DeriveInput`](https://docs.rs/syn/latest/syn/struct.DeriveInput.html) に変換する。

## キーワード

- [[derive-macro|derive マクロ]]
- [[procedural-macro|手続き的マクロ]]
- [[abstract-syntax-tree|抽象構文木]]
- [[decorator-pattern|Decorator パターン]]

## 自分の理解

元の定義を残したままコードを追加するところは、[[decorator-pattern|Decorator パターン]]のようなイメージである。
