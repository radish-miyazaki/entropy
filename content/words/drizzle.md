---
title: Drizzle
aliases: []
description: SQL に近い書き方でクエリを書ける、ヘッドレスな TypeScript の ORM
tags: [word, typescript]
date: 2024-08-29
---

## TL;DR

ヘッドレスな [[typescript|TypeScript]] の ORM。SQL に近い書き方でスキーマやクエリを書ける。

## 仕組み

ライブラリと、必要に応じて使うツール群からなり、プロジェクトの構成を縛らない。スキーマは TypeScript で定義し、データは SQL ライクな API とリレーショナルな API のどちらでも取得できる。リレーショナルなクエリでは、ネストしたデータを 1 つの SQL で取得する。

PostgreSQL、MySQL、SQLite などに、各データベースのドライバ経由で接続する。依存パッケージは 0 で、サーバーレス環境でも使えるように設計されている。マイグレーションには Drizzle Kit を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[prisma-orm|Prisma ORM]]
- [[t3-stack|T3 Stack]]

## 出典

- [Drizzle ORM](https://orm.drizzle.team/)
- [Drizzle ORM - Overview](https://orm.drizzle.team/docs/overview)
