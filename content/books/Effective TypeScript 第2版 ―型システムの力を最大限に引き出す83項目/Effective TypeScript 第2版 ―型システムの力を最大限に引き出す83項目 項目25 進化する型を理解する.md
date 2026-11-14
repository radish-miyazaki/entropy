---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目25 進化する型を理解する
description: null や undefined、空配列で初期化した変数の型が代入に応じて変化する「進化する型」の仕組みと注意点を扱う項目
tags: [book-chapter, typescript]
date: 2025-04-12
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 25
---

## TL;DR

- `null` や `undefined`、空配列で初期化した変数の型は、代入に応じて具体的な型に変化することがある（[[evolving-any|進化する型]]）。
- 進化する型はなるべく使わず、明示的に[[type-annotation|型アノテーション]]を付けたほうがよい。

## 内容

### 進化する型とは

[[typescript|TypeScript]] の型は、一般に絞り込まれる方向にしか変わらない。しかし、`null` や `undefined`、空配列で初期化した変数の型は、変化することがある。このような型を「進化する型」と呼ぶ。

```ts
function range(start: number, limit: number) {
  const nums = []
  //    ^? const nums: any[]
  for (let i = start; i < limit; i++) {
    nums.push(i)
    // ^? const nums: any[]
  }
  return nums
  //     ^? const nums: number[]
}
```

条件分岐では、分岐ごとに型が変わる。

```ts
let value
//  ^? let value: any
if (Math.random() < 0.5) {
  value = /hello/
  value
  // ^? let value: RegExp
} else {
  value = 12
  value
  // ^? let value: number
}
value
// ^? let value: number | RegExp
```

型が進化するのは、値を代入したり要素を追加したりした後である。進化する型を使うと型アノテーションを減らせる。また、この仕組みを知っておくと、このパターンを使ったコードを読むときに役立つ。

### 注意点

進化する型が `any` になるのは書き込むときだけである。読み込むときは暗黙の anyとして型エラーになる。

```ts
function range(start: number, limit: number) {
  const nums = []
  // Variable 'nums' implicitly has type 'any[]' in some
  // locations where its type cannot be determined.
  if (start === limit) {
    return nums
    // Variable 'nums' implicitly has an 'any[]' type.
  }
  // ...
}
```

暗黙の any は、関数呼び出しを通じては進化しない。

```ts
function makeSquares(start: number, limit: number) {
  const nums = []
  // Variable 'nums' implicitly has type 'any[]' in some
  // locations where its type cannot be determined.
  range(start, limit).forEach((i) => nums.push(i))
  return nums
  // Variable 'nums' implicitly has an 'any[]' type.
}
```

明示的に型アノテーションを付けたほうが、意図しないエラーを検出できる。

### 訳者による解説

本書は進化する型を推奨している。一方、同じ訳者による『初めての TypeScript』では、型チェッカが部分的に働かず、予期しない値が入る可能性があるので、このパターンを非推奨としている。通常の `any` と同じく好ましくない（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目5 any型の使用を制限する|項目5]]）。訳者自身は非推奨の立場である。

## キーワード

- [[typescript|TypeScript]]
- [[evolving-any|進化する型]]
- 暗黙の any
- [[type-annotation|型アノテーション]]

## 自分の理解

自分も訳者と同じく、進化する型は使いたくない。`any` として推論されるということは IDE の補完も効かないはずなので、どのスコープであっても `any` が発生するのは極力避けたい。
