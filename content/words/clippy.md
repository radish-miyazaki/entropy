---
title: Clippy
aliases: []
description: Rust のコードのよくある誤りを見つけ、改善を提案するリントの集まり
tags: [word, rust]
date: 2024-12-20
---

## TL;DR

[[rust|Rust]] のコードのよくある誤りを見つけ、改善を提案するリントの集まり。800 を超えるリントを持つ。

## 仕組み

リントはカテゴリに分かれていて、カテゴリごとに既定のレベルが決まっている。

| カテゴリ              | 内容                                             | 既定のレベル |
| --------------------- | ------------------------------------------------ | ------------ |
| `clippy::correctness` | 明らかに誤っているか、無意味なコード             | deny         |
| `clippy::suspicious`  | 誤っている可能性が高いコード                     | warn         |
| `clippy::style`       | もっと慣用的に書くべきコード                     | warn         |
| `clippy::complexity`  | 単純なことを複雑に書いているコード               | warn         |
| `clippy::perf`        | もっと速く動くように書けるコード                 | warn         |
| `clippy::pedantic`    | ときどき誤検知のある厳しいリント                 | allow        |
| `clippy::restriction` | 言語やライブラリの特定の機能の使用を禁じるリント | allow        |
| `clippy::nursery`     | 開発中の新しいリント                             | allow        |
| `clippy::cargo`       | Cargo のマニフェストに対するリント               | allow        |

rustup で Rust を入れていれば、通常は Clippy もすでに入っている。`minimal` プロファイルで入れた場合は、次のコマンドで追加する。

```sh
$ rustup component add clippy [--toolchain=<name>]
```

## 注意点

妥当なコードにも警告が出たり、他のリントと矛盾したりするので、`restriction` カテゴリはまとめて有効にしない。`clippy::unwrap_used` で panic を防ぐなど、必要なものを個別に選んで有効にする。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Clippy Documentation](https://doc.rust-lang.org/stable/clippy/index.html)
- [Installation - Clippy Documentation](https://doc.rust-lang.org/stable/clippy/installation.html)
