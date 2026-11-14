---
title: Effect Layer
aliases: []
description: Effect で Service の構築と Service 間の依存関係を管理するための仕組み
tags: [word, effect（typescript）, typescript]
date: 2025-05-30
---

## TL;DR

[[effect-ts|Effect]] で、[[effect-service|Service]] を作る処理を抽象化したもの。Service 間の[[dependency|依存関係]]を管理する。

## なぜ必要か

Service はほかの Service に依存することがある。依存を Service のインタフェースに出すと、たとえば `query` の型が `Config | Logger` を要求するようになり、テストが難しくなる。Layer は Service を作るときに依存を解決するので、Service のインタフェースをきれいに保てる。公式ドキュメントは、Layer を「Service を作るためのコンストラクタ」と説明している。

## 仕組み

型は `Layer<RequirementsOut, Error, RequirementsIn>` で、それぞれ作る Service、作るときに起こりうるエラー、作るのに必要な依存を表す。

- `Layer.succeed`: 依存のない値から Layer を作る
- `Layer.effect`: ほかの Service を取り出しながら Layer を作る
- `Layer.merge`: Layer を並べて合成する
- `Layer.provide`: ある Layer の出力を、別の Layer の依存に渡す

最後に `Effect.provide` で Layer をプログラムに渡す。要求する依存が `never` になれば、プログラムを実行できる。

## 例

```ts
const LoggerLive = Layer.effect(
  Logger,
  Effect.gen(function* () {
    const config = yield* Config
    return {
      log: (message) =>
        Effect.gen(function* () {
          const { logLevel } = yield* config.getConfig
          console.log(`[${logLevel}] ${message}`)
        }),
    }
  }),
)
```

`LoggerLive` の型は `Layer<Logger, never, Config>` で、`Config` に依存して `Logger` を作る。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-ts|Effect（TypeScript）]]
- [[effect-service|Effect Service]]
- [[effect-gen|Effect.gen]]
- [[dependency-injection|依存性の注入]]

## 出典

- [Managing Layers - Effect Documentation](https://effect.website/docs/requirements-management/layers/)
- [Defining More Services - Effect: Beginners Complete Getting Started](https://www.typeonce.dev/course/effect-beginners-complete-getting-started/layers/defining-more-services)
