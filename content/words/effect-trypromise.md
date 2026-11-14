---
title: Effect.tryPromise
aliases: []
description: 失敗する可能性のある非同期処理を、エラーを型に載せて Effect でラップする関数
tags: [word, effect（typescript）, typescript]
date: 2025-05-30
---

## TL;DR

失敗する可能性のある非同期処理を [[effect-effect|Effect]] でラップする関数。reject したときのエラーを型として扱える。

## なぜ必要か

[[effect-promise|Effect.promise]] は失敗しないと仮定するので、エラーの型（第 2 型パラメータ）が `never` になる。中の `Promise` が reject しても、そのエラーは型に現れない。失敗する可能性がある処理には `Effect.tryPromise` を使う。

## 仕組み

`Effect.tryPromise` は reject を捕まえて、既定では `UnknownException` として `Effect` のエラーの型に載せる。

```ts
const fetchRequest = Effect.tryPromise(() => fetch("https://pokeapi.co/api/v2/pokemon/garchomp"))
// ^ const fetchRequest: Effect.Effect<Response, UnknownException, never>

const jsonResponse = (response: Response) => Effect.tryPromise(() => response.json())
// ^ const jsonResponse: (response: Response) => Effect.Effect<any, UnknownException, never>
```

## 注意点

上のコードはどちらのエラーも `UnknownException` になるので、エラーを区別できない。`try` と `catch` を持つオブジェクトを渡し、`catch` で独自のエラーに変換すれば区別できる（[[effect-data-tagged-error|Data.TaggedError]] を参照）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-promise|Effect.promise]]
- [[effect-data-tagged-error|Data.TaggedError]]
- [[effect-catch-tag|Effect.catchTag]]

## 出典

- [Creating Effects - Effect Documentation](https://effect.website/docs/getting-started/creating-effects/#trypromise)
