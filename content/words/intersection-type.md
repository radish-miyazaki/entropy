---
title: インターセクション型
aliases: [Intersection Types]
description: 既存の型を & で組み合わせ、すべての型のメンバを持つ型を作る TypeScript の構文
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

`&` 演算子で既存の型を組み合わせ、それらすべてのメンバを持つ新しい型を作る [[typescript|TypeScript]] の構文である。主にオブジェクトの型を組み合わせるのに使う。

## 仕組み

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、型を値の集合として捉えると、`A & B` は積集合を表す。そのため `A & B` には、`A` と `B` の両方のプロパティを持つ値が属する。

## 例

```ts
interface Colorful {
  color: string
}

interface Circle {
  radius: number
}

type ColorfulCircle = Colorful & Circle

function draw(circle: ColorfulCircle) {
  console.log(`Color was ${circle.color}`)
  console.log(`Radius was ${circle.radius}`)
}

draw({ color: "blue", radius: 42 }) // OK
```

## 注意点

`interface` の `extends` と似ているが、同じ名前のプロパティの型がぶつかったときの扱いが違う。`interface` では互換性のないプロパティはエラーになる。インターセクション型ではエラーにならず、両方の型を同時に満たす型として扱われる。`name: string` と `name: number` を組み合わせると、`name` は `never` 型になる。

```ts
interface Person1 {
  name: string
}

interface Person2 {
  name: number
}

type Staff = Person1 & Person2
// Staff の name は never 型になる
```

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目78 コンパイラーのパフォーマンスに注意を払う|Effective TypeScript 第2版 項目78]] では、型の書き方もコンパイラの速さに影響するので、`type` のインターセクションではなく `interface` の `extends` を使うよう勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]
- [[index-signature|インデックスシグネチャ]]

## 出典

- [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目7 型を値の集合として考える|Effective TypeScript 第2版 項目7]]
