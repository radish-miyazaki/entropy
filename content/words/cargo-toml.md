---
title: Cargo.toml
aliases: []
description: Cargo のプロジェクト全体の管理情報を書く設定ファイル
tags: [word, rust, cargo]
date: 2024-10-06
---

## TL;DR

[[cargo|Cargo]] のプロジェクト全体の管理情報を書く設定ファイル。

## 仕組み

`[]` で囲んだ部分は、TOML の仕様では「テーブル」と呼ぶが、Cargo.toml では「セクション」と呼ぶ。`[dependencies]` には、リリースビルド（本番のコード）に含める依存関係を書く。`[dev-dependencies]` には、テストやベンチマークでだけ使う依存関係を書く。

## 例

```toml
[package]
name = "rusty-book-manager"
version = "0.1.0"
edition = "2021"

[dependencies]
axum = { version = "0.7.7", features = ["macros"] }
tokio = { version = "1.40.0", features = ["full"] }

[dev-dependencies]
rstest = "0.23.0"
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cargo-add|cargo add]]
- [[cargo-make]]
