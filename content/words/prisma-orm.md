---
title: Prisma ORM
aliases: []
description: Node.js と TypeScript のためのオープンソースの ORM。Prisma Client、Prisma Migrate、Prisma Studio からなる
tags: [word, typescript]
date: 2024-08-23
---

## TL;DR

[[nodejs|Node.js]] と [[typescript|TypeScript]] のためのオープンソースの [[orm|ORM]]。主に次の 3 つで構成される。

- [[prisma-client|Prisma Client]]: 自動生成される型安全なクエリビルダ
- [[prisma-migrate|Prisma Migrate]]: マイグレーションの仕組み
- [[prisma-studio|Prisma Studio]]: データベースのデータを表示・編集する GUI

## 仕組み

### セットアップ

`npm install prisma --save-dev` で入れ、`npx prisma init` を実行すると、`prisma/schema.prisma` と `.env` が作られる。`schema.prisma` の `generator` ブロックは、`prisma generate` を実行したときに作るもの（言語ごとの Prisma Client など）を定義する。`datasource` ブロックは、データベースへの接続方法を定義する。

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### モデルの定義

`model` ブロックでモデルを、`enum` ブロックで列挙型を定義する。

```prisma
model Task {
  id          Int      @id @default(autoincrement())
  name        String   @db.VarChar(255)
  dueDate     String   @db.VarChar(10)
  status      Status   @default(NOT_STARTED)
  description String?
  createdAt   DateTime @default(now()) @db.Timestamp(0)
  updateAt    DateTime @updatedAt @db.Timestamp(0)
}

enum Status {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
}
```

`String` はデフォルトで `text` 型になるので、`varchar` にしたいときは `@db.VarChar` で明示する。`@db.Timestamp(0)` は、時刻を秒の精度で持たせる指定である。

1 対多のリレーションでは、外部キーのフィールドと、関連するモデルを取得するフィールドを足す。後者には `@relation` を付け、`fields` に外部キーのフィールド名、`references` に参照先モデルの ID を書く。更新時（`onUpdate`）や削除時（`onDelete`）の動作も指定できる。

```prisma
model Task {
  // ...
  userId Int
  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  // ...
  Task Task[]
}
```

### マイグレーション

`npx prisma migrate dev --name <ファイル名>` は、スキーマの変更からマイグレーションファイルを作り、開発環境のデータベースに適用する。実行すると、`prisma/migrations` に SQL のファイルと `migration_lock.toml` ができる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[prisma-client|Prisma Client]]
- [[prisma-migrate|Prisma Migrate]]
- [[prisma-studio|Prisma Studio]]
- [[drizzle|Drizzle]]

## 出典

- [What is Prisma ORM?](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
- [Prisma schema reference](https://www.prisma.io/docs/orm/reference/prisma-schema-reference)
- [Models](https://www.prisma.io/docs/orm/prisma-schema/data-model/models)
- [Relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations)
- [Getting started with Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate/getting-started)
- [Prisma CLI reference（migrate dev）](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#migrate-dev)
