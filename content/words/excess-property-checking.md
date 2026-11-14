---
title: 余剰プロパティチェック
aliases: [excess property checking]
description: TypeScript で、型が宣言された場所にオブジェクトリテラルを渡すとき、型にないプロパティをエラーにする検査
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

[[typescript|TypeScript]] で、型が宣言された場所にオブジェクトリテラルを代入したり引数として渡したりするとき、対象の型にないプロパティがあればエラーにする検査。厳密なオブジェクトリテラルチェックやフレッシュネスとも呼ばれる。

## なぜ必要か

TypeScript Handbook によると、素の JavaScript ではプロパティ名の打ち間違いは何も言わずに失敗する。余剰プロパティのエラーの多くは実際のバグである。

## 仕組み

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目11 余剰プロパティチェックと型チェックを区別する|Effective TypeScript]] によると、余剰プロパティチェックは、構造的型付けによる代入可能性のチェックとは別物である。型システムの構造的な性質を損なわずに、オブジェクトリテラルの場合に限って型の拡張性を制御する仕組みである。

## 例

```ts
interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig) {
  /* ... */
}

createSquare({ colour: "red", width: 100 })
// Error: Object literal may only specify known properties,
// but 'colour' does not exist in type 'SquareConfig'.
```

## 注意点

オブジェクトリテラルでなければ検査は行われない。いったん別の変数に入れてから渡すと、対象の型と共通のプロパティが 1 つでもあればエラーにならない。型アサーションを使った場合も検査されないので、Effective TypeScript は型アサーションより型アノテーションを使うよう勧めている。インデックスシグネチャを持つ型では、追加のプロパティが許される。

余分なプロパティを意図的に許したいときは、検査を回避するより、型の宣言をその意図に合わせて直すほうがよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]
- [[evolving-any|進化する型]]

## 出典

- [Object Types - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目11 余剰プロパティチェックと型チェックを区別する]]
