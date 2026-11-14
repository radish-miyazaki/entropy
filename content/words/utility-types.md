---
title: ユーティリティ型
aliases: [Utility Types]
description: TypeScript が標準で用意している、よくある型の変換を行うジェネリック型
tags: [word, typescript, 型システム]
date: 2026-11-14
---

## TL;DR

[[typescript|TypeScript]] が標準で用意している、よくある型の変換を行う型。グローバルに使えるので、import せずに使える。

## なぜ必要か

既存の型から、全プロパティを省略可能にした型や、一部のプロパティだけを選んだ型を作りたいことは多い。ユーティリティ型を使えば、同じような型を何度も書かずに、元の型から変換して作れる。

## 仕組み

ユーティリティ型は、型を引数に取る[[generics|ジェネリック]]な型である。主なものに次がある。

- `Partial<Type>`: すべてのプロパティを省略可能にする
- `Required<Type>`: すべてのプロパティを必須にする
- `Readonly<Type>`: すべてのプロパティを読み取り専用にする
- `Record<Keys, Type>`: キーが `Keys`、値が `Type` のオブジェクト型を作る
- `Pick<Type, Keys>` と `Omit<Type, Keys>`: 指定したプロパティを選ぶ、または取り除く
- `Exclude<UnionType, ExcludedMembers>` と `Extract<Type, Union>`: [[union-type|ユニオン型]]のメンバーを取り除く、または残す
- `NonNullable<Type>`: `null` と `undefined` を取り除く
- `Parameters<Type>` と `ReturnType<Type>`: 関数型の引数の型をタプルで、または戻り値の型を取り出す
- `Awaited<Type>`: `Promise` を再帰的に剥がす

## 例

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo, "title" | "completed">
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[mapped-type|マップ型]]
- [[conditional-types|条件型]]
- [[generics|ジェネリクス]]
- [[union-type|ユニオン型]]

## 出典

- [Utility Types - TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html)
