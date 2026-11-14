---
title: Effect.catchTags
aliases: []
description: 複数の種類のエラーをタグごとにまとめて処理する Effect の関数
tags: [word, effect（typescript）, typescript]
date: 2025-05-30
---

## TL;DR

複数の種類のエラーを、タグごとにまとめて処理する [[effect-ts|Effect]] の関数。[[effect-catch-tag|Effect.catchTag]] を何度も書くより簡潔になる。

## 仕組み

エラーのタグをキー、回復処理を値にしたオブジェクトを渡す。

```ts
Effect.catchTags({
  FetchError: () => Effect.succeed("Fetch error"),
  JsonError: () => Effect.succeed("Json error"),
})
```

## 例

`catchTags` を使うと、プログラムの本体とエラー処理を完全に分けて書ける。`program` の書き方は [[effect-gen|Effect.gen]] を参照。

```ts
const program = Effect.gen(function* () {
  const response = yield* fetchRequest
  if (!response.ok) {
    return yield* new FetchError()
  }

  return yield* jsonResponse(response)
})

const main = program.pipe(
  Effect.catchTags({
    FetchError: () => Effect.succeed("Fetch error"),
    JsonError: () => Effect.succeed("Json error"),
  }),
)
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-catch-tag|Effect.catchTag]]
- [[effect-data-tagged-error|Data.TaggedError]]
- [[effect-gen|Effect.gen]]

## 出典

- [Expected Errors - Effect Documentation](https://effect.website/docs/error-management/expected-errors/#catchtags)
