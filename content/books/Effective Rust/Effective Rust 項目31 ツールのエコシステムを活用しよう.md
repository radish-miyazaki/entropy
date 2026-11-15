---
title: Effective Rust › ツールのエコシステムを活用しよう
description: 標準の cargo サブコマンドとサードパーティの cargo ツールを紹介し、使えるツールを自分で探して CI や IDE に組み込むよう勧める項目
tags: [book-chapter, rust]
date: 2025-01-16
book: "[[Effective Rust]]"
chapter: 31
---

## TL;DR

- [[rust|Rust]] には、標準の [[cargo|cargo]] サブコマンドに加えて、多くのサードパーティ製ツールがある。ツールの一覧はすぐ古くなるので、使えるツールを自分で探す。
- 何度も使うツールは CI に組み込み、速くて誤検知のないツールは IDE に組み込む。

## 内容

### 標準の cargo サブコマンド

cargo には、次のような標準のサブコマンドもある。

- `cargo check`: 機械語を生成せず、コンパイルのチェックだけを行う。速い構文チェックとして便利である
- `cargo doc`: ドキュメントを生成する（[[Effective Rust 項目27 パブリックインターフェイスのドキュメントを書こう|項目27]]）
- `cargo bench`: ベンチマークを実行する（[[Effective Rust 項目30 ユニットテスト以上のものを書こう|項目30]]）
- `cargo update`: 依存クレートを、[[semantic-versioning|セマンティックバージョニング]]で互換性のある最新のバージョンに更新する
- `cargo tree`: [[dependency-graph|依存グラフ]]を表示する
- `cargo metadata`: ワークスペースのパッケージと依存クレートのメタデータを取得する。メタデータの型は [cargo_metadata](https://docs.rs/cargo_metadata/latest/cargo_metadata/) クレートが提供している

### サードパーティの cargo ツール

[[cargo-udeps|cargo-udeps]] や [[cargo-deny|cargo-deny]] は、`cargo metadata` で取得したメタデータを使っている。ほかに、抽象構文木を使う cargo ツールもある。こうしたツールの多くは [syn](https://docs.rs/syn/latest/syn/) クレートに依存している。syn は主に[[procedural-macro|手続き的マクロ]]で使われるが、それ以外の用途にも使える API を含んでいる。例として、[[cargo-expand]] や、コードカバレッジの生成と管理を支援する cargo-tarpaulin がある。

ブログなどにまとめられたツールの一覧は主観的で、すぐに古くなる。使えるツールは自分で探すのがよい。`cargo-<something>` という名前で検索すれば多くのツールが見つかるが、メンテナンスされていないものもあるので吟味する。

Rust に[[formal-verification|形式的検証]]を適用する取り組みも行われている（[Rust verification tools (2021)](https://alastairreid.github.io/automatic-rust-verification-tools-2021/)）。

### ツールを組み込む

何度も使うツールは、CI に組み込む（[[Effective Rust 項目32 CIシステムを設定しよう|項目32]]）。速くて誤検知を出さないツールは、IDE に組み込む（[Rust の公式ツール一覧](https://www.rust-lang.org/tools)）。

### 覚えておくべきツール

- [[miri|Miri]]: unsafe を使ったときに、コンパイラが検出できないエラーを検出する（[[Effective Rust 項目16 unsafeコードを書かないようにしよう|項目16]]）
- [[dependabot|Dependabot]]: 依存クレートの更新を管理する（[[Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう|項目21]]、[[Effective Rust 項目25 依存グラフを管理しよう|項目25]]）
- [[cargo-semver-checks|cargo-semver-checks]]: SemVer が正しく付けられているかを確かめる（項目21）
- [[compiler-explorer|Godbolt compiler explorer]]: Rust のコードから生成される機械語を確かめる
- [[cargo-fuzz]]: [[fuzz-testing|ファズテスト]]を行う
- [[criterion|criterion]]: `cargo bench` より詳しくデータを分析できるベンチマークツール（項目30）
- [[rust-bindgen|bindgen]]: C のコードから Rust の [[ffi|FFI]] ラッパを自動で生成する（[[Effective Rust 項目35 手動でFFIマッピングを書かずにbindgenを用いよう|項目35]]）

## キーワード

- [[cargo|Cargo]]
- [[cargo-udeps|cargo-udeps]]
- [[cargo-deny|cargo-deny]]
- [[cargo-expand]]
- [[cargo-semver-checks|cargo-semver-checks]]
- [[cargo-fuzz]]
- [[miri|Miri]]
- [[dependabot|Dependabot]]
- [[compiler-explorer|Godbolt compiler explorer]]
- [[criterion|criterion]]
- [[rust-bindgen|bindgen]]
- [[procedural-macro|手続き的マクロ]]
- [[formal-verification|形式的検証]]

## 自分の理解

この項目では、自分があまり使ったことのなかった標準の cargo サブコマンドを中心に整理した。

形式的検証は、コードの正しさについてより高いレベルの保証が必要な場合に役立つのかもしれない。
