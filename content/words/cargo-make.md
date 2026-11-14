---
title: cargo-make
aliases: []
description: Rust 製のタスクランナー。タスクを Makefile.toml に TOML で書く
tags: [word, rust]
date: 2024-10-02
---

## TL;DR

[[rust|Rust]] 製のタスクランナー。各タスクを `Makefile.toml` に書く。Rust での開発向けのツールだが、汎用的にも使える。

## なぜ必要か

Makefile と比べて、TOML で書くぶん文法が分かりやすい。スクリプトを同じファイルに書けるので、タスクのための小さなスクリプトファイルが乱立するのを防げる。タスクで使う `cargo` のサブコマンドがインストールされていなければ、自動でインストールしてくれる。

## 仕組み

[[cargo|Cargo]] でインストールして使う想定だが、バイナリ単体でも配布されているので直接インストールすることもできる。

```sh
$ cargo install --force cargo-make
$ cargo make --version
cargo-make 0.37.18
```

タスクは `cargo make some-task` の形式で実行する。Cargo でインストールすると、`cargo make` と同じ働きをする `makers` コマンドも入るので、`makers some-task` とも書ける。

## 例

環境変数は、すべてのタスクに共通のものを `[env]` に、タスクごとのものを `extend` で追加する。

```toml
# cargo-make で実行するコマンド全体に共通で設定する環境変数
[env]
GLOBAL = "global env"

# extend でタスクごとに追加できる環境変数
[tasks.set-env-local.env]
LOCAL = "local env"

# cargo make run (makers run) で実行されるタスク
[tasks.run]
extend = "set-env-local"
command = "cargo"
args = ["run"]
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cargo-add|cargo add]]
- [[cargo-toml|Cargo.toml]]

## 出典

- [sagiegurari/cargo-make](https://github.com/sagiegurari/cargo-make)
- [cargo-make を改善する](https://mebiusbox.github.io/blog/2024/09/15/improve-cargo-make)
- [cargo-make 入門](https://www.tkat0.dev/posts/cargo-make-1/)
- [cargo-make を単体でインストールする（Qiita）](https://qiita.com/ota42y/items/299197505062d4f7958b)
