---
title: Effective Rust 項目34 FFI境界を通過するものを制御しよう
description: FFI 境界での問題を減らすため、unsafe な FFI コードを safe なラッパで包み、メモリの確保と解放を片側に寄せ、panic! を境界の外に出さないよう説く項目
tags: [book-chapter, rust]
date: 2025-01-24
book: "[[Effective Rust]]"
chapter: 34
---

## TL;DR

- C のシンボルは、1 つのグローバルな名前空間に存在する。
- [[ffi|FFI]] 境界での問題を減らすには、unsafe な FFI コードを safe なラッパで包み、メモリの確保と解放を常に境界のどちらか一方で行い、サイズの決まった整数型を使う。
- `panic!` は[[undefined-behavior|未定義動作]]を引き起こしうるので、FFI 境界を越えさせない。

## 内容

### FFI 境界で守ること

FFI（Foreign Function Interface）では、関数だけでなくデータ構造もやりとりできる。FFI 境界で問題が起きる可能性を減らすには、次のことを守る。

- unsafe な FFI コードを safe なラッパで包む。
- メモリの確保と解放は、常に境界のどちらか一方で行う。Rust 側で行うなら [[raii|RAII パターン]]を使える（[[Effective Rust 項目11 RAIIパターンにはDropトレイトを実装しよう|項目11]]）。
- `uint32_t` のようにサイズの決まった整数型を使う。
- `CString`、`CStr`、`Box::into_raw` と `Box::from_raw` など、標準ライブラリの FFI 用のヘルパを使う。
- `panic!` を FFI 境界の外に出さない（[[Effective Rust 項目18 Don't panic|項目18]]）。

### 詳細

詳しくは次のページにまとめた。

1. [[Effective Rust 項目34 Rust から C の関数を呼び出す|Rust から C の関数を呼び出す]]
2. [[Effective Rust 項目34 Rust から C のライブラリを呼び出す|Rust から C のライブラリを呼び出す]]
3. [[Effective Rust 項目34 Rust から C のデータにアクセスする|Rust から C のデータにアクセスする]]
4. [[Effective Rust 項目34 Rust と C の FFI で生じるメモリ安全性の問題|Rust と C の FFI で生じるメモリ安全性の問題]]
5. [[Effective Rust 項目34 C から Rust のコードを呼び出す|C から Rust のコードを呼び出す]]

## キーワード

- [[ffi|FFI]]
- [[raii|RAII パターン]]
- [[undefined-behavior|未定義動作]]
- [[rust|Rust]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
