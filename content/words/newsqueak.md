---
title: Newsqueak
aliases: [Newaqueak]
description: Rob Pike が設計した、対話的なグラフィックスのプログラムを書くための並行プログラミング言語
tags: [word, プログラミング言語]
date: 2025-02-25
---

## TL;DR

Rob Pike が設計した、対話的なグラフィックスのプログラムを書くための[[concurrency|並行]]プログラミング言語。構文と基本的な意味は C から、メッセージパッシングの仕組みは [[csp|CSP]] から取っている。

## なぜ必要か

Rob Pike のリファレンスマニュアルによると、Newsqueak の元になった Squeak は、Luca Cardelli と Rob Pike が、ユーザインタフェースの設計の問題を並行処理で解く方法を示すために作った言語である。Squeak はメニューやスクロールバーのような部品を作るためのものだった。Newsqueak は同じ問題をより広く扱い、ウィンドウシステムのようなアプリケーション全体を書くことを目指した。

## 仕組み

Squeak にはなかったものとして、型システム、プロセスの動的な生成、[[channel|チャネル]]の動的な生成を持つ。Squeak は細かい処理をコンパイル先の C に任せていたが、Newsqueak はそれだけで完結した言語で、squint というインタプリタで動く。チャネルはバッファを持たない通信路で、`chan of 型` の形で宣言する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Newsqueak - Wikipedia](https://en.wikipedia.org/wiki/Newsqueak)
- [Newsqueak: A Language for Communicating with Mice - Rob Pike](https://swtch.com/~rsc/thread/newsqueak.pdf)
