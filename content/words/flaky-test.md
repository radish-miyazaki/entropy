---
title: Flaky test
aliases: [信頼不能テスト]
description: コードに手を触れなくても、実行するたびに成功したり失敗したりする不安定なテスト
tags: [word, テスト]
date: 2024-09-11
---

## TL;DR

プロダクトコードにもテストコードにも手を触れていないのに、結果が成功したり失敗したりする不安定なテスト。信頼不能テストとも呼ぶ。

## なぜ必要か

Flaky test が増えると、開発者はテストの結果を信じなくなる。書籍『Google のソフトウェアエンジニアリング』では、テストスイート全体の 1% が信頼不能テストになると、エンジニアはテストの結果を信じなくなり始めるとされている。

## 仕組み

### 追跡と集計

1 回の実行だけでは、テストが Flaky かどうか判断できない。テストスイートを何度も実行し、その結果を保存、集計、比較する必要がある。BuildPulse などの SaaS を使うか、[[rust|Rust]] の [[cargo-nextest]] のように SaaS と連携できるツールを使う。

### 抜本的な対策

根本的には、テストをできるだけ小さくする（[[test-sizes|テストサイズ]]）。

## 自分の理解

Flaky test は、[[false-negatives-and-false-positives|偽陰性と偽陽性]]のうち偽陰性の一種である。

## 関連

- [[false-negatives-and-false-positives|偽陰性と偽陽性]]
- [[test-sizes|テストサイズ]]
- [[cargo-nextest]]

## 出典

- [信頼不能テスト（Flaky Test）とは](https://levtech.jp/media/article/column/detail_496/)
- [Struggling with Flaky Tests](https://www.docswell.com/s/magurotuna/5MXXY2-2024-09-11-struggling-with-flaky-tests)
