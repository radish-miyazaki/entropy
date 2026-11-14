---
title: 循環参照
aliases: [reference cycle]
description: 値どうしが互いを参照してループになった状態。参照カウントでは解放されず、メモリリークになる
tags: [word, rust, メモリ管理]
date: 2026-11-14
---

## TL;DR

値どうしが互いを参照し合い、参照がループになった状態。[[reference-counting|参照カウント]]で管理していると、ループの中の値のカウントが 0 にならず、メモリリークになる。

## なぜ必要か

木構造のように、親と子が互いを指したいデータ構造はよくある。何も考えずに双方向の参照を作ると、値が解放されなくなる。

## 仕組み

[The Rust Programming Language](https://doc.rust-lang.org/book/ch15-06-reference-cycles.html) によると、[[rust|Rust]] で `Rc<T>` と `RefCell<T>` を組み合わせると、値が互いを指すループを作れる。スコープを抜けてもループの中の値のカウントは 1 のままなので、メモリは解放されない。Rust はメモリリークを完全には防がず、メモリリークはメモリ安全とみなしている。

循環を避けるには `Weak<T>` を使う。`Rc::downgrade` で作る弱い参照は、`strong_count` ではなく `weak_count` を増やす。弱い参照は所有を表さず、値を解放するかどうかに影響しないので、ループに弱い参照が含まれていれば、強い参照が 0 になった時点でループが切れる。弱い参照から値を使うときは `upgrade` を呼び、値が既にドロップされていれば `None` が返る。

## 例

木構造では、親は子を所有し、子は親を所有しない。そこで、親から子へは `Rc`、子から親へは `Weak` で指す。

```rust
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}
```

[[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側]] でも、[[dom|DOM]] ツリーを作るときに同じ理由で `Rc` と `Weak` を使い分けている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[reference-counting|参照カウント]]
- [[interior-mutability|内部可変性]]
- [[garbage-collection|ガベージコレクション]]

## 出典

- [Reference Cycles Can Leak Memory - The Rust Programming Language](https://doc.rust-lang.org/book/ch15-06-reference-cycles.html)
- [std::rc - Rust](https://doc.rust-lang.org/std/rc/index.html)
- [[Effective Rust 項目15 スマートポインタを活用しよう|Effective Rust 項目15]]
