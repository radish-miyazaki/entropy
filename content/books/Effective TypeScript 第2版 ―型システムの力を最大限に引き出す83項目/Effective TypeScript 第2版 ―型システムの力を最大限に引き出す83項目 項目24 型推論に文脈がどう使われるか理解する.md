---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目24 型推論に文脈がどう使われるか理解する
description: TypeScript は値の使われる文脈も考慮して型を推論するので、値と文脈を切り離したときに起きる型エラーとその解消方法を扱う項目
tags: [book-chapter, typescript]
date: 2025-05-04
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 24
---

## TL;DR

- [[typescript|TypeScript]] は、値だけでなく文脈も考慮して[[type-inference|型を推論]]する。
- そのため、値とそれが使われる文脈を切り離すと、型エラーが起きることがある。
- 解消するには、リテラルを直接渡す、[[type-annotation|型アノテーション]]を付ける、`const` を使う、`as const` や `satisfies` を付ける、のいずれかを使う。

## 内容

### 文脈と型推論

TypeScript は、値が使われる文脈も考慮して型を推論する。そのため、関数やメソッドの抽出といった[[refactoring|リファクタリング]]で値と文脈が切り離されると、型エラーが起きることがある。以下、4 つの例で解消方法を見る。

### 文字列リテラル

```ts
type Language = 'JavaScript' | 'TypeScript' | 'Python'
function setLanguage(language: Language) { ... }

let language = 'JavaScript'
//  ^? let language: string
setLanguage(language)
// Argument of type 'string' is not assignable to parameter of type 'Language'.
```

リテラルを直接渡す（`setLanguage('JavaScript')`）か、型アノテーションを付ける（`let language: Language = 'JavaScript'`）か、`let` の代わりに `const` を使えば解消する。

### タプル型

```ts
function panTo(where: [number, number]) { ... }

const loc = [10, 20]
//    ^? const loc: number[]
panTo(loc)
// Argument of type 'number[]' is not assignable to parameter of type '[number, number]'.
```

リテラルを直接渡す（`panTo([10, 20])`）か、型アノテーションを付ける（`const loc: [number, number] = [10, 20]`）と解消する。

`as const` を付ける方法には注意が要る。`loc` の型は `readonly [10, 20]` になるので、`panTo` が自分の管理下にあるなら、引数に `readonly` を付ける必要がある（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目14 readonlyを使用して変更にまつわるエラーを避ける|項目14]]）。

```ts
function panTo(where: readonly [number, number]) { ... }
```

また、変数の値が誤っていたとき、型エラーは定義ではなく関数の呼び出し箇所に出る。

```ts
const loc = [10, 20, 30] as const
panTo(loc)
// Argument of type 'readonly [10, 20, 30]' is not assignable to
// parameter of type 'readonly [number, number]'.
```

### オブジェクト

```ts
function complain(language: GovernedLanguage) { ... }

const ts = { language: 'TypeScript', organization: 'Microsoft' }

complain(ts)
// Argument of type '{ language: string; organization: string; }'
// is not assignable to parameter of type 'GovernedLanguage'.
// Types of property 'language' are incompatible.
//   Type 'string' is not assignable to type 'Language'.
```

リテラルを直接渡すか、型アノテーションを付けると解消する。`as const` や `satisfies` を付けてもよい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目20 変数の型がどのように決まるか理解する|項目20]]）。

```ts
const ts: GovernedLanguage = { language: "TypeScript", organization: "Microsoft" }
```

```ts
const ts = { language: "TypeScript", organization: "Microsoft" } as const

const ts = {
  language: "TypeScript",
  organization: "Microsoft",
} satisfies GovernedLanguage
```

### コールバック

```ts
function callWithRandomNumber(fn: (n1: number, n2: number) => void) { ... }

const fn = (a, b) => console.log(a + b)
//          -     Parameter 'a' implicitly has an 'any' type.
//             -  Parameter 'b' implicitly has an 'any' type.
callWithRandomNumber(fn)
```

リテラルを直接渡す（`callWithRandomNumber((a, b) => console.log(a + b))`）か、型アノテーションを付ける。型アノテーションは引数に付けてもよいし、関数式全体に付けてもよい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目12 可能なら関数式全体に型を適用する|項目12]]）。

```ts
const fn = (a: number, b: number) => console.log(a + b)
```

```ts
type CallbackFn = (a: number, b: number) => void
function callWithRandomNumber(fn: CallbackFn): void { ... }

const fn: CallbackFn = (a, b) => console.log(a + b)
```

## キーワード

- [[typescript|TypeScript]]
- [[type-inference|型推論]]
- [[type-annotation|型アノテーション]]
- [[tuple|タプル]]
- [[refactoring|リファクタリング]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
