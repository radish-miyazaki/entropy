---
title: Scope hammering
aliases: [スコープハンマリング]
description: Shape Up で、決めた期間に収めるために、デザイン、実装、使い方を強く問い直してスコープを削ること
tags: [word, project-management]
date: 2026-11-16
---

## TL;DR

[[shape-up|Shape Up]] で、決めた期間の中で作り終えるために、デザイン、実装、使い方を強く問い直してスコープを削ること。

## なぜ必要か

[[Shape Up： Stop Running in Circles and Ship Work that Matters 第14章 Decide When to Stop|第 14 章]]によると、作業に入ると複雑さや改善の余地が次々に見つかるので、スコープは放っておくと伸び続ける。[[shape-up-circuit-breaker|Circuit breaker]] があって期限は延びないので、チームが自分で削り続けるしかない。

軽く「削る」程度ではスコープは期間に収まらないので、本は力を込めて「たたく（hammering）」という言葉を選んでいる。この習慣は Basecamp の最初のバージョンを限られた時間で作ったころから続いている（[[Shape Up： Stop Running in Circles and Ship Work that Matters 第1章 Introduction|第 1 章]]）。

## 仕組み

問題が出てくるたびに、次のようなことを問う。

- 本当に必須か。なくても出せるか
- やらなかったら何が起きるか
- 新しく生まれた問題か、前からあった問題か
- どのくらいの頻度で起きるか
- 中心の使い方に関わるか、まれなケースか

必須と判断したものは [[must-have|Must-have]] として Scope のタスクにする。そうでないものは先頭に「~」を付けて [[nice-to-have|Nice-to-have]] にする。この印を付けることが hammering にあたり、印の付いたタスクはたいてい作られないまま終わる。

## 注意点

スコープを削っても品質を下げるわけではない。何を作り、どこまでやるかを選ぶことで、プロダクトはある点でより優れたものになる。コードの品質、見た目、画面の文言、操作の速さには厳しいままでいる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[must-have|Must-have]]
- [[nice-to-have|Nice-to-have]]
- [[scope-creep|スコープクリープ]]
- [[appetite|Appetite]]
- [[shape-up-circuit-breaker|Circuit breaker]]

## 出典

- [[Shape Up： Stop Running in Circles and Ship Work that Matters 第14章 Decide When to Stop|Shape Up › Decide When to Stop]]
- [Decide When to Stop | Shape Up](https://basecamp.com/shapeup/3.5-chapter-14)
- [Introduction | Shape Up](https://basecamp.com/shapeup/0.3-chapter-01)
- [Glossary | Shape Up](https://basecamp.com/shapeup/4.5-appendix-06)
