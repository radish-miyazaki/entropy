---
title: TSDoc
aliases: []
description: TypeScript のドキュメントコメントの書き方を標準化するための提案と、そのパーサ
tags: [word, typescript]
date: 2025-04-18
---

## TL;DR

[[typescript|TypeScript]] のコードに書くドキュメントコメントの書き方を標準化するための提案。Microsoft が中心となって進めている。

## なぜ必要か

ドキュメントコメントを解析するツールは、[[jsdoc|JSDoc]] をゆるく基にした構文を使っているが、ツールごとに独自の拡張がある。そのため、あるツールの書き方が別のツールを混乱させる。JSDoc は文法が厳密に定められておらず、素の [[javascript|JavaScript]] の型注釈が中心なので、標準にはできない。TSDoc は JSDoc の見た目を保ったまま、ツールが同じように解析できる文法を定める。

## 仕組み

`@microsoft/tsdoc` パッケージが、パーサのオープンソースの参照実装を提供している。ツールはこのパーサを使うと、標準に完全に準拠できる。[[eslint|ESLint]] 向けには `eslint-plugin-tsdoc` がある。

## 例

```ts
/**
 * Returns the average of two numbers.
 *
 * @remarks
 * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
 *
 * @param x - The first input number
 * @param y - The second input number
 * @returns The arithmetic mean of `x` and `y`
 *
 * @beta
 */
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[jsdoc|JSDoc]]

## 出典

- [TSDoc](https://tsdoc.org/)
