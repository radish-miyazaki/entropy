---
title: Bang pattern
aliases: []
description: Haskell で、パターンに ! を付けて引数を正格に評価させる構文
tags: [word, haskell]
date: 2025-06-14
---

## TL;DR

[[haskell|Haskell]] で[[eager-evaluation|正格評価]]を実現するためのパターン。パターンの前に `!` を付けると、照合の前にその値を評価させられる。GHC の `BangPatterns` 拡張で使える。

## なぜ必要か

Haskell は[[lazy-evaluation|遅延評価]]なので、引数はパターンが必要とするまで評価されない。Bang pattern を使うと、必要な箇所だけを正格にできる。

## 仕組み

式を `!p` に照合すると、まず式を弱頭部正規形（WHNF）まで評価してから、結果を `p` に照合する。これは `seq` を使った次の書き換えと同じ意味になる。

```haskell
case v of { !pat -> e; _ -> e' }
  = v `seq` case v of { pat -> e; _ -> e' }
```

`let !x = e in body` のような正格な let 束縛も同じで、`body` の前に `e` が評価される。

## 例

```haskell
f1 !x = True          -- x について正格
f2 (!x, y) = [x, y]   -- x については正格、y については遅延
```

## 注意点

- コンストラクタのパターンはもともと評価を強制するので、その前に `!` を付けても意味はない。`f3 !(x,y)` は `f4 (x,y)` と同じ動きをする
- 空白で意味が変わる。`a ! b = ...` は演算子 `(!)` の定義で、`a !b = ...` が Bang pattern になる
- モジュールのトップレベルでは正格な束縛を書けない
- GHC2021 と GHC2024 には含まれているので、これらの言語エディションでは明示的に有効にしなくてよい

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Strict Haskell - GHC User's Guide](https://ghc.gitlab.haskell.org/ghc/doc/users_guide/exts/strict.html)
- [Qiita の記事](https://qiita.com/func-hs/items/51b314a2323b83653bb9)
- [Bang pattern - Nodewww](https://scrapbox.io/Nodewww/Bang%20pattern)
