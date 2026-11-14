---
title: Effect.flatMap
aliases: []
description: Effect の成功値を取り出して次の Effect に渡し、複数の Effect を合成する関数
tags: [word, effect（typescript）, typescript]
date: 2025-05-30
---

## TL;DR

複数の [[effect-effect|Effect]] を合成して、より複雑なプログラムを組み立てる関数。

## 仕組み

`Effect.flatMap` は、第 1 引数で受け取った `Effect` の成功値を取り出し、第 2 引数の関数に渡す。第 2 引数の関数は次の `Effect` を返す。こうして前の処理の結果を使う処理を、`Effect` のままつないでいける。

## 例

[[effect-promise|Effect.promise]] で作った `fetchRequest` と `jsonResponse` をつなぐ。

```ts
const main = Effect.flatMap(fetchRequest, (response) => jsonResponse(response))
//                                         ^ response: Response

Effect.runPromise(main) // 実行
```

引数をそのまま渡すだけなので、次のように短く書ける。

```ts
const main = Effect.flatMap(fetchRequest, jsonResponse)
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-pipe|pipe（Effect）]]
- [[effect-dual-api|Dual API]]
- [[effect-gen|Effect.gen]]

## 出典

- [Building Pipelines - Effect Documentation](https://effect.website/docs/getting-started/building-pipelines/#flatmap)
