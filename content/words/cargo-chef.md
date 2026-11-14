---
title: cargo-chef
aliases: []
description: 依存クレートの情報を recipe.json にまとめ、Docker のビルドキャッシュを効かせてビルド時間を短くする Cargo の拡張ツール
tags: [word, rust]
date: 2024-10-15
---

## TL;DR

ビルドキャッシュを効率よく使い、特に [[docker|Docker]] コンテナのビルド時間を短くする [[cargo|Cargo]] の拡張ツール。

## なぜ必要か

Docker のキャッシュは、`Cargo.toml` が複数あるワークスペースでは効かせにくい。cargo-chef はこの場面で特に効果を発揮する。

## 仕組み

依存する[[crate|クレート]]の情報を `recipe.json` という JSON ファイルに書き出し、それを使ってビルドする。`recipe.json` はキャッシュの鍵のような役割を持つ。このファイルが変わらなければ、依存のビルドはキャッシュされた状態のまま `docker build` を実行できる。

README によると、`cargo chef prepare` でプロジェクトを解析して `recipe.json` を作り、`cargo chef cook` で `recipe.json` から依存をビルドする。`recipe.json` には、すべての `Cargo.toml` とその相対パス、`Cargo.lock` が入る。ワークスペースのクレートは後から増えたものも含めて自動で拾われる。

## 例

README の Dockerfile は、マルチステージビルドで次の順に進む。planner のステージでソースコードをコピーし、`recipe.json` を作る。

```dockerfile
RUN cargo chef prepare --recipe-path recipe.json
```

builder のステージでは `recipe.json` だけをコピーして依存をビルドし、その後でソースコードをコピーしてアプリをビルドする。

```dockerfile
RUN cargo chef cook --release --recipe-path recipe.json
RUN cargo build --release --bin app
```

最後のステージでは、ビルドしたバイナリだけを小さなイメージにコピーする。依存が変わらなければ `cook` のレイヤはキャッシュされたままになる。

## 注意点

README によると、cargo-chef はローカルで実行するためのものではない。すべてのステージで同じバージョンの Rust を使わないと、キャッシュが効かない。また、キャッシュされたファイルに絶対パスが含まれるので、`cargo chef cook` と `cargo build` は同じディレクトリで実行する必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[rust|Rust]]
- [[cargo|Cargo]]
- [[cargo-toml|Cargo.toml]]
- [[cargo-wizard]]

## 出典

- [LukeMathWalker/cargo-chef](https://github.com/LukeMathWalker/cargo-chef)
