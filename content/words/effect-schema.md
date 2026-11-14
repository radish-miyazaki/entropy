---
title: Effect Schema
aliases: []
description: スキーマに基づいてデータのデコードとエンコードを行う Effect の API 群
tags: [word, effect（typescript）, typescript]
date: 2025-05-30
---

## TL;DR

スキーマに基づいて、データのデコードとエンコードを行う [[effect-ts|Effect]] の API 群。v3.10 より前は `@effect/schema` という別のパッケージだったが、v3.10 から Effect 本体に入った。

## 仕組み

スキーマは `Schema.Struct` などで定義する。

```ts
const Pokemon = Schema.Struct({
  id: Schema.Number,
  order: Schema.Number,
  name: Schema.String,
  height: Schema.Number,
  weight: Schema.Number,
})
```

`Schema.decodeUnknown` に渡すと、`unknown` 型の値をスキーマの型にデコードする関数ができる。この関数は `Effect<A, ParseError>` を返す（下の例では `Effect<Pokemon, ParseError>`）。

```ts
const decodePokemon = Schema.decodeUnknown(Pokemon)
```

## 注意点

`Schema.Struct` で定義すると、IDE で成功時の型を確かめたときに、スキーマのすべてのプロパティが展開されて表示される。`Schema.Struct` が [[opaque-types|Opaque types]] を提供していないためである。

これを避けるには、代わりに `Schema.Class` を使う。型パラメータにはクラス名と同じ名前を書き、1 つ目の引数に識別子（`_tag` の値）、2 つ目の引数にスキーマの形を渡す。クラスなので、メソッドも足せる。

```ts
class Pokemon extends Schema.Class<Pokemon>("Pokemon")({
  id: Schema.Number,
  order: Schema.Number,
  name: Schema.String,
  height: Schema.Number,
  weight: Schema.Number,
}) {
  public get formatHeight(): string {
    return `${this.height}cm`
  }
}
```

ただし `Schema.Class` が使えるのはオブジェクトのスキーマだけで、[[union-type|ユニオン型]]やプリミティブには使えない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[zod|Zod]]
- [[opaque-types|Opaque types]]

## 出典

- [Introduction to Effect Schema - Effect Documentation](https://effect.website/docs/schema/introduction/)
- [The problem with data validation - Effect: Beginners Complete Getting Started](https://www.typeonce.dev/course/effect-beginners-complete-getting-started/effect-schema/the-problem-with-data-validation)
