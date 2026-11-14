---
title: cargo-wizard
aliases: []
description: コンパイル速度、実行性能、バイナリサイズのどれを重視するかを選ぶだけで、プロファイルの設定を付け足してくれる Cargo の拡張ツール
tags: [word, rust]
date: 2024-10-14
---

## TL;DR

[[cargo|Cargo]] のプロファイルに、目的に合った設定を自動で付け足す拡張ツール。コンパイル速度、実行時の性能、バイナリサイズのどれを重視するかを選ぶだけでよい。

## なぜ必要か

公式の README によると、コンパイルを速くする、実行時の性能を上げる、バイナリを小さくするための Cargo の設定は、本やリポジトリ、ブログ記事などに散らばっている。新しいプロジェクトを作るたびにそれを探すのは手間なので、設定を自動で入れるツールとして作られた。

## 仕組み

`cargo wizard` を実行すると対話形式のプロンプトが立ち上がる。更新するプロファイルと重視する項目を選ぶと、コンパイルオプションを最適化した設定が得られる。

```sh
$ cargo install cargo-wizard
$ cargo wizard
? Select the profile that you want to update/create:
> dev (builtin)
  release (builtin)
  <Create a new profile>
[↑↓ to move, enter to select, type to filter]
```

選べる設定は次の 3 つである。

- コンパイル速度を重視する設定
- 実行時の性能を重視する設定
- バイナリサイズを小さくする設定

それぞれ `fast-compile`、`fast-runtime`、`min-size` というテンプレートとして用意されている。設定は [[cargo-toml|Cargo.toml]] のプロファイルに書き込まれ、RUSTFLAGS は `.cargo/config.toml` に書き込まれる。対話形式を使わずに、`cargo wizard apply <テンプレート> <プロファイル>` で直接テンプレートを当てることもできる。

```sh
cargo wizard apply fast-runtime dist
```

一部のオプションは nightly のコンパイラが必要で、`cargo +nightly wizard` か `--nightly` フラグで有効にする。

## 注意点

ごく基本的な設定しかできない。さらにチューニングしたいときは、自分でオプションを追加する必要がある。

作者は、このツールが当てる設定はかなり作者の好みに寄っていて、すべての用途に合うわけではないとしている。使えるオプションを知る出発点として使うのがよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[rust|Rust]]
- [[cargo|Cargo]]
- [[cargo-chef]]

## 出典

- [kobzol/cargo-wizard](https://github.com/kobzol/cargo-wizard)
