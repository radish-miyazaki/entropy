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

[[racket|Racket]] には、継続を扱う `call/cc` という関数がある。`call/cc` は、プログラム実行の残りの部分を値として捕捉する。捕捉した継続は[[first-class-object|第一級オブジェクト]]として扱える。これにより、例外のような非局所脱出やバックトラックを実現できる。

継続の考え方は、[[secd-machine|SECD マシン]]の論文に出てくる [[j-operator|J operator]] に由来する。

## 注意点

継続は[[callback-function|コールバック関数]]とは別のものである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[continuation-passing-style|継続渡しスタイル]]
- [[delimited-continuation|限定継続]]
- [[j-operator|J operator]]
- [[racket|Racket]]
