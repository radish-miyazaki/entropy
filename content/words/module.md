---
title: モジュール
aliases: []
description: クラスやサブシステム、サービスなど、ソフトウェアシステムを構成する比較的独立した単位
tags: [word, 設計]
date: 2023-12-19
---

## TL;DR

クラスやサブシステム、サービスなど、ソフトウェアシステムを分割した単位のこと。

## 仕組み

Wikipedia によると、モジュールはサブルーチンとデータ構造の集まりで、単体でコンパイルできる単位である。モジュールは[[interface|インタフェース]]と実装に分かれる。インタフェースは、モジュールが外部に提供するものと、外部に求めるものを表す。実装は、インタフェースで定めた機能を実際に実現するコードである。

## 例

英語版 Wikipedia によると、モジュールの呼び方と大きさは言語によって違う。言語によってはパッケージやユニットと呼ぶ。[[python|Python]] ではファイル 1 つが 1 つのモジュールで、Java 9 のモジュールは複数のパッケージの集まりである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[module-design|モジュール設計]]
- [[deep-module|深いモジュール]]
- [[shallow-module|浅いモジュール]]

## 出典

- [モジュール - Wikipedia](https://ja.wikipedia.org/wiki/モジュール)
- [Modular programming - Wikipedia](https://en.wikipedia.org/wiki/Modular_programming)
