---
title: Effective Rust 項目28 分別をもってマクロを使おう
description: Rust のマクロをコードを抽象化する手段の 1 つとして捉え、使うべき場面とデメリット、注意点を見極めて使うよう説く項目
tags: [book-chapter, rust]
date: 2025-01-15
book: "[[Effective Rust]]"
chapter: 28
---

## TL;DR

- [[rust|Rust]] の[[macro|マクロ]]は、コードを抽象化する手段の 1 つである。
- [[declarative-macro|宣言的マクロ]]や [[derive-macro|derive マクロ]]には注意点とデメリットがあるので、使うべき場面を見極めて使う。

## 内容

この項目は節ごとにページを分けている。

- [[Effective Rust 項目28 Rust におけるマクロ|Rust におけるマクロ]]
- [[Effective Rust 項目28 マクロはコードを抽象化する 1 つの方法と考える|マクロはコードを抽象化する 1 つの方法と考える]]
- [[Effective Rust 項目28 宣言的マクロを利用する上で注意すべきこと|宣言的マクロを利用する上で注意すべきこと]]
- [[Effective Rust 項目28 derive マクロを利用する上で注意すべきこと|derive マクロを利用する上で注意すべきこと]]
- [[Effective Rust 項目28 マクロを使うべきケース|マクロを使うべきケース]]
- [[Effective Rust 項目28 マクロのデメリット|マクロのデメリット]]
- [[Effective Rust 項目28 マクロを使う上でのアドバイス|マクロを使う上でのアドバイス]]

## キーワード

- [[macro|マクロ]]
- [[declarative-macro|宣言的マクロ]]
- [[derive-macro|derive マクロ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
