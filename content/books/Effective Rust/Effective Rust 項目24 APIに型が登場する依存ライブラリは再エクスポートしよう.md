---
title: Effective Rust › APIに型が登場する依存ライブラリは再エクスポートしよう
description: 依存クレートの型を API に含めるライブラリは、そのクレートを再エクスポートすることで、利用者がバージョンの違う同じクレートを扱えるようにすべきだと説く項目
tags: [book-chapter, rust]
date: 2025-01-08
book: "[[Effective Rust]]"
chapter: 24
---

## TL;DR

- ライブラリクレートを作るときは、API に型が登場する依存クレートを再エクスポートする。[[cargo|Cargo]] では、同じクレートの 2 つのバージョンを「直接」使うことはできないが、「間接」的には使える。
- 他のクレートの型を API に含めるかどうかは、事前によく考える。

## 内容

### バージョンの違う同じクレートの共存

Cargo は、バージョンの違う同じライブラリクレートを 1 つのバイナリに透過的にリンクできる。たとえば、バイナリが `rand = "=0.8.5"` に依存し、その依存先の `dep-lib` が `rand = "=0.7.3"` に依存しているとする。

```toml
# Cargo.toml
[dependencies]
rand = "=0.8.5"
dep-lib = { path = "dep-lib" }

# dep-lib/Cargo.toml
[dependencies]
rand = "=0.7.3"
```

この 2 つのバージョンでは `gen_range()` のシグネチャが違う。0.7 系は `low` と `high` の 2 つの引数を取り、0.8 系は範囲を表す 1 つの引数を取る。これは[[breaking-change|破壊的変更]]なので、[[semantic-versioning|SemVer]] の一番左のバージョンが上がっている。それでも、2 つのバージョンを組み合わせたバイナリは問題なく動く。

### 公開依存になると困る

話がややこしくなるのは、ライブラリが依存クレートの型を API の一部として公開する場合である（[公開依存](https://rust-lang.github.io/api-guidelines/necessities.html#public-dependencies-of-a-stable-crate-are-stable-c-stable)）。たとえば `dep-lib` の API に 0.7 系の `Rng` が含まれているとする。

```rust
// dep-lib/src/lib.rs
pub fn pick_number_with<R: Rng>(rng: &mut R, n: usize) -> usize {
    rng.gen_range(0, n)
}
```

この関数をバイナリ側から呼ぶと、コンパイルが通らない。

```rust
// src/main.rs
let mut rng = rand::thread_rng();
let max: usize = rng.gen_range(1..=100);
let choice = dep_lib::pick_number_with(&mut rng, max);
```

バイナリ側の `rng` が実装しているのは 0.8.5 の `RngCore` だが、`dep-lib` が求めているのは 0.7.3 の `RngCore` なので、コンパイルが通らない。

他のクレートの型を API に含めると、そのクレートのメジャーバージョンが上がったときに、自分のクレートもメジャーバージョンを上げなければならなくなる。だから、含める前によく考える。ただし `rand` は標準ライブラリに準じるほど広く使われていて、自身の依存も少ないので、API に含めるのは悪い選択ではない。

### 再エクスポートで解決する

同じクレートの 2 つのバージョンを「直接」使うことはできないが、「間接」的には使える。バイナリ側でこれに対応するのは手間がかかる。たとえば 0.7 系の `rand` を直接使わず、間にラッパのクレートを挟む必要がある。

一方、ライブラリ側での対応は簡単である。API が使っている型か、依存しているクレートそのものを再エクスポートすればよい。この例では、`Rng` や `RngCore` だけでなく `thread_rng` のようなインスタンスを作る関数も使えるようになるので、クレートごと再エクスポートするほうがよい。

```rust
// dep-lib/src/lib.rs
pub use rand;
```

これで、バイナリ側は 0.7 系の `rand` を `dep_lib` 経由で使える。

```rust
// src/main.rs
use dep_lib::rand::Rng;

let mut prev_rng = dep_lib::rand::thread_rng();
let max: usize = prev_rng.gen_range(5, 10);
let choice = dep_lib::pick_number_with(&mut prev_rng, max);
```

## キーワード

- [[cargo|Cargo]]
- [[crate|クレート]]
- [[semantic-versioning|セマンティックバージョニング]]
- [[breaking-change|破壊的変更]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
