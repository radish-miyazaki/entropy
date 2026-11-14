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

MongoDB の公式ドキュメントによると、MongoDB ではドキュメントがデータの基本単位で、データを BSON ドキュメントとして保存する。BSON は [[json|JSON]] のドキュメントをバイナリで表したもので、JSON より多くのデータ型を持つ。ドキュメントはフィールドと値の組からなり、値には他のドキュメントや配列、ドキュメントの配列も入れられる。各ドキュメントは主キーとして一意な `_id` フィールドを持つ。

## 例

- MongoDB
- [[amazon-dynamodb|Amazon DynamoDB]]
- Azure Blob Storage

## 注意点

MongoDB では、1 つの BSON ドキュメントの大きさは最大 16 MiB である。1 つのドキュメントが RAM や転送時の帯域を使いすぎないようにするための制限で、それより大きいデータは GridFS の API で保存する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nosql|NoSQL]]
- [[persistence|永続化]]

## 出典

- [[Domain Modeling Made Functional 第12章 ドキュメントデータベースを扱う|Domain Modeling Made Functional 第12章 ドキュメントデータベースを扱う]]
- [Documents - MongoDB Docs](https://www.mongodb.com/docs/manual/core/document/)
