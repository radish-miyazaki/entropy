---
title: 全域関数
aliases: []
description: 定義域のすべての入力に対して出力が定まる関数。例外を投げる関数は全域関数ではない
tags: [word, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

取りうるすべての入力に対して、出力が 1 つ定まる関数。一部の入力で値が定まらない関数は部分関数と呼ぶ。

## なぜ必要か

[[Domain Modeling Made Functional]] によると、関数を全域関数として設計すると、すべてのエフェクトを[[type-signature|型シグネチャ]]で文書化できる。シグネチャが `int -> int` の関数が 0 で例外を投げるなら、`int` を渡しても `int` が返るとは限らず、シグネチャが実際の振る舞いを表さなくなる。

## 仕組み

Wikipedia の定義では、集合 X から集合 Y への部分関数のうち、X のすべての要素で値が定まるものを全域関数という。計算機科学では、部分関数は例外を投げるか無限ループに陥るサブルーチンに当たる。[[type-system|型システム]]が関数の正確な定義域を表せないときにも、関数は部分関数として扱われる。

Domain Modeling Made Functional では、部分関数を全域関数にする方法として 2 つを挙げている。1 つ目は、0 を含まない `NonZeroInteger` のような型で入力を制限し、不正な値を受け取らないようにする方法である。2 つ目は、`int -> int option` のように `Option` 型で出力を広げ、値がない場合も戻り値で表す方法である。

## 例

除算は分母が 0 のとき定まらないので部分関数である。自然対数も 0 以下の実数では定まらないので部分関数だが、定義域を正の実数に制限すれば全域関数になる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[functional-programming|関数型プログラミング]]
- [[type-signature|型シグネチャ]]
- [[error-handling|エラーハンドリング]]

## 出典

- [[Domain Modeling Made Functional 第8章 全域関数|Domain Modeling Made Functional 第8章 全域関数]]
- [Partial function - Wikipedia](https://en.wikipedia.org/wiki/Partial_function)
