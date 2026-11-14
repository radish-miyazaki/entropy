---
title: pipe（Effect）
aliases: []
description: 関数の結果を次の関数に順に渡し、ネストを深くせずに処理をつなぐ Effect の関数
tags: [word, effect（typescript）, typescript]
date: 2025-05-30
---

## TL;DR

第 1 引数の値を第 2 引数の関数に渡し、その結果を第 3 引数の関数に渡す、という処理を順に繰り返す [[effect-ts|Effect]] の関数。

## なぜ必要か

関数呼び出しを入れ子にすると、ネストが深くなって処理の起点や順番を追いにくい。`pipe` を使うと、処理を上から順に並べて書けるので読みやすくなる。

## 例

```ts
const main = pipe(fetchRequest, Effect.flatMap(jsonResponse), Effect.flatMap(savePokemon))
```

`Effect` 自身も `pipe` メソッドを持つので、次のようにも書ける。

```ts
const main = fetchRequest.pipe(Effect.flatMap(jsonResponse), Effect.flatMap(savePokemon))
```

`Effect.flatMap(jsonResponse)` のように引数を 1 つだけ渡せるのは、Effect の API が [[effect-dual-api|Dual API]] になっているためである。

## 注意点

ステップが増えると、`pipe` で組み立てたコードも読みにくくなる。そのときは [[effect-gen|Effect.gen]] を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-flatmap|Effect.flatMap]]
- [[effect-dual-api|Dual API]]
- [[effect-gen|Effect.gen]]

## 出典

- [Building Pipelines - Effect Documentation](https://effect.website/docs/getting-started/building-pipelines/#pipe)
