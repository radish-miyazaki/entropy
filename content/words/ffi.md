---
title: FFI
aliases: [Foreign Function Interface]
description: ある言語から、別の言語で書かれた関数を呼び出したり、別の言語に関数を公開したりする仕組み
tags: [word, rust, プログラミング言語]
date: 2026-11-14
---

## TL;DR

ある言語から、別の言語で書かれたライブラリの関数を呼び出したり、逆に自分の関数を別の言語に公開したりする仕組み。Foreign Function Interface の略。

## 仕組み

The Rustonomicon によると、[[rust|Rust]] では外部ライブラリの関数のシグネチャを `extern` ブロックに並べ、C の [[abi|ABI]] で呼び出す。`#[link(...)]` 属性で、リンカにリンクするライブラリを指示する。

```rust
#[link(name = "snappy")]
unsafe extern "C" {
    fn snappy_max_compressed_length(source_length: size_t) -> size_t;
}
```

逆に Rust の関数を C から呼ぶときは、`extern "C"` で C の呼び出し規約に合わせ、`#[unsafe(no_mangle)]` で名前マングリングを止めてシンボル名を固定する。構造体のレイアウトを C と合わせるには `#[repr(C)]` を付ける。

## 注意点

コンパイラは外部関数の宣言が正しいかを確かめられないので、引数の型を正しく書くことも、実行時の正しさを保つ責任に含まれる。外部の関数は unsafe とみなされ、呼び出しは `unsafe` ブロックで包む必要がある。The Rustonomicon は、すべての入力に対して safe なラッパ関数で、unsafe な呼び出しを隠すよう勧めている。

[[Effective Rust 項目34 FFI境界を通過するものを制御しよう|Effective Rust]] によると、FFI 境界での問題を減らすには、メモリの確保と解放を常に境界のどちらか一方で行い、サイズの決まった整数型を使う。C の宣言と Rust の宣言を手で合わせるのは間違えやすいので、[[rust-bindgen|bindgen]] で自動生成するとよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[abi|ABI]]
- [[rust-bindgen|bindgen]]
- [[encapsulation|カプセル化]]

## 出典

- [Foreign Function Interface - The Rustonomicon](https://doc.rust-lang.org/nomicon/ffi.html)
- [[Effective Rust 項目34 FFI境界を通過するものを制御しよう]]
- [[Effective Rust 項目35 手動でFFIマッピングを書かずにbindgenを用いよう]]
