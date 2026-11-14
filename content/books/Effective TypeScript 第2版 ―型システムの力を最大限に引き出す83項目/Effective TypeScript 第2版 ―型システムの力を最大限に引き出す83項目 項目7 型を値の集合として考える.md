---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目7 型を値の集合として考える
description: 型を値の集合として考えると型演算や代入可能性が理解しやすくなり、extends、assignable、サブタイプはどれも「部分集合」を意味すると説く項目
tags: [book-chapter, typescript]
date: 2025-04-18
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 7
---

## TL;DR

- 型を値の集合として考える。オブジェクトは、型宣言にないプロパティを持っていてもその型に属する。
- 型演算は集合演算であり（`A | B` は和集合）、`extends`、assignable、[[subtyping|サブタイプ]]はどれも「〜の部分集合」を意味する。

## 内容

### 型は値の集合

本書では、型に含まれる値の集合を「ドメイン」と呼ぶ。実行時、変数は [[javascript|JavaScript]] のあらゆる値のうち、ただ 1 つの値を持つ。一方、[[typescript|TypeScript]] が型チェックをするとき、変数は型しか持っていない。そのため、型を「その変数が取りうる値の集合」と考えるとよい。

最も小さい集合は空集合で、TypeScript では [[never-type|never 型]]にあたる。`never` は型階層の一番下にあるので、ボトム型とも呼ばれる。対極にあるのが [[unknown-type|unknown 型]]である。`unknown` のドメインには JavaScript のすべての値が含まれ、型階層の一番上にあるのでトップ型とも呼ばれる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目46 型が不明な値には、anyではなくunknownを使う|項目46]]）。次に小さいのは値を 1 つだけ含む集合で、TypeScript では[[literal-type|リテラル型]]にあたる。他の言語ではユニット型と呼ぶこともある。

TypeScript のエラーでよく見る「assignable（代入可能）」は、集合の言葉では「〜の要素である」（値と型の関係）か「〜の部分集合である」（2 つの型の関係）のどちらかを意味する。

### 無限のドメイン

ここまでのドメインは有限だが、実際に使うドメインの多くは無限である。たとえばオブジェクトは、[[structural-typing|構造的型付け]]によって他のプロパティを持つことも許されるので（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目4 構造的型付けに慣れる|項目4]]）、基本的に無限になる。ただし、このことは[[excess-property-checking|余剰プロパティチェック]]によって分かりにくくなることがある（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目11 余剰プロパティチェックと型チェックを区別する|項目11]]）。

### 型演算は集合演算

型を集合として捉えると、型に対する演算が理解しやすくなる。`A & B`（[[intersection-type|インターセクション型]]）は積集合を表すので、`A` と `B` の両方のプロパティを持つ値が属する。

`A | B`（[[union-type|ユニオン型]]）は和集合を表す。ただしオブジェクトの場合は、安全性も考える必要がある。和集合の値は、片方の型の部分集合でしかない可能性がある。そのため TypeScript は、両方に共通するプロパティにしかアクセスさせない。

### extends と部分集合

`extends` も assignable と同じく「〜の部分集合」を意味する。通常、`extends` は interface にフィールドを足すために使う。しかし、元の型の値の部分集合になっていれば、プロパティの型を狭めることもできる。

```ts
interface NullyStudent {
  name: string
  ageYears: number | null
}
interface Student extends NullyStudent {
  ageYears: number
}
// Student の型は { name: string, ageYears: number } となる
```

部分集合にならなければ、型エラーになる。

```ts
interface StringStudent extends NullyStudent {
  ageYears: number | string
}
```

[[generics|ジェネリクス]]の制約に使う `extends` も、「〜の部分集合」を意味する。

```ts
function getKey<K extends string>(val: any, key: K) { ... }
```

サブタイプという言葉も部分集合を表す。次の例では、`Vector3D` は `Vector2D` のサブタイプであり、`Vector2D` は `Vector1D` のサブタイプである。

```ts
interface Vector1D {
  x: number
}
interface Vector2D extends Vector1D {
  y: number
}
interface Vector3D extends Vector2D {
  z: number
}
```

### 配列とタプル

型を集合として捉えると、配列とタプルの関係も明確になる。`number[]` は `[number, number]` の部分集合ではないので、次の代入は型エラーになる。

```ts
const list = [1, 2]
const tuple: [number, number] = list
```

また、3 要素のタプルは 2 要素のタプルに代入できない。TypeScript は 2 要素の数値のタプルを、`{ 0: number, 1: number }` ではなく、`{ 0: number, 1: number, length: 2 }` としてモデリングしているからである。

```ts
const triple: [number, number, number] = [1, 2, 3]
const double: [number, number] = triple
```

### 代入可能性と等価性

TypeScript は、代入可能性（部分集合の関係）を常にチェックしている。一方、2 つの型がプロパティも含めて全く同じかという等価性は、ほとんどチェックしない。そのため、型のテストは書きにくい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目55 型のテストを書く|項目55]]）。

なお、すべての集合が TypeScript の型に対応するわけではない。たとえば「すべての整数」や「`x` と `y` のプロパティだけを持つオブジェクト」を表す型はない。

### 用語の対応

| TypeScript の用語       | 集合論の用語           |
| ----------------------- | ---------------------- |
| `never`                 | 空集合                 |
| リテラル型              | 単一の要素からなる集合 |
| 値が `T` に代入可能     | 値 ∈ `T`               |
| `T1` が `T2` を拡張する | `T1` ⊆ `T2`            |
| `T1 \| T2`              | `T1` ∪ `T2`            |
| `T1 & T2`               | `T1` ∩ `T2`            |
| `unknown`               | 全体集合               |

## キーワード

- [[never-type|never 型]]
- [[unknown-type|unknown 型]]
- [[literal-type|リテラル型]]
- [[union-type|ユニオン型]]
- [[intersection-type|インターセクション型]]
- [[subtyping|サブタイプ]]
- [[structural-typing|構造的型付け]]
- [[excess-property-checking|余剰プロパティチェック]]
- [[generics|ジェネリクス]]

## 自分の理解

オブジェクトの和集合で、なぜ共通するプロパティにしかアクセスできないのかは、[この記事](https://zenn.dev/luvmini511/articles/008915362779e5#5.-オブジェクトの和集合)の説明が分かりやすい。

> 和集合ということは、共通部分と違って必ず両方の集合の部分集合である保証がありません。つまり、片方だけの部分集合である可能性が存在します。
