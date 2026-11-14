---
title: DBML
aliases: []
description: データベースのスキーマを宣言的に定義し、文書化するためのオープンソースの言語
tags: [word, データベース]
date: 2024-08-23
---

## TL;DR

Database Markup Language の略。データベースのスキーマを定義し、文書化するためのオープンソースのドメイン固有言語（DSL）である。

## なぜ必要か

大きなプロジェクトでは、データベースの構造の全体像や、テーブルとフィールドの意味をつかみにくい。ER 図や SQL の DDL は読みにくく、すぐに古くなりがちである。DBML は、読みやすく一貫した構文でスキーマを書くことを目指している。DDL が手続き的なのに対して DBML は宣言的で、特定のデータベースに依存しない。

## 仕組み

DBML には、次のようなツールがある。

- CLI: SQL と DBML を双方向に変換する
- dbdiagram: DBML からデータベースの図を描く
- dbdocs: DBML からデータベースのドキュメントを作る

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [DBML - uki00a](https://scrapbox.io/uki00a/DBML)

## 出典

- [DBML](https://dbml.dbdiagram.io/home)
- [DBML CLI](https://dbml.dbdiagram.io/cli)
