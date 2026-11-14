---
title: Effective Rust 項目28 マクロを使う上でのアドバイス
description: マクロは抽象化の唯一の方法である場合やボイラープレートに限って使い、通常のコードに見た目を合わせ、型ごとのコード生成には derive マクロを使う
tags: [book-chapter, rust]
date: 2025-01-21
book: "[[Effective Rust]]"
chapter: 28
---

## TL;DR

- [[macro|マクロ]]は、コードを[[abstraction|抽象化]]する唯一の方法である場合や、関数や[[generics|ジェネリクス]]ではまとめられないボイラープレートに使う。
- 可読性を保つため、マクロは通常のコードに見た目を近づけるか、まったく違う見た目にする。
- 構造体のフィールドや `enum` のバリアントごとにコードを生成するなら [[derive-macro|derive マクロ]]を使い、先に既存のクレートを探す。

## 内容

[[Effective Rust 項目28 分別をもってマクロを使おう|項目28 分別をもってマクロを使おう]]のうち、マクロを使うときの指針である。

### 使う場面を絞る

マクロは、コードを抽象化できる唯一の方法である場合に使う。関数やジェネリクスではまとめられない[[boilerplate-code|ボイラープレート]]にも使う。

### 見た目を通常のコードに近づける

[[Effective Rust 項目28 マクロのデメリット|可読性を損なわない]]ように、マクロは通常のコードに見た目を近づけるか、まったく違う見た目にする。具体的には、暗黙に参照を挿入するのは避ける。`my_macro!(list)` より `my_macro!(&list)` のほうが Rust のコードの書き方に合っている。また、`break` や `return` のように、マクロの外に影響する制御フローは使わない（[[Effective Rust 項目28 宣言的マクロを利用する上で注意すべきこと|宣言的マクロを利用する上で注意すべきこと]]）。

### 型ごとのコード生成には derive マクロを使う

構造体の各フィールドや `enum` の各バリアントに対してコードを生成するなら、derive マクロを使う。型全体を生成する[[Effective Rust 項目28 マクロを使うべきケース|マクロ]]で書くより、コードが読みやすくなる。

ただし、derive マクロを足すときも、同じ機能のマクロを外部のクレートが提供していないか先に探す。たとえば、整数値を C 風の `enum` のバリアントに変換するクレートはいくつもある。

```rust
#[repr(u8)]
enum Color {
    Red = 0,
    Green = 1,
    Blue = 2,
}
```

- [`enumn::N`](https://docs.rs/enumn/0.1.14/enumn/derive.N.html)
- [`num_enum::TryFromPrimitive`](https://docs.rs/num_enum/latest/num_enum/trait.TryFromPrimitive.html)
- [`num_derive::FromPrimitive`](https://docs.rs/num-derive/latest/num_derive/derive.FromPrimitive.html)
- [`strum::FromRepr`](https://docs.rs/strum/latest/strum/derive.FromRepr.html)

## キーワード

- [[macro|マクロ]]
- [[abstraction|抽象化]]
- [[generics|ジェネリクス]]
- [[boilerplate-code|ボイラープレート]]
- [[derive-macro|derive マクロ]]
- [[procedural-macro|手続き的マクロ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
