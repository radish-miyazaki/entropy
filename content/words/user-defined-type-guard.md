---
title: ユーザー定義型ガード
aliases: [型ガード, type guard, ユーザ定義型ガード]
description: 戻り値の型に型述語を書いた関数で、TypeScript の型の絞り込みを自分で定義する仕組み
tags: [word, typescript, 型システム]
date: 2026-11-14
---

## TL;DR

戻り値の型に `parameterName is Type` という型述語を書いた関数。[[typescript|TypeScript]] に、その関数が `true` を返したときに引数の型を絞り込ませる。

## なぜ必要か

TypeScript は `typeof` や `instanceof`、`in` などで型を絞り込むが、それだけでは表せない判定もある。ユーザー定義型ガードを使うと、判定のロジックを関数にまとめ、その結果で型を絞り込める。

## 仕組み

型述語の `parameterName` は、その関数の引数の名前でなければならない。この関数を変数に対して呼ぶと、TypeScript は `if` の分岐の中でその変数を指定した型に絞り込む。`else` の分岐では、その型ではないことも分かるので、[[union-type|ユニオン型]]の残りのメンバーに絞り込む。

## 例

```ts
type Fish = { swim: () => void }
type Bird = { fly: () => void }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

if (isFish(pet)) {
  pet.swim() // Fish
} else {
  pet.fly() // Bird
}
```

`zoo.filter(isFish)` のように `filter` に渡すと、`Fish[]` 型の配列が得られる。

## 注意点

コンパイラは関数の中身が型述語と合っているかを確かめず、関数が返した真偽値をそのまま信じる。判定を間違えると、誤った型に絞り込まれる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[union-type|ユニオン型]]
- [[discriminated-union|タグ付きユニオン]]
- [[any-type|any 型]]

## 出典

- [Narrowing - TypeScript](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
