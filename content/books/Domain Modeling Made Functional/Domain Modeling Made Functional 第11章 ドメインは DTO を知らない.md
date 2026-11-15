---
title: Domain Modeling Made Functional › ドメインは DTO を知らない
description: ドメインは DTO のことを知らないはずなので、ドメインと DTO の相互変換は DTO 側に実装する
tags: [book-chapter]
date: 2024-08-03
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- [[domain|ドメイン]]は [[dto|DTO]] のことを知らないはずなので、ドメインと DTO の相互変換は DTO 側に実装する。

## 内容

[[Domain Modeling Made Functional 第11章 Serialization|第11章 Serialization]]の一部である。ドメインのコードは DTO に依存しない。そのため、ドメインオブジェクトを DTO に変換する処理も、DTO をドメインオブジェクトに戻す処理も、DTO のモジュールに置く。具体的なコードは[[Domain Modeling Made Functional 第11章 シリアライズの全体例|シリアライズの全体例]]にある。

## キーワード

- [[domain|ドメイン]]
- [[dto|DTO]]
- [[domain-object|ドメインオブジェクト]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
