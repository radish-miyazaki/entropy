---
title: DRY
aliases: [Don't Repeat Yourself]
description: Don't Repeat Yourself（同じことを繰り返すな）の略
tags: [word, 設計]
date: 2023-11-29
---

## TL;DR

Don't Repeat Yourself（同じことを繰り返すな）の略。変わりうる情報の重複を減らすための、ソフトウェア開発の原則である。

## なぜ必要か

同じ情報が何か所にも書かれていると、変更のたびにそのすべてを直す必要がある。Wikipedia によると、DRY は[[abstraction|抽象化]]やデータの正規化によって、この重複を減らす。

## 仕組み

Andy Hunt と Dave Thomas が、1999 年の『The Pragmatic Programmer』で次のように定式化した。

> Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

対象はコードだけではない。著者たちは、データベースのスキーマ、テスト計画、ビルドシステム、ドキュメントにもこの原則を当てはめている。

## 注意点

Wikipedia では、早すぎる抽象化はかえって硬直した、保守しにくいコードを生むとされる。この立場から、必要になるまで抽象化しない AHA（Avoid Hasty Abstractions）という考え方もある。Sandi Metz は、誤った抽象化よりも重複のほうがよいと述べている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dry-shuhari|DRY の守破離]]
- [[abstraction|抽象化]]

## 出典

- [Don't repeat yourself - Wikipedia](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
