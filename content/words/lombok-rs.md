---
title: lombok-rs
aliases: []
description: Java の Project Lombok を Rust に移植した、定型コードを手続き的マクロで生成するクレート
tags: [word, rust]
date: 2024-11-15
---

## TL;DR

[[java|Java]] の [Project Lombok](https://projectlombok.org) を [[rust|Rust]] に移植したクレートである。手続き的マクロで、getter や setter などの定型コードを生成する。

## 仕組み

Lombok のアノテーションに対応する derive マクロを提供している。たとえば `@Getter` には `#[derive(Getter)]`、`@Setter` には `#[derive(Setter)]`、`@Builder` には `#[derive(Builder)]` が対応する。ほかに `Data`、`Value`、`ToString`、`EqualsAndHashCode`、`NoArgsConstructor`、`AllArgsConstructor` もある。

## 例

`Cargo.toml` に追加して使う。使い方の例はリポジトリの `tests/tests.rs` にある。

```toml
[dependencies]
lombok = "0.4"
```

## 注意点

作者自身が、Rust では Java の Lombok ほど必要ではないと README に書いている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [sokomishalov/lombok-rs - GitHub](https://github.com/sokomishalov/lombok-rs)
