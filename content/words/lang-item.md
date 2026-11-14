---
title: language item
aliases: [lang item]
description: Rust のコンパイラが内部で必要とする特別な関数や型
tags: [word, rust]
date: 2024-11-08
---

## TL;DR

[[rust|Rust]] のコンパイラが内部で必要とする特別な関数や型。`#[lang = "..."]` という属性で指定する。

## 例

`copy` は、型がコピーセマンティクスを持つことをコンパイラに伝える language item である。標準ライブラリの `Copy` トレイトの定義を見ると、`#[lang = "copy"]` という属性が付いている。

```rust
#[stable(feature = "rust1", since = "1.0.0")]
#[lang = "copy"]
#[rustc_unsafe_specialization_marker]
#[rustc_diagnostic_item = "Copy"]
pub trait Copy: Clone {
    // Empty.
}
```

`eh_personality` は、スタックのアンワインドを実装する関数を定義するための language item である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[rust-unstable-book|The Rust Unstable Book]]

## 出典

- [lang_items - The Rust Unstable Book](https://doc.rust-lang.org/unstable-book/language-features/lang-items.html)
- [Copy in std::marker - Rust](https://doc.rust-lang.org/std/marker/trait.Copy.html)
