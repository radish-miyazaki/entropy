---
title: Promise.all で 1 秒間あたりのリクエスト数を制限する
description: 配列を一定の件数ごとに分け、Promise.all で並列に処理した後に待ち時間を挟んで、レートリミットに引っかからないようにする
tags: [blog, typescript]
date: 2025-06-03
draft: false
---

## TL;DR

- レートリミット対策として、要素を `maxConcurrent` 件ずつのチャンクに分け、チャンクごとに `Promise.all` で並列に処理し、チャンクの間に `delayMs` だけ待つ関数を書いた。
- より厳密には、アプリケーション全体でリクエスト数を制御できるようにした方がよい。

## 背景

API のレートリミットに引っかからないように、`Promise.all` で同時に送るリクエストの数を制限したかった。

## 検証

[[typescript|TypeScript]] で次の関数を書いた。

```ts
interface ThrottledPromiseAllArgs<T, R> {
  items: T[]
  fn: (item: T) => Promise<R>
  maxConcurrent: number
  delayMs: number
}

export const throttledPromiseAll = async <T, R>({
  items,
  fn,
  maxConcurrent,
  delayMs,
}: ThrottledPromiseAllArgs<T, R>): Promise<R[]> => {
  const chunks = items.reduce((acc, item, index) => {
    const chunkIndex = Math.floor(index / maxConcurrent)
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = []
    }

    acc[chunkIndex].push(item)
    return acc
  }, [] as T[][])

  return await chunks.reduce(
    async (accPromise, chunk, i) => {
      const acc = await accPromise
      const chunkResults = await Promise.all(chunk.map(fn))

      if (chunk !== chunks[chunks.length - 1]) {
        await new Promise<void>((resolve) => setTimeout(resolve, delayMs))
      }

      return [...acc, ...chunkResults]
    },
    Promise.resolve([] as R[]),
  )
}
```

まず `items` を `maxConcurrent` 件ずつのチャンクに分ける。次に `reduce` でチャンクを順に処理し、チャンクの中は `Promise.all` で並列に実行する。最後のチャンク以外では、処理の後に `setTimeout` で `delayMs` ミリ秒待つ。

## 考察

この関数が制限するのは、1 回の呼び出しの中のリクエスト数だけである。別の場所から同じ API を呼ぶとレートリミットを超えうるので、より厳密にはアプリケーション全体で制御できるようにした方がよい。

## キーワード

- [[promise|Promise]]
- [[typescript|TypeScript]]
