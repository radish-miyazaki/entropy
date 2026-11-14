---
title: mutex
aliases: [ミューテックス, ロック]
description: 共有データに同時に 1 つのスレッドしかアクセスできないようにする、排他制御のための同期プリミティブ
tags: [word, 並行処理]
date: 2026-11-14
---

## TL;DR

共有データが、複数の[[thread|スレッド]]から同時に変更・参照されないようにする[[synchronization-primitive|同期プリミティブ]]。ロックとも呼ぶ。[[mutual-exclusion|排他制御]]（mutual exclusion）を実現する。

## なぜ必要か

Wikipedia によると、スレッドは保護されたデータにアクセスする前にロックを取得する。こうして、ある時点でデータにアクセスできるスレッドを 1 つに限り、[[critical-section|クリティカルセクション]]への同時アクセスを防ぐ。

## 仕組み

Wikipedia によると、効率のよいロックは、test-and-set や compare-and-swap のような[[atomic-operation|アトミック操作]]に頼っている。ロックが空いているかの確認と取得を 1 つの不可分な操作で行わないと、2 つのスレッドが両方ともロックを取れてしまう。多くの実装は、ロックが空くまで要求したスレッドをブロックする。空くまで確認し続ける方式は[[spinlock|スピンロック]]と呼ばれる。

1 つのロックが守るデータの量を粒度と呼ぶ。粒度が粗いとオーバーヘッドは小さいが競合が増え、細かいと競合は減るがオーバーヘッドと[[deadlock|デッドロック]]の可能性が増える。

## 例

[[go|Go]] の `sync.Mutex` は、ゼロ値がロックされていない状態の mutex である。`Lock` を呼んだとき、すでにロックされていれば、呼び出した[[goroutine|ゴルーチン]]は mutex が空くまでブロックする。

[[rust|Rust]] の `std::sync::Mutex` は守るデータを中に持ち、`lock` が返すガードを通してしかデータにアクセスできない。ガードがスコープを抜けると、ロックは自動で解放される（[[raii|RAII]]）。

```rust
use std::sync::{Arc, Mutex};
use std::thread;

let mutex = Arc::new(Mutex::new(0));
let c_mutex = Arc::clone(&mutex);

thread::spawn(move || {
    *c_mutex.lock().unwrap() = 10;
}).join().expect("`thread::spawn` should not fail");
assert_eq!(*mutex.lock().unwrap(), 10);
```

## 注意点

Wikipedia によると、2 つ以上のタスクが互いの持つロックを待つと、デッドロックが起きる。ロックを取る順序を全体で決めておくと防げる。衝突がなくてもロックの取得と解放にはコストがかかり、優先度の低いスレッドがロックを持つと優先度の高いスレッドが待たされる（優先度の逆転）。

Go の `sync.Mutex` は、一度使ったあとにコピーしてはいけない。Rust の `Mutex` は、ロックを持ったスレッドがパニックすると poisoned の状態になり、ほかのスレッドは既定ではデータにアクセスできなくなる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[mutual-exclusion|排他制御]]
- [[semaphore|セマフォ]]
- [[spinlock|スピンロック]]
- [[reader-writer-mutex|reader-writer mutex]]
- [[recursive-mutex|Recursive mutex]]
- [[condition-variable|条件変数]]
- [[futex|futex]]
- [[deadlock|デッドロック]]
- [[message-passing|メッセージパッシング]]

## 出典

- [Lock (computer science) - Wikipedia](<https://en.wikipedia.org/wiki/Lock_(computer_science)>)
- [sync - Go Packages](https://pkg.go.dev/sync#Mutex)
- [Mutex in std::sync - Rust](https://doc.rust-lang.org/std/sync/struct.Mutex.html)
