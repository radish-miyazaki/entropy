---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › 特別な値には専用の型を使用する
description: 特別なケースの戻り値に通常ケースと同じ型の値（-1 や "" など）を使わず、null や undefined で表すべきだと説く項目
tags: [book-chapter, typescript]
date: 2025-04-24
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 36
---

## TL;DR

- 通常ケースと特別ケースで、戻り値を同じ型にしない。
- `0`、`-1`、`""` を特別な値として使う代わりに、`null` や `undefined` を使う。

## 内容

### 通常ケースと同じ型の特別な値を避ける

悪い例は `Array.prototype.indexOf` である。値が見つかればそのインデックスを返し、見つからなければ通常ケースと同じ `number` 型の `-1` を返す。

```ts
console.log([1, 2, 3].indexOf(1)) // 値が存在する場合はそのインデックスが返る
console.log([1, 2, 3].indexOf(100)) // 存在しない場合は通常ケースと同じ型の -1 が返る
```

`0`、`-1`、`""` を特別な値として使うことは、`strictNullChecks` をオフにするのと同じである。特別な値を考慮し忘れても型チェックで検出されず、多くのバグがすり抜けてしまう。そこで、特別な値には `null` や `undefined` を使う。

### null や undefined の意味が曖昧なとき

文脈によっては、`null` や `undefined` が何を表すのかが分かりにくいこともある。その場合は[[discriminated-union|タグ付きユニオン]]を検討するとよい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目29 有効な状態のみ表現する型を作る|項目29 有効な状態のみ表現する型を作る]]）。

## キーワード

- [[typescript|TypeScript]]
- [[discriminated-union|タグ付きユニオン]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
