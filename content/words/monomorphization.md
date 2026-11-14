---
title: 単相化
aliases: []
description: ジェネリックなコードから、使われる具体的な型ごとにコードのコピーをコンパイル時に生成すること
tags: [word, プログラミング言語]
date: 2026-11-14
---

## TL;DR

[[generics|ジェネリクス]]のコードから、使われる具体的な型ごとにコードのコピーをコンパイル時に生成すること。[[rust|Rust]] はジェネリックな型を実行時に解決せず、単相化する。

## なぜ必要か

rustc 開発ガイドによると、単相化すると速いプログラムが得られる。Java のように型を実行時に解決する方式では、オブジェクトにアクセスするたびにポインタをたどる必要がある。

## 仕組み

rustc 開発ガイドによると、コンパイラは必要な具体的な型ごとに、ジェネリック関数のコードのコピーを作る。[[Effective Rust 項目2 型システムを用いて共通の挙動を表現しよう|Effective Rust]] によると、トレイト境界の検査もこの単相化のときに行われる。[[Effective Rust 項目12 ジェネリクスとトレイトオブジェクトのトレードオフを理解しよう|Effective Rust 項目12]] によると、C++ では同じことをテンプレートのインスタンス化と呼ぶ。

## 例

rustc 開発ガイドによると、コードで `Vec<u64>` と `Vec<String>` を使うと、生成されるバイナリには `Vec` のコードが 2 つ含まれる。

[[go|Go]] のジェネリクスは、純粋な単相化をしない。[[Go の interface と Generics の内部構造と進化|Go の interface と Generics の内部構造と進化]]によると、辞書と GC Shape Stenciling を使い、1 つの関数インスタンスを複数の型で動かしてコードサイズを節約している。

## 注意点

rustc 開発ガイドによると、コードのコピーを作るのでコンパイルに時間がかかり、バイナリも大きくなる。[[Effective Rust 項目12 ジェネリクスとトレイトオブジェクトのトレードオフを理解しよう|Effective Rust]] も、ジェネリクスは速いがバイナリサイズとコンパイル時間が増えるとして、トレイトオブジェクト（[[dynamic-dispatch|動的ディスパッチ]]）との[[trade-off|トレードオフ]]を論じている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[generics|ジェネリクス]]
- [[dynamic-dispatch|動的ディスパッチ]]
- [[featherweight-go|Featherweight Go]]

## 出典

- [Monomorphization - Rust Compiler Development Guide](https://rustc-dev-guide.rust-lang.org/backend/monomorph.html)
- [[Effective Rust 項目12 ジェネリクスとトレイトオブジェクトのトレードオフを理解しよう|Effective Rust 項目12 ジェネリクスとトレイトオブジェクトのトレードオフを理解しよう]]
