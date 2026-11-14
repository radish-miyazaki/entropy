---
title: Ziglings
aliases: []
description: 小さな壊れたプログラムを直しながら Zig を学ぶ練習問題集
tags: [word, zig]
date: 2026-02-23
---

## TL;DR

小さな壊れたプログラムを 1 つずつ直しながら、[[zig|Zig]] を学ぶ練習問題集。Dave Gauer が始めたプロジェクトで、rustlings、Ruby Koans、The Little Schemer に影響を受けている。

## 仕組み

開発版の Zig を入れ、[[codeberg|Codeberg]] からリポジトリを clone する。プロジェクトのフォルダで `zig build` を実行すると、次に直すべき問題とコンパイラのエラーがそのまま表示される。別のターミナルで `zig build --watch` を動かしておくと、保存するたびに修正を確かめられる。

```sh
zig build            # 次の問題を確かめる
zig build --watch    # 保存するたびに確かめる
zig build -Dn=19     # 19 番の問題だけを確かめる
zig build -Ds=27     # 27 番の問題から始める
zig build -Drandom   # ランダムな問題を確かめる
zig build -Dreset    # 進み具合をリセットする
```

## 注意点

安定版の Zig ではなく、README に書かれたビルド番号以降の開発版が必要になる。

## 出典

- [ziglings/exercises](https://codeberg.org/ziglings/exercises)
