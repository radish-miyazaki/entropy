---
title: Effective Rust › unsafeコードを書かないようにしよう
description: unsafe コードは FFI や低レイヤの実装など必要な場面を除いて自分で書かず、標準ライブラリやクレートがカプセル化したものを使うべきだと説く項目
tags: [book-chapter, rust]
date: 2025-01-04
book: "[[Effective Rust]]"
chapter: 16
---

## TL;DR

- unsafe コードは極力避ける。使ってよいのは、[[ffi|FFI]] や低レイヤの実装、必要な機能が標準ライブラリや [[crates-io|crates.io]] にない場合に限られる。
- 必要な unsafe コードは、ほとんどの場合すでに誰かが書いてカプセル化している。

## 内容

### Rust のメモリ安全性とそのコスト

[[rust|Rust]] の[[memory-safety|メモリ安全性]]は、実行時のオーバーヘッドなしで保証される。その代わり、Rust を書くときは[[borrow-checker|借用チェッカ]]が通るコードを書き、使う参照型を正確に指定する必要がある。

### Unsafe Rust とは

[[unsafe-rust|Unsafe Rust]] は Rust のスーパーセットで、いくつかの制約とそれによる安全の保証を緩める。ブロックの前に `unsafe` と書くと、そのブロックの中では通常の Rust で許されない操作ができる。たとえば、C のポインタのように振る舞う生ポインタを使える。生ポインタは[[borrowing-rules|借用ルール]]の対象外なので、参照外しの時点で有効なメモリを指していることを、プログラマが保証しなければならない。

### なぜ避けるべきか

Rust に移行しても、Rust の中で C のようなコードを書くなら意味がない。ただし、低レベルなライブラリを書く場合や、他の言語のコードと連携する場合など、unsafe コードが必要になる場面もある（[[Effective Rust 項目34 FFI境界を通過するものを制御しよう|項目34]]）。

この項目のタイトルで大事なのは「書く」という部分である。必要な unsafe コードはほとんどの場合すでに誰かが書いているので、上のような場面を除けば、自分で書く必要はほぼない。

### 標準ライブラリとクレートの unsafe コード

標準ライブラリには多くの unsafe コードが含まれている。

- `Rc`、`RefCell`、`Arc` などの[[smart-pointer|スマートポインタ]]は、内部で生ポインタを使って、それぞれ固有の動作を提供する
- `Mutex`、`RwLock` などの同期プリミティブは、内部で OS 固有の unsafe なコードを使う
- [[pin|std::pin::Pin]] は、値がメモリ上で移動しないことを保証する。これにより、自分自身のアドレスを参照する自己参照データ構造を安全に扱える
- `std::sync::atomic` は、プリミティブ型の[[atomic|アトミック]]版を提供する。複数のスレッドが同じ変数を操作しても[[data-race|データ競合]]が起きない
- [std::mem](https://doc.rust-lang.org/std/mem/index.html) の `take`、`swap`、`replace` などは、借用チェッカの制約を避けながらメモリ上の値を操作する

これらを正しく使うにも注意は要るが、unsafe コードはカプセル化されて隠されているので、多くの問題は起きないようになっている。crates.io にも、[once_cell](https://crates.io/crates/once_cell)（一度だけ初期化する値）、[rand](https://crates.io/crates/rand)（乱数生成）、[byteorder](https://crates.io/crates/byteorder)（バイト列と数値の変換）、[cxx](https://crates.io/crates/cxx)（C++ との相互運用）のように、unsafe コードをカプセル化したクレートがある。

### unsafe が必要になったら

FFI で他の言語のコードと連携する場合など、unsafe を使わざるを得ないこともある。その場合でも、unsafe コードをラップする層を作って、unsafe な操作をその中に閉じ込めるのがよい。問題の起きる場所を局所化できる。

unsafe コードを書くときは、次の点に気を付ける。

- [安全性に関するコメント](https://std-dev-guide.rust-lang.org/policy/safety-comments.html)を書き、unsafe コードが依存する前提条件と[[invariant|不変条件]]を記す。[[clippy|Clippy]] はこれに関する警告を出せる（[[Effective Rust 項目29 Clippyに耳を傾けよう|項目29]]）
- unsafe ブロックを最小にして、失敗したときの影響範囲を限る。lint の [unsafe_op_in_unsafe_fn](https://doc.rust-lang.org/edition-guide/rust-2024/unsafe-op-in-unsafe-fn.html) を有効にすると、unsafe 関数の中でも unsafe な操作には明示的な unsafe ブロックが必要になる
- 普段以上にテストを書く（[[Effective Rust 項目30 ユニットテスト以上のものを書こう|項目30]]）
- [[miri|Miri]] で診断する。Miri はコンパイラが出力する中間表現を解釈するので、コンパイラが検出できないさまざまなエラーを見つけられる
- 共有状態があるときは特に、マルチスレッドでの使い方を慎重に考える（[[Effective Rust 項目17 状態共有並列実行には気を付けよう|項目17]]）

## キーワード

- [[unsafe-rust|Unsafe Rust]]
- [[memory-safety|メモリ安全性]]
- [[borrow-checker|借用チェッカ]]
- [[borrowing-rules|借用ルール]]
- [[ffi|FFI]]
- [[smart-pointer|スマートポインタ]]
- [[pin|std::pin::Pin]]
- [[atomic|アトミック]]
- [[data-race|データ競合]]
- [[invariant|不変条件]]
- [[clippy|Clippy]]
- [[miri|Miri]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
