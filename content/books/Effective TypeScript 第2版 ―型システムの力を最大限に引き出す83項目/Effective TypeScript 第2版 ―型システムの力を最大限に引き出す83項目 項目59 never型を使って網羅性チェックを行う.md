---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目59 never型を使って網羅性チェックを行う
description: never 型への代入を使って条件分岐の網羅性をチェックし、戻り値の型アノテーションやテンプレートリテラル型も活用する項目
tags: [book-chapter, typescript]
date: 2025-05-05
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 59
---

## TL;DR

- `never` 型への代入を使うと、TypeScript で[[exhaustiveness-checking|網羅性チェック]]ができる。
- 複数の分岐から `return` する関数では、戻り値に[[type-annotation|型アノテーション]]を付ける。それでも明示的な網羅性チェックが必要な場合はある。
- 複数の値のすべての組み合わせを網羅しているかは、[[template-literal-types|テンプレートリテラル型]]でチェックできる。

## 内容

### never 型で網羅性をチェックする

[[typescript|TypeScript]] では、`never` 型への代入を利用して網羅性をチェックできる。条件分岐ですべての選択肢を処理すると、残った値の型は `never`（[[bottom-type|ボトム型]]、つまり空集合）になるからである。実装の仕方は 3 つある。

1 つ目は、`never` を受け取る関数を用意する方法である。型チェックのときだけでなく、実行時にも想定外の値から守れる。

```ts
const assertUnreachable = (value: never): never => {
  throw new Error(`Missed a case: ${value}`)
}

const drawShape = (shape: Shape, context: CanvasRenderingContext2D) => {
  switch (shape.type) {
    case "box":
    // ...
    case "circle":
    // ...
    // case 'line':
    //   ...
    default:
      assertUnreachable(shape)
  }
}
```

2 つ目は、`never` 型の変数に直接代入する方法である。

```ts
const drawShape = (shape: Shape, context: CanvasRenderingContext2D) => {
  switch (shape.type) {
    // ...
    default:
      const exhaustiveCheck: never = shape
      throw new Error(`Missed a case: ${exhaustiveCheck}`)
  }
}
```

3 つ目は、`satisfies` 演算子を使う方法である。

```ts
const drawShape = (shape: Shape, context: CanvasRenderingContext2D) => {
  switch (shape.type) {
    // ...
    default:
      shape satisfies never
      throw new Error(`Missed a case: ${shape}`)
  }
}
```

### 戻り値の型アノテーションで網羅性をチェックする

複数の分岐から `return` する関数では、戻り値に型アノテーションを付けると、ケースの漏れを防げる場合がある（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目18 推論可能な型でコードを乱雑にしない|項目18 推論可能な型でコードを乱雑にしない]]）。ただし、戻り値に `undefined` が含まれる場合などは、明示的な網羅性チェックが必要になる。

```ts
const getArea = (shape: Shape): number => {
  //                          ------ Function lacks ending return statement and
  //                                 return type does not include 'undefined'.
  switch (shape.type) {
    case "box":
      const [width, height] = shape.size
      return width * height
    case "circle":
      return Math.PI * shape.radius ** 2
  }
}
```

### 複数の値の組み合わせを網羅する

複数の値のすべての組み合わせを網羅しているかをチェックするには、テンプレートリテラル型を使えばよい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目54 テンプレートリテラル型を使ってDSLや文字列間の関係をモデリングする|項目54 テンプレートリテラル型を使ってDSLや文字列間の関係をモデリングする]]）。

```ts
type Play = "rock" | "paper" | "scissors"

const shoot = (a: Play, b: Play) => {
  const pair = `${a},${b}` as `${Play},${Play}` // or as const
  //    ^? const pair: "rock,rock" | "rock,paper" | "rock,scissors" |
  //                   "paper,rock" | "paper,paper" | "paper,scissors" |
  //                   "scissors,rock" | "scissors,paper" | "scissors,scissors"
  switch (pair) {
    case "rock,rock":
    // ...
    default:
      assertUnreachable(pair)
  }
}
```

### 関連する typescript-eslint のルール

[[typescript-eslint|typescript-eslint]] の [switch-exhaustiveness-check](https://typescript-eslint.io/rules/switch-exhaustiveness-check/) を有効にすると、網羅していない `switch` 文を検出できる。

## キーワード

- [[exhaustiveness-checking|網羅性チェック]]
- [[bottom-type|ボトム型]]
- [[type-annotation|型アノテーション]]
- [[template-literal-types|テンプレートリテラル型]]
- [[typescript-eslint|typescript-eslint]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
