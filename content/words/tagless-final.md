---
title: tagless-final
aliases: []
description: 型付きの関数型言語に DSL を埋め込む手法で、同じ項を評価や整形など複数の方法で解釈でき、拡張しやすい
tags: [word]
date: 2025-06-14
---

## TL;DR

型付きの関数型言語の中に、[[domain-specific-language|ドメイン固有言語]]（DSL）を埋め込む手法。DSL の項をデータ構成子ではなく関数で表すので、同じ項を評価、整形、解析、コンパイルなど複数の方法で解釈でき、後から拡張しやすい。

## 仕組み

提唱者の Oleg Kiselyov によると、tagless-final による埋め込みは、DSL の表示的意味論を書くことそのものである。DSL の項は、データ構成子ではなくコンビネータ関数で表す。ホスト言語の型検査器が DSL の型を検査・推論するので、型の正しい項だけが埋め込める。型タグを持たないので、型タグの不一致によるエラーは起こりえない。

Kiselyov は拡張性をこの手法の特徴に挙げている。既存の項を書き直さずに、新しい構文や新しいインタプリタを足せる。講義ノートでは Expression Problem の解法としても扱っている。

GADT で項を表す手法は initial と呼ばれ、tagless-final と対になる。final と initial の表現は全単射で対応している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ドメインモデリングにおける抽象の役割、tagless-finalによるDSL構築、そして型安全な最適化]]
- [[domain-specific-language|ドメイン固有言語]]

## 出典

- [Tagless Final - windymelt](https://scrapbox.io/windymelt/Tagless_Final)
- [Typed Tagless Final Interpreters - Oleg Kiselyov](https://okmij.org/ftp/tagless-final/)
