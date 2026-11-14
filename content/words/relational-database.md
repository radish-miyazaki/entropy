---
title: リレーショナルデータベース
aliases: [RDB, RDBMS]
description: データをリレーション（テーブル）として保存し、管理するデータベース
tags: [word, データベース]
date: 2026-11-14
---

## TL;DR

データをリレーション、つまりテーブルとして保存するデータベース。それを管理するシステムを RDBMS（Relational Database Management System）と呼び、[[postgresql|PostgreSQL]] や [[mysql|MySQL]] がその例である。

## 仕組み

[PostgreSQL のドキュメント](https://www.postgresql.org/docs/current/tutorial-concepts.html)によると、リレーションは数学の用語で、テーブルとほぼ同じ意味である。テーブルは名前の付いた行の集まりで、同じテーブルの行はすべて同じ名前付きの列を持ち、列にはそれぞれデータ型がある。列の順番は決まっているが、SQL は行の順番を保証しない。テーブルはデータベースにまとめられ、1 つのサーバが管理するデータベースの集まりをクラスタと呼ぶ。

テーブルにデータを保存する方法は今では当たり前に見えるが、データベースの構成方法はほかにもある。たとえば、Unix 系 OS のファイルとディレクトリは階層型データベースの一例で、より新しいものにオブジェクト指向データベースがある。

## 例

[[Domain Modeling Made Functional]] の第 12 章では、関数型のモデルはデータと振る舞いが混ざらないので、リレーショナルデータベースと相性が良いとしている。テーブルは[[record-type|レコード型]]に直接マッピングできる。

## 注意点

[[Domain Modeling Made Functional]] によると、RDB にはプリミティブな値しか保存できず、[[discriminated-union|判別共用体]]もそのままでは表せない。選択型をテーブルにマッピングするには工夫がいる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[postgresql|PostgreSQL]]
- [[mysql|MySQL]]
- [[document-database|ドキュメントデータベース]]
- [[acid|ACID]]

## 出典

- [PostgreSQL Documentation: 2.2. Concepts](https://www.postgresql.org/docs/current/tutorial-concepts.html)
- [[Domain Modeling Made Functional 第12章 リレーショナルデータベースを扱う|Domain Modeling Made Functional 第12章 リレーショナルデータベースを扱う]]
