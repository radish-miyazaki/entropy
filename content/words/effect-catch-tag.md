---
title: Effect.catchTag
aliases: []
description: タグで指定した 1 種類のエラーを捕まえて回復する Effect の関数
tags: [word, effect, typescript]
date: 2025-05-30
---

## TL;DR

`_tag` で指定した 1 種類のエラーを捕まえて、回復処理を行う [[effect-ts|Effect]] の関数。処理したエラーは `Effect` のエラーの型から取り除かれる。

## 仕組み

第 1 引数には、処理したいエラーのタグ（文字列リテラル）を渡す。第 2 引数には、そのエラーを受け取り、回復のための任意の `Effect` を返す関数を渡す。回復の方法には、同じリソースを取る別のリクエストを送る、デフォルト値を返す、エラーを無視して続ける、などがある。

```ts
const main = fetchRequest.pipe(
  Effect.flatMap(jsonResponse),
  Effect.catchTag("UnknownException", () => Effect.succeed("エラーが発生しました")),
)
```

`catchTag` を使うと、`Effect<Success, Error>` の `Error` から対象のエラーが消え、回復処理の結果の型が `Success` に加わる。

```ts
const main = fetchRequest
// ^ const main: Effect.Effect<Response, UnknownException, never>

const main = fetchRequest.pipe(
  Effect.catchTag("UnknownException", () => Effect.succeed<string>("エラーが発生しました")),
)
// ^ const main: Effect.Effect<string | Response, never, never>
```

## 注意点

回復のために返した `Effect` が失敗する場合は、そのエラーが新たにエラーの型に加わる。複数のエラーをまとめて処理するなら [[effect-catch-tags|Effect.catchTags]] を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-catch-tags|Effect.catchTags]]
- [[effect-data-tagged-error|Data.TaggedError]]
- [[effect-succeed|Effect.succeed]]

## 出典

- [Expected Errors - Effect Documentation](https://effect.website/docs/error-management/expected-errors/#catchtag)
