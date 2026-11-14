---
title: エンティティ
aliases: []
description: プロパティが変わっても持続する固有のアイデンティティを持つドメインオブジェクト
tags: [word, ddd]
date: 2024-07-18
---

## TL;DR

プロパティが変更されても持続する、固有のアイデンティティを持つ[[domain-object|ドメインオブジェクト]]。[[value-object|値オブジェクト]]と対になる概念である。

## 仕組み

アイデンティティは、`ID` や `Key` のようなフィールドで表す。エンティティは、ドキュメントのように寿命と変更の履歴を持つドメインオブジェクトを表すのに使う。

Martin Fowler の Evans Classification によると、エンティティは時間がたっても、表現が変わっても続く固有のアイデンティティを持つオブジェクトであり、参照オブジェクトとも呼ばれる。

## 例

顧客、注文、製品、請求書など。

## 注意点

Fowler によると、1 つの概念上のエンティティを 2 つのオブジェクトで表すことは普通は望まないので、エンティティでは等価性（equality）をオーバーライドしないことが多い。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[value-object|値オブジェクト]]
- [[aggregate|集約]]
- [[domain-object|ドメインオブジェクト]]

## 出典

- [Evans Classification - Martin Fowler](https://martinfowler.com/bliki/EvansClassification.html)
