---
title: class-validator
aliases: []
description: TypeScript と JavaScript 向けのバリデーションライブラリ。NestJS と相性がよい
tags: [word, javascript, typescript]
date: 2024-09-10
---

## TL;DR

[[typescript|TypeScript]] と [[javascript|JavaScript]] 向けのバリデーションライブラリ。[[nestjs|NestJS]] と相性がよい。

## 仕組み

`npm install class-validator --save` でインストールする。NestJS の組み込みの Pipe である `ValidationPipe` と組み合わせると、リクエストを簡単にバリデーションできる。使い方は [[nestjs-graphql-server|NestJS で GraphQL サーバを実装する]] で試した。

公式の README によると、クラスのプロパティに `@IsInt` や `@Length`、`@IsEmail` などのデコレータで規則を付け、インスタンスを `validate()` に渡して検証する。`validate()` は `ValidationError` の配列を返す Promise を返し、配列が空なら検証に通ったことになる。内部では validator.js を使っており、ブラウザと Node.js の両方で動く。

## 例

```ts
import { validate, Length, IsInt, IsEmail } from "class-validator"

class Post {
  @Length(10, 20)
  title: string

  @IsInt()
  rating: number

  @IsEmail()
  email: string
}

const post = new Post()
post.title = "Hi"
post.rating = 3.5
post.email = "not-an-email"

validate(post).then((errors) => {
  console.log(`Found ${errors.length} property errors`)
})
```

## 注意点

検証できるのは `new` で作ったクラスのインスタンスだけである。プレーンな JSON を検証したいときは、[[class-transformer]] でクラスのインスタンスに変換してから渡す。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[class-transformer]]
- [[nestjs|NestJS]]

## 出典

- [class-validator - GitHub](https://github.com/typestack/class-validator)
- [Pipes - NestJS](https://docs.nestjs.com/pipes#class-validator)
