---
title: Domain Modeling Made Functional 第11章 Serialization
description: 境界づけられたコンテキストに出入りするコマンドやイベントのために、ドメインモデルをシリアライズ・デシリアライズする方法を扱う章
tags: [book-chapter, ddd, fsharp]
date: 2024-07-31
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- [[command|コマンド]]やイベントは、[[bounded-context|境界づけられたコンテキスト]]の外のインフラストラクチャから出入りする。
- そのため、ドメインモデルをインフラストラクチャが理解できる形式に[[serialization|シリアライズ]]・デシリアライズする必要がある。

## 内容

コマンドやイベントは、Web リクエストやレスポンス、メッセージキューのように、境界づけられたコンテキストの外にあるインフラストラクチャを通って出入りする。このとき、ドメインモデルを JSON、XML、[[protocol-buffers|Protocol Buffers]] のようなインフラストラクチャが理解できる形式に変換する必要がある。この章では、その変換を扱う。各節のまとめは次のページにある。

- [[Domain Modeling Made Functional 第11章 シリアライズのための設計]]
- [[Domain Modeling Made Functional 第11章 シリアライズコードとワークフローの連携]]
- [[Domain Modeling Made Functional 第11章 シリアライズの全体例]]
- [[Domain Modeling Made Functional 第11章 ドメイン型を DTO に変換する方法]]

## キーワード

- [[serialization|シリアライズ]]
- [[dto|DTO]]
- [[command|コマンド]]
- [[domain-event|ドメインイベント]]
- [[bounded-context|境界づけられたコンテキスト]]
- [[protocol-buffers|Protocol Buffers]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
