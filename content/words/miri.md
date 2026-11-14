---
title: Miri
aliases: []
description: Rust のプログラムを解釈実行し、unsafe コードの未定義動作を検出するツール
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

[[rust|Rust]] の未定義動作を検出するツール。バイナリや cargo のテストを実行し、unsafe なコードが安全性の要件を破っていないかを調べる。

## なぜ必要か

`unsafe` を使ったコードでは、コンパイラが検出できないエラーが起きうる。[[Effective Rust 項目16 unsafeコードを書かないようにしよう|Effective Rust]] によると、Miri はコンパイラが出力する中間表現を解釈するので、コンパイラが見つけられないさまざまなエラーを検出できる。

## 仕組み

Miri の README によると、次のような未定義動作を検出できる。

- 範囲外へのアクセスと、解放後の使用（use-after-free）
- 未初期化のデータの使用
- アラインメントが足りないメモリアクセスや参照
- 0 でも 1 でもない `bool` のような、基本的な型の不変条件の違反
- [[data-race|データ競合]]
- Stacked Borrows や Tree Borrows によるエイリアシング規則の違反（実験的な機能）

プログラムの終了時に、グローバルな `static` から到達できないまま確保されているメモリ（メモリリーク）も報告する。

## 例

nightly のツールチェインに追加して使う。テストは `cargo miri test`、バイナリは `cargo miri run` で実行する。

```sh
rustup +nightly component add miri
cargo +nightly miri test
```

## 注意点

README によると、Miri は Rust の仕様違反をすべて検出するわけではなく、検出しなかったことは健全性の証明にならない。1 回の実行で調べるのは 1 つの実行経路だけである。実行は遅く、プラットフォーム固有の API や FFI、ネットワークにはほとんど対応していない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[memory-safety|メモリ安全性]]
- [[data-race|データ競合]]
- [[clippy|Clippy]]

## 出典

- [rust-lang/miri - GitHub](https://github.com/rust-lang/miri)
- [[Effective Rust 項目16 unsafeコードを書かないようにしよう|Effective Rust 項目16 unsafeコードを書かないようにしよう]]
