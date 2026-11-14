---
title: anyhow
aliases: []
description: アプリケーションでのエラー処理を簡単にする、トレイトオブジェクトを使った Rust のエラー型を提供するクレート
tags: [word, rust]
date: 2024-10-06
---

## TL;DR

[[rust|Rust]] のアプリケーションでエラーを伝播させ、説明を付け足すための[[crate|クレート]]。`std::error::Error` を実装した任意のエラーを包める `anyhow::Error` 型を提供する。

## 仕組み

`anyhow::Result<T>` は `Result<T, anyhow::Error>` の型エイリアスである。これを返す関数の中では、`std::error::Error` を実装したどのエラーも `?` で伝播できる。

`Context` トレイトの `context()` や `with_context()` を使うと、低レベルなエラーに上位の説明を付け足せる。`with_context()` はクロージャを受け取るので、エラーが起きたときだけメッセージを組み立てる。`anyhow!` マクロはフォーマット文字列からその場でエラーを作り、`bail!` マクロはそのエラーで早期リターンする。

## 例

公式ドキュメントの例では、エラーに説明を付け足しながら `?` で伝播させている。

```rust
use anyhow::{Context, Result};

fn main() -> Result<()> {
    ...
    it.detach().context("Failed to detach the important thing")?;

    let content = std::fs::read(path)
        .with_context(|| format!("Failed to read instrs from {}", path))?;
    ...
}
```

## 注意点

anyhow は `derive(Error)` マクロを持たない。独自のエラー型を定義したいときは、`std::error::Error` を自分で実装するか、thiserror などのクレートを使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [anyhow - docs.rs](https://docs.rs/anyhow/latest/anyhow/)
- [dtolnay/anyhow - GitHub](https://github.com/dtolnay/anyhow)
