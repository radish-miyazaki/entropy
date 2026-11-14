---
title: 継続
aliases: []
description: プログラムの残りの計算を表す概念
tags: [word, 関数型プログラミング]
date: 2025-06-14
---

## TL;DR

プログラムの「残りの計算」を表す概念である。

## 仕組み

[[racket|Racket]] には、継続を扱う `call/cc` という関数がある。`call/cc` は、プログラム実行の残りの部分を値として捕捉する。捕捉した継続は第一級オブジェクトとして扱える。これにより、例外のような非局所脱出やバックトラックを実現できる。

継続の考え方は、[[secd-machine|SECD マシン]]の論文に出てくる [[j-operator|J operator]] に由来する。

[[racket|Racket]] のリファレンスでは、評価の途中で次に簡約される式（redex）を囲む評価文脈を継続と呼ぶ。継続は、その式が値に簡約された後にどう「続ける」かを表す。継続は継続フレームの列に分けられ、評価が進むたびに今の継続にフレームが足されたり取り除かれたりする。

## 注意点

継続はコールバック関数とは別のものである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[continuation-passing-style|継続渡しスタイル]]
- [[delimited-continuation|限定継続]]
- [[j-operator|J operator]]
- [[racket|Racket]]

## 出典

- [1.1 Evaluation Model - The Racket Reference](https://docs.racket-lang.org/reference/eval-model.html)
