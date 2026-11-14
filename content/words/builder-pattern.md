---
title: ビルダパターン
aliases: []
description: 複雑なオブジェクトの組み立てを専用のビルダに任せ、構築の手順と表現を分けるデザインパターン
tags: [word, デザインパターン]
date: 2026-11-14
---

## TL;DR

複雑なオブジェクトの組み立てを、ビルダと呼ぶ別のオブジェクトに任せる生成の[[design-pattern|デザインパターン]]。GoF の『Design Patterns』で紹介された 23 のパターンの 1 つである。

## なぜ必要か

Wikipedia によると、複雑なオブジェクトをクラスの中で直接組み立てると、クラスが特定の表現に縛られ、表現を変えるたびにクラスを書き換えることになる。ビルダパターンでは構築の手順と表現を分けるので、同じ手順から異なる表現を作れる。

[[rust|Rust]] では事情が少し違う。[[Effective Rust 項目7 複雑な型にはビルダを使おう|Effective Rust 項目7]] によると、Rust の構造体は作るときにすべてのフィールドを指定する必要があり、省略したいフィールドにも `None` を書かなければならない。フィールドを足すと、構造体を作っている箇所をすべて直すことにもなる。

## 仕組み

GoF の形では、製品を作る手順を Builder のインタフェースが定め、ConcreteBuilder がそれを実装する。Director は Builder のインタフェースだけを使って、手順を呼ぶ順番を決める。

Rust では、必須のフィールドを `new()` で受け取り、任意のフィールドをメソッドで設定し、最後に `build()` で完成品を返す形が多い。

## 例

[[Effective Rust 項目7 複雑な型にはビルダを使おう|Effective Rust 項目7]] の例である。

```rust
let also_bob = DetailsBuilder::new("Robert", "Builder", dob)
    .middle_name("the")
    .preferred_name("Bob")
    .just_seen()
    .build();
```

## 注意点

Rust のビルダで `self` を値で受け取るとメソッドチェーンは書きやすいが、`build()` がビルダを消費するので、1 つのビルダから 1 つしか作れない。`&mut self` を受け取るとビルダを再利用できるが、コンストラクタから直接チェーンすると一時値の寿命のエラーになる。また、定型のコードはビルダの側に移るだけでなくならない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[design-pattern|デザインパターン]]
- [[newtype-pattern|Newtype パターン]]

## 出典

- [Builder pattern - Wikipedia](https://en.wikipedia.org/wiki/Builder_pattern)
- [Item 7: Use builders for complex types - Effective Rust](https://effective-rust.com/builders.html)
- [[Effective Rust 項目7 複雑な型にはビルダを使おう|Effective Rust 項目7 複雑な型にはビルダを使おう]]
