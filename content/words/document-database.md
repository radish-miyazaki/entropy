---
title: ドキュメントデータベース
aliases: []
description: JSON や XML などの半構造化データをそのまま保存する NoSQL データベース
tags: [word]
date: 2024-08-09
---

## TL;DR

[[nosql|NoSQL]] データベースの一種で、[[json|JSON]] や [[xml|XML]] のような半構造化データを保存するデータベース。

## 仕組み

ドメインのデータをドキュメントデータベースに[[persistence|永続化]]する手順は、次の 3 ステップだけで済む。

1. [[domain-object|ドメインオブジェクト]]を DTO に変換する
2. DTO を JSON 文字列に変換する
3. ストレージの API を通して CRUD 操作を行う

## 例

- [[mongodb|MongoDB]]
- [[amazon-dynamodb|Amazon DynamoDB]]
- Azure Blob Storage

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nosql|NoSQL]]
- [[persistence|永続化]]

## 出典

- [[Domain Modeling Made Functional 第12章 ドキュメントデータベースを扱う|Domain Modeling Made Functional 第12章 ドキュメントデータベースを扱う]]
