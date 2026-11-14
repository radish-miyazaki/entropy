---
title: Effect.Effect
aliases: []
description: 副作用を値として扱うための、Effect の中心となる型 Effect<A, E, R>
tags: [word, effect, typescript]
date: 2025-05-30
---

## TL;DR

[[effect-ts|Effect]] の中心となる型 `Effect<A, E, R>`。[[side-effect|副作用]]を値のように扱えるようにする。

## 仕組み

`Effect<A, E, R>` の 3 つの型パラメータは、それぞれ次の型を表す。

- `A`: 成功したときの型
- `E`: 失敗したときの型
- `R`: 依存するコンテキストの型（[[effect-service|Effect Service]] を参照）

`Effect` は「プログラムが何をするか」を表すだけで、作っただけでは実行されない。実行するには `run*` 系の関数を明示的に呼ぶ。通常の同期処理なら `Effect.runSync`、非同期処理なら `Effect.runPromise` を使う。

## 例

`Effect` は値なので、配列に入れたり、関数の引数として渡したりできる。

```ts
const print = Console.log("Hello")

const printingArray = [print, print, print]

const printIfTrue = (check: boolean, toPrint: Effect.Effect<void>) => {
  if (check) Effect.runSync(toPrint)
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-succeed|Effect.succeed]]
- [[effect-promise|Effect.promise]]
- [[effect-gen|Effect.gen]]

## 出典

- [The Effect Type - Effect Documentation](https://effect.website/docs/getting-started/the-effect-type/)
- [Running Effects - Effect Documentation](https://effect.website/docs/getting-started/running-effects/)
