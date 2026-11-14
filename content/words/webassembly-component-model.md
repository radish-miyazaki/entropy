---
title: WebAssembly Component Model
aliases: []
description: 構造を持つデータの表現や関数呼び出し規約などを定め、WASM どうしの相互運用性を高めるための仕様
tags: [word, webassembly]
date: 2024-10-18
---

## TL;DR

[[webassembly|WebAssembly]] の相互運用性を高めるための仕様。[[webassembly-module|WebAssembly Module]] で起きていた、データ表現、関数呼び出し規約、メモリ管理、例外処理、開発体験の問題を解消する。

## なぜ必要か

WebAssembly Module は、構造を持つデータの表現を定めていない。そのため、関数を呼び出す側と呼び出される側の両方が、同じルールに従う必要があった。

たとえば、次の Rust のコードを WASM にビルドし、JavaScript から呼び出すとする。

```rust
struct A {
    x: u32,
    y: u8,
    z: u16,
}

pub fn get_x(value: &A) -> u32 { value.x }
pub fn get_y(value: &A) -> u8  { value.y }
pub fn get_z(value: &A) -> u16 { value.z }
```

次のように呼び出したくなるが、[[webassembly-instance|WebAssembly Instance]] は[[sandbox|サンドボックス]]で動いており、`a` が置かれたメモリに `get_x` はアクセスできないので、これは動かない。

```js
const a = { x: 1, y: 2, z: 3 }
const x = instance.exports.get_x(a)
```

動かすには、インスタンスの線形メモリにオブジェクトをコピーし、その先頭の位置を引数に渡す必要がある。このとき呼び出し側は、`x`、`y`、`z` の順に値が並ぶこと、バイトオーダがリトルエンディアンであること、値以外のデータが置かれないことを前提にする。しかし、このルールが守られる保証はない。コンパイラや設定によっては `x`、`z`、`y` の順に並ぶこともあり、Rust では `#[repr(C)]` で C と同じ並びを指定する必要がある。

使い方が単純で小規模なうちは、作る人と使う人が話し合うか、ツールをそろえれば済んだ。しかし、複数の WASM ファイルを使い、あるモジュールの関数を別のモジュールにインポートするような大きなプロジェクトが増え、WASM を出力できるツールも増えると、問題が表に出てきた。Component Model は、この 5 つの問題をすべて解決するために作られた。

## 仕組み

Component Model は、次の 3 つの仕様をまとめたものである。

- [[abi|ABI]]（Application Binary Interface）
- [[interface-description-language|IDL]]（インタフェース記述言語）。Component Model では [[wit|WIT]] を使う
- バイナリフォーマット

この仕様に従って作った WASM ファイルが [[webassembly-component|WebAssembly Component]] である。[[wasi|WASI]] の Preview 2 も、Component Model のインタフェースに従って作られている。

## 例

- [[cargo-component]]: Rust のコードを WebAssembly Component としてビルドする
- [[wasmtime|Wasmtime]]: WebAssembly Component を実行するクレートと CLI

## 注意点

2024 年 10 月時点では Phase 1（Feature Proposal）の段階だが、すでに多くのツールが作られ、広く受け入れられている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[webassembly-module|WebAssembly Module]]
- [[webassembly-component|WebAssembly Component]]
- [[wit|WIT]]
- [[wasi|WASI]]
- [[wac]]

## 出典

- [[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]
- [WebAssembly/component-model](https://github.com/WebAssembly/component-model)
- [The WebAssembly Component Model](https://component-model.bytecodealliance.org/)
- [Rust nomicon: repr(C)](https://doc.rust-jp.rs/rust-nomicon-ja/other-reprs.html#reprc)
- [Zenn: MIERUNE](https://zenn.dev/mierune/articles/2ea6dc72a7dd58)
- [Qiita: Component Model](https://qiita.com/sachaos/items/e3a613b018febb898fde#component-model)
