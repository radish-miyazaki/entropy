---
title: PostgreSQL
aliases: []
description: SQL を使い、それを拡張したオープンソースのオブジェクトリレーショナルデータベース
tags: [word, rdbms]
date: 2024-10-01
---

## TL;DR

SQL を使い、それを拡張したオープンソースのオブジェクトリレーショナルデータベース。1986 年にカリフォルニア大学バークレー校の POSTGRES プロジェクトとして始まった。

## 仕組み

2001 年から ACID に準拠しており、並行処理には MVCC（多版型同時実行制御）を使う。JSON/JSONB、配列、範囲型、UUID など多くのデータ型を持つ。

拡張性が高いことも特徴である。独自のデータ型を定義でき、ストアドプロシージャを PL/pgSQL や Python などの言語で書ける。データベースを再コンパイルせずに、PostGIS のような拡張機能を追加できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[mysql|MySQL]]
- [[relational-database|RDBMS]]

## 出典

- [PostgreSQL](https://www.postgresql.org/)
- [About PostgreSQL](https://www.postgresql.org/about/)
