---
title: 関数的マクロ
aliases: [function-like macro]
description: 関数のように呼び出す Rust の手続き的マクロで、引数のトークン列を受け取り任意のトークン列を返す
tags: [word, rust, 手続き的マクロ]
date: 2025-01-21
---

## TL;DR

名前のとおり、関数のように呼び出せる [[rust|Rust]] の[[procedural-macro|手続き的マクロ]]。引数のトークン列を受け取り、任意のトークン列を返す。

## 仕組み

関数的マクロは引数を **1 つ**だけ持つ。`my_func_macro!(15, x + y, f32::consts::PI);` のように複数の引数を渡しても、内部では 1 つのトークン列として扱われる。呼び出しの区切り記号の内側がそのまま入力になり、返したトークン列が呼び出し全体と置き換わる。

定義するには、`proc-macro = true` を設定したクレートで、関数に `#[proc_macro]` 属性を付ける。

## 例

受け取ったトークンを出力するだけのマクロは次のようになる。

```rust
use proc_macro::TokenStream;

#[proc_macro]
pub fn my_func_macro(args: TokenStream) -> TokenStream {
    println!("Input Token Stream is:");
    for tt in args {
        println!("  {tt:?}");
    }
    TokenStream::new()
}
```

`my_func_macro!(15, x + y, f32::consts::PI);` を渡すと、次のように出力される。

```
Input Token Stream is:
  Literal { kind: Integer, symbol: "15", suffix: None, span: #0 bytes(90..92) }
  Punct { ch: ',', spacing: Alone, span: #0 bytes(92..93) }
  Ident { ident: "x", span: #0 bytes(94..95) }
  Punct { ch: '+', spacing: Alone, span: #0 bytes(96..97) }
  Ident { ident: "y", span: #0 bytes(98..99) }
  Punct { ch: ',', spacing: Alone, span: #0 bytes(99..100) }
  Ident { ident: "f32", span: #0 bytes(101..104) }
  Punct { ch: ':', spacing: Joint, span: #0 bytes(104..105) }
  Punct { ch: ':', spacing: Alone, span: #0 bytes(105..106) }
  Ident { ident: "consts", span: #0 bytes(106..112) }
  Punct { ch: ':', spacing: Joint, span: #0 bytes(112..113) }
  Punct { ch: ':', spacing: Alone, span: #0 bytes(113..114) }
  Ident { ident: "PI", span: #0 bytes(114..116) }
```

## 注意点

上の出力から分かるように、引数で渡ってくる値は低レベルなので、実装するときは自分でパースする必要がある。たとえば複数の引数を受け取るなら、カンマで区切るために `TokenTree::Punct` を探さなければならない。syn クレートを使うとパースが楽になるが、それでも[[declarative-macro|宣言的マクロ]]を使うほうが簡単である。一方で、関数的マクロは通常の Rust のコードとしてはパースできない入力も受け取れる柔軟さを持つ。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[attribute-macro|属性マクロ]]
- [[derive-macro|derive マクロ]]
- [[declarative-macro|宣言的マクロ]]
- [[Effective Rust 項目28 Rust におけるマクロ]]

## 出典

- [[Effective Rust]]
- [Procedural Macros - The Rust Reference](https://doc.rust-lang.org/reference/procedural-macros.html)
