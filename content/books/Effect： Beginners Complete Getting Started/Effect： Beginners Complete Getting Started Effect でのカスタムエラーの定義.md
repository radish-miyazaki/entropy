---
title: "Effect: Beginners Complete Getting Started Effect でのカスタムエラーの定義"
description: Effect で _tag を持つカスタムエラーを定義し、Effect.tryPromise で使う方法と、合成したときのエラー型の集約をまとめたページ
tags: [book-chapter, effect-ts, typescript]
date: 2025-05-30
book: "[[Effect： Beginners Complete Getting Started]]"
chapter:
---

## TL;DR

- [[effect-ts|Effect]] では、関数ごとのエラーを区別するため、識別子の `_tag` プロパティを持つカスタムエラーを定義することを推奨している。
- エラーの異なる関数を合成すると、エラー型は[[union-type|ユニオン型]]として集約される。

## 内容

### カスタムエラーの定義

Effect では、関数の間でエラーを区別するために、独自のカスタムエラーを定義することを推奨している。カスタムエラーは、エラーの識別子となる `_tag` プロパティを持つ必要がある。

```ts
interface FetchError {
  readonly _tag: "FetchError"
}
```

ただし、この書き方そのものが推奨されているわけではない。実際には [[effect-data-tagged-error|Data.TaggedError]] を使ったほうがよい。

### Effect.tryPromise での利用

カスタムエラーを使うには、[[effect-trypromise|Effect.tryPromise]] に `try` と `catch` を持つオブジェクトを渡す。`catch` で、失敗したときに返すエラーを指定する。

```ts
const fetchRequest = Effect.tryPromise({
  try: () => fetch("https://pokeapi.co/api/v2/pokemon/garchomp"),
  catch: (): FetchError => ({ _tag: "FetchError" }),
})

const jsonResponse = (response: Response) =>
  Effect.tryPromise({
    try: () => response.json(),
    catch: (): JsonError => ({ _tag: "JsonError" }),
  })
```

### エラー型の集約

異なるエラーを持つ関数を [[effect-flatmap|Effect.flatMap]] などで合成すると、すべてのエラー型がユニオン型として [[effect-effect|Effect.Effect]] の型に集約される。

```ts
const main = fetchRequest.pipe(Effect.flatMap(jsonResponse))
// ^ const main: Effect.Effect<any, FetchError | JsonError, never>
```

## キーワード

- [[effect-ts|Effect（TypeScript）]]
- [[effect-effect|Effect.Effect]]
- [[effect-trypromise|Effect.tryPromise]]
- [[effect-flatmap|Effect.flatMap]]
- [[effect-pipe|pipe（Effect）]]
- [[effect-data-tagged-error|Data.TaggedError]]
- [[union-type|ユニオン型]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
