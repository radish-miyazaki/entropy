---
title: Zod
aliases: []
description: 静的な型推論も効く、TypeScript のスキーマバリデーションライブラリ
tags: [word, typescript]
date: 2024-09-16
---

## TL;DR

[[typescript|TypeScript]] のバリデーションライブラリ。実行時に値が期待どおりの型であることを保証しつつ、型推論も効く。

> TypeScript-first schema validation with static type inference

## 仕組み

プリミティブやオブジェクトの期待値を、スキーマオブジェクトとして定義して使う。バリデーションには `parse` 関数を使い、失敗すると `ZodError` 例外を投げる。

## 例

文字列を期待するスキーマでは、`"1"` は通り、`1` は `ZodError` になる。

```ts
import { z } from "zod"

const validationSchema = z.string()

const value1 = validationSchema.parse("1")
const value2 = validationSchema.parse(1)
```

オブジェクトのスキーマは次のように書く。

```ts
export const validationSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  bio: z.string().optional(),
  email: z.string().email(),
})

const payload = validationSchema.parse({
  id: "abc",
  name: "test",
  age: 20,
  email: "test@example.com",
})
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[server-actions|Server Actions]]: フォームの入力値のバリデーションに使える

## 出典

- [Zod](https://zod.dev/)
