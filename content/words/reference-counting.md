---
title: 参照カウント
aliases: []
description: 値を指す参照の数を数え、数が 0 になったときに値を解放するメモリ管理の手法
tags: [word, rust, メモリ管理]
date: 2026-11-14
---

## TL;DR

リソースを指す参照やポインタの数を記録しておき、数が 0 になったときにそのリソースを解放する手法。[[garbage-collection|ガベージコレクション]]の方式の 1 つとしても使われる。

## なぜ必要か

1 つの値を複数の場所から共有したいとき、誰が最後に使い終わったかを数で管理できる。[Wikipedia](https://en.wikipedia.org/wiki/Reference_counting) によると、参照されなくなった値はすぐに回収されるので、長い停止が起きにくく、値の寿命がはっきり決まる。

## 仕組み

参照を複製するとカウントを 1 増やし、参照を破棄すると 1 減らす。カウントが 0 になったら値を解放する。

[[rust|Rust]] の `Rc<T>` では、`clone` で同じ値を指すポインタが増え、最後の `Rc` が破棄されたときに中の値もドロップされる。`Rc` はアトミックでないカウントを使うのでオーバーヘッドが小さい代わりに、`Send` を実装せず、スレッド間では送れない。マルチスレッドではアトミックにカウントする `Arc` を使う（[std::rc](https://doc.rust-lang.org/std/rc/index.html)）。

## 例

- Rust の `Rc` と `Arc`。値を変更したいときは、`Rc<RefCell<T>>` や `Arc<Mutex<T>>` のように[[interior-mutability|内部可変性]]を持つ型と組み合わせる。
- [[lean|Lean]] は、C にコンパイルしたコードでオブジェクトを参照カウントで管理する。参照カウントを見て、データ構造の更新を破壊的な更新に最適化できる。
- Wikipedia によると、Python や Swift も参照カウントを使う。

## 注意点

参照カウントだけに頼る仕組みは、[[reference-cycle|循環参照]]した値を解放できない。Rust では、カウントを増やさない弱い参照（`Weak`）で循環を断ち切る。また、カウントの更新にはコストがかかり、並行処理ではアトミックに更新する必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[reference-cycle|循環参照]]
- [[garbage-collection|ガベージコレクション]]
- [[interior-mutability|内部可変性]]
- [[atomic-operation|アトミック操作]]

## 出典

- [std::rc - Rust](https://doc.rust-lang.org/std/rc/index.html)
- [Reference counting - Wikipedia](https://en.wikipedia.org/wiki/Reference_counting)
- [[Effective Rust 項目17 Send トレイトと Sync トレイト|Effective Rust 項目17]]
- [[Leanで正規表現エンジンをつくる。そして正しさを証明する]]
