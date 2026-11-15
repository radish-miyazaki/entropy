---
title: Effective Rust › 状態共有並列実行には気を付けよう
description: 状態を共有する並列処理はデータ競合、デッドロック、競合状態を招くので、まず避け、避けられなければロックの扱いに気を付けるべきだと説く項目
tags: [book-chapter, rust]
date: 2025-01-16
book: "[[Effective Rust]]"
chapter: 17
---

## TL;DR

- 状態を共有する並列処理は、[[data-race|データ競合]]、[[deadlock|デッドロック]]、[[race-condition|競合状態]]を引き起こす。
- 一番の対策は、状態の共有をやめてチャネルで通信することである。
- 避けられない場合は、ロックの範囲を小さく明確にするなど、デッドロックを防ぐ工夫をする。

## 内容

### 並列処理と Rust

状態を共有する並列処理には 3 つの問題がある。データ競合はデータを壊す可能性がある。デッドロックはプログラムを突然止める可能性がある。競合状態は、実行のタイミング次第でデータを不整合な状態にする。どれも非決定的に起こり、負荷がかかったときに起こりやすいので、デバッグが難しい。

詳しくは次のページにまとめた。

- [[Effective Rust 項目17 データ競合 と Rust|データ競合 と Rust]]
- [[Effective Rust 項目17 Send トレイトと Sync トレイト|Send トレイトと Sync トレイト]]
- [[Effective Rust 項目17 デッドロック と Rust|デッドロック と Rust]]

### 状態の共有を避ける

状態共有並列による問題を避ける一番の方法は、状態を共有しないことである。[[Effective Go|Effective Go]] には次の言葉がある。

> Do not communicate by sharing memory; instead, share memory by communicating.
>
> （メモリを共有して通信してはいけない。通信してメモリを共有しよう。）

[[go|Go]] はこのための[[channel|チャネル]]を言語に組み込んでいる。Rust でも、同等の機能が [`std::sync::mpsc`](https://doc.rust-lang.org/std/sync/mpsc/index.html) モジュールで提供されている。[`channel`](https://doc.rust-lang.org/std/sync/mpsc/fn.channel.html) 関数は `(Sender, Receiver)` の組を返し、特定の型の値を[[thread|スレッド]]間で受け渡せる。

### 避けられないときの注意

状態の共有が避けられない場合は、デッドロックを防ぐために次の点に気を付ける。

まず、互いに整合している必要のあるデータ構造は、1 つの [[mutex|Mutex]] で管理する。次に、ロックの範囲は小さく、見て分かるようにする。できれば、ロックの取得と解放を 1 か所にまとめたヘルパメソッドを用意する。

後からクロージャの中に別のロックを取るコードが足されるとデッドロックが起こりうるので、ロックを保持したままクロージャを呼び出すのもやめる。

```rust
impl SharedState {
    fn with_lock<F>(&self, f: F)
    where
        F: FnOnce(&mut i32),
    {
        let mut data = self.data1.lock().unwrap();
        f(&mut data); // ロックを保持したままクロージャを実行する
    }
}
```

`MutexGuard` を呼び出し元に返すのも避ける。`MutexGuard` はドロップされた時点でロックを解放するが、呼び出し元に返すとロックの範囲が分かりにくくなり、デッドロックやロックの長時間保持の危険が増す。

さらに、[[continuous-integration|CI]] にデッドロックの検出ツールを加える（[[Effective Rust 項目32 CIシステムを設定しよう|項目32]]）。[no_deadlocks](https://github.com/p-avital/no-deadlocks)、[ThreadSanitizer](https://github.com/google/sanitizers)、[parking_lot の deadlock 機能](https://github.com/Amanieu/parking_lot) などがある。

ロックを取る順番を決めた「ロック階層」を設計し、文書にし、テストし、厳しく運用する方法もある。ただし、エンジニアがミスをしないことを前提にした戦略は長い目で見ると失敗するので、最後の手段にする。

マルチスレッドのコードでは、「複雑すぎて間違いが明らかでないコード」ではなく、「単純すぎて間違いがないと明らかに分かるコード」を書こう。

## キーワード

- [[data-race|データ競合]]
- [[deadlock|デッドロック]]
- [[race-condition|競合状態]]
- [[channel|チャネル]]
- [[mutex|Mutex]]
- [[thread|スレッド]]
- [[Effective Go|Effective Go]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
