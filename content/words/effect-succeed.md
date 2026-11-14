---
title: Effect.succeed
aliases: []
description: 必ず成功する値を持つ Effect を作る関数
tags: [word, effect（typescript）, typescript]
date: 2025-05-30
---

## TL;DR

与えた値で必ず成功する [[effect-effect|Effect]] を作る関数。エラーも外部への依存もない場面で使う。

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
- [[effect-catch-tag|Effect.catchTag]]

## 出典

- [Creating Effects - Effect Documentation](https://effect.website/docs/getting-started/creating-effects/#succeed)
