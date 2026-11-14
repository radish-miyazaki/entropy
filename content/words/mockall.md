---
title: mockall
aliases: []
description: Rust のユニットテストで、トレイトや構造体をモックに置き換えるためのライブラリ
tags: [word, rust, テスト]
date: 2024-09-11
---

## TL;DR

[[rust|Rust]] のモックオブジェクトライブラリ。ユニットテストで、本物のトレイトや構造体を、振る舞いを指定できる代わりのオブジェクトに置き換える。

## 仕組み

モックの作り方は 2 つある。

- `#[automock]` 属性: 多くのトレイトと、`impl` ブロックが 1 つだけの構造体に付けると、`Mock` で始まる名前のモック構造体を生成する
- `mock!` マクロ: `#[automock]` で扱えない場合に使う。`impl` ブロックが複数ある構造体、1 つの型に複数のトレイトを実装する場合、自分で管理していない外部のトレイトなどである

モックのメソッドごとに `expect_<メソッド名>()` が生成され、呼び出しの期待値を設定する。`returning` は引数を受け取るクロージャで戻り値を決め、`return_const` は固定の値を返す。`times` で呼び出し回数を、`with` と `predicate` モジュールの述語で引数の条件を指定できる。呼び出し順を強制する Sequence や、async なトレイトにも対応している。

## 例

`foo` が 4 で 1 回だけ呼ばれ、引数に 1 を足した値を返すモックを作る。

```rust
use mockall::predicate::*;
use mockall::*;

#[automock]
trait MyTrait {
    fn foo(&self, x: u32) -> u32;
}

let mut mock = MockMyTrait::new();
mock.expect_foo()
    .with(predicate::eq(4))
    .times(1)
    .returning(|x| x + 1);
assert_eq!(5, mock.foo(4));
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [mockall - docs.rs](https://docs.rs/mockall/latest/mockall/)
- [Mocking in Rust applications](https://speakerdeck.com/taiki45/mocking-in-rust-applications)
