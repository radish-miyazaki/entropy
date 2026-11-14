---
title: ラムダ計算
aliases: [lambda calculus]
description: 関数だけからなる計算モデルで、関数型言語のもとになる考え方
tags: [word, 関数型プログラミング]
date: 2025-06-15
---

## TL;DR

関数だけからなる計算モデルである。[[functional-programming|関数型プログラミング]]言語のもとになる考え方である。

## 仕組み

関数（ラムダ式）は `λ` を使って `λx.式` のように表す。これをラムダ抽象と呼ぶ。[[javascript|JavaScript]] で書けば `(x) => 式` にあたる。

[[beta-reduction|β 簡約]]によって関数を適用し、式を書き換えていく。ラムダ計算を実際に動かすための実行モデルには [[secd-machine|SECD マシン]]がある。

## 例

引数をそのまま返す恒等関数は `λx.x` と書ける。

## 自分の理解

プログラミングで扱う関数の本質を、数学的に扱うためのものだと認識している。

## 関連

- [[beta-reduction|β 簡約]]
- [[secd-machine|SECD マシン]]
- [[functional-programming|関数型プログラミング]]
- [[ラムダ計算と抽象機械と非同期ランタイム]]

## 出典

- [ラムダ計算の講義資料（東北大学）](https://www.kb.ecei.tohoku.ac.jp/~sumii/class/keisanki-software-kougaku-2005/lambda.pdf)
- [ラムダ計算の解説（東京大学）](https://event.phys.s.u-tokyo.ac.jp/physlab2024/pdfs/article/lambda.pdf)
