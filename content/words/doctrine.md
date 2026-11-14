---
title: Doctrine
aliases: []
description: データベースへの保存とオブジェクトのマッピングを扱う PHP のオープンソースプロジェクト
tags: [word, php]
date: 2025-07-01
---

## TL;DR

データベースへの保存とオブジェクトのマッピングを扱う、PHP のオープンソースプロジェクト。中心は ORM と DBAL の 2 つである。

## 仕組み

ORM（Object Relational Mapper）は、PHP のオブジェクトとデータベースのレコードを対応づける。DBAL（Database Abstraction Layer）は ORM の土台となるデータベース層で、高水準と低水準の両方のデータベースプログラミングを支える。ほかに Migrations、MongoDB ODM、Collections などのプロジェクトもある。

## 例

PostgreSQL の [[row-level-security|Row-Level Security]] を、Laravel の Eloquent と Doctrine で扱って比べた発表がある（[PostgreSQLのRow Level SecurityをPHPのORMで扱う Eloquent vs Doctrine](https://speakerdeck.com/77web/postgresqlnorow-level-securitywophpnoormdexi-u-eloquent-vs-doctrine-number-phpcon-number-track2)）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[row-level-security|Row-Level Security]]

## 出典

- [Doctrine](https://www.doctrine-project.org/)
