---
title: Effective Rust 項目28 Rust におけるマクロ
description: Rust のマクロはトークン列や抽象構文木に対して動作し、宣言的マクロと手続き的マクロの 2 種類がある
tags: [book-chapter, rust]
date: 2025-01-20
book: "[[Effective Rust]]"
chapter: 28
---

## TL;DR

- [[rust|Rust]] の[[macro|マクロ]]は、パースされたトークン列や[[abstract-syntax-tree|抽象構文木]]（AST）に対して動作する。コードの構造を認識できるので、変数の捕捉などマクロにありがちな問題を避けられる。
- マクロには[[declarative-macro|宣言的マクロ]]と[[procedural-macro|手続き的マクロ]]の 2 種類があり、手続き的マクロはさらに 3 種類に分かれる。

## 内容

[[Effective Rust 項目28 分別をもってマクロを使おう|項目28 分別をもってマクロを使おう]]のうち、Rust のマクロの仕組みの話である。

### 他の言語のマクロとの違い

Rust のマクロは、他の言語のマクロと違い、トークン列や AST を扱う。そのため、コードの構造を認識でき、マクロ内の変数が呼び出し側の変数を捕捉してしまうような問題を避けられる。このような性質を持つマクロを[[hygienic-macro|健全なマクロ]]と呼ぶ。

### 2 種類のマクロ

宣言的マクロは、マクロへの入力に応じて、プログラムに任意のコードを挿入する。`println!` がその例である。書き方は [The Rust Reference の Macros By Example](https://doc.rust-lang.org/reference/macros-by-example.html) にある。

手続き的マクロは、パースされたトークンに応じて、プログラムに任意のコードを挿入する。`derive` マクロがその例である。[[dynamic-typing|動的型付け]]言語のような表現力を得つつ、コンパイル時の安全性は保たれる。また、[[reflection|リフレクション]]の制限による不便さを和らげることもできる。

手続き的マクロは、使う側とは別の独立したクレートとして定義する必要がある。そのクレートでは `Cargo.toml` に `proc-macro = true` を設定する。入力のトークン列を処理するには、標準のツールチェーンに含まれる [proc_macro](https://doc.rust-lang.org/proc_macro/index.html) や、[proc-macro2](https://github.com/dtolnay/proc-macro2) を使う。

手続き的マクロは、さらに次の 3 種類に分かれる。

1. [[function-like-macro|関数的マクロ]]: 引数を渡して呼び出す。
2. [[attribute-macro|属性マクロ]]: プログラムの何らかの構文要素に付ける。
3. [[derive-macro|derive マクロ]]: データ構造の定義に付ける。

## キーワード

- [[macro|マクロ]]
- [[abstract-syntax-tree|抽象構文木]]
- [[hygienic-macro|健全なマクロ]]
- [[declarative-macro|宣言的マクロ]]
- [[procedural-macro|手続き的マクロ]]
- [[function-like-macro|関数的マクロ]]
- [[attribute-macro|属性マクロ]]
- [[derive-macro|derive マクロ]]
- [[reflection|リフレクション]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
