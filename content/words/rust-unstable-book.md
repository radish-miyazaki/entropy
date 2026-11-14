---
title: The Rust Unstable Book
aliases: []
description: Rust のまだ安定化されていない機能を、フィーチャーフラグごとにまとめたドキュメント
tags: [word, rust]
date: 2025-01-02
---

## TL;DR

[[rust|Rust]] のまだ安定化されていない機能をまとめた公式のドキュメント。章はフィーチャーフラグごとに分かれている。

## 仕組み

不安定な機能は、クレートのルートに `#![feature(...)]` を書き、使いたいフィーチャーフラグを並べて有効にする。各ページには、その機能の議論を追うトラッキング issue へのリンクがある。

## 例

コルーチンを使う例。3 つのフィーチャーフラグを有効にしている。

```rust
#![feature(coroutines, coroutine_trait, stmt_expr_attributes)]

use std::ops::{Coroutine, CoroutineState};
use std::pin::Pin;

fn main() {
    let mut coroutine = #[coroutine] || {
        yield 1;
        return "foo"
    };

    match Pin::new(&mut coroutine).resume(()) {
        CoroutineState::Yielded(1) => {}
        _ => panic!("unexpected value from resume"),
    }
    match Pin::new(&mut coroutine).resume(()) {
        CoroutineState::Complete("foo") => {}
        _ => panic!("unexpected value from resume"),
    }
}
```

## 注意点

内容はできる範囲で書かれているもので、正確でなかったり古かったりすることがある。最新の状況はトラッキング issue で確かめる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [The Unstable Book](https://doc.rust-lang.org/beta/unstable-book/the-unstable-book.html)
