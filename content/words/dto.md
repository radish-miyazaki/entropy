---
title: DTO
aliases: [データ転送オブジェクト, Data Transfer Object]
description: データの受け渡しのためのオブジェクト。DDD では、シリアライズされて境界づけられたコンテキスト間で共有されるオブジェクトを指す
tags: [word, ddd]
date: 2024-07-12
---

## TL;DR

Data Transfer Object の略。[[domain-driven-design|ドメイン駆動設計]]の文脈では、[[serialization|シリアライズ]]され、[[bounded-context|境界づけられたコンテキスト]]の間で共有されるように設計されたオブジェクトを指す。

## なぜ必要か

Martin Fowler の『Patterns of Enterprise Application Architecture』の定義では、DTO はメソッド呼び出しの回数を減らすために、プロセス間でデータを運ぶオブジェクトである。リモートのインターフェースは 1 回の呼び出しのコストが大きい。多くの引数を渡すのは扱いにくく、戻り値を 1 つしか返せない言語ではそもそもできない。そこで、1 回の呼び出しに必要なデータをすべて 1 つのオブジェクトに詰めて運ぶ。

## 仕組み

DTO は接続を越えて送るので、シリアライズできる必要がある。シリアライズの処理を DTO にまとめておくと、他のコードから通信の形式を切り離せる。サーバー側では、アセンブラと呼ばれるオブジェクトが DTO とドメインオブジェクトの間でデータを詰め替えるのが一般的である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[bounded-context|境界づけられたコンテキスト]]
- [[serialization|シリアライズ]]
- [[dao|DAO]]

## 出典

- [Data Transfer Object - P of EAA Catalog - Martin Fowler](https://martinfowler.com/eaaCatalog/dataTransferObject.html)
