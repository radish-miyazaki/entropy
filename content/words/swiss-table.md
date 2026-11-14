---
title: Swiss Table
aliases: [SwissTable]
description: メタデータの配列と SIMD による一括比較で探索を速くした、オープンアドレス法のハッシュテーブル
tags: [word, go, パフォーマンス]
date: 2026-11-14
---

## TL;DR

Google のエンジニアが 2017 年に発表した、オープンアドレス法のハッシュテーブル。スロットごとのメタデータを並べた配列を使い、複数のスロットを一度に比較して探索を速くする。[[go|Go]] 1.24 では、組み込みの map がこの設計に変わった。

## 仕組み

[Go Blog](https://go.dev/blog/swisstable) によると、テーブルは 8 スロットずつのグループに分かれ、各グループは 64 ビットのコントロールワードを持つ。コントロールワードの各バイトは、対応するスロットが空か、削除済みか、使用中かを表し、使用中ならハッシュ値の 7 ビット（h2）を持つ。探索では h2 を 8 バイト分まとめて比較して候補を絞り込み、その後でキーを比較する。

[Abseil のドキュメント](https://abseil.io/about/design/swisstables)では、ハッシュ値をテーブル上の位置を決める H1 と、メタデータに入れる残り 7 ビットの H2 に分け、[[simd|SIMD]] 命令で複数のメタデータを一度に比較すると説明している。

## 例

Go Blog によると、Go の実装では、大きな map を一度に拡張して処理が長く止まるのを避けるため、map を最大 1024 エントリの複数の Swiss Table に分け、Extendible hashing で拡張する。マイクロベンチマークでは Go 1.23 より最大 60% 速くなり、アプリケーション全体のベンチマークでは CPU 時間が幾何平均で約 1.5% 改善した。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[go|Go]]
- [[simd|SIMD]]
- [[Swiss Table の実装に Deep Dive !]]
- [[Go1.24で進化したmap型について理解する]]

## 出典

- [Faster Go maps with Swiss Tables - The Go Programming Language](https://go.dev/blog/swisstable)
- [Swiss Tables Design Notes - Abseil](https://abseil.io/about/design/swisstables)
