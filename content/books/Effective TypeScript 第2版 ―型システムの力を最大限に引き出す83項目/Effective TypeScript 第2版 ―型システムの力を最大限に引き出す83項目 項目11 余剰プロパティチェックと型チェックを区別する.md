---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目11 余剰プロパティチェックと型チェックを区別する
description: 余剰プロパティチェックは型が宣言された場所にオブジェクトリテラルを代入するときだけ行われ、構造的型付けによる代入可能性のチェックとは別物だと説く項目
tags: [book-chapter, typescript]
date: 2025-04-26
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 11
---

## TL;DR

- [[excess-property-checking|余剰プロパティチェック]]は、型が宣言されている場所にオブジェクトリテラルを代入するときに行われる。
- 余剰プロパティチェックは、[[structural-typing|構造的型付け]]による代入可能性のチェックとは別物であり、中間変数を挟むと働かない。

## 内容

### 余剰プロパティチェックとは

余剰プロパティチェックとは、値が指定された型にないプロパティを持っていないかを調べることである。「厳密なオブジェクトリテラルチェック」や「フレッシュネス」とも呼ばれる。

このチェックは、型が宣言されている場所にオブジェクトリテラルを代入するときに行われる。型が宣言されている場所とは、型を宣言した変数への代入や、引数の型が宣言された関数の呼び出しなどである。

```ts
interface Room {
  numDoors: number
  ceilingHeightFt: number
}

const r: Room = { numDoors: 1, ceilingHeightFt: 10, elephant: "present" } // 型エラー
```

```ts
interface Options {
  title: string;
  darkMode?: boolean;
}
function createWindow(options: Options) { ... }

createWindow({ title: "Spider Solitaire", darkmode: true }); // 型エラー
```

### 代入可能性のチェックとの違い

余剰プロパティチェックは、構造的型付けによる代入可能性のチェックとは異なる。余剰プロパティチェックは、[[type-system|型システム]]の基本である構造的な性質（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目4 構造的型付けに慣れる|項目4]]）を損なわずに、型の拡張性を制御しようとする仕組みである。

そのため、中間変数を挟むと余剰プロパティチェックは働かない。

```ts
const obj = { numDoors: 1, ceilingHeightFt: 10, elephant: "present" }
const r: Room = obj // OK
```

この 2 つを混同すると、[[typescript|TypeScript]] の代入可能性についての[[mental-model|メンタルモデル]]を作りにくくなる。

[[type-assertion|型アサーション]]を使った場合も、余剰プロパティチェックは行われない。これは、型アサーションより型アノテーションを使うべき理由の 1 つである（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目9 型アノテーションを型アサーションより優先的に使用する|項目9]]）。

```ts
const o = { darkmode: true, title: "MS Hearts" } as Options // OK
```

### 弱い型

オプションのプロパティだけを持つ型を[[weak-type|弱い型]]と呼ぶ。弱い型に代入するときは、代入可能性のチェックを通るために、少なくとも 1 つのプロパティが一致する必要がある。

```ts
interface LineChartOptions {
  logscale?: boolean;
  invertedYAxis?: boolean;
  areaChart?: boolean;
}
function setOptions(options: LineChartOptions) { ... }

const opts = { logScale: true };
setOptions(opts); // 型エラー

const opts2 = { logscale: true };
setOptions(opts2); // OK
```

## キーワード

- [[excess-property-checking|余剰プロパティチェック]]
- [[structural-typing|構造的型付け]]
- [[weak-type|弱い型]]
- [[type-assertion|型アサーション]]
- [[mental-model|メンタルモデル]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
