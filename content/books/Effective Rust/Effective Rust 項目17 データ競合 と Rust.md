---
title: Effective Rust › データ競合 と Rust
description: Rust は借用ルールでスレッド間の可変な共有を禁じ、Mutex と Arc を組み合わせて安全に共有させる。そのため安全な Rust ではデータ競合が起きない
tags: [book-chapter, rust]
date: 2025-01-31
book: "[[Effective Rust]]"
chapter: 17
---

## TL;DR

- [[borrowing-rules|借用ルール]]により、可変な値をそのまま複数の[[thread|スレッド]]で共有しようとするとコンパイルエラーになる。
- `Arc<Mutex<T>>` を使うと安全に共有できる。`unsafe` を使わない安全な Rust では、[[data-race|データ競合]]を完全に避けられる。

## 内容

[[Effective Rust 項目17 状態共有並列実行には気を付けよう|項目17 状態共有並列実行には気を付けよう]]のうち、データ競合についての話である。

### 借用ルールが共有を止める

可変参照は同じスコープに 1 つしか作れないので、次の構造体のインスタンスを複数のスレッドで共有しようとするとコンパイルエラーになる。

```rust
pub struct BankAccount {
    balance: i64,
}
```

```rust
let mut account = BankAccount::new();
let _payer = std::thread::spawn(move || pay_in(&mut account));
let _taker = std::thread::spawn(move || take_out(&mut account));
```

### Mutex で包む

コンパイルを通すには、[[synchronization-primitive|同期プリミティブ]]の [`Mutex`](https://doc.rust-lang.org/std/sync/struct.Mutex.html) を使う。C++ の `std::mutex` などとは違い、Rust の `Mutex` は独立したオブジェクトではなく、守りたいデータを包むラッパである。

```rust
pub struct BankAccount {
    balance: std::sync::Mutex<i64>,
}
```

ロックを取る [`Mutex::lock`](https://doc.rust-lang.org/std/sync/struct.Mutex.html#method.lock) は `Result<MutexGuard<T>, PoisonError<MutexGuard<T>>>` を返す。[`MutexGuard`](https://doc.rust-lang.org/std/sync/struct.MutexGuard.html) は [[raii|RAII パターン]]になっていて、スコープの終わりでドロップされるとロックが解除される（[[Effective Rust 項目11 RAIIパターンにはDropトレイトを実装しよう|項目11]]）。

戻り値が `Result` なのは、ロックが [poisoning](https://doc.rust-lang.org/nomicon/poisoning.html#poisoning) の状態になることがあるからである。poisoning とは、ロックを持ったスレッドが panic! を起こし、ロックが正常に解放されなかった状態を指す。ただし、めったに起きないうえ、起きたら即座にプログラムを止めたほうがよい場合が多いので、`unwrap()` で済ませることが多い。

`MutexGuard` は `Deref` と `DerefMut` を実装しているので、中の値へのプロキシとしても使える。

```rust
pub fn balance(&self) -> i64 {
    let balance = *self.balance.lock().unwrap();
    if balance < 0 {
        panic!("** Oh no, gone overdrawn: {}", balance);
    }
    balance
}

pub fn deposit(&self, amount: i64) {
    *self.balance.lock().unwrap() += amount
}

pub fn withdraw(&self, amount: i64) -> bool {
    let mut balance = self.balance.lock().unwrap();
    if *balance < amount {
        return false;
    }
    *balance -= amount;
    true
}
```

借用ルールでは複数の参照を可変にできないので、`balance` を変更するのに、メソッドは `&mut self` ではなく `&self` を受け取っている。これは[[interior-mutability|内部可変性]]の一例である（[[Effective Rust 項目8 参照型とポインタ型に慣れよう|項目8]]）。借用のチェックは事実上コンパイル時から実行時に移り、代わりにスレッド間の同期の仕組みが入る。

### Arc で所有を共有する

`move` によって `account` が 1 つ目のクロージャにムーブし、そのクロージャが終わるとドロップされるので、`balance` を `Mutex` で包んでも、今度は[[lifetime|生存期間]]のエラーが出る。

```rust
let mut account = BankAccount::new();
let _payer = std::thread::spawn(move || pay_in(&account));
let _taker = std::thread::spawn(move || take_out(&account));
```

これを避けるには [`std::sync::Arc`](https://doc.rust-lang.org/std/sync/struct.Arc.html) を使う。

```rust
let account = std::sync::Arc::new(BankAccount::new());
account.deposit(1000);

let account2 = account.clone();
let _taker = std::thread::spawn(move || take_out(&account2));

let account3 = account.clone();
let _payer = std::thread::spawn(move || pay_in(&account3));
```

各スレッドは、[[reference-counting|参照カウント]]付きポインタのコピーをクロージャで受け取る。参照されている `BankAccount` は、参照カウントが 0 になったときにだけドロップされる。

以上から、`unsafe` のコードを除く安全な Rust では、データ競合を完全に避けられる。

## キーワード

- [[data-race|データ競合]]
- [[borrowing-rules|借用ルール]]
- [[mutex|Mutex]]
- [[synchronization-primitive|同期プリミティブ]]
- [[raii|RAII パターン]]
- [[interior-mutability|内部可変性]]
- [[reference-counting|参照カウント]]
- [[thread|スレッド]]
- [[rust|Rust]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
