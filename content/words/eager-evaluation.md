---
title: 正格評価
aliases: [先行評価, eager evaluation, strict evaluation]
description: 関数の本体を実行する前に、引数を評価してしまう評価戦略
tags: [word, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

関数の本体を実行する前に、引数を評価してしまう評価戦略。先行評価とも呼ぶ。対になるのは、値が必要になるまで評価を遅らせる遅延評価である。

## 仕組み

Wikipedia によると、正格評価では、関数呼び出しは処理の中で現れた時点ですぐに行われる。引数はすべて先に計算される。

遅延評価（非正格評価）では、引数は必要になったときにだけ計算される。そのため、使われない式に重い計算やエラー、無限ループが含まれていても無視される。ただし、未評価の式を表すサンクのような複雑な構造が必要になる。正格評価は通常のコールスタックで済む。

## 例

- Common Lisp、Eiffel、Java は、引数を左から右へ正格に評価する。
- [[haskell|Haskell]] は遅延評価（必要呼び）の言語である。[[bang-pattern|Bang pattern]] を使うと、照合の前に値を評価させて正格評価にできる。
- TypeScript の `Promise` は作った時点で処理が始まるので正格評価である。一方、Effect の `Effect` は実行するまで何もしない（[[effect-promise|Effect.promise]]）。

## 注意点

正格評価では、使われない引数も計算するので、その計算が失敗したり止まらなかったりすると、プログラム全体が影響を受ける。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[bang-pattern|Bang pattern]]
- [[effect-promise|Effect.promise]]
- [[haskell|Haskell]]

## 出典

- [Eager evaluation - Wikipedia](https://en.wikipedia.org/wiki/Eager_evaluation)
- [[effect-promise|Effect.promise]]
