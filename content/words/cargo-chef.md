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
