---
title: Effect Configuration
aliases: []
description: 環境変数などの設定を読み込むための、Effect 組み込みの Config
tags: [word, effect（typescript）, typescript]
date: 2025-05-30
---

## TL;DR

[[effect-ts|Effect]] が提供する、[[environment-variable|環境変数]]を扱うための組み込みの仕組み（`Config`）。

## 仕組み

環境変数は `Config.string` などで定義する。

```ts
const PokeApiConfig = Config.string("BASE_URL")
```

定義した `Config` は、[[effect-effect|Effect]] と同じように [[effect-gen|Effect.gen]] の中で `yield*` して使う。

```ts
const program = Effect.gen(function* () {
  const baseURL = yield* PokeApiConfig
  const response = yield* fetchRequest(baseURL)
  if (!response.ok) return yield* new FetchError()

  const json = yield* jsonResponse(response)

  return yield* decodePokemon(json)
})
```

環境変数の読み込みは[[side-effect|副作用]]のある操作で、失敗することもあるので `yield*` が必要になる。その結果、`program` のエラーの型（`Effect` の第 2 型パラメータ）に `ConfigError` が加わる。

## 自分の理解

環境変数の読み込みに失敗したら、そのままアプリケーションを止めたい。なので `ConfigError` はエラー処理しないほうがよい。

## 関連

- [[effect-service|Effect Service]]
- [[nextjs-environment-variables|Next.js における環境変数]]

## 出典

- [Configuration - Effect Documentation](https://effect.website/docs/configuration/)
- [What are configuration variables - Effect: Beginners Complete Getting Started](https://www.typeonce.dev/course/effect-beginners-complete-getting-started/configuration-with-effect-config/what-are-configuration-variables)
