---
title: Data.TaggedError
aliases: []
description: Effect で独自のエラーを定義するためのヘルパー
tags: [word, effect（typescript）, typescript]
date: 2025-05-30
---

## TL;DR

[[effect-ts|Effect]] で独自のエラーを定義するためのヘルパー。クラスとして継承して使う。

## 仕組み

```ts
class FetchError extends Data.TaggedError("FetchError")<{
  customMessage: string
}> {}
```

`Data.TaggedError` の引数（`"FetchError"`）は、エラーを識別する `_tag` フィールドの値になる。型パラメータ（`{ customMessage: string }`）には、インスタンスを作るときに必要なデータを書く。`_tag` があるので、[[effect-catch-tag|Effect.catchTag]] や [[effect-catch-tags|Effect.catchTags]] でエラーを区別して処理できる。

## 例

インスタンスは通常のクラスと同じく `new` で作る。[[effect-trypromise|Effect.tryPromise]] の `catch` で返せば、失敗を独自のエラーとして型に載せられる。

```ts
const fetchRequest = Effect.tryPromise({
  try: () => fetch("https://pokeapi.co/api/v2/pokemon/garchomp"),
  catch: (): FetchError => new FetchError(),
})
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-catch-tag|Effect.catchTag]]
- [[effect-catch-tags|Effect.catchTags]]
- [[effect-trypromise|Effect.tryPromise]]

## 出典

- [Yieldable Errors - Effect Documentation](https://effect.website/docs/error-management/yieldable-errors/#datataggederror)
