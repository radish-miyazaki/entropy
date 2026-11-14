---
title: システムが明白である
aliases: []
description: システムの既存コードを理解し、変更すべき箇所をすぐに把握できる状態
tags: [word, 設計, 複雑さ]
date: 2023-12-16
---

## TL;DR

システムの既存コードを理解し、変更すべき箇所をすぐに把握できる状態（a system to be obvious）。[[A Philosophy of Software Design]] では、優れた[[design|設計]]の最も重要な目標の 1 つとされている。

## なぜ必要か

明白なシステムは、高い[[cognitive-load|認知的負荷]]や[[unknown-unknowns|未知の未知]]とは真逆の状態である。開発者は少ない知識で作業でき、何を知らないかが分からないという状況にも陥りにくい。

また、システムが明白であれば、必要なドキュメントは少なくて済む。逆に、[[documentation-need-signals-poor-design|必要なドキュメントが多いということは、設計が適切でない]]。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[obscurity|不明瞭]]: 明白さを損なう、複雑さの原因
- [[complexity|複雑さ]]
- [[nonobvious-code|明白でないコード]]

## 出典

- [[A Philosophy of Software Design 第2章 The Nature of Complexity|A Philosophy of Software Design 第2章]]
- [[A Philosophy of Software Design 第18章 Code Should Be Obvious|A Philosophy of Software Design 第18章]]
