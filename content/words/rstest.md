---
title: rstest
aliases: []
description: フィクスチャとパラメータ化テストを提供する、Rust のテスティングフレームワーク
tags: [word, rust, テスト]
date: 2024-10-11
---

## TL;DR

[[rust|Rust]] の[[testing-framework|テスティングフレームワーク]]。手続き的マクロを使って、フィクスチャを使うテストと[[parameterized-test|パラメータ化テスト]]を書けるようにする。

## 仕組み

`#[fixture]` を付けた関数はフィクスチャになる。テスト関数は、フィクスチャと同じ名前の引数を書くだけで、その戻り値を受け取れる。フィクスチャが別のフィクスチャを使うこともでき、共通の準備処理を各テストから切り離せる。

`#[case(...)]` を並べると、それぞれの入力でテストが 1 つずつ生成される。引数に `#[values(...)]` で値の一覧を書くと、すべての組み合わせでテストが生成される。

## 例

公式ドキュメントの、フィボナッチ数を確かめるパラメータ化テストの例。

```rust
use rstest::rstest;

#[rstest]
#[case(0, 0)]
#[case(1, 1)]
#[case(2, 1)]
#[case(3, 2)]
#[case(4, 3)]
#[case(5, 5)]
#[case(6, 8)]
fn fibonacci_test(#[case] input: u32,#[case] expected: u32) {
    assert_eq!(expected, fibonacci(input))
}

fn fibonacci(input: u32) -> u32 {
    match input {
        0 => 0,
        1 => 1,
        n => fibonacci(n - 2) + fibonacci(n - 1)
    }
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[parameterized-test|パラメータ化テスト]]
- [[cargo-expand]]
- [[cargo-nextest]]

## 出典

- [rstest - docs.rs](https://docs.rs/rstest/latest/rstest/)
- [la10736/rstest - GitHub](https://github.com/la10736/rstest)
