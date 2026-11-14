---
title: tower
aliases: []
description: クライアントとサーバ間のネットワーク処理を、Service と Layer という抽象単位で柔軟に組み立てられるようにする Rust のクレート
tags: [word, rust]
date: 2024-10-06
---

## TL;DR

クライアントとサーバ間のネットワーク処理を、柔軟かつ簡単に扱えるようにする [[rust|Rust]] の[[crate|クレート]]。[[axum]] で採用されている。

## なぜ必要か

HTTP サーバを作るには、タイムアウトやレートリミット、認証、ロードバランシングなど、多くの共通処理が必要になる。tower はこれらを `Service` と `Layer` という抽象単位にまとめ、プラグインのように差し込めるようにする。この抽象単位を[[middleware|ミドルウェア]]と呼ぶ。

## 仕組み

### tower::Service

任意の `Request` を受け取り、任意の `Response` を返すことだけが定義された[[trait|トレイト]]である。ロギングや認証、リトライのためのミドルウェアは、この `Service` として実装する。

### tower::Layer

`tower::Service` を包む[[decorator-pattern|デコレータ]]のトレイトである。複数の `Service` で実行したい処理を登録できる。名前のとおり、何層にも重ねて 1 つの処理の基盤を作れる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[axum]]
- [[hyper]]
- [[middleware|ミドルウェア]]

## 出典

- [tower - docs.rs](https://docs.rs/tower/latest/tower/)
- [tower::Service - docs.rs](https://docs.rs/tower/latest/tower/trait.Service.html)
- [tower::Layer - docs.rs](https://docs.rs/tower/latest/tower/trait.Layer.html)
- [tower-rs/tower - GitHub](https://github.com/tower-rs/tower)
