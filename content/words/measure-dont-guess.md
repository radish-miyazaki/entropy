---
title: 推測するな、計測せよ
aliases: []
description: ボトルネックは思わぬ場所にあるので、計測して確かめるまで速度のためのハックをするな、という Rob Pike の教え
tags: [word, パフォーマンス]
date: 2024-07-30
---

## TL;DR

Rob Pike の「Notes on Programming in C」に由来する言葉。ボトルネックは思わぬ場所に現れるので、計測して確かめるまで速度のための調整をするな、という教えである。

## 仕組み

元になったのは、次の 2 つのルールである。

> Rule 1. You can't tell where a program is going to spend its time. Bottlenecks occur in surprising places, so don't try to second guess and put in a speed hack until you've proven that's where the bottleneck is.
>
> Rule 2. Measure. Don't tune for speed until you've measured, and even then don't unless one part of the code overwhelms the rest.

プログラムがどこで時間を使うかは、事前には分からない。だから、まず計測してボトルネックを特定する。計測したあとでも、コードの一部が他を圧倒して遅いのでなければ、速度のための調整はしない。

## 注意点

「推測すること」自体を否定しているわけではない。Rob Pike が批判しているのは、合理的な根拠なしに決めつけてハックをすることである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- <https://aki33524.hatenablog.com/entry/2023/08/25/231051>
- <https://qiita.com/e99h2121/items/e8f899756b21b0414835>
- <https://logmi.jp/tech/articles/329163>
