---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目31 型情報をドキュメントで繰り返さない
description: コメントや変数名で型情報を繰り返さず、readonly などの型で表し、型から分からない単位は変数名に含める項目
tags: [book-chapter, typescript]
date: 2025-05-04
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 31
---

## TL;DR

- コメントや変数名で型情報を繰り返さない。うまくいっても重複、悪ければ食い違いを生む。
- 「引数を変更しない」とコメントに書く代わりに `readonly` を付ける。
- 単位が型から分からない場合は、変数名に単位を含める。

## 内容

### 型情報をコメントや変数名で繰り返さない

コメントや変数名で型情報を繰り返すのは避ける。良くても型情報が重複するだけで、悪ければ型とコメントが食い違う。コメントには、コードから読み取れないことを書くべきである（[[A Philosophy of Software Design 第13章 Comments Should Describe Things that Aren't Obvious from the Code|A Philosophy of Software Design 第13章]]）。

### コメントの代わりに readonly を付ける

「引数を変更しない」とコメントに書く代わりに、引数の型に `readonly` を付ける。

```ts
// NG
/** 文字列を数値としてソートする（たとえば"2"<"10"）。numsは変更しない */
function sortNumerically(nums: string[]): string[] { ... }

// OK
/** 文字列を数値としてソートする（たとえば"2"<"10"）。 */
function sortNumerically(nums: readonly string[]): string[] { ... }
```

### 単位は変数名に含める

単位が型から明らかでない場合は、`timeMs` や `temperatureC` のように、変数名に単位を含めることを検討する。ブランド型を使う方法もある（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目64 名前的型付けのためにブランドを使うことを検討する|項目64]]）。

## キーワード

- [[typescript|TypeScript]]

## 自分の理解

元の配列を変更せずにソートしたいなら、[`sort`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) の代わりに [`toSorted`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) を使えばよい。
