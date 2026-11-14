---
title: Effective Rust 項目14 データ構造の生存期間
description: 参照を含むデータ構造には生存期間パラメータが必須で、注釈が外側の型へ伝播するため、できるだけ値を所有するデータ構造を使うべきだと説く節
tags: [book-chapter, rust]
date: 2025-01-15
book: "[[Effective Rust]]"
chapter: 14
---

## TL;DR

- 参照を含むデータ構造には、生存期間パラメータとライフタイム注釈が必須であり、その注釈は外側のデータ構造にも伝播する。
- このようなデータ構造は扱いにくいので、できるだけ参照ではなく値を[[ownership|所有]]するデータ構造を使う。

## 内容

[[Effective Rust 項目14 生存期間を理解しよう|項目14]]の節の 1 つ。

### 参照を含むデータ構造

データ構造には[[lifetime-elision|生存期間省略ルール]]が適用されないので、構造体などのデータ構造がスライスなどの参照を含む場合、生存期間パラメータとライフタイム注釈は必須である。

```rust
pub struct ReferenceHolder<'a> {
    pub index: usize,
    pub item: &'a Item,
}
```

データ構造が複数の参照を含むときは、適切な注釈の組み合わせを選ぶ必要がある。2 つの異なる文字列の部分文字列を参照するなら、注釈を分ける。

```rust
// 2 つの文字列の両方に存在する部分文字列
pub struct LargestCommonSubstring<'a, 'b> {
    pub left: &'a str,
    pub right: &'b str,
}

// left と right の両方に存在する最長の部分文字列を見つける
pub fn find_common<'a, 'b>(
    left: &'a str,
    right: &'b str,
) -> Option<LargestCommonSubstring<'a, 'b>> {
    // ...
}
```

1 つの文字列の中で繰り返される部分文字列を参照するなら、注釈は 1 つでよい。

```rust
pub struct RepeatedSubstring<'a> {
    pub first: &'a str,
    pub second: &'a str,
}

pub fn find_repeat<'a>(s: &'a str) -> Option<RepeatedSubstring<'a>> {
    // ...
}
```

### 注釈の伝播

データ構造のライフタイム注釈は伝播する。注釈を持つ型を中に含むデータ構造にも、注釈が必要になる。

```rust
pub struct RefHolderHolder<'a> {
    pub inner: ReferenceHolder<'a>,
}
```

参照フィールドの生存期間が切れるとデータ構造全体が無効になるので、参照とデータ構造の[[lifetime|生存期間]]をそろえるこの伝播は必要である。しかし、データ構造の所有者はすべての生存期間がそろうように扱わなければならず、扱いにくい。

そのため、可能な限り、参照ではなく内容を所有するデータ構造を使う。それが難しい場合は、`Rc` のような[[smart-pointer|スマートポインタ]]を使えば、生存期間の制約を解消できる（[[Effective Rust 項目8 参照型とポインタ型に慣れよう|項目8]]）。

## キーワード

- [[lifetime|生存期間]]
- [[lifetime-elision|生存期間省略ルール]]
- [[ownership|所有権]]
- [[smart-pointer|スマートポインタ]]

## 自分の理解

単一のライフタイム注釈と複数のライフタイム注釈の違いで混乱したので、[[Effective Rust 項目14 単一 ／ 複数ライフタイム注釈を持つ構造体の違い|単一 / 複数ライフタイム注釈を持つ構造体の違い]]にまとめた。
