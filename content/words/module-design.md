---
title: モジュール設計
aliases: []
description: ソフトウェアシステムを、比較的独立したモジュールに分割する設計
tags: [word, 設計]
date: 2023-12-19
---

## TL;DR

ソフトウェアシステムを、比較的独立した[[module|モジュール]]に分割すること。

## なぜ必要か

Wikipedia によると、うまく分割したモジュールは、それぞれ独立に実装、テスト、改修できる。開発者ごとにモジュールを割り当てれば並行して開発でき、全体の完成を早められる。逆に分割が適切でないと、複数の開発者の変更が矛盾したり、多くの合意が必要になったりする。

## 仕組み

Wikipedia によると、モジュールは低い[[coupling|結合度]]と高い凝集度を持つのが望ましい。モジュール間の[[interface|インタフェース]]が明確で、それ以外の依存がないほど、モジュール性は高くなる。無関係な機能が 1 つのモジュールに混ざっている（[[separation-of-concerns|関心の分離]]ができていない）と、モジュール性は低くなる。

英語版 Wikipedia によると、モジュラープログラミングという言葉は、1968 年に Larry Constantine が開いたシンポジウムにさかのぼる。1972 年の[[information-hiding|情報隠蔽]]も、モジュール設計の重要な考え方の 1 つである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[module|モジュール]]
- [[deep-module|深いモジュール]]
- [[information-hiding|情報隠蔽]]

## 出典

- [モジュール - Wikipedia](https://ja.wikipedia.org/wiki/モジュール)
- [Modular programming - Wikipedia](https://en.wikipedia.org/wiki/Modular_programming)
