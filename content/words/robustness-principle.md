---
title: Postel の法則
aliases: [robustness の法則, ロバストネス原則, "Postel's law"]
description: 「自分のやることは保守的に、他人から受け入れることは寛容に」という、通信プロトコルの実装の指針
tags: [word]
date: 2025-04-22
---

## TL;DR

「自分のやることは保守的に、他人から受け入れることは寛容に」という、通信プロトコルを実装するときの指針。ロバストネス原則とも呼ばれる。

> be conservative in what you do, be liberal in what you accept from others

## 仕組み

インターネットのホストに求められる要件をまとめた RFC 1122 では、1.2.2 節「Robustness Principle」で、この原則を「Be liberal in what you accept, and conservative in what you send」と述べている。同じ節では、どんなにありそうにないエラーにも対処できるようにソフトウェアを書くこと、プロトコルの値として未知のコードが届いても壊れないことを求めている。一方で、仕様上は正しくてもあまり使われない機能は、相手がうまく扱えないことがあるので避けるべきだとしている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [ロバストネス原則 - Wikipedia](https://ja.wikipedia.org/wiki/ロバストネス原則)
- [RFC 1122: Requirements for Internet Hosts -- Communication Layers](https://www.rfc-editor.org/rfc/rfc1122#section-1.2.2)
