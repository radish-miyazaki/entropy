---
title: Effect Service
aliases: []
description: 型安全な依存性の注入のために設計された Effect の仕組み
tags: [word, effect, typescript]
date: 2025-05-30
---

## TL;DR

[[effect-ts|Effect]] で[[dependency-injection|依存性の注入]]を行うための仕組み。依存関係が型に表れるので、注入し忘れをコンパイル時に検出できる。

## 仕組み

### 定義

Service は `Context` を使って定義する。`Context` は Service の実装を値に持つグローバルな `Map` のようなもので、実装を提供すると Effect はここから Service を取り出す。

```ts
// Service が提供するメソッドをすべて含むインタフェース
export interface PokeApi {
  readonly getPokemon: Effect.Effect<
    Pokemon,
    FetchError | JsonError | ParseResult.ParseError | ConfigError
  >
}

export const PokeApi = Context.GenericTag<PokeApi>("PokeApi")
```

インタフェースと Service に同じ名前を付けると、1 回の import で型と値の両方を使える。Service はメソッドの集まりでなくてもよく、文字列などの単一の値や関数でもよい。

### 利用

Service は [[effect-effect|Effect]] として扱えるので、[[effect-gen|Effect.gen]] の中で `yield*` すれば取り出せる。Service のメソッドも `Effect` なので、呼ぶときにも `yield*` が要る。

```ts
const program = Effect.gen(function* () {
  const pokeApi = yield* PokeApi
  return yield* pokeApi.getPokemon
})
// ^ Effect.Effect<Pokemon, FetchError | JsonError | ParseError | ConfigError, PokeApi>
```

### 依存関係の注入

`Effect` の第 3 型パラメータは、Service への依存を表す。`runPromise` などの `run*` 関数は、この型パラメータが `never`（すべての依存が提供済み）の `Effect` しか受け取らない。そのため、上の `program` をそのまま `runPromise` に渡すと型エラーになる。

依存を満たすには、Service の `of` で実装を作り、`Effect.provideService` で注入する。本番用の実装には `-Live`、テスト用には `-Test` や `-Mock` と名前を付けるのが慣習である。

```ts
export const PokeApiLive = PokeApi.of({
  getPokemon: Effect.gen(function* () {
    // ここに実装を書く
  }),
})

const runnable = program.pipe(Effect.provideService(PokeApi, PokeApiLive))
// ^ Effect.Effect<Pokemon, FetchError | JsonError | ParseError | ConfigError, never>

Effect.runPromise(runnable).then(console.log)
```

第 3 型パラメータが `never` になり、依存が注入されたことを型で確かめられる。

## 注意点

`Context.GenericTag` では、同じインタフェースを持つ別の Service を定義できてしまう。

```ts
export const PokeApi1 = Context.GenericTag<PokeApi>("PokeApi1")
export const PokeApi2 = Context.GenericTag<PokeApi>("PokeApi2")
```

代わりにクラスと `Context.Tag` を使うのがベストプラクティスである。`Context.Tag` は Service が一意であることを保証する。クラスなので値と型の両方として使え、静的なプロパティに環境ごとの実装をまとめられる。

```ts
export class PokeApi extends Context.Tag("PokeApi")<PokeApi, PokeApiImpl>() {
  static readonly Live = PokeApi.of({
    getPokemon: // 本番用の実装
  })

  static readonly Mock = PokeApi.of({
    getPokemon: // テスト用の実装
  })
}

const runnable = program.pipe(Effect.provideService(PokeApi, PokeApi.Live))
```

複数の Service が互いに依存する場合、実装を毎回作って `provideService` で手で注入するのは手間がかかる。その場合は [[effect-layer|Effect Layer]] を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dependency-injection|依存性の注入]]
- [[effect-layer|Effect Layer]]
- [[effect-configuration|Effect Configuration]]

## 出典

- [Managing Services - Effect Documentation](https://effect.website/docs/requirements-management/services/)
- [Refactoring Effect code - Effect: Beginners Complete Getting Started](https://www.typeonce.dev/course/effect-beginners-complete-getting-started/effect-services/refactoring-effect-code)
