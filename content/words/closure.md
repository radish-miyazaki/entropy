---
title: クロージャ
aliases: []
description: 関数と、それが定義されたときの環境を組にしたもの。外側のスコープの変数を捕捉して使える
tags: [word, プログラミング言語, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

関数と、その関数が定義されたときの環境を組にしたもの。外側のスコープの変数を捕捉（キャプチャ）するので、そのスコープの外で呼ばれても変数を参照できる。

## なぜ必要か

関数を値として渡したり返したりする言語では、関数が定義された場所の変数を、別の場所で呼ぶときにも使いたいことがある。Wikipedia によると、クロージャは[[higher-order-function|高階関数]]の引数、コールバックやイベントハンドラ、呼び出しをまたいで保持する状態の表現などに使われる。

## 仕組み

Wikipedia によると、クロージャは、第一級関数を持つ言語でレキシカルスコープの名前束縛を実装する手法である。実体は「関数と環境を記録したもの」で、関数が使う外側の変数を、定義したときの値や参照に結び付ける。用語は 1964 年に Peter Landin が定義し、1975 年に Sussman と Steele が Scheme を定義したときに採り入れた。

The Rust Programming Language によると、[[rust|Rust]] のクロージャは変数に保存したり関数の引数に渡したりできる無名関数で、定義したスコープの値を捕捉できる。捕捉の方法は、不変で借用する、可変で借用する、所有権を奪うの 3 つで、`move` を付けると所有権を奪う形を強制できる。本体の振る舞いに応じて、`Fn`、`FnMut`、`FnOnce` のトレイトが実装される。

## 例

```rust
let list = vec![1, 2, 3];
thread::spawn(move || println!("From thread: {list:?}")).join().unwrap();
```

[[gleam|Gleam]] の無名関数も、定義したときにスコープにあった変数を参照できるので、クロージャになる（[[Gleam： Functions]]）。

## 注意点

クロージャと無名関数は同じ意味で使われがちだが、別の概念である。無名関数は名前のない関数リテラルで、クロージャは外側の変数が束縛された関数の値である。また、[[Effective Rust 項目15 自己参照データ構造を避けよう|Effective Rust 項目15]] によると、Rust のコンパイラは `async` ブロックをクロージャのようなものにまとめるので、値とその値への参照の両方を捕捉すると、実質的に自己参照データ構造になる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[higher-order-function|高階関数]]
- [[functional-programming|関数型プログラミング]]
- [[lambda-calculus|ラムダ計算]]

## 出典

- [Closure (computer programming) - Wikipedia](<https://en.wikipedia.org/wiki/Closure_(computer_programming)>)
- [Closures - The Rust Programming Language](https://doc.rust-lang.org/book/ch13-01-closures.html)
- [[Effective Rust 項目2 型システムを用いて共通の挙動を表現しよう|Effective Rust 項目2 型システムを用いて共通の挙動を表現しよう]]
- [[Effective Rust 項目15 自己参照データ構造を避けよう|Effective Rust 項目15 自己参照データ構造を避けよう]]
- [[Gleam： Functions]]
