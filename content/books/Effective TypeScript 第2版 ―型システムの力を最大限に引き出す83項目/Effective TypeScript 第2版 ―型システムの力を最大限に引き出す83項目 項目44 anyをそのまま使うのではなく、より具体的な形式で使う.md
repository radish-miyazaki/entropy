---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目44 anyをそのまま使うのではなく、より具体的な形式で使う
description: any を使うときは、any[] や Record<string, any> などより具体的な形式にして、受け付ける値を絞るべきだと説く項目
tags: [book-chapter, typescript]
date: 2025-05-04
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 44
---

## TL;DR

- `any` を使う前に、本当にどんな JavaScript の値でも受け付けてよいかを考える。
- そうでなければ、`any[]` や `Record<string, any>` など、より具体的な形式の `any` を使う。

## 内容

`any` を使うときは、どんな JavaScript の値でも受け付けてよいかを考える。受け付けられないなら、`any[]`、`{ [id: string]: any }`、`Record<string, any>`、`() => any` のように、より具体的な形式の `any` を使う。ただし、配列がほしいだけなら `unknown[]` のほうが好ましい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目46 型が不明な値には、anyではなくunknownを使う|項目46 型が不明な値には、anyではなくunknownを使う]]）。

```ts
// 🙅 Bad
const getLengthBad = (array: any) => array.length
const numArgsBad = (...args: any) => args.length

// 🙆 Better
const getLengthBetter = (array: any[]) => array.length
const numArgsBetter = (...args: any[]) => args.length
```

## キーワード

- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
