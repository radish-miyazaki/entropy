---
title: Effective Rust › newtypeパターンを活用しよう
description: Newtype パターンで同じ内部型を持つ型を区別し、孤児ルールを回避できるが、内部の型への委譲の手間がかかるという項目
tags: [book-chapter, rust]
date: 2024-12-19
book: "[[Effective Rust]]"
chapter: 6
---

## TL;DR

- [[newtype-pattern|Newtype パターン]]を使うと、同じ内部型を持つ型どうしを区別でき、[[orphan-rule|孤児ルール]]も回避できる。
- 一方で、Newtype に対する操作を内部の型に委譲する手間がかかる。

## 内容

https://effective-rust.com/newtype.html

### 型を区別する

型エイリアスは、事実上ただのドキュメントにすぎない。次のコードでは `PoundForceSeconds` と `NewtonSeconds` を区別できず、`NewtonSeconds` を求める関数に `PoundForceSeconds` を渡してもコンパイルが通ってしまう。

```rust
pub type PoundForceSeconds = f64;
pub type NewtonSeconds = f64;

pub fn update_trajectory(force: NewtonSeconds) { /* ... */ }
```

Newtype パターンでタプル構造体にすれば、取り違えはコンパイルエラーになる。`From` を実装しておけば、変換も簡単に書ける。

```rust
pub struct PoundForceSeconds(f64);
pub struct NewtonSeconds(f64);

impl From<PoundForceSeconds> for NewtonSeconds {
    fn from(val: PoundForceSeconds) -> Self {
        NewtonSeconds(4.44822 * val.0)
    }
}

let new_direction = update_trajectory(thruster_force.into());
```

Newtype パターンは、`bool` の引数の曖昧さをなくすのにも使える。

```rust
struct DoubleSided(pub bool);
struct ColorOutput(pub bool);

fn print_page(sides: DoubleSided, color: ColorOutput) { /* ... */ }
```

メモリ効率やバイナリ互換性が気になるなら、`#[repr(transparent)]` 属性を付けると、内部の型と同じメモリ表現になることが保証される（参考: https://lo48576.gitlab.io/rust-custom-slice-book/defining-slice-types/repr-transparent.html ）。

### 孤児ルールの回避

孤児ルールにより、クレートがある型にトレイトを実装できるのは、そのクレートがトレイトか型のどちらかを定義している場合だけである。そのため、外部クレートの型 `rand::rngs::StdRng` に標準の `fmt::Display` を実装するとコンパイルエラーになる（[E0117](https://doc.rust-lang.org/stable/error_codes/E0117.html)）。

このルールは曖昧さを避けるためにある。[[dependency|依存関係]]にある 2 つのクレートが同じ型に同じトレイトを実装していたら、コンパイラや[[linker|リンカ]]はどちらを選べばよいか分からない。

Newtype で包んだ型は自分のクレートで定義した型になるので、トレイトを実装できる。

```rust
struct MyRng(rand::rngs::StdRng);

impl fmt::Display for MyRng {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> Result<(), fmt::Error> {
        write!(f, "<MyRng instance>")
    }
}
```

### Newtype の制限

Newtype に対する操作は、すべて内部の型に委譲する必要がある。値を使うたびに `.0` が要り、トレイトの実装も Newtype 自身に対して改めて書く必要がある。

```rust
#[derive(Debug, Copy, Clone, Eq, PartialEq, Ord, PartialOrd)]
pub struct NewType(InnerType);

impl fmt::Display for NewType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> Result<(), fmt::Error> {
        self.0.fmt(f)
    }
}
```

## キーワード

- [[newtype-pattern|Newtype パターン]]
- [[orphan-rule|孤児ルール]]
- [[trait|トレイト]]
- [[dependency|依存関係]]
- [[linker|リンカ]]

## 自分の理解

孤児ルールがあるので、オープンクラスのようなことはできない。
