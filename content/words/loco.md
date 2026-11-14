---
title: loco
aliases: []
description: Ruby on Rails にインスパイアされた、Rust の Web フレームワーク
tags: [word, rust]
date: 2024-01-06
---

## TL;DR

[[ruby-on-rails|Ruby on Rails]] にインスパイアされた、[[rust|Rust]] の Web フレームワーク。公式サイトでは「Rust のための one-person framework」と称している。

## なぜ必要か

サイドプロジェクトやスタートアップを、アイデアから本番まで一人で進められるようにすることを目指している。モデル、コントローラ、バックグラウンドジョブ、メール送信、認証などを一通り備える。Rails の考え方を、Rust らしい書き方に合わせて取り入れている。

## 仕組み

内部では [[axum]] と [[seaorm|SeaORM]] を使っている。各構成要素のファイルは、Rails と同じく CLI（[[cargo|Cargo]] のコマンド）で生成する。ハンドラはマクロを使わない普通の `async fn` で、`Result<Response>` を返す。

## 例

インストールは Cargo で行う。データベースを使うときは、SeaORM の CLI も必要になる。

```sh
cargo install loco

# Database を利用する際には SeaORM CLI も必要
cargo install sea-orm-cli
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ruby-on-rails|Ruby on Rails]]
- [[axum]]
- [[seaorm|SeaORM]]

## 出典

- [Loco](https://loco.rs)
