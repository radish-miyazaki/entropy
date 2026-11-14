---
title: ULID
aliases: []
description: UUID の欠点を補うように設計された、時系列順にソートできる一意識別子
tags: [word, uuid]
date: 2024-10-08
---

## TL;DR

Universally Unique Lexicographically Sortable Identifier の略。[[uuid|UUID]] の欠点を補うように設計された一意識別子で、生成した時刻の順に辞書順でソートできる。

## なぜ必要か

仕様では、UUID の欠点として次の点を挙げている。

- 128 ビットのランダムな値を表すのに、文字数の効率がよくない
- UUID v1/v2 は、一意で変わらない MAC アドレスを必要とするが、多くの環境ではそれが難しい
- UUID v3/v5 は一意なシードを必要とし、生成される ID がランダムに分布するので、データ構造の断片化を招きうる
- UUID v4 はランダムな値だけでできており、同じく断片化を招きうる

## 仕組み

ULID は 128 ビットで、UUID と互換性がある。先頭の 48 ビットがミリ秒単位の UNIX 時刻、残りの 80 ビットがランダムな値である。文字列にするときは Crockford の Base32 で表し、時刻部分 10 文字とランダム部分 16 文字の計 26 文字になる（UUID は 36 文字）。大文字と小文字を区別せず、特殊文字を含まないので URL にそのまま使える。同じミリ秒の中でも、単調に増える順序を保てる。

## 例

```
01ARZ3NDEKTSV4RRFFQ69G5FAV
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[uuid|UUID]]

## 出典

- [ulid/spec - GitHub](https://github.com/ulid/spec)
