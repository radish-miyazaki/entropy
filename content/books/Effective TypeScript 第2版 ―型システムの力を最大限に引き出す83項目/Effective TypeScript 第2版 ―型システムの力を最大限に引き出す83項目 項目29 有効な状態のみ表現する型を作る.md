---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目29 有効な状態のみ表現する型を作る
description: 有効な状態と不正な状態が混在する型を避け、有効な状態だけを表現できる型を設計する項目
tags: [book-chapter, typescript]
date: 2025-04-12
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 29
---

## TL;DR

- 有効な状態と不正な状態が混在する型は、混乱とバグの原因になる。
- 型が長くなったり表現が難しくなったりしても、有効な状態だけを表現する型を作ったほうが、最終的には時間と労力を節約できる。

## 内容

### 有効な状態だけを表現する

有効な状態と不正な状態が混在する型は、混乱を招き、エラーを起こしやすいコードの原因になりやすい。そのため、有効な状態だけを表現する型を作るほうがよい。型が長くなったり、表現が難しくなったりしても、最終的には時間と労力の節約になる。

次の `RequestState` では、`responseText` と `error` が両方存在するといった、意図しない状態を作れてしまう。

```ts
// NG
interface RequestState {
  isLoading: boolean
  responseText?: string
  error?: string
}
```

状態ごとに型を分け、`state` をタグにした[[union-type|ユニオン型]]（[[tagged-union|タグ付きユニオン]]）でまとめると、有効な状態しか表現できなくなる。

```ts
// OK
interface RequestPending {
  state: "pending"
}
interface RequestError {
  state: "error"
  error: string
}
interface RequestSuccess {
  state: "ok"
  responseStatus: string
}
type RequestState = RequestPending | RequestError | RequestSuccess
```

### 訳者による解説

有効な状態だけを表現する型には、2 つの利点がある。1 つ目は、不正な状態を扱うコードが要らなくなるので、実装がシンプルになることである。2 つ目は、うっかり不正な状態を作っても型エラーとして静的に検出できるので、バグを防げることである。

## キーワード

- [[typescript|TypeScript]]
- [[union-type|ユニオン型]]
- [[tagged-union|タグ付きユニオン]]
- [[state-machine|ステートマシン]]

## 自分の理解

最近入門した [[xstate|XState]] も推したい。
