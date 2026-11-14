---
title: cargo-features-manager
aliases: []
description: 依存関係のフィーチャを TUI で管理できる Cargo の拡張ツール
tags: [word, rust]
date: 2024-10-14
---

## TL;DR

[[dependency|依存関係]]のフィーチャを管理するための、[[tui|TUI]] 風の [[cargo|Cargo]] 拡張ツール。

## 仕組み

次のコマンドでインストールする。

```sh
cargo install cargo-features-manager
```

`cargo features prune` を実行すると、コンパイルに不要なフィーチャをすべて削除する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[feature-unification|フィーチャ統合]]
- [[cargo-machete]]

## 出典

- [tobinio/cargo-features-manager - GitHub](https://github.com/tobinio/cargo-features-manager)
- [cargo-features-manager: prune](https://github.com/tobinio/cargo-features-manager?tab=readme-ov-file#prune)
