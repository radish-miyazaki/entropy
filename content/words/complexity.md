---
title: 複雑さ
aliases: []
description: システムの理解や変更を難しくする、ソフトウェアの構造に関わるあらゆるもの
tags: [word]
date: 2023-12-14
---

## TL;DR

Wikipedia によると、ソフトウェアの複雑さは、ソフトウェアの内部のやり取りに影響する性質を指す。[[A Philosophy of Software Design]] の定義では、システムの理解や変更を難しくする、ソフトウェアの構造に関わるあらゆるものである。

## なぜ必要か

Wikipedia の「Programming complexity」によると、ソフトウェアの複雑さは保守のしやすさと結びついている。複雑さが増すほど、変更が意図せず他の部分とのやり取りを壊す危険が高まり、極端な場合はソフトウェアの変更がほぼ不可能になる。

## 仕組み

Wikipedia では、理解するのが難しくても最終的には理解できる「complicated」と、要素どうしのやり取りを表す「complex」を区別している。また、問題の複雑さを 2 つに分けている。偶有的な複雑さ（accidental complexity）は、ソフトウェア工学の道具によってプログラマが直面する難しさで、よりよい道具や高水準の言語で減らせる。本質的な複雑さ（essential complexity）は、解こうとしている問題の性質から生じるもので、減らせない。

[[A Philosophy of Software Design]] によると、複雑さは変更の増幅、[[cognitive-load|認知的負荷]]、[[unknown-unknowns|未知の未知]]の 3 つの症状として表れる。原因は[[dependency|依存関係]]と[[obscurity|不明瞭さ]]の 2 つで、小さな依存関係や不明瞭さが少しずつ積み重なって複雑さが生まれる（[[A Philosophy of Software Design 第2章 The Nature of Complexity|第2章 The Nature of Complexity]]）。

## 例

同書では、コードの一部がどう動くのか理解できない、ちょっとした変更にも大きなコストがかかる、どこを直せばよいか分からない、といった状態を複雑さの例に挙げている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[law-of-conservation-of-complexity|複雑性保存の法則]]
- [[deep-module|深いモジュール]]

## 出典

- [[A Philosophy of Software Design]]
- [Programming complexity - Wikipedia](https://en.wikipedia.org/wiki/Programming_complexity)
