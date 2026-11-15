---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › 同じ型のパラメーターの繰り返しを避ける
description: 同じ型のパラメータを連続させると呼び出しの正しさが分かりにくくなるので、別々の型を取るか 1 つのオブジェクトにまとめるべきだと説く項目
tags: [book-chapter, typescript]
date: 2025-04-25
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 38
---

## TL;DR

- 同じ型のパラメータを連続して並べない。関数を正しく呼び出せているかが分からなくなる。
- 別々の型をパラメータに取るか、すべてのパラメータを 1 つのオブジェクトにまとめる。

## 内容

### 同じ型のパラメータが並ぶ問題

次の関数は `number` 型のパラメータが 5 つ並んでいる。

```ts
function drawRect(x: number, y: number, w: number, h: number, opacity: number) { ... }
```

呼び出し側の `drawRect(25, 50, 75, 100, 1)` を見ても、引数を正しい順に渡せているかが分からない。

ただし例外もある。`max(a, b)` や `isEqual(a, b)` のように引数の順序を入れ替えても結果が変わらない場合や、`arr.slice(start, stop)` のように順序が自然な場合は問題にならない。とはいえ、何を自然と感じるかは開発者によって異なる。年月日の順序がその例である。

### 代替案 1: 別々の型をパラメータに取る

```ts
interface Point { x: number; y: number }
interface Dimension { width: number; height: number }

function drawRect(topLeft: Point, size: Dimension, opacity: number) { ... }

drawRect({ x: 25, y: 50 }, { width: 75, height: 100 }, 1.0)
```

### 代替案 2: すべてのパラメータを 1 つのオブジェクトにまとめる

```ts
interface DrawRectParams extends Point, Dimension {
  opacity: number
}

function drawRect(params: DrawRectParams) { ... }

drawRect({ x: 25, y: 50, width: 75, height: 100, opacity: 1.0 })
```

### パラメータが多すぎる場合

そもそもパラメータが多すぎるなら、[[refactoring|リファクタリング]]して減らすべきである。

> 「10 個のパラメーターを持つ関数があったら、おそらく何らかの問題が見過ごされている」

パラメータ数の上限は、[[eslint|ESLint]] の [max-params](https://eslint.org/docs/latest/rules/max-params) ルールで強制できる。

## キーワード

- [[typescript|TypeScript]]
- [[refactoring|リファクタリング]]
- [[eslint|ESLint]]

## 自分の理解

代替案 2（すべてのパラメータを 1 つのオブジェクトにまとめる）をよく使っている。
