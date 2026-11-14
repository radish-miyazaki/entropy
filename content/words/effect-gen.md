---
title: Effect.gen
aliases: []
description: ジェネレータ関数を使い、async/await に近い書き方で Effect を組み立てる関数
tags: [word, effect（typescript）, typescript]
date: 2025-05-30
---

## TL;DR

[[generator|ジェネレータ]]関数を使って、`async` / `await` に近い書き方で [[effect-effect|Effect]] を組み立てる関数。

## なぜ必要か

[[effect-pipe|pipe]] で処理を組み立てると、ステップが増えるにつれて読みにくくなる。

```ts
const main = fetchRequest.pipe(
  Effect.filterOrFail(
    (response) => response.ok,
    (): FetchError => new FetchError(),
  ),
  Effect.flatMap(jsonResponse),
  Effect.catchTags({
    FetchError: () => Effect.succeed("Fetch error"),
    JsonError: () => Effect.succeed("Json error"),
  }),
)
```

`Effect.gen` を使うと、普段の [[typescript|TypeScript]] の構文に近い形で書ける。

```ts
const main = Effect.gen(function* () {
  const response = yield* fetchRequest
  if (!response.ok) return yield* new FetchError()

  return yield* jsonResponse(response)
})
```

## 仕組み

上のコードは、`async` / `await` のコードを次のように置き換えたものに近い。

- `async` を `Effect.gen` にする
- 無名関数をジェネレータ関数にする
- `await` と `throw` を `yield*` にする

```ts
const main = async () => {
  const response = await fetchRequest()
  if (!response.ok) throw new FetchError()

  return await jsonResponse(response)
}
```

`Effect.gen` は、[[javascript|JavaScript]] のジェネレータと[[iterator|イテレータ]]のプロトコルを組み合わせて、関数内の各ステップの成功やエラーを追跡している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-pipe|pipe（Effect）]]
- [[effect-catch-tags|Effect.catchTags]]
- [[effect-service|Effect Service]]

## 出典

- [Using Generators - Effect Documentation](https://effect.website/docs/getting-started/using-generators/)
