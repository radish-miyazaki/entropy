---
title: 形式的検証
aliases: [formal verification]
description: ソフトウェアが仕様を満たすことを、数学的・論理的なモデルを使って証明する手法
tags: [word, 形式手法]
date: 2025-01-17
---

## TL;DR

ソフトウェアが正しく動作することを、論理的・数学的なモデルを使って証明する手法である。プログラムが特定の仕様（要件）を満たしていることを、手動またはツールで証明する。

## なぜ必要か

テストは、用意した入力に対して期待どおりに動くかを確かめるものである。形式的検証はそれと違い、ロジックを解析して正しさを確かめる。そのため、テストで試していない入力についても正しさを示せる。

## 例

[[rust|Rust]] には次のようなツールがある。

- [Prusti](https://github.com/viperproject/prusti-dev/): コードを[[static-analysis|静的解析]]して形式的検証をする
- [KLEE](https://project-oak.github.io/rust-verification-tools/using-klee/): コードを[[symbolic-execution|シンボリック実行]]で解析し、検証を支援する

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[formal-methods|形式手法]]
- [[symbolic-execution|シンボリック実行]]
- [[theorem-proving|定理証明]]
- [[model-checking|モデル検査]]
