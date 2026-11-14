---
title: axum
aliases: []
description: ルータとハンドラだけを持つ、tower をベースにした Rust の薄い Web フレームワーク
tags: [word, rust]
date: 2024-10-06
---

## TL;DR

[[rust|Rust]] の Web フレームワークの 1 つ。ルータ（`axum::routing::Router`）とハンドラ（`axum::handler::Handler`）という基本的な機能だけを持つ、薄いフレームワークである。

## 仕組み

axum 自身はルータとハンドラしか持たないので、HTTP サーバの構築に必要なそれ以外の機能は、[[hyper]]、[[tower]]、[[tokio|tokio]] といった外部の[[rust-crate|クレート]]に任せている。

axum の構成要素は、すべて `tower::Service` として定義されている。axum 固有の機能であるルータは `tower::Service` トレイトを実装しており、`tower::Layer` として管理される。ハンドラも `tower::Service` に変換できる。

そのため、tower をベースにした別のクレートに入れ替えても、tower で定義したロギングなどの `tower::Service` はそのまま使い回せる。過去に自分で書いた `tower::Service` の実装や、tower のエコシステムを再利用できる。

## 例

[[cargo-add|cargo add]] でインストールする。

```sh
cargo add axum
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[tower]]
- [[hyper]]
- [[tokio|tokio]]

## 出典

- [[RustによるWebアプリケーション開発 設計からリリース・運用まで]]
- [axum - docs.rs](https://docs.rs/axum/latest/axum/)
- [tokio-rs/axum](https://github.com/tokio-rs/axum)
