---
title: cargo-machete
aliases: []
description: 使っていない依存関係を見つけて削除する Cargo の拡張ツール
tags: [word, rust]
date: 2024-10-14
---

## TL;DR

使っていない不要な[[dependency|依存関係]]を削除する [[cargo|Cargo]] の拡張ツール。

## 仕組み

次のコマンドでインストールする。

```sh
cargo install cargo-machete
```

公式の README では、Rust のプロジェクトの使われていない依存関係を「速く、ただし不正確に」検出するツールだと説明している。Rust のプロジェクトがあるディレクトリで `cargo machete` を実行するか、パスを渡して実行する。終了コードは、使われていない依存関係がなければ 0、1 つ以上あれば 1、エラーが起きたら 2 になるので、CI に組み込みやすい。

## 注意点

正確さより速さを取っているので、誤検出がある。たとえば、`build.rs` が生成したコードで使っている依存関係は、使われていないと判定されることがある。誤検出を減らしたいときは `--with-metadata` を付けると、`cargo metadata --all-features` の結果を使って判定する。ただし、このオプションはプロジェクトの `Cargo.lock` を書き換えることがある。

誤検出された依存関係は、[[cargo-toml|Cargo.toml]] の `package.metadata.cargo-machete` に `ignored` として並べると、検出の対象から外せる。

```toml
[package.metadata.cargo-machete]
ignored = ["prost"]
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cargo-udeps]]
- [[cargo-features-manager]]

## 出典

- [bnjbvr/cargo-machete - GitHub](https://github.com/bnjbvr/cargo-machete)
