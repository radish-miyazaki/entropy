---
title: Dual API
aliases: []
description: 引数をまとめて渡す書き方と、部分適用する書き方の両方に対応した Effect の API
tags: [word, effect, typescript]
date: 2025-05-30
---

## TL;DR

引数をまとめて渡す書き方と、[[partial-application|部分適用]]（[[currying|カリー化]]）する書き方の両方に対応した API。[[effect-ts|Effect]] の多くの API がこの形になっている。

## なぜ必要か

[[effect-pipe|pipe]] の中で使うとき、部分適用の形で書けるとコードが短くなる。たとえば次のコードは、

```ts
fetchRequest.pipe((fetchRequestEffect) => Effect.flatMap(fetchRequestEffect, jsonResponse))
```

次のように書き換えられる。

```ts
const main = fetchRequest.pipe(Effect.flatMap(jsonResponse))
```

## 仕組み

[[effect-flatmap|Effect.flatMap]] の定義を簡略化すると、2 つのシグネチャを持つ。

```ts
export declare const flatMap: {
  <A, B>(f: (a: A) => Effect<B>): (self: Effect<A>) => Effect<B>
  <A, B>(self: Effect<A>, f: (a: A) => Effect<B>): Effect<B>
}
```

1 つ目は関数だけを受け取り、`Effect` を待つ関数を返す。2 つ目は `Effect` と関数をまとめて受け取る。

## 例

引数をまとめて渡す場合。

```ts
const main = pipe(fetchRequest, (fetchRequestEffect) =>
  Effect.flatMap(fetchRequestEffect, jsonResponse),
)
```

部分適用する場合。

```ts
const main = pipe(fetchRequest, (fetchRequestEffect) =>
  Effect.flatMap(jsonResponse)(fetchRequestEffect),
)
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-pipe|pipe（Effect）]]
- [[effect-flatmap|Effect.flatMap]]
- [[partial-application|部分適用]]
- [[currying|カリー化]]

## 出典

- [Dual APIs - Effect Documentation](https://effect.website/docs/code-style/dual/)
