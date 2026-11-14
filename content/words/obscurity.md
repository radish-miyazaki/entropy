---
title: 不明瞭
aliases: [明白でない]
description: システムに関する重要な情報が、新しい開発者にとって明らかでないこと。複雑さの原因の 1 つ
tags: [word, 設計, 複雑さ]
date: 2023-12-16
---

## TL;DR

Dictionary.com によると、英語の obscurity は一般に、意味や表現がはっきりしないこと、あいまいさを指す。[[A Philosophy of Software Design]] の定義では、不明瞭さ（obscurity）とは、システムに関する重要な情報が、新しい開発者にとって明白でないことであり、[[dependency|依存関係]]と並ぶ[[complexity|複雑さ]]の原因とされている。

## なぜ必要か

不明瞭さは、[[cognitive-load|認知的負荷]]と[[unknown-unknowns|未知の未知]]をもたらす。必要な情報が見えないので、開発者は何を知るべきかが分からなくなる。

## 仕組み

不明瞭さは、ドキュメントが不十分なために生じることがある。ただし、その原因は設計上の問題にあることが多い。システムが明白であれば、必要なドキュメントは少なくて済む。逆に、[[documentation-need-signals-poor-design|必要なドキュメントが多いということは、設計が適切でない]]。そのためソフトウェア設計では、[[obvious-system|システムが明白である]]ことを目標とする。

## 例

- 変数名が一般的すぎて、有益な情報を持っていない。
- 変数名に単位が明記されていない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[obvious-system|システムが明白である]]
- [[dependency|依存関係]]
- [[nonobvious-code|明白でないコード]]
- [[complexity|複雑さ]]

## 出典

- [[A Philosophy of Software Design 第2章 The Nature of Complexity|A Philosophy of Software Design 第2章]]
- [obscurity - Dictionary.com](https://www.dictionary.com/browse/obscurity)
