---
title: "Effective Rust › 'static ライフタイム"
description: プログラムの実行中ずっと有効な 'static ライフタイムの意味と、static 変数・const の昇格・Box::leak の 3 つの得かたを説明する節
tags: [book-chapter, rust]
date: 2025-01-15
book: "[[Effective Rust]]"
chapter: 14
---

## TL;DR

- `'static` は、プログラムの実行中ずっと有効な[[lifetime|生存期間]]を表す。
- `'static` な参照は、`static` 変数への参照、`const` な値の昇格、`Box::leak` によるヒープ上の値のリークのいずれかで得られる。

## 内容

[[Effective Rust 項目14 生存期間を理解しよう|項目14]]の節の 1 つ。

### 'static が必要になる場面

引数で参照を受け取らないのに参照を返す関数では、`'static` を指定する必要がある。これにより、戻り値が決してスコープから外れないことを保証できる。

```rust
pub fn the_answer() -> &Item          // コンパイルエラー
pub fn the_answer() -> &'static Item  // OK
```

### 'static な値を得る方法

1 つ目は、`static` なグローバル変数への参照を取ることである。コンパイラは、`static` な値がプログラムの実行中つねに同じアドレスにあり、ムーブしないことを保証する。そのため、その参照の生存期間は常に `'static` になる。

```rust
static ANSWER: Item = Item { contents: 42 };

pub fn the_answer() -> &'static Item {
    &ANSWER
}
```

2 つ目は、`const` な値への参照を `'static` に昇格させることである。ただし、注意点が 2 つある。まず、型がデストラクタ（`Drop`）や[[interior-mutability|内部可変性]]（`RefCell`、`Mutex`、`RwLock`）を持つ場合は昇格されない。そのため、次のコードはコンパイルエラーになる。

```rust
pub struct Wrapper(pub i32);

impl Drop for Wrapper {
    fn drop(&mut self) {}
}

const ANSWER: Wrapper = Wrapper(42);

pub fn the_answer() -> &'static Wrapper {
    &ANSWER
}
```

次に、`const` の値はメモリアドレスが固定されない。値は変わらないがコピーが作られうるので、常に同じアドレスを指す保証はない。

3 つ目は、ヒープに確保した値を `'static` として扱うことである。通常、`Box<T>` に入れた値はドロップされないことを保証できないので、この条件を満たさない。

```rust
{
    let boxed = Box::new(Item { contents: 42 });
    let r: &'static Item = &boxed; // コンパイルエラー
    println!("'static item is {r:?}");
}
```

しかし [Box::leak](https://doc.rust-lang.org/std/boxed/struct.Box.html#method.leak) を使えば、所有している `Box<T>` を消費して、`T` への可変参照に変えられる。この値には所有者がいないので、ドロップされないことを保証できる。

```rust
{
    let boxed = Box::new(Item { contents: 42 });
    let r: &'static Item = Box::leak(boxed);
    println!("'static item is {r:?}");
}
```

ただし、ヒープに確保した値が永遠に解放されないので、メモリリークが起こりうる。それでも、メモリリークは [[rust|Rust]] の[[memory-safety|メモリ安全性]]には影響しない。

## キーワード

- [[lifetime|生存期間]]
- [[interior-mutability|内部可変性]]
- メモリリーク
- [[memory-safety|メモリ安全性]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
