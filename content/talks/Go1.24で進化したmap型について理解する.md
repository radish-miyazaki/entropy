---
title: Go1.24で進化したmap型について理解する
description: Go 1.24 で Swiss Table に置き換わった map の内部実装を、Table、Group、Slot の特定の流れに沿って解説する発表
tags: [talk, go]
date: 2025-09-27
speakers: []
company:
event: "[[Go Conference 2025]]"
held: 2025-09-27
slide:
video:
---

## TL;DR

- [[go|Go]] 1.24 から、map の内部実装が [[swiss-table|Swiss Table]] に変わった。
- キーと値の位置は Directory、Table、Group、Slot の順にたどって特定する。Table の特定では Extendible hashing、Group の特定では二次探査、Slot の特定では 8 スロットの一括検証を使う。

## 内容

Go 1.24 から、map の内部実装が Swiss Table に変わった。割り当てでも読み取りでも、Directory、Table、Group、Slot の順にたどって、キーと値の位置を特定する。

### Table の特定

キーから計算したハッシュと、Directory の長さに応じた値の AND を取り、そのビットパターンで Table を特定する。Extendible hashing を採用しているので、リハッシュ（スロットの再配置）が 1 つの Table だけで済む。これにより CPU 負荷が減り、メモリ効率も良くなった。

### Group の特定

初回は、キーのハッシュの上位 57 ビット（H1）と、グループ数に応じた値の AND を取ってオフセットとし、Group を選ぶ。2 回目以降は、前回のオフセットに Group の探索回数を足し、Table の長さに応じた値と AND を取って Group を選ぶ。

これは[[open-addressing|オープンアドレス法]]と Quadratic probing（二次探査）の組み合わせである。二次探査を使うことで、オープンアドレス法で起きやすいクラスタリングを抑えられる。

### Slot の特定

キーのハッシュの下位 7 ビット（H2）を取り出し、H2 を拡張した値と Control word のビット演算で、対象のスロットの候補を選ぶ。8 スロットを一括で検証できるので、性能が上がった。

## キーワード

- [[go|Go]]
- [[swiss-table|Swiss Table]]
- [[open-addressing|オープンアドレス法]]

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [セッションのページ](https://gocon.jp/2025/talks/959061/)
- [[Swiss Table の実装に Deep Dive !]]
- [[Go1.24 の面白そうな機能]]
- [Faster Go maps with Swiss Tables - The Go Blog](https://go.dev/blog/swisstable)
- [Swiss Tables Design Notes - Abseil](https://abseil.io/about/design/swisstables)
