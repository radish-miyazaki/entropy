---
title: Featherweight Go
aliases: []
description: Go のジェネリクスの設計を、Featherweight Java にならって形式化した 2020 年の論文
tags: [word, go]
date: 2025-09-28
---

## TL;DR

[[go|Go]] の[[generics|ジェネリクス]]の設計を示し、形式化した 2020 年の論文。Robert Griesemer、Ian Lance Taylor、Philip Wadler らが著者に名を連ねている。

## 仕組み

Igarashi、Pierce、Wadler による Featherweight Java の研究にならい、Go のジェネリクスの設計を記述している。

> We describe a design for generics in Go inspired by previous work on Featherweight Java by Igarashi, Pierce, and Wadler.

論文の概要によると、Java の公称的部分型と Go の構造的部分型、Java のイレイジャによるジェネリクスと Go の単相化（monomorphisation）を対比している。単相化を形式化した最初期の研究の一つであり、この設計が Expression Problem の解決に役立つとも論じている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[generics|ジェネリクス]]
- [[なぜGoのジェネリクスはこの形なのか？ - Featherweight Goが明かす設計の核心]]

## 出典

- [Featherweight Go（arXiv）](https://arxiv.org/abs/2005.11710)
