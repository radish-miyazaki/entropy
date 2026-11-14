---
title: Effect.succeed
aliases: []
description: 必ず成功する値を持つ Effect を作る関数
tags: [word, effect, typescript]
date: 2025-05-30
---

## TL;DR

与えた値で必ず成功する [[effect-effect|Effect]] を作る関数。エラーも外部への依存もない場面で使う。

## 仕組み

公式ドキュメントでは、特定の値で成功して完了する `Effect` が必要なときに使う関数だと説明している。`Effect` を作る関数（コンストラクタ）には、ほかに `fail`、`sync`、`try`、`promise`、`tryPromise`、`async`、`suspend` がある。

対になるのが `Effect.fail` である。`Effect.fail` は回復可能なエラーを表す `Effect` を作り、`Effect` の中でエラーを明示的に知らせるときに使う。`Error` を渡すと、型は `Effect<never, Error, never>` になる。

## 例

```ts
const success = Effect.succeed(42)
// ^ const success: Effect.Effect<number, never, never>
```

エラーから回復するときに、代わりの値を返す用途でも使う（[[effect-catch-tag|Effect.catchTag]] を参照）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-promise|Effect.promise]]
- [[effect-trypromise|Effect.tryPromise]]
- [[effect-catch-tag|Effect.catchTag]]

## 出典

- [Creating Effects - Effect Documentation](https://effect.website/docs/getting-started/creating-effects/#succeed)
