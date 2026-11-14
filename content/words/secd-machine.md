---
title: SECD マシン
aliases: [SECD machine]
description: ラムダ計算を実際に動かすための実行モデル。Stack、Environment、Control、Dump の 4 つのレジスタを持つ
tags: [word, 計算モデル]
date: 2025-06-14
---

## TL;DR

[[lambda-calculus|ラムダ計算]]を実際に動かすための実行モデル（抽象機械）である。名前は 4 つの主要なレジスタの頭文字から取っている。

## 仕組み

SECD マシンは次の 4 つのレジスタで計算を進める。

- Stack: 計算中の値を保持する
- Environment: 変数を保持する
- Control: 実行すべき命令列を保持する
- Dump: 関数を呼び出す前の S、E、C を保持する

SECD マシンを説明する論文には、現在の Dump を捕捉する [[j-operator|J operator]] が出てくる。これが[[continuation|継続]]の考え方の起源である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[lambda-calculus|ラムダ計算]]
- [[j-operator|J operator]]
- [[continuation|継続]]
- [[ラムダ計算と抽象機械と非同期ランタイム]]

## 出典

- [SECDマシン - Wikipedia](https://ja.wikipedia.org/wiki/SECDマシン)
