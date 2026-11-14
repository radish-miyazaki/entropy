---
title: Row-Level Security
aliases: [RLS]
description: テーブルの行ごとに、ユーザ単位で表示・更新・削除・挿入を制限する仕組み
tags: [word, sql]
date: 2025-07-01
---

## TL;DR

テーブルごとに、ユーザ単位で行の操作（表示、更新、削除、挿入）を制限できる仕組み。

## なぜ必要か

代表的な[[use-case|ユースケース]]は、[[multi-tenancy|マルチテナント]]のアプリケーションである。

## 仕組み

Row-Level Security を有効にすると、各行へのアクセスは定義したポリシーに従って許可または拒否される。ポリシーは、コマンドの種類（`SELECT`、`INSERT`、`UPDATE`、`DELETE`）やロールごとに設定できる。複数のポリシーが当てはまる場合は、`OR` で結合される。

[[postgresql|PostgreSQL]] と SQL Server がサポートしている。PostgreSQL を使う [[supabase|Supabase]] でも使える。

## 例

PHP の ORM から扱う例として、Laravel の Eloquent と [[doctrine|Doctrine]] を比べた発表がある（[PostgreSQLのRow Level SecurityをPHPのORMで扱う Eloquent vs Doctrine](https://speakerdeck.com/77web/postgresqlnorow-level-securitywophpnoormdexi-u-eloquent-vs-doctrine-number-phpcon-number-track2)）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[postgresql|PostgreSQL]]
- [[supabase|Supabase]]
- [[multi-tenancy|マルチテナント]]

## 出典

- [行セキュリティポリシー（PostgreSQL 17 文書）](https://www.postgresql.jp/document/17/html/ddl-rowsecurity.html)
- [Row Level Security（Supabase Docs）](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Row-level security（SQL Server）](https://learn.microsoft.com/en-us/sql/relational-databases/security/row-level-security?view=sql-server-ver17)
- [PostgreSQLのRow Level SecurityをPHPのORMで扱う Eloquent vs Doctrine by 菱田裕美](https://scrapbox.io/Naoki-Yuzu/PostgreSQLのRow_Level_SecurityをPHPのORMで扱う_Eloquent_vs_Doctrine_by_菱田裕美)
- https://zenn.dev/keishi85/articles/58c6e1c88ffd88
- https://blog.flinters.co.jp/entry/2022/03/28/193223
