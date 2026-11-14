---
title: マクロ
aliases: []
description: コードを受け取り、別のコードに展開する仕組み。コードを書くコードであり、メタプログラミングの一種
tags: [word, プログラミング言語]
date: 2026-11-14
---

## TL;DR

コードを受け取り、別のコードに置き換える（展開する）仕組み。The Rust Programming Language では「コードを書くコード」と説明されており、[[metaprogramming|メタプログラミング]]の一種である。

## なぜ必要か

The Rust Programming Language によると、マクロには関数にできないことができる。たとえば [[rust|Rust]] の `println!` は、引数の数を変えて呼べる。また、マクロはコンパイラがコードの意味を解釈する前に展開されるので、与えられた型にトレイトを実装するといったコンパイル時の処理も書ける。[[Effective Rust 項目28 マクロを使うべきケース|Effective Rust]] は、マクロを使う一番の理由を、同じ記述を避けることだとしている。

## 仕組み

Wikipedia によると、C 言語のプリプロセッサのマクロは、コンパイルの前にソースコードをテキストとして置き換える。一方、Lisp のマクロはプログラム自体がリストで表されることを利用して S 式を別の S 式に変換するので、実行前に構文木を自由に操作できる。

[[Effective Rust 項目28 Rust におけるマクロ|Effective Rust]] によると、Rust のマクロはパースされたトークン列や[[abstract-syntax-tree|抽象構文木]]に対して動作する。Rust のマクロには、パターンに一致したコードを置き換える[[declarative-macro|宣言的マクロ]]（`macro_rules!`）と、コードを入力に受け取って新しいコードを出力する手続き的マクロがある。手続き的マクロには、[[derive-macro|derive マクロ]]、[[attribute-macro|属性マクロ]]、[[function-like-macro|関数的マクロ]]の 3 種類がある。

## 例

The Rust Programming Language は、`vec!` を簡略化した定義を例に挙げている。`vec![1, 2, 3]` は、`Vec` を作って各値を `push` するコードに展開される。

```rust
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

[[clojure|Clojure]] の `->` もマクロである。[[Clojure Brain Teasers Evaluation|Clojure Brain Teasers]] によると、`(-> 10 #(+ % 1))` のように無名関数を渡すと、無名関数は呼び出されずに展開されてエラーになる。

## 注意点

The Rust Programming Language によると、マクロの定義は Rust のコードを書く Rust のコードなので、関数の定義より読みにくく、保守しにくい。

Wikipedia によると、C のマクロは単純なテキスト置換なので、引数に `++` や関数呼び出しを渡すと、意図せず複数回評価されることがある。名前空間も使えないので、大規模な開発では名前が衝突する危険がある。展開時の名前の衝突が起きないことを保証したマクロを[[hygienic-macro|健全なマクロ]]と呼ぶ。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[metaprogramming|メタプログラミング]]
- [[hygienic-macro|健全なマクロ]]
- [[declarative-macro|宣言的マクロ]]
- [[derive-macro|derive マクロ]]
- [[attribute-macro|属性マクロ]]
- [[function-like-macro|関数的マクロ]]
- [[cargo-expand|cargo-expand]]
- [[domain-specific-language|ドメイン固有言語]]

## 出典

- [Macros - The Rust Programming Language](https://doc.rust-lang.org/book/ch20-05-macros.html)
- [マクロ (コンピュータ用語) - Wikipedia](<https://ja.wikipedia.org/wiki/マクロ_(コンピュータ用語)>)
- [[Effective Rust 項目28 分別をもってマクロを使おう|Effective Rust 項目28 分別をもってマクロを使おう]]
- [[Clojure Brain Teasers Evaluation|Clojure Brain Teasers Evaluation]]
