---
title: Prisma Client
aliases: []
description: Prisma のスキーマファイルから自動生成される、型安全なクエリビルダ
tags: [word, prisma-orm, typescript]
date: 2024-08-27
---

## TL;DR

[[prisma-orm|Prisma ORM]] のスキーマファイルから自動生成される、型安全なクエリビルダ。

## 仕組み

`@prisma/client` をインストールすると、`prisma generate` も実行されてクライアントが生成される。事前に `prisma migrate dev` を実行していれば、そのときにも自動で生成されている。

```sh
$ npm i @prisma/client
```

生成されたクライアントは、モデルごとに次のようなメソッドを持つ。

- `findUnique`: ID やユニークな属性で、レコードを 1 件取得する
- `findMany`: レコードを複数件取得する
- `create`: レコードを 1 件作成する
- `update`: レコードを 1 件更新する
- `delete`: レコードを 1 件削除する

## 例

次のスキーマの `User` から、リレーション先の `profile` も含めて取得する。リレーション先のフィールドを選ぶには、`select` をネストする。

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  profileId     String?
  profile       Profile?
  accounts      Account[]
  sessions      Session[]
}
```

```ts
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    image: true,
    profile: { select: { screenName: true } },
  },
})
```

作成、更新、削除は次のように書く。

```ts
await prisma.task.create({
  data: { name, dueDate, description },
})

await prisma.task.update({
  data: { name, dueDate, status, description },
  where: { id },
})

await prisma.task.delete({ where: { id } })
```

## 注意点

`findUnique` は、レコードが存在しないとき `null` を返す。例外（`NotFoundError`）を投げたいときは、`findUniqueOrThrow` を使う。

[[nextjs|Next.js]] で Prisma Client の呼び出しをメモ化するには、[[react-cache|React.cache]] を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[prisma-orm|Prisma ORM]]
- [[prisma-studio|Prisma Studio]]
- [[prisma-migrate|Prisma Migrate]]
- [[react-cache|React.cache]]
- [[unstable-cache|unstable_cache]]

## 出典

- [Prisma Client API reference - findUnique](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findunique)
- [Prisma Client API reference - findUniqueOrThrow](https://www.prisma.io/docs/orm/reference/prisma-client-reference#finduniqueorthrow)
- [Prisma Client API reference - findMany](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findmany)
- [Prisma Client API reference - create](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create)
- [Prisma Client API reference - update](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update)
- [Prisma Client API reference - delete](https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete)
- [Relation queries - Select specific fields of included relations](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#select-specific-fields-of-included-relations)
