---
title: Effective Rust 項目30 ユニットテスト以上のものを書こう
description: 単体テストに加えて、統合テスト、ドキュメンテーションテスト、サンプルコード、ベンチマーク、ファズテストをそれぞれの目的に応じて書くよう勧める項目
tags: [book-chapter, rust]
date: 2025-01-16
book: "[[Effective Rust]]"
chapter: 30
---

## TL;DR

- private なコードを含む個々の機能は[[unit-test|単体テスト]]で、public な API は[[integration-test|統合テスト]]で、各 API の使い方は[[doctest|ドキュメンテーションテスト]]で確かめる。どれも `cargo test` で実行する。
- API 全体の使い方はサンプルコードで示し、性能が重要ならベンチマークを測り、信頼できない入力を受け取るコードには[[fuzz-testing|ファズテスト]]を書く。

## 内容

### 単体テスト

単体テストは独立したモジュールに書く。モジュール名は慣習的に `test` か `tests` で、実装と同じファイルに置いても、別のファイルにしてもよい。テストモジュールでは `use super::*` で親モジュールのすべてを取り込んでよい（[[Effective Rust 項目23 ワイルドカードインポートを避けよう|項目23]]の例外）。テストモジュールは、可視性に関係なく親モジュールの中身を使える。

テストの失敗は panic で表すので、テストコードでは `expect` や `unwrap` を使ってよい。`assert!` や `assert_eq!` も失敗すると panic を起こす。[[Effective Rust 項目18 Don't panic|項目18]]はテストには当てはまらない。テスト対象が panic を起こしうるなら、テスト関数に `#[should_panic]` を付ける。

型システムで保証されていることはテストしなくてよい。一方、依存クレートの機能を使うコードにはテストを書くべきである。[[semantic-versioning|SemVer]] には表れない、シグネチャ以外の振る舞いの変化に気づくためである。

### 統合テスト

統合テストは `tests/` に置く。このディレクトリの各ファイルで、`#[test]` が付いたすべての関数が実行される。private なアイテムにはアクセスできないので、public な API だけをテストする。

### ドキュメンテーションテスト

`cargo test` を実行すると、ドキュメンテーションコメントの中のコードが、暗黙に `fn main() {...}` で包まれて実行される（[[Effective Rust 項目27 パブリックインターフェイスのドキュメントを書こう|項目27]]）。`cargo test --doc <item-name>` で対象を指定することもできる。CI で常にテストを実行すれば、サンプルコードと API が食い違うのを防げる。

### サンプルコード

サンプルコードは `examples/` に置く。このディレクトリの各ファイルや、`main.rs` を含むサブディレクトリは、それぞれ独立したバイナリになる。`cargo run --example <name>` や `cargo test --example <name>` で実行できる。サンプルコードはクレートの public な API にしかアクセスできない。CI で定期的に `cargo test --examples` を実行すれば、リグレッションに気づける。

利用者がコピーして使うことを考え、`unwrap` は使わず、`main` 関数の戻り値を `Result<(), Box<dyn Error>>` にして常に `?` を使うほうがよい。

### ベンチマーク

ベンチマークは `cargo bench` で実行する。ただし、実際に測るには `std::test::Bencher` などの[安定化していない API](https://doc.rust-lang.org/beta/unstable-book/library-features/test.html) が必要なので、`cargo +nightly bench` を使う。代わりに [[criterion|criterion]] を使ってもよい。CI で常に実行すれば、コードやツールチェインの変更による性能の悪化にいち早く気づける。

コンパイラの最適化によって、実際より良い結果が出ることがある。たとえば、階乗を求める関数のベンチマークを書く。

```rust
#![feature(test)]
extern crate test;

pub fn factorial(n: u128) -> u128 {
    match n {
        0 => 1,
        _ => n * factorial(n - 1),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[bench]
    fn bench_factorial(b: &mut test::Bencher) {
        b.iter(|| {
            let result = factorial(15);
            assert_eq!(result, 1_307_674_368_000);
        });
    }
}
```

```sh
$ cargo +nightly bench
test tests::bench_factorial ... bench:           0.42 ns/iter (+/- 0.00)
```

結果が速すぎるのは、引数が固定で、対象のコードも小さいため、コンパイラが計算をすべて取り除いて結果だけを返すコードに置き換えたからである。[[compiler-explorer|Godbolt compiler explorer]] でコンパイラが出力したアセンブリを見ると、最適化を確かめられる。

入力を恒等関数 [std::hint::black_box](https://doc.rust-lang.org/std/hint/fn.black_box.html) に通すと、コンパイラに最適化を控えるよう促せる。ただし、[実際に最適化が抑えられるかはコンパイラ次第](https://rust-lang.github.io/rfcs/2360-bench-black-box.html)である。

```rust
let result = factorial(std::hint::black_box(15));
```

```sh
$ cargo +nightly bench
test tests::bench_factorial ... bench:          14.72 ns/iter (+/- 0.48)
```

### ファズテスト

潜在的な攻撃者にコードがさらされるなら、ファズテストを行う。ファズテストはメモリ安全性の確認に使われることが多いので、Rust には不要だと思われがちである。しかし、Rust でもすべてのバグを防げるわけではなく、panic を起こすコードパスがあれば、それだけでサービス拒否攻撃が成り立つ。

Rust のコンパイラは [[llvm|LLVM]] で作られているので、[[cargo-fuzz]] を使えば [[libfuzzer|libFuzzer]] の機能を使える。手順は [Rust Fuzz Book](https://rust-fuzz.github.io/book/) にあり、次のとおりである。

1. 任意のバイト列を入力に取る関数を見つける
2. `cargo fuzz init` でファズテスト用のサブプロジェクト（`fuzz/`）を作る
3. `fuzz_target!` の中でテスト対象の関数を呼ぶ
4. `cargo +nightly fuzz run <ターゲット名>` を実行する。クラッシュするまで、ランダムなデータでテストを続ける

```rust
// fuzz/fuzz_targets/fuzz_target_1.rs
#![no_main]

use libfuzzer_sys::fuzz_target;

fuzz_target!(|data: &[u8]| {
    let _ = some_crate::is_fuzz(data);
});
```

ファズテストは問題を見つけるまでに時間がかかるので、CI で実行するべきではない。新しいリリースや大きな変更のときに限って、一定の期間だけ実行するのがよい。新しいコードパスを見つけたときの入力を保存して再利用すると、既に通ったコードパスを繰り返さず、新しいコードパスの探索に集中できる。

### テストに関する助言

- 変更のたびに、CI ですべてのテスト（ファズテストを除く）を実行する
- バグを直すときは、直す前にバグを再現するテストを書く。修正を確かめられ、同じバグが再発するのも防げる
- クレートにフィーチャがあれば、フィーチャのすべての組み合わせでテストする
- `#[cfg(target_os = "...")]` があれば、すべてのプラットフォームでテストする

## キーワード

- [[unit-test|単体テスト]]
- [[integration-test|統合テスト]]
- [[doctest|ドキュメンテーションテスト]]
- [[fuzz-testing|ファズテスト]]
- [[cargo-fuzz]]
- [[libfuzzer|libFuzzer]]
- [[llvm|LLVM]]
- [[criterion|criterion]]
- [[compiler-explorer|Godbolt compiler explorer]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
