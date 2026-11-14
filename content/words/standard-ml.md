---
title: Standard ML
aliases: [SML]
description: 形式的な仕様書を持つ、型推論とモジュールシステムを備えた関数型プログラミング言語
tags: [word, プログラミング言語, fp]
date: 2026-11-14
---

## TL;DR

コンパイル時の型検査と型推論を備えた、汎用でモジュール化された[[functional-programming|関数型プログラミング]]言語。ML の方言の 1 つで、仕様書 The Definition of Standard ML による形式的な定義を持つ。

## なぜ必要か

[Wikipedia](https://en.wikipedia.org/wiki/Standard_ML) によると、広く使われている言語の中で、形式的な仕様を持つ点が独特である。仕様書は 1990 年に Robin Milner、Mads Tofte、Robert Harper が書き、1997 年に David MacQueen を加えた改訂版が出た。[[2026 年に読む “The Definition of Standard ML” 〜 現代の堅牢なソフトウェア設計の源流として|発表]]によると、この仕様書は言語の振る舞いを形式的な推論規則で定め、実装の方法は定めていない。

## 仕組み

Wikipedia によると、主な機能は次のとおりである。

- 型注釈なしで型を推論する
- `datatype` で[[algebraic-data-type|代数的データ型]]を定義し、パターンマッチで処理する。コンパイラは網羅性と冗長性を検査する
- `raise` と `handle` による例外
- シグネチャ（インタフェース）、ストラクチャ（モジュール）、ファンクタ（ストラクチャからストラクチャへの関数）からなるモジュールシステム

## 例

[SML Family](https://smlfamily.github.io/) には、SML/NJ、MLton、Poly/ML、MLKit など、多くの処理系が並んでいる。Wikipedia によると、コンパイラ、プログラミング言語の研究、定理証明系の開発でよく使われ、HOL4 や Isabelle は SML で書かれている。

## 注意点

純粋な関数型言語ではなく、副作用を持つ機能もある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ocaml|OCaml]]: SML に強く影響を受けた ML の方言
- [[haskell|Haskell]]
- [[functional-programming|関数型プログラミング]]
- [[algebraic-data-type|代数的データ型]]

## 出典

- [Standard ML - Wikipedia](https://en.wikipedia.org/wiki/Standard_ML)
- [Standard ML Family GitHub Project](https://smlfamily.github.io/)
- [[2026 年に読む “The Definition of Standard ML” 〜 現代の堅牢なソフトウェア設計の源流として]]
