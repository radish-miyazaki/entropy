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

## 仕組み

Wikipedia の「形式的検証」によると、検証は実際のシステムを抽象化した数理モデルの上で行い、手法は大きく 2 つある。[[model-checking|モデル検査]]は、モデルのすべての状態と遷移を体系的に調べる手法で、確かめる性質は線形時相論理（LTL）や計算木論理（CTL）で書く。[[theorem-proving|定理証明]]は、Isabelle や Coq などの定理証明支援系を使って形式的に推論する手法で、ふつうは完全には自動化されず、人がシステムへの理解をもとに進める。

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
- [[temporal-logic|時相論理]]

## 出典

- [形式的検証 - Wikipedia](https://ja.wikipedia.org/wiki/形式的検証)
