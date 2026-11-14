---
title: NestJS で GraphQL サーバを実装する
description: NestJS の Code first で GraphQL サーバを実装し、TypeScript のクラスから GraphQL Schema を生成して、Resolver と Pipe によるバリデーションを試す
tags: [blog]
date: 2024-09-09
draft: false
---

## TL;DR

- [[nestjs|NestJS]] では、[[code-first|Code first]] で TypeScript のクラスにデコレータを付けると、開発サーバの起動時に [[graphql-schema|GraphQL Schema]] が生成される。
- Mutation や Query の引数を `@InputType` や `@ArgsType` のクラスにまとめ、`ValidationPipe` を使うと、[[class-validator]] によるバリデーションができる。

## 検証

### セットアップ

[公式ドキュメント](https://docs.nestjs.com/graphql/quick-start)に沿って、必要なパッケージをインストールする。デフォルトでは Apollo を使う。

```sh
$ npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

ルートモジュールで `GraphQLModule.forRoot` をインポートし、`autoSchemaFile` に GraphQL Schema を生成するパスを指定する。

```ts
// app.module.ts
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // 使用するドライバ
      playground: true, // プレイグラウンドを使うか
      autoSchemaFile: join(process.cwd(), "src/schema.gql"), // GraphQL Schema を生成するパス
    }),
  ],
})
export class AppModule {}
```

### TypeScript の型定義から GraphQL Schema を生成する

オブジェクト型は、`@ObjectType` と `@Field` デコレータで定義する。

```ts
// src/task/models/task.model.ts
import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  dueDate: string

  @Field()
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"

  @Field({ nullable: true })
  description: string
}
```

TypeScript の `number` は `Float` に変換されるので、`Int` にしたいときは `@Field` で明示する。オプショナルにしたいときは、`@Field` の引数に `{ nullable: true }` を渡す。`@Field` には、ほかに `description`（フィールドの説明）、`name`（上書き後のフィールド名）、`defaultValue`（デフォルト値）を指定できる（[ドキュメント](https://docs.nestjs.com/graphql/resolvers#object-types)）。

### Resolver を定義する

[[graphql-resolver|Resolver]] は `nest g resolver` コマンドでも生成できる（[ドキュメント](https://docs.nestjs.com/graphql/resolvers)）。ロジックは Service に書く。手で定義するときは、次のようにする。

1. クラスに `@Resolver` デコレータを付ける。
2. 実現したい処理をメソッドとして定義し、Query なら `@Query`、Mutation なら `@Mutation` デコレータを付ける。`Query` は `@nestjs/common` ではなく `@nestjs/graphql` から `import` する。これらのデコレータには、戻り値の [[graphql|GraphQL]] の型をアロー関数の形で渡す。

```ts
@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task], { nullable: 'items' })
  getTasks(): Task[] {
    ...
  }

  @Mutation(() => Task)
  createTask(
    @Args('name') name: string,
    @Args('dueDate') dueDate: string,
    @Args('description', { nullable: true }) description: string,
  ): Task {
    ...
  }
}
```

`@Query` や `@Mutation` の `nullable` には、要素が空のときに空配列を返す `'items'`（`[String]!`）や、`null` を返す `'itemsAndList'`（`[String]`）を指定できる。`@Field` と同じく、`name` で名前を上書きすることもできる。

リクエストで受け取る値はメソッドの引数になり、`@Args` にはリクエストで使うフィールド名を指定する。

```graphql
mutation createTask($name: String!, $dueDate: String!, $description: String!) {
  createTask(name: $name, dueDate: $dueDate, description: $description) {
    id
    name
    dueDate
    status
    description
  }
}
```

### Pipe でバリデーションする

Mutation に渡す値は、`@InputType` を使って別のクラスとして表せる。これは GraphQL の [Input types](https://graphql.org/learn/schema/#input-types) に当たる。

```ts
// createTask.input.ts
import { Field, InputType } from "@nestjs/graphql"
import { IsDateString, IsNotEmpty } from "class-validator"

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty()
  name: string
  @Field()
  @IsDateString()
  dueDate: string
  @Field({ nullable: true })
  description?: string
}
```

このクラスには、[[dto|DTO]] のようにバリデーションの責務を持たせられる。ただし、バリデーションを実行するには NestJS の [Pipe](https://docs.nestjs.com/pipes) を使う必要がある。Pipe は、Controller や Resolver がリクエストを受け取る前に、リクエストに処理を加える機能である。

まず、組み込みの `ValidationPipe` をグローバルに設定する。

```ts
// main.ts
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  // ...
}
```

次に、Resolver と Service の引数で `@InputType` のクラスのインスタンスを受け取るようにする。

```ts
@Resolver()
export class TaskResolver {
  // ...

  @Mutation(() => Task)
  createTask(@Args("createTaskInput") createTaskInput: CreateTaskInput): Task {
    return this.taskService.createTask(createTaskInput)
  }
}
```

```ts
@Injectable()
export class TaskService {
  // ...

  createTask(createTaskInput: CreateTaskInput): Task {
    const { name, dueDate, description } = createTaskInput
    return await this.prismaService.task.create({
      data: { name, dueDate, description },
    })
  }
}
```

Query に渡す値も、`@ArgsType` を使って別のクラスとして表せる。`@Mutation` のときと違い、`@Args` に名前の文字列を渡さない。

```ts
@ArgsType()
export class GetUserArgs {
  @Field()
  @IsEmail()
  email: string
}
```

```ts
@Query(() => UserModel, { nullable: true })
async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
  return await this.userService.getUser(getUserArgs.email);
}
```

### Playground

`GraphQLModule.forRoot` に `{ playground: true }` を渡して開発サーバを起動すると、`http://localhost:3000/graphql` で Playground が使える（[ドキュメント](https://docs.nestjs.com/graphql/quick-start#graphql-playground)）。

## 結果

`npm run start:dev` を実行すると、開発サーバの起動と同時に、次の GraphQL Schema が生成された。

```graphql
# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type Task {
  id: Float!
  name: String!
  dueDate: String!
  status: String!
  description: String
}

type Query {
  getTasks: [Task]!
}
```

`ValidationPipe` を設定した後に不正なリクエストを送ると、次のエラーが返ってきた。

```json
{
  "errors": [
    {
      "message": "Bad Request Exception",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["createTask"],
      "extensions": {
        "code": "BAD_REQUEST",
        "stacktrace": ["..."],
        "originalError": {
          "message": ["name should not be empty", "dueDate must be a valid ISO 8601 date string"],
          "error": "Bad Request",
          "statusCode": 400
        }
      }
    }
  ],
  "data": null
}
```

## キーワード

- [[nestjs|NestJS]]
- [[graphql|GraphQL]]
- [[code-first|Code first]]
- [[graphql-schema|GraphQL Schema]]
- [[graphql-resolver|Resolver]]
- [[dto|DTO]]
- [[class-validator]]

## 参考

- https://docs.nestjs.com/graphql/quick-start
- https://docs.nestjs.com/graphql/resolvers
- https://docs.nestjs.com/pipes
- https://graphql.org/learn/schema/#input-types
- [NestJS × Reactで学ぶフルスタックGraphQLアプリケーション開発](https://www.udemy.com/course/nestjs-react-graphql/)
