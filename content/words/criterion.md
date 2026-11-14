---
title: criterion
aliases: []
description: 統計に基づいて性能の悪化を検出できる Rust のマイクロベンチマークツール
tags: [word, rust, パフォーマンス]
date: 2026-11-14
---

## TL;DR

統計に基づく [[rust|Rust]] のマイクロベンチマークツール（Criterion.rs）。Haskell の Criterion ライブラリを Rust に移植したもので、性能の悪化を自動で検出できる。

## なぜ必要か

[[Effective Rust 項目30 ユニットテスト以上のものを書こう|Effective Rust 項目30]] によると、標準の `cargo bench` で実際に測るには安定化していない API が必要なので、`cargo +nightly bench` を使うことになる。代わりに criterion を使うと、`cargo bench` より詳しくデータを分析できる。

## 仕組み

Criterion.rs の公式ガイドによると、ベンチマークは実行のたびに統計情報を集めて保存するので、結果を時系列で追える。これにより、性能の悪化を自動で検出でき、最適化の効果も測れる。

## 例

Effective Rust では、ベンチマークを [[continuous-integration|CI]] で常に実行し、コードやツールチェインの変更による性能の悪化にいち早く気づくことを勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[continuous-integration|継続的インテグレーション]]

## 出典

- [[Effective Rust 項目30 ユニットテスト以上のものを書こう|Effective Rust 項目30]]
- [[Effective Rust 項目31 ツールのエコシステムを活用しよう|Effective Rust 項目31]]
- [Criterion.rs Documentation](https://bheisler.github.io/criterion.rs/book/index.html)
