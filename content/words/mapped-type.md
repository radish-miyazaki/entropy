---
title: マップ型
aliases: [Mapped Types]
description: 既存の型のキーを走査して、新しい型を作る TypeScript の型
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

キーの集合（多くは `keyof` で作る）を走査して、新しい型を作る [[typescript|TypeScript]] のジェネリックな型。ある型をもとに別の型を定義できるので、同じ記述を繰り返さずに済む。

## なぜ必要か

TypeScript Handbook によると、型を繰り返し書かずに、別の型をもとに新しい型を作りたいときに使う。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目15 型演算とジェネリック型を使って重複を避ける|Effective TypeScript]] でも、[[dry|DRY]] は型にも当てはまるとして、`keyof` やマップ型を使って型の重複を減らすことを勧めている。

## 仕組み

マップ型は、インデックスシグネチャの構文をもとにしており、`[Property in keyof Type]` でキーを 1 つずつ取り出して値の型を決める。`readonly` と `?` の修飾子を、`+` で付けたり `-` で外したりできる。TypeScript 4.1 からは `as` でキーを付け替えられ、テンプレートリテラル型で新しいキー名を作ったり、[[conditional-types|条件型]]で `never` にしてキーを除いたりできる。

## 例

TypeScript Handbook の例では、`OptionsFlags` が型のすべてのプロパティの値を `boolean` に変える。

```ts
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean
}

type Features = {
  darkMode: () => void
  newUserProfile: () => void
}

type FeatureOptions = OptionsFlags<Features>
// { darkMode: boolean; newUserProfile: boolean; }
```

組み込みの `Record`、`Partial<T>`、`Pick<T, Keys>` もマップ型である。

## 注意点

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目13 type（型エイリアス）とinterfaceの違いを知る|Effective TypeScript]] によると、マップ型は `type` では使えるが、`interface` では表現できない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[conditional-types|条件型]]
- [[generics|ジェネリクス]]
- [[dry|DRY]]

## 出典

- [Mapped Types - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目15 型演算とジェネリック型を使って重複を避ける|Effective TypeScript 第2版 項目15 型演算とジェネリック型を使って重複を避ける]]
