---
title: Swiss Table の実装に Deep Dive !
description: Go の map に使われている Swiss Table の仕組みと、Extendible hashing やイテレーション中の変更への対応など Go 独自の工夫の解説
tags: [talk, go]
date: 2025-09-28
speakers: []
company:
event: "[[Go Conference 2025]]"
held: 2025-09-28
slide: https://www.slideshare.net/slideshow/swiss-table-deep-dive-go-conference-2025/283475359
video:
---

## TL;DR

- Swiss Table は、オープンアドレス法で実装されたキャッシュ効率のよいハッシュテーブルである。
- Go の Swiss Map は、Extendible hashing で容量を拡張し、イテレーション中の変更にも決まった振る舞いを保証する。

## 内容

### Swiss Table

[[swiss-table|Swiss Table]] は、チェイン法ではなく[[open-addressing|オープンアドレス法]]で実装されたハッシュテーブルである。オープンアドレス法は実装が複雑になるが、キャッシュ効率がよい。ハッシュ値の上位 57 ビットをグループの検索に、下位 7 ビットをスロットの検索に使う。

### Go の Swiss Map の最適化

[[go|Go]] の Swiss Map は、Extendible hashing で容量を拡張する。要素がたくさん入ったテーブルは、そのテーブル単体で容量を拡張したり、分割したりする。容量が 2 倍になると、グループの数も 2 倍になる。`t.grow` はグループの数を 2 倍にし、`t.split` はテーブルを分割する。

### イテレーション中の変更

Go の map のイテレーションには、次の決まりがある。

> - イテレーション順序は未定義
> - イテレーション中に要素を追加・削除しても、同じ要素が返されてはならない
> - イテレーション中に変更された要素は最新の値を返さなければならない
> - イテレーション中に削除された要素は返されてはならない
> - イテレーション中に追加された要素は返されても良い

Directory の数は 2 の倍数だが、Table の数はそうとは限らない。そのため、異なる Directory が同じ Table を指すことがあり、同じ要素を二度返さないための工夫が要る。

## キーワード

- [[go|Go]]
- [[swiss-table|Swiss Table]]
- ハッシュテーブル
- [[open-addressing|オープンアドレス法]]
- Extendible hashing

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [発表のページ](https://gocon.jp/2025/talks/959006/)
- [[Go1.24で進化したmap型について理解する]]
