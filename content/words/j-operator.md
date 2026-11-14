---
title: J operator
aliases: []
description: SECD マシンを説明する論文に出てくる特殊な演算子で、継続の考え方の起源
tags: [word, 計算モデル]
date: 2025-06-14
---

## TL;DR

[[secd-machine|SECD マシン]]を説明する論文の中に出てくる特殊な演算子である。[[continuation|継続]]の考え方の起源とされる。

## 仕組み

J operator は、呼ばれた時点では何もしない。その代わりに、その時点の SECD マシンの Dump を捕捉する。この「残りの計算を捕まえる」という発想が、後の継続につながった。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[secd-machine|SECD マシン]]
- [[continuation|継続]]

## 出典

- [J operator - Wikipedia](https://en.wikipedia.org/wiki/J_operator)
