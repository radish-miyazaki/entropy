---
title: J operator
aliases: []
description: SECD マシンを説明する論文に出てくる特殊な演算子で、継続の考え方の起源
tags: [word, 計算モデル]
date: 2025-06-14
---

## TL;DR

[[secd-machine|SECD マシン]]を説明する論文の中に出てくる特殊な演算子である。[[continuation|継続]]の考え方の起源とされる。

## なぜ必要か

Wikipedia によると、J operator は Peter Landin が考案したもので、ラベルとジャンプを第一級の値として扱えるようにするために作られた。

## 仕組み

J operator は、呼ばれた時点では何もしない。その代わりに、その時点の SECD マシンの Dump を捕捉する。この「残りの計算を捕まえる」という発想が、後の継続につながった。

Wikipedia によると、元の J operator は、本体の関数と Dump の組である「プログラムクロージャ」を作る。これは本体の関数を、継続の形にした Dump と合成したものと同じで、`closure(f, D)(x) = D(f(x))` と書ける。こうして作った関数は第一級の値で、適用すると、それが作られた関数の継続に結果を返す。つまり、呼び出した関数をその値で強制的に return させる。

## 例

`J(λx.x)` は、恒等関数が値をそのまま渡すので、第一級の return 文として振る舞う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[secd-machine|SECD マシン]]
- [[continuation|継続]]
- [[closure|クロージャ]]

## 出典

- [J operator - Wikipedia](https://en.wikipedia.org/wiki/J_operator)
