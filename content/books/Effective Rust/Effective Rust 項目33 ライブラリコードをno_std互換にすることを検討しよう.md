---
title: Effective Rust › ライブラリコードをno_std互換にすることを検討しよう
description: std の多くは core と alloc にあるので、ライブラリを no_std 互換にして CI で確かめることを検討し、メモリ確保の失敗への対応は限られていると知っておく
tags: [book-chapter, rust]
date: 2025-01-24
book: "[[Effective Rust]]"
chapter: 33
---

## TL;DR

- `std` クレートの多くは、`core` と `alloc` で定義されている。
- 軽い対応でライブラリを [[no-std|no_std]] 互換にできるなら検討し、互換であることを [[continuous-integration|CI]] で確かめよう。
- ヒープが限られ、メモリ確保が失敗しうる環境では、ライブラリのサポートがまだ限られていることを知っておこう。

## 内容

### no_std とは

[`std`](https://doc.rust-lang.org/std/) クレートの一部は、`std::vec::Vec` のようにプレリュードで自動的にインポートされる。しかし [[rust|Rust]] は、[[bootloader|ブートローダ]]やファームウェアのような組み込み環境など、`std` を提供できない環境向けのビルドもサポートしている。こうした環境向けのクレートは、`src/lib.rs` のトップレベルに `#![no_std]` を付ける。

### core

制限の強いプラットフォームでも、`Option` や `Result` のような標準ライブラリの基本的な型は使える。名前は `core::` から始まるが、`std::` の型は `core::` の型を再エクスポートしたものなので、`std::` の型と同じように動く。`no_std` の環境では、これらを明示的に `use` する。`core` はヒープにメモリを確保しないので、ベクタやマップ、セットは提供しない。

### alloc

`alloc` は、ヒープへのメモリ確保を使う機能を提供するクレートである。`core` と同じく、`std::vec::Vec` は `alloc::vec::Vec` を再エクスポートしたものである。`no_std` のクレートで使うときは、`extern crate alloc;` と書く。`Box`、`Rc`、`Arc`、`Vec`、`String`、`format!`、`BTreeMap`、`BTreeSet` などが使える。

ただし、`HashMap` と `HashSet` はハッシュ衝突攻撃を防ぐために乱数のシードを使っていて、安全な乱数の生成には OS が必要なので、使えない。代わりに `BTreeMap` や `BTreeSet` を使う。`std::sync::Mutex` などの同期機構も、OS 固有の[[synchronization-primitive|同期プリミティブ]]に頼っているので、使えない。no_std でスレッドセーフなコードを書くなら、[spin-rs](https://github.com/mvdnes/spin-rs) などのサードパーティのライブラリを使う。

### no_std に向けてコードを書く

ライブラリを `no_std` 互換にするには、依存ライブラリも `no_std` 互換でなければならない。しかし、`std` に依存するライブラリがあっても、コンパイラは何も警告しない。そのため、`no_std` のビルドのチェックを CI に足そう。`thumbv6m-none-eabi` のように `std` をサポートしないターゲットへ[[cross-compilation|クロスコンパイル]]すればよい。

軽い対応で `no_std` 互換にできるなら、再利用しやすくするために検討しよう。互換にできない部分が一部だけなら、クレートにフィーチャを足し、その部分だけ `std` を使う。慣習として、`std` 固有の機能のフィーチャは `std`、`alloc` 固有の機能のフィーチャは `alloc` と名付ける。

```rust
#![cfg_attr(not(feature = "std"), no_std)]

#[cfg(feature = "alloc")]
extern crate alloc;
```

ある利用者が `std` なしで使っても、別の依存ライブラリが同じクレートを `std` 付きで使えば、[[feature-unification|フィーチャ統合]]で両方が有効になるので、フィーチャは加法的にする（[[Effective Rust 項目26 忍び寄るフィーチャに注意しよう|項目26]]）。CI ではフィーチャのすべての組み合わせをビルドしよう。

### 失敗しうるメモリ確保

ヒープは使えても、容量が限られてメモリ確保が失敗しうる環境もある。しかし `alloc` は、ヒープの確保が失敗しないことを前提にしている。普通の環境ではメモリは事実上無制限で、枯渇したらシステム全体がより大きな問題を抱えているので、この前提でコードが書きやすくなっている。一方、メモリの限られた環境には向かない。そこでは、`malloc` が `NULL` を返すかを確かめる C や、`std::bad_alloc` 例外で失敗を捕まえられる C++ のほうが向いている。

確保に失敗したときの挙動は、ツールチェーン、ビルドターゲット、[設定](https://doc.rust-lang.org/std/alloc/fn.set_alloc_error_hook.html)で変わるが、多くの場合 panic してプログラムが止まる。

この点は [Linux カーネル](https://lkml.org/lkml/2021/4/14/1099)、Android、[curl](https://github.com/hyperium/hyper/issues/2265#issuecomment-693194229) などで指摘され、回避策が用意されてきた。1 つは、失敗しうる操作に `Result<_, AllocError>` を返す `try_*` の代替メソッドを足すことである。[`Vec::try_reserve`](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.try_reserve) や [`Box::try_new`](https://doc.rust-lang.org/std/boxed/struct.Box.html#method.try_new) がある。ただし、まだ少ないので、`Vec::push` などは自分で工夫する。

```rust
fn try_build_a_vec() -> Result<Vec<u8>, String> {
    let mut v = Vec::new();

    // 必要なサイズは、無駄な確保や不足による失敗を避けるよう慎重に決める
    let required_size = 4;

    // 成功すれば、以降の push でメモリ確保が起きないことが保証される
    v.try_reserve(required_size)
        .map_err(|_e| format!("Failed to allocate {} items!", required_size))?;

    v.push(1);
    v.push(2);
    v.push(3);
    v.push(4);

    Ok(v)
}
```

もう 1 つは [`no_global_oom_handling`](https://github.com/rust-lang/rust/pull/84266) で、失敗しないことを前提にしたメモリ確保の操作を無効にできる。

## キーワード

- [[no-std|no_std]]
- [[cross-compilation|クロスコンパイル]]
- [[feature-unification|フィーチャ統合]]
- [[synchronization-primitive|同期プリミティブ]]
- [[continuous-integration|CI]]
- [[bootloader|ブートローダ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
