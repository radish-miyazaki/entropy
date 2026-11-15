---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › オブジェクトを一度に構築する
description: オブジェクトはプロパティを後から足さずに一度に構築し、追加が必要ならスプレッド構文で型安全に行う項目
tags: [book-chapter, typescript]
date: 2025-04-30
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 21
---

## TL;DR

- オブジェクトは、プロパティを後から足さずに一度に構築する。
- プロパティを追加したいときは、[[spread-syntax|スプレッド構文]]を使えば型安全に追加できる。

## 内容

### 一度に構築すべき理由

オブジェクトを一度に構築すべき理由は 2 つある。1 つ目は、[[typescript|TypeScript]] では変数の値が変わっても、型は通常変わらないことである。

```ts
const pt = {}
pt.x = 3 // 型エラー
pt.y = 4 // 型エラー
```

2 つ目は、宣言された型を持つ変数にオブジェクトリテラルを代入すると、[[excess-property-checking|余剰プロパティチェック]]が走ることである。

```ts
interface Point {
  x: number
  y: number
}
const pt: Point = {} // 型エラー
pt.x = 3
pt.y = 4
```

[[type-assertion|型アサーション]]を使えば回避できるが、避けるべきである（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目9 型アノテーションを型アサーションより優先的に使用する|項目9]]）。

### スプレッド構文でプロパティを追加する

スプレッド構文を使うと、型安全にプロパティを追加できる。

```ts
const pt0 = {}
const pt1 = { ...pt0, x: 3 }
const pt2: Point = { ...pt1, y: 4 }
```

スプレッド構文で `{}` や falsy な値（`null`、`undefined`、`false`）を展開しても、プロパティは追加されない。これを利用すると、条件を満たすときだけプロパティを追加できる。

```ts
declare let hasMiddle: boolean
const firstLast = { first: "Harry", last: "Truman" }
const president = { ...firstLast, ...(hasMiddle ? { middle: "S" } : {}) }
// president: { middle?: string; first: string; last: string }
```

複数のプロパティをまとめて追加することもできる。

```ts
declare let hasDates: boolean
const nameTitle = { name: "Khufu", title: "Pharaoh" }
const pharaoh = { ...nameTitle, ...(hasDates && { start: -2589, end: -2566 }) }
// pharaoh: { start?: number; end?: number; name: string; title: string }
```

### 既存のオブジェクトや配列を変換する場合

既存のオブジェクトや配列から新しいものを作る場合、「一度に構築する」に当たるのは、`map` や `reduce` といった関数型の API や、[[lodash|Lodash]] のようなユーティリティライブラリを使うことである（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目26 関数型の標準APIやライブラリを使って型の流れを促進する|項目26]]）。

## キーワード

- [[typescript|TypeScript]]
- [[spread-syntax|スプレッド構文]]
- [[excess-property-checking|余剰プロパティチェック]]
- [[type-assertion|型アサーション]]
- [[lodash|Lodash]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
