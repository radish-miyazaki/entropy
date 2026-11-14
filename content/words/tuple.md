---
title: タプル
aliases: []
description: 要素の数と、各位置の要素の型が決まっている配列の型
tags: [word, typescript, 型システム]
date: 2026-11-14
---

## TL;DR

要素の数と、各位置にある要素の型が決まっている配列の型。[[typescript|TypeScript]] では `[string, number]` のように書く。

## なぜ必要か

TypeScript のハンドブックによると、タプル型は各要素の意味が慣習で「自明」な API で役に立つ。分割代入するときに、要素に好きな名前を付けられる。可変長の引数をタプル型で受け取れば、要素の最小数を決めつつ中間の変数を作らずに済む。

## 仕組み

`[string, number]` は、0 番目が `string`、1 番目が `number` の配列を表す。範囲外の添字にアクセスすると型エラーになる。長さのチェックを除けば、特定の添字のプロパティと、数値リテラル型の `length` を持つ配列の型と同じである。

要素の型の後ろに `?` を付けると省略可能な要素になる。省略可能な要素は末尾にしか置けず、`length` の型にも影響する。`...boolean[]` のような残余要素も持てる。`readonly [string, number]` のように `readonly` を付けると、要素を書き換えられなくなる。

## 例

```ts
type Either2dOr3d = [number, number, number?]

let point = [3, 4] as const // readonly [3, 4]
```

## 注意点

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、配列リテラルは `number[]` のように推論されるので、タプル型にするには[[type-annotation|型アノテーション]]が必要になる。ハンドブックによると、`as const` を付けた配列リテラルは `readonly` のタプル型と推論されるので、`readonly` でないタプル型の引数には渡せない。また、何が「自明」かは人によって違うので、説明的なプロパティ名を持つオブジェクトのほうがよい場合もある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[literal-type|リテラル型]]
- [[destructuring|分割代入]]
- [[type-inference|型推論]]

## 出典

- [TypeScript: Documentation - Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目6 エディターを使って型システムを調査、探求する|Effective TypeScript 第2版 項目6]]
