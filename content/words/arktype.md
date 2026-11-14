---
title: ArkType
aliases: []
description: TypeScript の型と同じ書き方で定義でき、実行時に検証できる TypeScript のバリデーションライブラリ
tags: [word, typescript, validator]
date: 2025-03-21
---

## TL;DR

[[typescript|TypeScript]] のバリデーションライブラリ。TypeScript の型と同じ書き方で型を定義でき、エディタ上の型チェックと実行時の検証の両方に使える。

## 仕組み

型は、TypeScript の構文に似た文字列で定義する。プラグインやビルドの手順は要らない。検証に失敗すると、何を期待して何を受け取ったかを示すエラーを返す。

定義した型からは、`typeof User.infer` で TypeScript の型を取り出せる。型に `unknown` のデータを渡すと、検証済みの値か、エラーのどちらかが返る。エラーかどうかは `instanceof type.errors` で確かめる。

ArkType は検証の前に型を単純化する。たとえば `number > 0` と `number >= 10` を組み合わせると、`number >= 10` にまとめる。公式サイトでは、実行時の検証が [[zod|Zod]] 4 のおよそ 20 倍速いとしている。

## 例

```ts
const User = type({
  name: "string",
  platform: "'android' | 'ios'",
})

const out = User({ name: "Alan Turing", platform: "enigma" })

if (out instanceof type.errors) console.error(out.summary)
// platform must be "android" or "ios" (was "enigma")
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[zod|Zod]]
- [[class-validator|class-validator]]

## 出典

- [ArkType](https://arktype.io/)
- [Your First Type - ArkType](https://arktype.io/docs/intro/your-first-type)
