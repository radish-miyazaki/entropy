---
title: Green Tea Garbage Collector
aliases: [Green Tea GC]
description: オブジェクト単位ではなく、メモリ上の span 単位でまとめてマークする Go の新しいガベージコレクタ
tags: [word, go, gc]
date: 2025-09-28
---

## TL;DR

[[go|Go]] の新しい[[garbage-collection|ガベージコレクタ]]。オブジェクトを 1 つずつ走査する代わりに、メモリ上の大きな連続したブロック（span）単位でまとめて走査する。Go 1.25 では試験機能として提供された。

## なぜ必要か

従来の GC は、ヒープをオブジェクトのグラフとしてたどる三色マーク法で、オブジェクトを 1 つずつ走査する。ポインタをたどるたびに離れたメモリ領域へ飛ぶので、メモリの局所性が悪い。Issue では、GC の時間の約 85% が走査のループに使われ、そのサイクルの 35% 以上がメモリ待ちで止まっていたと報告されている。

## 仕組み

同じサイズのオブジェクトを持つ 8 KiB の span を単位に、どのオブジェクトがマーク済みかを span ごとに記録する。キューにはオブジェクトではなく span を積み、span に溜まったマーク待ちのオブジェクトを 1 回でまとめて走査する。大きなオブジェクトは従来どおりのアルゴリズムで扱う。

> Instead of scanning individual objects, the garbage collector scans memory in much larger, contiguous blocks.

マイクロベンチマークでは GC の CPU コストが約 10〜50% 減り、L1、L2 キャッシュのミスもほぼ半分になった。一方、広いベンチマークでは結果がまちまちで、悪化したものもある。

## 例

Go 1.25 では、ビルド時に環境変数で有効にする。

```sh
GOEXPERIMENT=greenteagc go build
```

Issue によると、その後デフォルトで有効になり、`GOEXPERIMENT=nogreenteagc` で無効にできる。

## 自分の理解

現時点の GC について書かれた [A Guide to the Go Garbage Collector](https://go.dev/doc/gc-guide) も、Green Tea に変わったら書き換わると思うので、アーカイブしておきたい。

## 関連

- [[garbage-collection|ガベージコレクション]]
- [[A Guide to the Go Garbage Collector]]
- [[Green Tea Garbage Collector の今：Go言語のコアチームによる試行錯誤の過程と共にメモリ管理最適化の実装を読み解く]]

## 出典

- [runtime: green tea garbage collector（golang/go#73581）](https://github.com/golang/go/issues/73581)
