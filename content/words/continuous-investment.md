---
title: 継続的な投資
aliases: [継続的な再設計]
description: 設計の誤りや改善の機会に気づいたら、少しずつ時間をかけて直し続けること
tags: [word]
date: 2023-12-27
---

## TL;DR

設計の誤りや改善の機会に気づいたら、少しずつ時間をかけて直し続けること。[[A Philosophy of Software Design]] で、[[strategic-programming|戦略的プログラミング]]の一部として説かれている。

## なぜ必要か

[[A Philosophy of Software Design]] によると、設計上の判断の誤りは避けられず、時間が経つと明らかになる。大規模なソフトウェアを事前にすべて見通すことはできないので、設計に終わりはない。誤りを無視したり場当たり的に対応したりすれば、[[tactical-programming|戦術的プログラミング]]と同じになり、将来問題を起こす[[complexity|複雑さ]]が少しずつたまる。

## 仕組み

システム全体を最初に設計するような大きな先行投資は効果がなく、小さな投資を継続して数多く行うほうがよい。目安は総開発時間の 10〜20% 程度である。既存のコードを変えるときも、変更を踏まえて今の設計が最善かを考え、最善でなければ[[refactoring|リファクタリング]]する。こうすれば、変更のたびに設計が良くなる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[continuous-improvement|継続的改善]]
- [[strategic-programming|戦略的プログラミング]]
- [[tactical-programming|戦術的プログラミング]]

## 出典

- [[A Philosophy of Software Design]]
