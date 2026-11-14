---
title: クロスコンパイル
aliases: []
description: コンパイラが動いている環境とは別のプラットフォーム向けに実行ファイルを作ること
tags: [word, コンパイラ]
date: 2026-11-14
---

## TL;DR

コンパイラが動いている環境とは別のプラットフォーム向けに、実行ファイルを作ること。そのためのコンパイラをクロスコンパイラと呼ぶ。

## なぜ必要か

Wikipedia によると、組み込みシステムのマイクロコントローラは必要最小限のメモリしか搭載していないことが多く、その上でコンパイラや開発環境を動かすのは現実的でない。また、1 つのビルド環境から複数の OS やアーキテクチャ向けにコンパイルできる。

## 仕組み

GNU autotools の用語では、コードを実際にコンパイルする場所をビルドプラットフォーム、コンパイルしたコードが実行される場所をホストプラットフォームと呼ぶ。

[[rust|Rust]] では、rustup はツールチェインを入れたときにホストのプラットフォーム向けの標準ライブラリしか入れない。別のターゲット向けにビルドするには、`rustup target add` でそのターゲットの標準ライブラリを入れ、`cargo build --target=<ターゲット>` でビルドする。

## 例

[[Effective Rust 項目33 ライブラリコードをno_std互換にすることを検討しよう|Effective Rust 項目33]] では、ライブラリが `no_std` 互換であることを確かめるために、`thumbv6m-none-eabi` のように `std` をサポートしないターゲットへクロスコンパイルするチェックを [[continuous-integration|CI]] に足すことを勧めている。

## 注意点

rustup の `rustup target add` が入れるのは標準ライブラリだけである。クロスコンパイルには、特に[[linker|リンカ]]などの他のツールも必要で、それらは自分で用意する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[linker|リンカ]]
- [[continuous-integration|継続的インテグレーション]]

## 出典

- [[Effective Rust 項目32 CIシステムを設定しよう|Effective Rust 項目32]]
- [[Effective Rust 項目33 ライブラリコードをno_std互換にすることを検討しよう|Effective Rust 項目33]]
- [Cross-compilation - The rustup book](https://rust-lang.github.io/rustup/cross-compilation.html)
- [クロスコンパイラ - Wikipedia](https://ja.wikipedia.org/wiki/クロスコンパイラ)
