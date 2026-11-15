---
title: Effective Rust › Send トレイトと Sync トレイト
description: スレッド間での利用を表す 2 つのマーカトレイト Send と Sync の意味と、実装していない代表的な型
tags: [book-chapter, rust]
date: 2025-01-31
book: "[[Effective Rust]]"
chapter: 17
---

## TL;DR

- `Send` は値の所有権をスレッド間で渡せること、`Sync` は `&T` をスレッド間で渡せること（複数スレッドから安全に参照できること）を示すマーカトレイトである。
- どちらも自動トレイトなので、実装していない型（`Rc<T>`、`Cell<T>`、`RefCell<T>`、生ポインタ）を押さえておけばよい。

## 内容

[[Effective Rust 項目17 状態共有並列実行には気を付けよう|項目17 状態共有並列実行には気を付けよう]]のうち、`Send` と `Sync` についての話である。

### 2 つのマーカトレイト

[[thread|スレッド]]間での利用に関わるマーカトレイトが 2 つある。

- [`std::marker::Send`](https://doc.rust-lang.org/std/marker/trait.Send.html): 型 `T` の値をスレッド間で転送できることを示す。値の[[ownership|所有権]]をスレッドからスレッドへ渡せる。
- [`std::marker::Sync`](https://doc.rust-lang.org/std/marker/trait.Sync.html): 型 `T` の値に、[[borrowing-rules|借用ルール]]の範囲内で複数のスレッドから安全にアクセスできることを示す。言い換えると、`&T` をスレッド間で転送できる。

### 実装していない型に注目する

`Send` と `Sync` は自動トレイトで、新しい型の構成要素がすべて `Send` / `Sync` を実装していれば、コンパイラが自動で実装する。ほとんどの安全な型は実装しているので、実装していない型（`impl !Sync for ...`）に注目するとよい。一覧は [`Sync` の Implementors](https://doc.rust-lang.org/std/marker/trait.Sync.html#implementors) で確認できる。

`Send` を実装していない型は、1 つのスレッドの中でしか使えない。たとえば `Rc<T>` は、同期の仕組みを持たない[[reference-counting|参照カウント]]ポインタである。実行速度を優先して、明示的にシングルスレッドを前提にしている。マルチスレッドで使いたいときは `Arc<T>` を使う。

`Sync` を実装していない型は、複数のスレッドから不変参照を通して安全にアクセスできない。たとえば `Cell<T>` や `RefCell<T>` は、同期せずに[[interior-mutability|内部可変性]]を提供する。マルチスレッドで使いたいときは `Mutex<T>` や `RwLock<T>` を使う。

また、`*const T` や `*mut T` などの[[raw-pointer|生ポインタ]]の型も、`Send` と `Sync` を実装していない（[[Effective Rust 項目34 FFI境界を通過するものを制御しよう|項目34]]）。

## キーワード

- マーカトレイト
- 自動トレイト
- [[ownership|所有権]]
- [[borrowing-rules|借用ルール]]
- [[reference-counting|参照カウント]]
- [[interior-mutability|内部可変性]]
- [[raw-pointer|生ポインタ]]
- [[thread|スレッド]]
- [[rust|Rust]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
