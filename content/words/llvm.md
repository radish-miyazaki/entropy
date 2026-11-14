---
title: LLVM
aliases: []
description: モジュール化され再利用できる、コンパイラとツールチェーンの技術の集まり
tags: [word, コンパイラ]
date: 2025-01-20
---

## TL;DR

モジュール化され再利用できる、コンパイラとツールチェーンの技術の集まり。「LLVM」は略語ではなく、プロジェクトの正式名称である。

## 仕組み

中心となる LLVM Core は、仕様が明確に定められた中間表現（LLVM IR）を対象にした、最適化とコード生成のライブラリである。このほか、C/C++/Objective-C のコンパイラ Clang、デバッガ LLDB、リンカ LLD、サニタイザなどの実行時ライブラリを含む compiler-rt、C++ 標準ライブラリの libc++ などのサブプロジェクトがある。

## 例

[[rust|Rust]] のコンパイラは LLVM を使って作られている。そのため、LLVM の [[libfuzzer|libFuzzer]] を [[cargo-fuzz]] 経由で Rust から利用できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[libfuzzer|libFuzzer]]
- [[RustによるWebアプリケーション開発 設計からリリース・運用まで 第7章 ビルドスピードの改善]]

## 出典

- [The LLVM Compiler Infrastructure Project](https://llvm.org/)
