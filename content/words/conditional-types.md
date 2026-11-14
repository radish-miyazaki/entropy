---
title: 条件型
aliases: [Conditional Types]
description: 型が別の型に代入できるかどうかで、2 つの型のどちらかを選ぶ TypeScript の型
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

`SomeType extends OtherType ? TrueType : FalseType` の形で、左の型が右の型に代入できれば前の型、できなければ後ろの型になる [[typescript|TypeScript]] の型。[[generics|ジェネリクス]]と組み合わせて、入力の型から出力の型を決められる。

## なぜ必要か

入力の型によって戻り値の型を変える関数は、オーバーロードでも書ける。しかし TypeScript のハンドブックによると、扱う型が増えるたびにオーバーロードの数は指数的に増える。条件型を使うと、型の選び方を 1 か所にまとめて書ける。

## 仕組み

true の分岐の中では、検査した型パラメータが条件の型に絞り込まれる。`infer` キーワードを使うと、true の分岐で使う型変数を条件の中で宣言し、型の一部を取り出せる。

型パラメータにユニオン型を渡すと、条件型はユニオンの各メンバーに分配される。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目53 条件型のユニオンでの分配を制御する|Effective TypeScript 項目53]] によると、分配が起きるのは条件に型パラメータがそのまま使われている（`T extends ...`）場合だけである。分配させたくないときは、`extends` の両側を角かっこで囲む。

## 例

```ts
type Flatten<T> = T extends Array<infer Item> ? Item : T
type A = Flatten<string[]> // string

type ToArray<T> = T extends any ? T[] : never
type B = ToArray<string | number> // string[] | number[]

type ToArrayNonDist<T> = [T] extends [any] ? T[] : never
type C = ToArrayNonDist<string | number> // (string | number)[]
```

## 注意点

`infer` でオーバーロードされた関数の型を推論すると、最後のシグネチャから推論される。引数の型のリストからオーバーロードを解決することはできない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]
- [[generics|ジェネリクス]]

## 出典

- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目52 オーバーロードシグネチャより条件型を優先的に使用する|Effective TypeScript 項目52]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目53 条件型のユニオンでの分配を制御する|Effective TypeScript 項目53]]
- [TypeScript: Documentation - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
