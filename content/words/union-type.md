---
title: ユニオン型
aliases: [Union Types]
description: 2 つ以上の型から作られ、そのどれか 1 つの型の値を表す型
tags: [word, typescript, 型システム]
date: 2026-11-14
---

## TL;DR

2 つ以上の型を `|` でつないで作る型で、そのうちのどれか 1 つの型の値を表す。[[typescript|TypeScript]] のハンドブックでは、元になる各型をユニオンの「メンバー」と呼ぶ。

## なぜ必要か

数値でも文字列でもよい ID のように、複数の型を取りうる値を 1 つの型で表せる。`any` を使わずに、受け付ける型を限定できる。

## 仕組み

ユニオン型の値を渡すときは、どれか 1 つのメンバーに合えばよい。一方、値を使うときは、すべてのメンバーで有効な操作しか許されない。メンバーごとに違う操作をしたいときは、`typeof` や `Array.isArray` などで型を絞り込む。

TypeScript のハンドブックによると、ユニオン型は、メンバーのプロパティの「共通部分」しか持たないように見える。名前の由来は集合論の和集合で、2 つの集合を合わせると、両方に共通して成り立つことしか言えなくなる。

## 例

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()) // ここでは string
  } else {
    console.log(id) // ここでは number
  }
}
```

## 注意点

絞り込まずに `id.toUpperCase()` を呼ぶと、`number` に `toUpperCase` がないので型エラーになる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[intersection-type|交差型]]
- [[discriminated-union|タグ付きユニオン]]
- [[literal-type|リテラル型]]
- [[user-defined-type-guard|ユーザー定義型ガード]]
- [[conditional-types|条件型]]

## 出典

- [Everyday Types - TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
