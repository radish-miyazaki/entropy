---
title: Effect.filterOrFail
aliases: []
description: 成功値が条件を満たさないとき、指定したエラーで Effect を失敗させる関数
tags: [word, effect（typescript）, typescript]
date: 2025-05-30
---

## TL;DR

第 1 引数の[[predicate|述語関数]]が `false` を返したとき、第 2 引数で作ったエラーで元の [[effect-effect|Effect]] を失敗させる関数。

## 例

```ts
const main = fetchRequest.pipe(
  Effect.filterOrFail(
    (response) => response.ok,
    (): FetchError => ({ _tag: "FetchError" }),
  ),
)
// ^ const main: Effect.Effect<Response, FetchError, never>
```

`response.ok` が `false` なら `FetchError` で失敗し、それ以外なら `Response` を成功値として返す。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-data-tagged-error|Data.TaggedError]]
- [[effect-catch-tags|Effect.catchTags]]

## 出典

- [Error Channel Operations - Effect Documentation](https://effect.website/docs/error-management/error-channel-operations/#filtering-the-success-channel)
