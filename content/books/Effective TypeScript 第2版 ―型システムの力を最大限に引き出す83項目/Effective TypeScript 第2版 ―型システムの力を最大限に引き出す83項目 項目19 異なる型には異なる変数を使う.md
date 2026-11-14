---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目19 異なる型には異なる変数を使う
description: TypeScript では変数の値は変わっても型は基本的に変わらないので、異なる型の値に同じ変数を使い回さないようにする項目
tags: [book-chapter, typescript]
date: 2025-04-19
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 19
---

## TL;DR

- [[typescript|TypeScript]] では、変数の値は変えられるが、型は基本的に変わらない。
- 1 つの変数を異なる型の値に使い回すのは避け、型ごとに別の変数を使う。

## 内容

### 変数の型は基本的に変わらない

TypeScript では、変数の値は変えられても、型は一般に変わらない。例外は[[type-narrowing|型の絞り込み]]（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目22 型の絞り込みを理解する|項目22]]）と[[evolving-any|進化する型]]（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目25 進化する型を理解する|項目25]]）である。

### 異なる型の値に変数を使い回さない

1 つの変数を異なる型の値に再利用すると、[[type-inference|型推論]]がうまく効かない。また、値が変わるので処理を追いにくくなり、変数名も抽象的になるため、[[readability|可読性]]が下がる。

```ts
// NG
let productId: string | number = "12-34-56"
// ...
productId = 123456

// OK
const productId = "12-34-56"
// ...
const serial = 123456
```

### シャドーイングとは別の話

内側のスコープで同じ名前の変数を宣言する[[variable-shadowing|シャドーイング]]は、変数の再利用とは別物である。

```ts
const productId = "12-34-56"
fetchProduct(productId)

{
  const productId = 123456
  fetchProductBySerialNumber(productId)
}
```

ただし、シャドーイングも可読性を下げるので避けたほうがよい。[[eslint|ESLint]] の [no-shadow](https://eslint.org/docs/latest/rules/no-shadow) ルールで禁止できる。

オブジェクトにも同じことが当てはまる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目21 オブジェクトを一度に構築する|項目21]]）。

## キーワード

- [[typescript|TypeScript]]
- [[type-inference|型推論]]
- [[type-narrowing|型の絞り込み]]
- [[evolving-any|進化する型]]
- [[variable-shadowing|シャドーイング]]
- [[readability|可読性]]
- [[eslint|ESLint]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
