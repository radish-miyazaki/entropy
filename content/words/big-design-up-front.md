---
title: BDUF
aliases: [BDUF]
description: 実装を始める前に設計を完成させるソフトウェア開発の進め方。アジャイル開発ではアンチパターンとされる
tags: [word]
date: 2024-08-13
---

## TL;DR

Big Design Up Front の略で、「事前の大規模設計」を指す。プログラムの実装を始める前に、設計を完成させ、磨き上げておくソフトウェア開発の進め方である。[[waterfall-model|ウォーターフォールモデル]]とよく結び付けられる。

## なぜ必要か

英語版 Wikipedia の「Big design up front」によると、BDUF を支持する人は、設計の段階で誤りを直す方が、実装の後で直すよりも安く済むと考える。実装の後で直すと、書き終えたコードや設計を捨てることになりかねない。

## 注意点

同義語に Big Modeling Up Front（BMUF）や Big Requirements Up Front（BRUF）がある。これらは[[agile-software-development|アジャイル開発]]ではアンチパターンとみなされている。

ただし、まったく設計しなくてよいわけではない。BDUF を行うべきということではないが、ソフトウェアの構築が間違った方向に進まないよう、アーキテクチャを選ぶなど、事前にある程度の設計は必要である。

BDUF を批判する人は、要件の変化に弱いことを挙げる。大きなプロジェクトでは、完成するより早くビジネスの要求が変わり、届けたときには設計が古くなっていることがある。代わりの考え方として、骨組みになる十分な設計だけを先に行い、詳細はプロジェクトを進めながら足していく Rough design up front（RDUF）がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[waterfall-model|ウォーターフォールモデル]]
- [[agile-manifesto|アジャイルソフトウェア開発宣言]]

## 出典

- [Big design up front - Wikipedia](https://en.wikipedia.org/wiki/Big_design_up_front)
- [BDUF - iki-iki](https://scrapbox.io/iki-iki/BDUF)
- [[手を動かしてわかるクリーンアーキテクチャ 第1章 保守容易性|手を動かしてわかるクリーンアーキテクチャ 第1章 保守容易性]]
