---
title: SECD マシン
aliases: [SECD machine]
description: ラムダ計算を実際に動かすための実行モデル。Stack、Environment、Control、Dump の 4 つのレジスタを持つ
tags: [word, 計算モデル]
date: 2025-06-14
---

## TL;DR

[[lambda-calculus|ラムダ計算]]を実際に動かすための実行モデル（抽象機械）である。名前は 4 つの主要なレジスタの頭文字から取っている。

## なぜ必要か

Wikipedia によると、SECD マシンは関数型言語のコンパイラのターゲット（目的機械）として意図された抽象機械で、後に大きな影響を与えた。Peter J. Landin が考案し、1964 年に Computer Journal 誌で発表した。

## 仕組み

SECD マシンは次の 4 つのレジスタで計算を進める。

- Stack: 計算中の値を保持する
- Environment: 変数を保持する
- Control: 実行すべき命令列を保持する
- Dump: 関数を呼び出す前の S、E、C を保持する

SECD マシンを説明する論文には、現在の Dump を捕捉する [[j-operator|J operator]] が出てくる。これが[[continuation|継続]]の考え方の起源である。

4 つのレジスタは、いずれもメモリ上の連結リストを指す。関数適用の `ap` 命令は、スタックからクロージャと引数リストを取り出し、引数を環境に置いて、関数本体を C に入れる。このとき、それまでの S と E、C の次の値をダンプに退避する。`ret` 命令はダンプから S、E、C を戻し、戻り値を呼び出し元のスタックに積む。なお、Wikipedia では C を Code の頭文字としている。

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
