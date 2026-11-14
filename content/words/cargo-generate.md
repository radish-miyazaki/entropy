---
title: cargo-generate
aliases: []
description: 既存の Git リポジトリをテンプレートにして、新しい Rust のプロジェクトを作るツール
tags: [word, rust]
date: 2026-02-08
---

## TL;DR

既存の [[git|Git]] リポジトリをテンプレートにして、新しい [[rust|Rust]] のプロジェクトを作るツール。

## 仕組み

`cargo generate` にテンプレートのリポジトリを渡すと、そこから新しいプロジェクトを作る。GitHub のリポジトリは `ユーザー名/リポジトリ名` の短い形で指定できる。GitLab は `gl:`、Bitbucket は `bb:`、SourceHut は `sr:` のプレフィックスを付ける。

```sh
cargo generate --git https://github.com/username-on-github/mytemplate.git
cargo generate username-on-github/mytemplate
```

テンプレートは、GitHub で `cargo-generate` のトピックを検索すると見つかる。

## 例

[[ratatui|Ratatui]] はテンプレートを用意している。

```sh
cargo generate ratatui/templates
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ratatui|Ratatui]]

## 出典

- [cargo-generate - crates.io](https://crates.io/crates/cargo-generate)
- [cargo-generate/cargo-generate](https://github.com/cargo-generate/cargo-generate)
