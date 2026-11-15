---
title: Effective Rust › RAIIパターンにはDropトレイトを実装しよう
description: 解放が必要なリソースを持つ型には Drop を実装し、RAII パターンでメモリ以外のリソースも管理しようという項目
tags: [book-chapter, rust]
date: 2024-12-26
book: "[[Effective Rust]]"
chapter: 11
---

## TL;DR

- [[raii|RAII パターン]]は、メモリ以外のリソースの管理にも役立つ。
- 解放しなければならないリソースを持つ型には、`Drop` トレイトを実装する。
- `drop` メソッドは直接呼べず、戻り値もない。解放に失敗しうるなら、`Result` を返す `release` メソッドを別に用意する。

## 内容

https://effective-rust.com/raii.html

### メモリ以外のリソース

[[rust|Rust]] は[[ownership|所有権]]によってメモリを管理するが、RAII パターンは他のリソースにも有効である。

> 解放しなければならない何らかのリソースを保持する型には、Drop を実装しよう

たとえば次のようなリソースがある。

- OS のリソース: Unix 系のシステムでは、多くの場合ファイルディスクリプタを持つ。正しく解放しないとリソースを持ち続け、最後にはプロセスごとのファイルディスクリプタの上限に達する
- 同期のためのリソース: メモリの同期には標準ライブラリの `Mutex` や `RwLock` があるが、ファイルロックやデータベースのロックにも同じようなカプセル化が必要になることがある
- 生のメモリ: FFI などで低レベルのメモリ管理を行う `unsafe` な型

### 標準ライブラリの例

`Mutex::lock()` が返す [`MutexGuard`](https://doc.rust-lang.org/std/sync/struct.MutexGuard.html) は RAII パターンの例である。ロックを持っている間は、`MutexGuard` を通して保護されたデータにアクセスする。`MutexGuard` がドロップされると、ロックが解放される。

ロックは長く持たないほうがよい（[[Effective Rust 項目17 状態共有並列実行には気を付けよう|項目17]]）。そこで、ブロックを使って RAII のスコープを狭める。

```rust
impl ThreadSafeInt {
    fn add_with_extras(&self, delta: i32) {
        {
            let mut v = self.value.lock().unwrap();
            *v += delta;
        }
        // ロックを必要としないコードが続く
    }
}
```

### Drop トレイトの実装

[`Drop`](https://doc.rust-lang.org/std/ops/trait.Drop.html) トレイトを実装すると、値が破棄されるときの振る舞いを定義できる。必須のメソッドは `drop` だけで、コンパイラはメモリを解放する直前にこれを呼ぶ。

```rust
#[derive(Debug)]
struct MyStruct(i32);

impl Drop for MyStruct {
    fn drop(&mut self) {
        println!("Dropping {self:?}");
    }
}
```

`drop` メソッドには 2 つの注意点がある。

1 つ目は、`x.drop()` のように明示的に呼べないことである。シグネチャは `drop(&mut self)` で、値の所有権ではなく可変参照を受け取る。明示的に呼べると、リソースを解放したあとの値を使えてしまう。早めに破棄したいときは、[`std::mem::drop`](https://doc.rust-lang.org/std/mem/fn.drop.html) 関数を使う。この関数は引数をムーブで受け取り、中身は空である。

```rust
pub fn drop<T>(_x: T) {}
```

ムーブされた値は、この関数の終わりで破棄される。

2 つ目は、戻り値がないことである。リソースの解放に失敗しうる場合は、`Result` を返す `release` メソッドを作り、失敗を検出できるようにする必要がある。

## キーワード

- [[raii|RAII パターン]]
- [[ownership|所有権]]
- [[trait|トレイト]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
