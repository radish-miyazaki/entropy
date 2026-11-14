---
title: スマートポインタ
aliases: [smart pointer]
description: ポインタのように振る舞いながら、追加のメタデータと機能を持つデータ構造
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

ポインタのように振る舞いながら、追加のメタデータと機能を持つデータ構造。[[cpp|C++]] で生まれ、[[rust|Rust]] の標準ライブラリにも `Box<T>`、`Rc<T>`、`RefCell<T>` などがある。

## なぜ必要か

[The Rust Programming Language](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html) によると、参照（`&`）はデータを借用するだけで、参照する以上の機能を持たない。一方、スマートポインタは多くの場合、指すデータを所有する。[[Effective Rust]] では、相互に関連するデータ構造を管理するときや、生存期間の制約で参照を使いにくいときに、スマートポインタを使うよう勧めている。`Rc` と `RefCell` を組み合わせると、[[borrow-checker|借用チェッカ]]の制約を避けられることもある。

## 仕組み

Rust のスマートポインタはふつう構造体で実装され、`Deref` トレイトと `Drop` トレイトを実装する。`Deref` によって参照と同じように扱えるので、参照とスマートポインタのどちらでも動くコードを書ける。`Drop` によって、スコープを抜けたときに実行する処理を決められる。

## 例

- `Box<T>`: 値をヒープに確保する
- `Rc<T>`: 参照カウントで、複数の所有者を持てるようにする。スレッド間で共有するときは `Arc<T>` を使う
- `RefCell<T>`: 借用規則をコンパイル時ではなく実行時に検査し、[[interior-mutability|内部可変性]]を実現する

## 注意点

[[Effective Rust 項目15 スマートポインタを活用しよう|Effective Rust 項目15]] によると、`Rc<RefCell<T>>` は借用違反をコンパイルエラーではなく実行時の panic! にする。また、親子が互いを `Rc` で指すと循環参照になり、メモリリークの原因になるので、片方を `Weak<T>` にする。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[interior-mutability|内部可変性]]
- [[borrow-checker|借用チェッカ]]
- [[raii|RAII]]
- [[garbage-collection|ガベージコレクション]]

## 出典

- [Smart Pointers - The Rust Programming Language](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html)
- [[Effective Rust 項目15 スマートポインタを活用しよう|Effective Rust 項目15 スマートポインタを活用しよう]]
