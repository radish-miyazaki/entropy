---
title: Effective Rust › 忍び寄るフィーチャに注意しよう
description: Cargo のフィーチャは条件コンパイルの仕組みであり、クレート名と名前空間を共有し、フィーチャ統合が起こるため加法的に設計すべきだと説く項目
tags: [book-chapter, rust]
date: 2025-01-11
book: "[[Effective Rust]]"
chapter: 26
---

## TL;DR

- フィーチャ名とクレート名は同じ名前空間を共有するので、フィーチャを定義するときは依存クレートの名前と衝突しないように注意する。
- [[feature-unification|フィーチャ統合]]が起こるので、フィーチャは加法的であるべきである。そのためには、public な構造体のフィールドやトレイトのメソッドをフィーチャに依存させない。

## 内容

### 条件コンパイル

[[rust|Rust]] では、`#[cfg]` や `#[cfg_attr]` 属性を使って、関数や文、ブロックなどのアイテムをコンパイルの対象にするかを制御できる（条件コンパイル）。属性には `test` のような名前だけを渡すことも、`panic = "abort"` のような名前と値の組を渡すこともできる。同じ名前に複数の値を指定することもできる。

```rust
// `--cfg myname="a" --cfg myname="b"` を付けて実行
#[cfg(myname = "a")]
println!("cfg(myname = 'a') is set");
#[cfg(myname = "b")]
println!("cfg(myname = 'b') is set");
```

フィーチャの値のほかによく使われるのは、ツールチェインがビルド環境を表すために自動で設定する値である。OS（`target_os`）、アーキテクチャ（`target_arch`）、ポインタの幅（`target_pointer_width`）、エンディアン（`target_endian`）、[[atomic-operation|アトミック操作]]をサポートするビット幅（`target_has_atomic`）などがある。これらを使えば、特定のターゲットに固有のコードをそのターゲット向けのビルドでだけコンパイルできるので、移植性が高まる。

### フィーチャ

フィーチャは、クレートの機能を名前で選んで有効にする仕組みである。[[cargo|Cargo]] の機能なので、コンパイラから見れば、フィーチャも他の `cfg` と同じように扱われる。あるクレートで使えるフィーチャを知るには、[[cargo-toml|Cargo.toml]] の `[features]` セクションと、`optional = true` が付いた依存を確かめる。たとえば次の `Cargo.toml` には、5 つではなく 6 つのフィーチャがある。

```toml
[features]
default = ["featureA"]
featureA = []
featureB = []
featureAB = ["featureA", "featureB"]
schema = []

[dependencies]
rand = { version = "^0.8", optional = true }
hex = "^0.4"
```

`default` は特別なフィーチャ名で、デフォルトで有効にするフィーチャを指定する。無効にするには `--no-default-features` を付けるか、依存側で `default-features = false` と書く。`default` もフィーチャ名なので、`#[cfg(feature = "default")]` のように `cfg` で使える。

依存に `optional = true` を付けると、そのクレート名がフィーチャになる。上の例では `rand` もフィーチャで、`#[cfg(feature = "rand")]` で使える。つまり、クレート名とフィーチャ名は同じ名前空間にあるので、フィーチャ名は慎重に選ぶ。この挙動は `[features]` で `rand = ["dep:rand"]` と書けば無効にできる（[Optional dependencies](https://doc.rust-lang.org/cargo/reference/features.html#optional-dependencies)）。依存側で `foo = { package = "foo-lib", version = "1.0" }` のように別名を付けることもできる。

### フィーチャ統合

あるクレートで実際に有効になるフィーチャは、フィーチャ統合が起こるため、自分の `Cargo.toml` からは分からない。`somecrate = { version = "0.3", features = ["featureA", "rand"] }` と書いても、依存グラフの他の場所で指定された別のフィーチャも有効になりうる。

そのため、フィーチャは加法的、つまりどのフィーチャを同時に有効にしても矛盾が起きないようにするべきである。具体的には、次の 2 つを避ける。

- 構造体の public なフィールドをフィーチャに依存させること。利用者のコードで予期しない動作が起きるのを防げる

```rust
#[derive(Debug)]
pub struct ExposedStruct {
    pub data: Vec<u8>,
    #[cfg(feature = "schema")]
    pub schema: String,
}
```

- public なトレイトのメソッドをフィーチャに依存させること。理由は構造体と同じである。ただし、利用者がオーバーライドする必要のないデフォルト実装を持つメソッドは例外である

```rust
pub trait AsCbor: Sized {
    fn serialize(&self) -> Result<Vec<u8>, Error>;
    fn deserialize(data: &[u8]) -> Result<Self, Error>;
    #[cfg(feature = "schema")]
    fn cddl(&self) -> String;
}
```

独立したフィーチャが N 個あるクレートでは、理論上 2^N 通りの組み合わせのビルドが起こりうる。加法的であることを保証するには、これらすべての組み合わせをテストする必要がある。

それでも、フィーチャは広がっていく依存グラフに対して何を公開するかを制御するのに大いに役立つ。特に `no_std` 環境でも使える低レイヤのクレートで有用で、`std` や `alloc` をフィーチャにして、依存する機能を有効にするかを切り替えることが多い。

## キーワード

- 条件コンパイル
- [[feature-unification|フィーチャ統合]]
- [[cargo|Cargo]]
- [[cargo-toml|Cargo.toml]]
- [[atomic-operation|アトミック操作]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
