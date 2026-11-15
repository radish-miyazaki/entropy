---
title: "Effective Rust › 無名の生存期間（'_）"
description: 戻り値の型が生存期間パラメータを持つことを '_ で明示する方法と、名前の要らない生存期間に '_ を使う場面を説明する節
tags: [book-chapter, rust]
date: 2025-01-15
book: "[[Effective Rust]]"
chapter: 14
---

## TL;DR

- `'_` を使うと、生存期間パラメータを持つ型であることを、注釈を省略したまま明示できる。
- `'_` にはコンパイラが一意な名前を付けるので、同じ名前を他で使わない生存期間にも使える。

## 内容

[[Effective Rust 項目14 生存期間を理解しよう|項目14]]の節の 1 つ。

### 生存期間パラメータを持つことを明示する

生存期間パラメータを持つ構造体と[[lifetime-elision|生存期間省略ルール]]が組み合わさると、戻り値の型が生存期間パラメータを持つことがコードから読み取れなくなる。たとえば、次の関数は省略ルールによって 2 行目のように書ける。

```rust
pub fn find_one_item<'a>(items: &'a [Item]) -> ReferenceHolder<'a> {
pub fn find_one_item(items: &[Item]) -> ReferenceHolder {
```

`'_` を使えば、注釈を省略したまま、戻り値が生存期間パラメータを持つことを明示できる。

```rust
pub fn find_one_item(items: &[Item]) -> ReferenceHolder<'_> {
```

### 名前の要らない生存期間

`'_` を使うと、コンパイラが一意な生存期間名を考えてくれる。そのため、同じ生存期間名を他の場所で使う必要がない場合にも役立つ。たとえば `Debug` トレイトの `fmt` メソッドである。

```rust
pub trait Debug {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```

`Formatter` のインスタンスは `&self` とは別の[[lifetime|生存期間]]を持つが、その名前は他で使わない。

## キーワード

- [[lifetime|生存期間]]
- [[lifetime-elision|生存期間省略ルール]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
