---
title: MySQL
aliases: []
description: Oracle が開発・配布・サポートしている、オープンソースのリレーショナルデータベース管理システム
tags: [word, rdbms]
date: 2024-10-01
---

## TL;DR

Oracle が開発・配布・サポートしている、オープンソースの SQL データベース管理システム。データを複数のテーブルに分けて保存するリレーショナルデータベースである。

## 仕組み

MySQL はクライアント・サーバ型のシステムで、マルチスレッドの SQL サーバと、各種のクライアントプログラムやライブラリ、管理ツール、API からなる。アプリケーションに組み込むライブラリとしても提供されている。

ライセンスは GPL である。商用アプリケーションに組み込みたい場合は、商用ライセンス版を購入できる。

公式のリファレンスマニュアルによると、MySQL は C と C++ で書かれ、多くのプラットフォームで動く。カーネルの[[thread|スレッド]]を使う完全なマルチスレッドの設計なので、複数の [[cpu|CPU]] を使える。トランザクションに対応したストレージエンジンと、対応しないストレージエンジンの両方を持ち、新しいストレージエンジンも比較的簡単に追加できる。クライアントからは、TCP/IP や Unix ドメインソケットなどで接続する。C、Java、PHP、Python、Ruby など多くの言語向けの API がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[postgresql|PostgreSQL]]
- [[mysql-performance-schema|Performance Schema]]
- [[relational-database|RDBMS]]

## 出典

- [MySQL](https://www.mysql.com/jp/)
- [What is MySQL? - MySQL 8.4 Reference Manual](https://dev.mysql.com/doc/refman/8.4/en/what-is-mysql.html)
- [The Main Features of MySQL - MySQL 8.4 Reference Manual](https://dev.mysql.com/doc/refman/8.4/en/features.html)
