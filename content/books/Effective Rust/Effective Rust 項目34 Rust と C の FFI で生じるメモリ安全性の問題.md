---
title: Effective Rust 項目34 Rust と C の FFI で生じるメモリ安全性の問題
description: 参照を生ポインタにして FFI 境界に渡すと生存期間の制約が失われるので、RAII パターンのラッパで unsafe なアクセスを safe なコードに閉じ込める
tags: [book-chapter, rust]
date: 2025-01-26
book: "[[Effective Rust]]"
chapter: 34
---

## TL;DR

- Rust の参照を[[raw-pointer|生ポインタ]]にして FFI 境界に渡すと、生存期間の制約が失われ、[[memory-safety|メモリ安全性]]が保証されなくなる。
- メモリの確保と解放が対になるよう、[[raii|RAII パターン]]のラッパを用意する。
- unsafe な FFI ライブラリへのアクセスは、safe な Rust のコードに[[encapsulation|カプセル化]]する。

## 内容

[[Effective Rust 項目34 FFI境界を通過するものを制御しよう|項目34 FFI境界を通過するものを制御しよう]]のうち、メモリ安全性の話である。

### ポインタと参照

ほとんどのデータ構造は[[cpu-register|レジスタ]]に収まらないので、メモリ上に置き、メモリアドレスを通じてアクセスする。C はメモリアドレスをポインタ、つまりアドレスをエンコードした数値で表す。Rust は参照で表す。参照の数値表現は生ポインタとして取り出せ、FFI 境界に渡せる。

```rust
extern "C" {
    pub fn use_struct(v: *const FfiStruct) -> u32;
}

let v = FfiStruct { byte: 1, integer: 42 };
let x = unsafe { use_struct(&v as *const FfiStruct) };
```

### 生ポインタの危険

Rust の参照には生存期間の制約があるが、生ポインタに変換すると失われる。そのため、次の危険がある。

- [[dangling-pointer|ダングリング]]が起きうる。
- C 側でポインタの `const` をキャストで外すと、Rust が不変としているデータが書き換えられうる。
- C 側が誤ってヒープのメモリを `free()` でアロケータに返し、ダングリングを引き起こしうる。

これは、FFI で他の言語のコードを呼ぶことの費用対効果である。費用はメモリ安全性を失うこと、効果は対応する宣言を書く（生成する）だけで既存のコードを再利用できることである。

### RAII パターンのラッパ

危険を和らげるには、メモリの確保と解放が対になるよう、RAII パターンのラッパを用意する（[[Effective Rust 項目11 RAIIパターンにはDropトレイトを実装しよう|項目11]]）。

```rust
extern "C" {
    pub fn new_struct(v: u32) -> *mut FfiStruct;
    pub fn free_struct(s: *mut FfiStruct);
}

struct FfiWrapper {
    // 不変条件: `inner` は NULL ではない
    inner: *mut FfiStruct,
}

impl Drop for FfiWrapper {
    fn drop(&mut self) {
        // 安全性: `inner` は NULL ではない
        unsafe { free_struct(self.inner) }
    }
}
```

ラッパ構造体に包むと、`Result` を使った安全なメソッドを提供できる。

```rust
impl FfiWrapper {
    pub fn new(val: u32) -> Result<Self, String> {
        let p: *mut FfiStruct = unsafe { new_struct(val) };
        if p.is_null() {
            Err("failed to get inner struct!".into())
        } else {
            Ok(Self { inner: p })
        }
    }

    pub fn set_byte(&mut self, b: u8) {
        // 安全性: `inner` が NULL でないという不変条件に依存する
        let r: &mut FfiStruct = unsafe { &mut *self.inner };
        r.byte = b;
    }
}
```

内部のデータ構造を直接操作しても安全なら、`AsRef` や `AsMut` を実装して直接使えるようにしてもよい。

一般化すると、「unsafe な FFI ライブラリへのアクセスを safe な Rust のコードにカプセル化しよう」となる。そうすれば、他の部分で unsafe なコードを書く必要がなくなる。危険なコードが 1 か所に集まるので、厳しく検査してテストする場所も、問題の原因を調べる場所も 1 か所で済む。

## キーワード

- [[ffi|FFI]]
- [[raw-pointer|生ポインタ]]
- [[memory-safety|メモリ安全性]]
- [[dangling-pointer|ダングリングポインタ]]
- [[raii|RAII パターン]]
- [[encapsulation|カプセル化]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
