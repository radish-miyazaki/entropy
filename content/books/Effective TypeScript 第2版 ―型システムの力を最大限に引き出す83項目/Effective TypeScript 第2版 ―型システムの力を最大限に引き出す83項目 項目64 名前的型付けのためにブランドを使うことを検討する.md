---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目64 名前的型付けのためにブランドを使うことを検討する
description: TypeScript で名前的型付けを実現するために Branded Types を使う利点と、4 つの実装方法を説明する項目
tags: [book-chapter, typescript]
date: 2025-05-04
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 64
---

## TL;DR

- [[typescript|TypeScript]] で[[nominal-typing|名前的型付け]]を実現するには、[[branded-types|Branded Types]] を使う。
- Branded Types は、オブジェクト型のプロパティ、プライベートフィールド、文字列の enum、`unique symbol` 型の 4 通りで実装できる。

## 内容

### Branded Types の利点

TypeScript で名前的型付けを実現するには Branded Types を使う。名前的型付けは、型どうしが等しいかを構造ではなく型の名前で区別する考え方で、[[structural-typing|構造的型付け]]とは逆である。

Branded Types を使うと、意味は違うが構造は同じプリミティブ型やオブジェクト型を区別して定義できる。また、型システムだけでは表現できないさまざまな性質をモデリングできる。次の例では、ソート済みであることを型で表している。

```ts
type SortedList<T> = T[] & { _brand: "sorted" }

function isSorted<T>(xs: T[]): xs is SortedList<T> {
  for (let i = 0; i < xs.length - 1; i++) {
    if (xs[i] > xs[i + 1]) {
      return false
    }
  }
  return true
}

if (isSorted(arr)) binarySearch(arr, 2)
```

### 4 つの実装方法

1 つ目は、オブジェクト型のプロパティを使う方法である。

```ts
type UserID = string & { _brand: "user_id" }
```

2 つ目は、クラスのブランドとしてプライベートフィールドを使う方法である。3 つ目は、名前的に型付けされる文字列の enum を使う方法である（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目72 TypeScriptの独自機能の使用を避け、ECMAScriptの機能を使う|項目72 TypeScriptの独自機能の使用を避け、ECMAScriptの機能を使う]]）。

4 つ目は、`unique symbol` 型を使う方法である。`brand` シンボルを `export` していないので、`UserID` 型の値を得るには[[type-assertion|型アサーション]]か補助関数を使う必要がある。

```ts
declare const brand: unique symbol
export type UserID = number & { [brand]: "user_id" }
```

## キーワード

- [[nominal-typing|名前的型付け]]
- [[branded-types|Branded Types]]
- [[structural-typing|構造的型付け]]
- [[type-assertion|型アサーション]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
