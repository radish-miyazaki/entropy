---
title: Cargo
aliases: []
description: Rust のパッケージマネージャ兼ビルドツール。依存クレートの取得、ビルド、crates.io への公開を行う
tags: [word, rust, ビルドツール]
date: 2026-11-14
---

## TL;DR

[[rust|Rust]] のパッケージマネージャ。依存するパッケージをダウンロードし、パッケージをコンパイルし、配布用のパッケージを作って crates.io に公開する。

## なぜ必要か

The Cargo Book によると、Rust のライブラリや実行ファイル（クレート）は、コンパイラ `rustc` でコンパイルする。しかし `rustc` を直接使うと、プログラムごとにコマンドの書き方が変わる。依存する外部ライブラリと、さらにその依存まで正しいバージョンで集め、最新に保つのを手作業で行うのは難しく、間違いやすい。Cargo は「パッケージ」という一段上の抽象を導入して、こうした作業を引き受ける。

## 仕組み

Cargo はパッケージの情報を書くメタデータファイルを導入している。プロジェクトの管理情報を書く [[cargo-toml|Cargo.toml]] もその 1 つである。Cargo は依存パッケージを取得してビルドし、正しい引数で `rustc` などを呼び出す。利用者は `rustc` を直接呼ばず、`cargo build` のような共通のコマンドを実行すればよい。

依存のバージョンは [[semantic-versioning|SemVer]] に従って選ばれる。[[Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう|Effective Rust 項目21]] によると、Cargo は指定された範囲の中で最も新しいバージョンを選ぶ。[[Effective Rust 項目25 依存グラフを管理しよう|項目25]] によると、同じクレートの複数のバージョンを依存グラフに含められるが、それらは SemVer で非互換なバージョンでなければならない。

## 例

標準のサブコマンドに加えて、[[cargo-nextest|cargo-nextest]] や [[cargo-expand|cargo-expand]] のような拡張ツールをサブコマンドとして使える。[[Effective Rust 項目31 ツールのエコシステムを活用しよう|Effective Rust 項目31]] は、こうしたツールの一覧はすぐ古くなるので、使えるツールを自分で探すよう勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cargo-toml|Cargo.toml]]
- [[cargo-add|cargo add]]
- [[cargo-deny|cargo-deny]]
- [[cargo-semver-checks|cargo-semver-checks]]
- [[semantic-versioning|セマンティックバージョニング]]

## 出典

- [The Cargo Book](https://doc.rust-lang.org/cargo/)
- [Why Cargo Exists - The Cargo Book](https://doc.rust-lang.org/cargo/guide/why-cargo-exists.html)
- [[Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう|Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう]]
- [[Effective Rust 項目25 依存グラフを管理しよう|Effective Rust 項目25 依存グラフを管理しよう]]
