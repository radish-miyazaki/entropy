---
title: イテレータ
aliases: []
description: コレクションの次の要素を、要素がなくなるまで順に返すオブジェクト
tags: [word, プログラミング]
date: 2026-11-14
---

## TL;DR

コレクションなどの次の要素を、要素がなくなるまで 1 つずつ順に返すオブジェクトである。for-each ループと組み合わせて、ループを[[abstraction|抽象化]]するのに使う。

## なぜ必要か

[[Effective Rust]] によると、最近のプログラミング言語は、イテレータと for-each ループでループを抽象化している。for-each はコンテナのすべての要素について繰り返し実行するループで、ループ変数は要素そのものになる。

## 仕組み

[[rust|Rust]] では、`Iterator` トレイトの `next` メソッドがイテレータの中心である。`next` は要素があるあいだ `Some(Item)` を返し、要素がなくなると `None` を返して繰り返しの終わりを知らせる。

```rust
trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}
```

コレクションからイテレータを作る方法は、`&T` を返す `iter()`、`&mut T` を返す `iter_mut()`、`T` を返す `into_iter()` の 3 つが一般的である。`for` ループは、`IntoIterator` トレイトを使ってイテレータに変換する糖衣構文である。

`map`、`filter`、`take` のように、イテレータを受け取って別のイテレータを返す関数をイテレータアダプタと呼ぶ。

## 例

Effective Rust の例では、`iter()` を起点にイテレータ変換をつなげて合計を求めている。

```rust
collection.iter().map(|thing| thing.0).sum()
```

## 注意点

Rust のイテレータとイテレータアダプタは遅延評価で、作っただけでは何も起きない。`next` を呼んで初めて処理が進む。また、`into_iter` で要素を消費すると、元のコレクションは再利用できない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[generator|ジェネレータ]]
- [[effect-gen|Effect.gen]]

## 出典

- [std::iter - Rust](https://doc.rust-lang.org/std/iter/index.html)
- [[Effective Rust 項目9 明示的なループの代わりにイテレータ変換を使用することを検討しよう|Effective Rust 項目9]]
