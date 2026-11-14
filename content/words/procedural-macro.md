---
title: 手続き的マクロ
aliases: []
description: コンパイル時に関数を実行し、トークン列を受け取って新しいトークン列を返す Rust のマクロ
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

コンパイル時に関数を実行して構文を拡張する [[rust|Rust]] の[[macro|マクロ]]。トークン列（`TokenStream`）を受け取り、新しいトークン列を返す。関数的マクロ、derive マクロ、属性マクロの 3 種類がある。

## 仕組み

The Rust Reference では、手続き的マクロを「[[abstract-syntax-tree|AST]] から別の AST への関数のようなもの」と説明している。ただし、トークン列のほうがコンパイラにとってもマクロにとっても長く安定したインタフェースになるので、実際には AST のノードではなくトークン列を扱う。

3 種類のマクロは定義に付ける属性で区別する。

- [[function-like-macro|関数的マクロ]]: `custom!(...)` の形で呼ぶ。`#[proc_macro]` で定義する
- [[derive-macro|derive マクロ]]: `#[derive(CustomDerive)]` の形で使う。`#[proc_macro_derive]` で定義し、出力は入力の要素の後ろに追加される
- [[attribute-macro|属性マクロ]]: `#[CustomAttribute]` の形で使う。`#[proc_macro_attribute]` で定義し、出力は付けた要素を置き換える

手続き的マクロは、クレートの種類が `proc-macro` の[[crate|クレート]]のルートで定義する必要がある。定義したクレートの中では使えず、別のクレートから import して使う。[[cargo|Cargo]] では、マニフェストに次のように書く。

```toml
[lib]
proc-macro = true
```

## 例

The Rust Reference の関数的マクロの例では、`answer` 関数を生成している。

```rust
#[proc_macro]
pub fn make_answer(_item: TokenStream) -> TokenStream {
    "fn answer() -> u32 { 42 }".parse().unwrap()
}
```

## 注意点

手続き的マクロはコンパイル中に実行され、コンパイラと同じ資源にアクセスできる。そのため、Cargo のビルドスクリプトと同じセキュリティ上の懸念がある。また、無限ループはコンパイラが検知できず、コンパイルが止まってしまう。

手続き的マクロは[[hygienic-macro|健全なマクロ]]ではなく、出力したトークン列がその場に直接書かれたかのように振る舞う。名前の衝突を避けるには、`::std::option::Option` のような絶対パスや、`__internal_foo` のような独特な名前を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[macro|マクロ]]
- [[declarative-macro|宣言的マクロ]]
- [[function-like-macro|関数的マクロ]]
- [[derive-macro|derive マクロ]]
- [[attribute-macro|属性マクロ]]
- [[hygienic-macro|健全なマクロ]]

## 出典

- [Procedural macros - The Rust Reference](https://doc.rust-lang.org/reference/procedural-macros.html)
