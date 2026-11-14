---
title: Effective Rust 項目4 標準のError型を使おう
description: 独自のエラー型には std::error::Error を実装し、ライブラリでは enum と thiserror、アプリケーションでは anyhow を使い分けようという項目
tags: [book-chapter, rust]
date: 2024-12-17
book: "[[Effective Rust]]"
chapter: 4
---

## TL;DR

- `std::error::Error` トレイトは実装が簡単なので、エラー型を定義するなら実装する。
- 元になるエラーが複数あるとき、その型を保持する必要があるかを考える。必要なら、アプリケーションでは [[anyhow]] で包む。必要ないなら `enum` で表し、thiserror で変換を定義する。
- いずれにせよ型システムで宣言する（[[Effective Rust 項目1 データ構造を表現するために型システムを用いよう|項目1]]）。

## 内容

https://effective-rust.com/errors.html

### Error トレイト

`Error` はエラーの共通インタフェースとなる標準の[[trait|トレイト]]である。実装するには `Display`（`{}` 用）と `Debug`（`{:?}` 用）も実装する必要がある。メソッドは、非推奨のものを除けば、内部に持つエラーを返す `source` だけである。`source` には `None` を返すデフォルト実装があるので、実装は簡単である。

`Result<T, E>` の `E` は `Error` を実装していなくてもよいが、ラッパが適切な[[trait-bound|トレイト境界]]を書けるように、エラー型には `Error` を実装しておく。なお、`Error` は 1.81 で `std` から `core` に移ったので、`no_std` の環境でも使える（[[Effective Rust 項目33 ライブラリコードをno_std互換にすることを検討しよう|項目33]]）。

### 最小限のエラー

情報を持つ必要がなければ、エラーは `String` でよい。[[stringly-typed|Stringly typed]] が適切な数少ない例である。しかし `String` は `Error` を実装していない。`impl Error for String` は、トレイトも型も自分のクレートのものではないので[[orphan-rule|孤児ルール]]で書けない。型エイリアスも新しい型を作らないので同じである。

そこで [[newtype-pattern|Newtype パターン]]で `String` を包み、`Debug`、`Display`、`Error` を実装する。

```rust
#[derive(Debug)]
pub struct MyError(String);

impl std::fmt::Display for MyError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl std::error::Error for MyError {}

impl From<String> for MyError {
    fn from(value: String) -> Self {
        Self(value)
    }
}
```

`From<String>` を実装しておくと、`?` が自動で `From` の変換を適用する。

### ネストしたエラー

内部のエラーの詳細を呼び出し元に伝えるには、`enum` を使う。

```rust
#[derive(Debug)]
pub enum MyError {
    Io(std::io::Error),
    Utf8(std::string::FromUtf8Error),
    General(String),
}
```

内部のエラーにアクセスできるよう `source` をオーバーライドし、各エラー型からの `From` も実装する。こうすると、ライブラリの利用者は孤児ルールに悩まされず、`?` が変換するので `map_err` も要らない。ただし、安全なエラー型を定義するには定型的なコードが多くなる。`derive` マクロで避けられるが、自作するより thiserror クレートを使うほうがよい。

### トレイトオブジェクト

文字列だけを持つ方法はエラーの詳細を捨ててしまう。`enum` の方法は情報をすべて持てるが、起こりうるエラーをすべて列挙する必要がある。`Box<dyn Error>` のような[[trait-object|トレイトオブジェクト]]を使えば列挙は要らないが、型の情報は消える。`Error` とそのトレイト境界のメソッドは呼べても、元のエラー型のメソッドは呼べない。

さらに、[[dyn-compatibility|トレイトオブジェクト安全性]]や、1 つの型に対するトレイトの実装は 1 つだけという一貫性ルール（coherence rule）のために、`Error` と `From` の両方を実装するのが難しい。次のコードは、標準ライブラリの `impl<T> From<T> for T` という[[blanket-implementation|ブランケット実装]]と衝突し、適用する実装を 1 つに絞れないので、コンパイルエラーになる。

```rust
impl Error for WrappedError {}

impl<E: 'static + Error> From<E> for WrappedError {
    fn from(e: E) -> Self {
        Self::Wrapped(Box::new(e))
    }
}
```

### anyhow とライブラリの例外

[[anyhow]] は、`Box` による間接参照の層を加えてこの問題を解決している。スタックトレースなどの機能もある。

> アプリケーションのエラー処理には anyhow の利用を検討しよう

ただし、ライブラリは例外である（参考: https://nick.groenen.me/posts/rust-error-handling/ ）。ライブラリは使われる環境を予想できないので、利用者が使える具体的なエラー情報を返すべきである。そのため `enum` のエラーを使い、API で `anyhow` に依存するのは避ける（[[Effective Rust 項目24 APIに型が登場する依存ライブラリは再エクスポートしよう|項目24]]）。一方、アプリケーションはエラーをエンドユーザにどう見せるかに注力すべきで、[[dependency|依存関係]]にあるすべてのライブラリのエラーを扱う必要がある（[[Effective Rust 項目25 依存グラフを管理しよう|項目25]]）。`anyhow::Error` などで動的に扱うほうが単純になり、アプリケーション全体で一貫する。

## キーワード

- [[error-handling|エラー処理]]
- [[trait|トレイト]]
- [[newtype-pattern|Newtype パターン]]
- [[stringly-typed|Stringly typed]]
- [[orphan-rule|孤児ルール]]
- [[blanket-implementation|ブランケット実装]]
- [[trait-object|トレイトオブジェクト]]
- [[dyn-compatibility|トレイトオブジェクト安全性]]
- [[anyhow]]
- thiserror

## 自分の理解

`From` の実装が衝突する例をより具体的にすると、次のようになる。

```rust
let error: WrappedError = WrappedError::General("hoge".into());
let wrapped: WrappedError = error.into();
```

このとき、コンパイラは 2 つの候補を検討する。1 つは標準ライブラリの `impl<T> From<T> for T` で、`T = WrappedError` として `WrappedError` をそのまま `WrappedError` に変換する。もう 1 つは自作の実装で、`E = WrappedError` と解釈できてしまう。
