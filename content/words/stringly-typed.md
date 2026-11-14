---
title: Stringly typed
aliases: []
description: 本来は別の型であるべき値を文字列で扱ってしまうアンチパターン
tags: [word, rust]
date: 2024-12-17
---

## TL;DR

本来は別の型であるべき変数を、文字列にしてしまうアンチパターン。Strongly typed（強い型付け）をもじった言葉である。

## 例

Wiktionary が引く『Rust in Action』の用例では、メッセージコードのような stringly-typed なデータを持ち込みそうになったら、列挙型を使うことを勧めている。[[Effective Rust]] の第 1 項も、bool の引数を専用の型で包むと型安全と保守性が上がること、ないかもしれない String は `Option<String>` にすると意図が伝わることを挙げている。

## 注意点

Wiktionary には 2 つの意味が載っている。文字列でないデータを表すのに文字列を使いすぎることと、構造や意味を持つデータを文字列で表すことである。前者は冗談めかした使い方とされている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[newtype-pattern|Newtype パターン]]
- [[algebraic-data-type|代数的データ型]]

## 出典

- [[Effective Rust]]
- [Item 1: Use the type system to express your data structures - Effective Rust](https://www.lurklurk.org/effective-rust/use-types.html)
- [stringly-typed - Wiktionary](https://en.wiktionary.org/wiki/stringly-typed)
