---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › 変数の型がどのように決まるか理解する
description: 単一の値から取りうる値の集合を決める「型の拡大」の仕組みと、const・型アノテーション・as const・satisfies でそれを制御する方法を扱う項目
tags: [book-chapter, typescript]
date: 2025-05-02
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 20
---

## TL;DR

- 型チェッカが、1 つの値からその変数が取りうる値の集合を決めることを型の拡大と呼ぶ。
- 型の拡大は、`const`、[[type-annotation|型アノテーション]]、`as const`、`satisfies` で制御できる。

## 内容

### 型の拡大

型チェッカが、指定された 1 つの値から、取りうる値の集合（[[domain|ドメイン]]）を決めることを型の拡大（widening）と呼ぶ。型の拡大の挙動にはっきりした規則はないが、[[typescript|TypeScript]] は型の具体性と柔軟性のバランスを取ろうとする。たとえば `let` の変数は後から書き換えられるので、`let` で宣言した変数にプリミティブ値を代入すると、その基本の型に拡大される。

```ts
let x = "x" // x: string
```

### 型の拡大を制御する方法

#### const を使う

`let` の代わりに `const` を使うと、より狭い型になる。

```ts
const x = "x" // x: 'x'
```

ただし、オブジェクトや配列の型は広いままである。オブジェクトの各プロパティは、`let` で宣言されたかのように扱われる。

```ts
const mixed = ["x", 1] // mixed: (string | number)[]
const obj = { x: 1 } // obj: { x: number }
```

#### 型アノテーションを付ける

型アノテーションで明示的に型を指定できる。

```ts
const obj: { x: string | number } = { x: 1 }
```

値を関数の引数として渡すなどして、型チェッカに文脈を与える方法もある（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目24 型推論に文脈がどう使われるか理解する|項目24]]）。

#### as const を使う

`as const` を付けると、TypeScript はできるだけ狭い型を推論し、型の拡大が起きない。

```ts
const obj1 = { x: 1, y: 2 } // obj1: { x: number; y: number }
const obj2 = { x: 1 as const, y: 2 } // obj2: { x: 1; y: number }
const obj3 = { x: 1, y: 2 } as const // obj3: { readonly x: 1; readonly y: 2 }
```

配列に付けると[[tuple|タプル]]型になる。

```ts
const arr1 = [1, 2, 3] // arr1: number[]
const arr2 = [1, 2, 3] as const // arr2: readonly [1, 2, 3]
```

タプル型として推論させつつ、各要素は基本の型のままにしたい場合は、次のような補助関数を使うとよい。

```ts
function tuple<T extends unknown[]>(...elements: T) {
  return elements
}

const arr3 = tuple(1, 2, 3) // arr3: [number, number, number]
const mix = tuple(4, "five", true) // mix: [number, string, boolean]
```

[`Object.freeze`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) や `readonly` を直接付ける方法もあるが、効果は `as const` より浅い。`Object.freeze` は推論された型に `readonly` を付け、さらに JavaScript のランタイムでも変更を禁止する。

```ts
const frozenArray = Object.freeze([1, 2, 3]) // frozenArray: readonly number[]
const frozenObj = Object.freeze({ x: 1, y: 2 }) // frozenObj: Readonly<{ x: 1; y: 2 }>
```

#### satisfies を使う

`satisfies` は、値がある型の要件を満たすことを保証しつつ、型の拡大を起こさない。

```ts
const capitals1 = { ny: [-73.7562, 42.6526], ca: [-121.4944, 38.5816] }
//    ^? const capitals1: { ny: number[], ca: number[] }

const capitals2 = {
  ny: [-73.7562, 42.6526],
  ca: [-121.4944, 38.5816],
} satisfies Record<string, Point>
capitals2
// ^? const capitals2: { ny: [number, number], ca: [number, number] }
```

`capitals2` は具体的な型を保つので、存在しないプロパティにアクセスすると型エラーになる（`capitals2.pr`）。一方、同じ型の型アノテーションを付けた変数を経由すると、型エラーにならなくなる。

```ts
const capitals3: Record<string, Point> = capitals2
capitals3.pr // 型エラーにならない
```

## キーワード

- [[typescript|TypeScript]]
- 型の拡大
- [[type-annotation|型アノテーション]]
- [[type-inference|型推論]]
- [[tuple|タプル]]
- [[domain|ドメイン]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
