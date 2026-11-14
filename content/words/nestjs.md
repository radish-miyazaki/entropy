---
title: NestJS
aliases: []
description: Node.js 上で動く TypeScript 製のサーバーサイドフレームワークで、Module、Controller、Service で機能を組み立てる
tags: [word, javascript, typescript]
date: 2024-09-06
---

## TL;DR

[[nodejs|Node.js]] 上で動くサーバーサイドのフレームワーク。[[typescript|TypeScript]] で実装されているので TypeScript と相性が良いが、[[javascript|JavaScript]] でも書ける。

## なぜ必要か

TypeScript の型の恩恵を受けられる。内部では標準で Express を使うので、その豊富なライブラリを利用でき、Fastify に切り替えることもできる。[[nest-cli|Nest CLI]] でプロジェクトやファイルのテンプレートを作れ、テスト用のフレームワークも標準で用意されている。RDB、NoSQL、[[graphql|GraphQL]]、WebSocket などにも対応している。

## 仕組み

アーキテクチャは Angular に大きく影響を受けている。Module、Controller、Service の 3 つを組み合わせて 1 つの機能を実装する。

### Module

関連する Controller や Service をまとめて NestJS に登録する。アプリケーションには、すべての Feature module を登録する Root module（`app.module.ts`）が 1 つ以上と、機能ごとの Feature module が 0 個以上必要である。クラスに `@Module` デコレータを付け、`imports`、`exports`、`providers`、`controllers` を書いて定義する。`nest g module` コマンドでも生成できる。

### Controller

クライアントからリクエストを受け取り、レスポンスを返す。GraphQL の場合は [[graphql-resolver|Resolver]] がこの役割を担う。

### Service

アプリケーション固有のビジネスロジックを定義し、Resolver や Controller から呼び出して[[use-case|ユースケース]]を実現する。責務ごとに分けることで、保守しやすく拡張しやすくなる（[[single-responsibility-principle|単一責任の原則]]）。クラスに `@Injectable` デコレータを付けて定義する。

### 依存性の注入

NestJS は DI コンテナを提供しているので、[[dependency-injection|依存性の注入]]を手で書く必要はない。Module の `providers` に依存される側のクラスを登録し、依存する側のコンストラクタの引数でそのクラスを受け取ればよい。

## 例

Module と Resolver で、Service を注入する例である。

```ts
@Module({
  imports: [PrismaModule],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  // ...
}
```

[[cors|CORS]] を有効にするには、アプリケーションのオブジェクトで `enableCors` メソッドを呼ぶ。

```ts
const app = await NestFactory.create(AppModule)
app.enableCors()
```

[[prisma-orm|Prisma ORM]] を使う例は、公式ドキュメントに載っている。

```ts
// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }
}
```

```ts
// src/prisma/prisma.module.ts
import { Module } from "@nestjs/common"
import { PrismaService } from "./prisma.service"

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

## 自分の理解

NestJS の公式ドキュメントにある Prisma のレシピは、[Service を生成するあたり](https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services)から読むと参考になる。

## 関連

- [[nest-cli|Nest CLI]]
- [[graphql|GraphQL]]
- [[nestjs-graphql-server|NestJS で GraphQL サーバを実装する]]
- [[nestjs-passport-jwt|NestJS と Passport.js を組み合わせて JWT 認証を実現する]]
- [[jwt|JWT]]
- [[prisma-orm|Prisma ORM]]
- [[dependency-injection|依存性の注入]]

## 出典

- [NestJS](https://nestjs.com/)
- [Documentation - NestJS](https://docs.nestjs.com/)
- [Modules](https://docs.nestjs.com/modules)
- [Controllers](https://docs.nestjs.com/controllers)
- [Providers](https://docs.nestjs.com/providers)
- [Custom providers](https://docs.nestjs.com/fundamentals/custom-providers#di-fundamentals)
- [CORS](https://docs.nestjs.com/security/cors#getting-started)
- [Prisma](https://docs.nestjs.com/recipes/prisma)
- [Zenn の記事](https://zenn.dev/morinokami/articles/nestjs-overview)
- [NestJS × React で学ぶフルスタック GraphQL アプリケーション開発（Udemy）](https://www.udemy.com/course/nestjs-react-graphql/)
