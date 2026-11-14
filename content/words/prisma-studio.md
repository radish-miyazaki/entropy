---
title: Prisma Studio
aliases: []
description: ブラウザからデータベースのデータを閲覧・編集できる Prisma の GUI ツール
tags: [word, prisma-orm]
date: 2024-08-27
---

## TL;DR

ブラウザからデータベースのデータを直感的に閲覧・編集できる GUI ツール。Prisma CLI に同梱されている。

## 仕組み

プロジェクトのディレクトリで `npx prisma studio` を実行すると、Studio のサーバが立ち上がり、`http://localhost:5555` がブラウザで開く。接続先は `.env` の `DATABASE_URL` から読む。

左のサイドバーからテーブルを選んでデータを見る。フィルタや並べ替え、検索ができ、セルをダブルクリックすると値を編集できる。レコードの追加や削除もでき、リレーション先のテーブルは展開できる行として表示される。データは CSV や JSON で書き出せる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[prisma-orm|Prisma ORM]]
- [[prisma-client|Prisma Client]]
- [[prisma-migrate|Prisma Migrate]]

## 出典

- [Prisma Studio](https://www.prisma.io/docs/orm/tools/prisma-studio)
