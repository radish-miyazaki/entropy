---
title: Domain Modeling Made Functional 第11章 シリアライズのための設計
description: ドメインオブジェクトをシリアライズ専用の DTO に変換してからシリアライズし、ドメイン固有のチェックは DTO からの変換時に行う
tags: [book-chapter, ddd, fsharp]
date: 2024-08-03
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- [[domain-object|ドメインオブジェクト]]を直接シリアライズせず、シリアライズ専用の [[dto|DTO]] に変換してからシリアライズする。デシリアライズはその逆を行う。
- ドメイン固有のチェックは、DTO からドメインオブジェクトに変換するときに行う。

## 内容

[[Domain Modeling Made Functional 第3章 境界づけられたコンテキストのコミュニケーション]]で見たように、[[serialization|シリアライズ]]を簡単にするには、ドメインオブジェクトをシリアライズ専用の型である DTO に変換し、その DTO をシリアライズすればよい。デシリアライズでは逆に、受け取ったデータを DTO にデシリアライズし、DTO をドメインオブジェクトに変換する。

[[bounded-context|境界づけられたコンテキスト]]の内側のほうがエラー処理を制御しやすいので（[[Domain Modeling Made Functional 第10章 Implementation： Working with Errors|第10章]]）、ドメイン固有のチェックは、DTO からドメインオブジェクトに変換するときに行うべきである。

## キーワード

- [[serialization|シリアライズ]]
- [[dto|DTO]]
- [[domain-object|ドメインオブジェクト]]
- [[bounded-context|境界づけられたコンテキスト]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
