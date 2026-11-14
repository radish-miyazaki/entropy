---
title: Effect.promise
aliases: []
description: 失敗しない非同期処理の結果を Effect でラップする関数
tags: [word, effect, typescript]
date: 2025-05-30
---

## TL;DR

非同期処理を呼び出した結果を [[effect-effect|Effect]] でラップする関数。処理が reject しないと確信できるときに使う。

## 仕組み

`Effect.promise` は `Promise` を返す関数を受け取り、その結果を `Effect` にする。失敗しないと仮定するので、エラーの型（第 2 型パラメータ）は `never` になる。それでも `Promise` が reject した場合、そのエラーは型付きのエラーではなく、想定外のクラッシュ（defect）として扱われる。失敗する可能性があるなら [[effect-trypromise|Effect.tryPromise]] を使う。同期処理をラップするには `Effect.sync` を使う。

`Promise` は作った時点で処理が始まる（[[eager-evaluation|正格評価]]）が、`Effect` は実行するまで何もしない（[[lazy-evaluation|遅延評価]]）。

## 例

```ts
const fetchRequest = Effect.promise(() => fetch("https://pokeapi.co/api/v2/pokemon/garchomp"))
// ^ Effect.Effect<Response, never, never>

const jsonResponse = (response: Response) => Effect.promise(() => response.json())
// ^ const jsonResponse: (response: Response) => Effect.Effect<any, never, never>
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-trypromise|Effect.tryPromise]]
- [[effect-succeed|Effect.succeed]]
- [[effect-flatmap|Effect.flatMap]]

## 出典

- [[Effect： Beginners Complete Getting Started|Effect: Beginners Complete Getting Started]]
- [Creating Effects - Effect Documentation](https://effect.website/docs/getting-started/creating-effects/)
