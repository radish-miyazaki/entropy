---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目35 stringよりもそれに代わる、より精度の高い型を選択する
description: どんな文字列でも受け入れるわけではない値には string ではなく文字列リテラル型や keyof T を使い、Stringly typed なコードを避ける項目
tags: [book-chapter, typescript]
date: 2025-05-06
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 35
---

## TL;DR

- どんな文字列でも受け入れるわけではない値には、`string` より適切な型を選ぶ（[[stringly-typed|Stringly typed]] を避ける）。
- 文字列リテラル型のユニオンを使うと値のドメインを正確に表せ、オブジェクトのプロパティ名を受け取る引数には `keyof T` を使う。

## 内容

### 文字列リテラル型を使う

あらゆる `string` を受け入れるわけではない値には、より適切な型を選ぶ。文字列リテラル型を使うと、値の[[domain|ドメイン]]をより正確に表せる。型チェックが厳格になるだけでなく、[[tsdoc|TSDoc]] を付けられたり、意図が明確になったりと、開発体験も向上する。

```ts
// NG
interface Album {
  artist: string
  title: string
  releaseDate: string
  recordingType: string
}
```

```ts
// OK
type RecordingType = "studio" | "live"
interface Album {
  artist: string
  title: string
  releaseDate: Date
  recordingType: RecordingType
}
```

### プロパティ名には keyof T を使う

オブジェクトのプロパティ名であることを期待する引数には、`keyof T` を使う。

```ts
// NG
function pluck(records: any[], key: string): any[] {
  return records.map((r) => r[key])
}
```

```ts
// OK
function pluck<T, K extends keyof T>(records: T[], key: K): T[K][] {
  return records.map((r) => r[key])
}
```

## キーワード

- [[typescript|TypeScript]]
- [[stringly-typed|Stringly typed]]
- [[domain|ドメイン]]
- [[tsdoc|TSDoc]]
- 開発体験

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
