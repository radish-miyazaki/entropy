---
title: crates.io
aliases: []
description: Rust のクレートを公開・配布するための公式のレジストリ
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

[[rust|Rust]] の[[crate|クレート]]を公開・配布するためのレジストリ。`cargo publish` で、クレートの特定のバージョンをアップロードする。

## 仕組み

The Cargo Book によると、公開するにはまず crates.io のアカウントを作り（GitHub でのログインが必要）、API トークンを発行して `cargo login` で登録する。公開の前には、[[cargo-toml|Cargo.toml]] に `license`、`description`、`repository` などを書いておく。`cargo publish` は、クレートを `.crate` ファイルにまとめ、コンパイルできることを確かめてからアップロードする。

## 注意点

- 公開は基本的に取り消せない。同じバージョンを上書きすることも、コードを削除することもできない。[[Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう|Effective Rust 項目21]] でも、crates.io は同じバージョンでの再公開を拒否すると述べている
- 壊れたバージョンは `cargo yank` で取り下げられる。取り下げたバージョンに新しく依存することはできなくなるが、既存の依存はそのまま動く。コードは削除されないので、誤って公開した秘密情報を消す手段にはならない
- クレート名は早い者勝ちで、使われた名前は別のクレートに使えない。[[Effective Rust 項目25 依存グラフを管理しよう|Effective Rust 項目25]] でも、すべてのクレート名が 1 つの大きな名前空間で管理されていると説明している
- 公開したクレートのドキュメントは [docs.rs](https://docs.rs) にも公開される

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[crate|クレート]]
- [[cargo|Cargo]]
- [[semantic-versioning|セマンティックバージョニング]]

## 出典

- [[Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう|Effective Rust 項目21]]
- [[Effective Rust 項目25 依存グラフを管理しよう|Effective Rust 項目25]]
- [[Effective Rust 項目27 パブリックインターフェイスのドキュメントを書こう|Effective Rust 項目27]]
- [Publishing on crates.io - The Cargo Book](https://doc.rust-lang.org/cargo/reference/publishing.html)
