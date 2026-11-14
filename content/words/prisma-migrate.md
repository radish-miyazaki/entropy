---
title: Prisma Migrate
aliases: []
description: Prisma のスキーマとデータベースのスキーマを同期させる、Prisma ORM のマイグレーションツール
tags: [word, prisma-orm]
date: 2024-09-07
---

## TL;DR

[[prisma-orm|Prisma ORM]] のマイグレーションツール。Prisma のスキーマ（`schema.prisma`）に合わせて、データベースのスキーマを同期させる。

## 仕組み

Prisma ORM v6 のドキュメントによると、`schema.prisma` にモデルを書いて `prisma migrate dev --name init` を実行すると、スキーマから `CREATE TABLE` や `ALTER TABLE` などの SQL が生成され、データベースに適用される。スキーマを変えて別の名前で再び実行すると、2 つめのマイグレーションができる。

各マイグレーションは `migrations/` の下に、タイムスタンプと名前を付けたフォルダとして作られ、中に `migration.sql` が入る。マイグレーションは名前の辞書順に適用されるので、フォルダの並びがスキーマの変更の履歴になる。この履歴はソース管理にコミットする。既存のデータベースに導入するときは、`prisma db pull` でスキーマを読み込み、`prisma migrate diff` と `prisma migrate resolve --applied` でベースラインのマイグレーションを作る。

## 注意点

Prisma ORM 8 では、マイグレーションの仕組みが作り直された。`schema.prisma` は `contract.prisma` に名前が変わり、`migrate dev` は `prisma migration plan` と `prisma db migrate`（または `prisma db update`）に、`migrate deploy` は `prisma db migrate` に置き換わった。v8 はデータベースをリセットしない。v8 のツールで v7 の `migrate` コマンドを実行するとエラーになる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[prisma-orm|Prisma ORM]]
- [[prisma-client|Prisma Client]]
- [[prisma-studio|Prisma Studio]]

## 出典

- [Getting started with Prisma Migrate - Prisma ORM v6](https://www.prisma.io/docs/orm/v6/prisma-migrate/getting-started)
- [How migrations work - Prisma](https://www.prisma.io/docs/orm/migrations/how-migrations-work)
- [Coming from Prisma ORM 7 - Prisma](https://www.prisma.io/docs/orm/coming-from-prisma-orm-7)
