---
title: cargo-expand
aliases: []
description: マクロを展開したあとのコードを確認できる Cargo の拡張ツール
tags: [word, rust]
date: 2024-10-11
---

## TL;DR

[[macro|マクロ]]を展開したあとのコードを確認できる [[cargo|Cargo]] の拡張ツール。

## 仕組み

次のコマンドでインストールする。

```sh
cargo install cargo-expand
```

展開する対象はオプションで切り替える。

| コマンド              | 展開する対象       |
| --------------------- | ------------------ |
| `cargo expand`        | 本番のコード       |
| `cargo expand --test` | テストのコード     |
| `cargo expand --lib`  | ライブラリのコード |

## 自分の理解

[[RustによるWebアプリケーション開発 設計からリリース・運用まで]]に出てくる [[rstest]] のフィクスチャを、実際に展開してみた。展開前のコードは次のとおり。

```rust
#[cfg(test)]
mod tests {
    use rstest::{fixture, rstest};

    #[fixture]
    fn 任意のフィクスチャ名() -> i32 {
        42
    }

    #[rstest]
    fn 任意の関数名(任意のフィクスチャ名: i32) {
        assert_eq!(任意のフィクスチャ名 * 2, 84);
    }
}
```

展開すると、フィクスチャ名と同じ名前の構造体が作られ、その `get()` と `default()` が元の関数を呼ぶ形になる。テスト関数の中では `任意のフィクスチャ名::default()` で値を受け取っている。展開後も `fn 任意のフィクスチャ名()` は残っているので、明示的に呼び出すこともできる。

```rust
#[allow(non_camel_case_types)]
struct 任意のフィクスチャ名 {}
impl 任意のフィクスチャ名 {
    #[allow(unused_mut)]
    pub fn get() -> i32 {
        任意のフィクスチャ名()
    }
    pub fn default() -> i32 {
        Self::get()
    }
}
#[allow(dead_code)]
fn 任意のフィクスチャ名() -> i32 {
    { 42 }
}
// ...
fn 任意の関数名() {
    fn 任意の関数名(任意のフィクスチャ名: i32) {
        // assert_eq! を展開したコード
    }
    let 任意のフィクスチャ名 = 任意のフィクスチャ名::default();
    任意の関数名(任意のフィクスチャ名)
}
```

## 関連

- [[macro|マクロ]]
- [[rstest]]

## 出典

- [dtolnay/cargo-expand - GitHub](https://github.com/dtolnay/cargo-expand)
