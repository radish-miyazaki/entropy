---
title: SQLPage
aliases: []
description: SQL のクエリだけでデータ中心の Web アプリケーションを作れる、Rust 製の Web サーバ
tags: [word, sql]
date: 2024-09-01
---

## TL;DR

SQL のクエリだけで Web アプリケーションを作れる、オープンソースの Web サーバ。データサイエンティストやアナリスト、BI チームが、従来の Web プログラミングを気にせずにデータ中心のアプリケーションを作ることを想定している。

> SQLpage is an SQL-only webapp builder.
> It is meant for data scientists, analysts, and business intelligence teams to build powerful data-centric applications quickly, without worrying about any of the traditional web programming languages and concepts.

## 仕組み

`.sql` ファイルに、データを取得・追加・更新・削除するクエリを書く。`.sql` の URL にリクエストが来ると、SQLPage はリクエストのデータをパラメータとしてクエリを実行する。返ってきた行は、リスト、グラフ、フォーム、カードなどの組み込みのコンポーネントに割り当てられ、ページとしてブラウザに送られる。独自のコンポーネントは Handlebars のテンプレートで追加できる。

サーバは [[rust|Rust]] で書かれている。SQLite、PostgreSQL、MySQL、SQL Server のほか、ODBC に対応したデータベースを使える。

## 例

1 つ目のクエリでコンポーネントを選び、2 つ目のクエリでその中身を返す。

```sql
SELECT 'list' AS component, 'Popular websites' AS title;
SELECT name AS title, url AS link FROM website;
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [SQLPage（GitHub）](https://github.com/sqlpage/SQLPage)
