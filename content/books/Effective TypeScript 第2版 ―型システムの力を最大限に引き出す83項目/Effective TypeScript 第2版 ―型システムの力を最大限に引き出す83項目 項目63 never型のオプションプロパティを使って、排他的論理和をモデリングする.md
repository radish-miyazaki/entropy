---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › never型のオプションプロパティを使って、排他的論理和をモデリングする
description: 型の | は包含的論理和なので、排他的論理和は never 型のオプションプロパティかタグ付きユニオンでモデリングする項目
tags: [book-chapter, typescript]
date: 2025-04-24
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 63
---

## TL;DR

- 型空間の `|` は包含的論理和なので、`A | B` は「A か B、またはその両方」を意味する。
- 排他的論理和は、`never` 型のオプションプロパティか[[discriminated-union|タグ付きユニオン]]でモデリングできる。

## 内容

### 型空間の | は包含的論理和

型空間での `|` は包含的論理和であり、値空間での `||` と同じである。したがって、[[typescript|TypeScript]] は[[structural-typing|構造的型付け]]を採用しているので（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目4 構造的型付けに慣れる|項目4 構造的型付けに慣れる]]）、`A | B` は A か B、またはその両方を意味する。ただし、[[excess-property-checking|余剰プロパティチェック]]による制限は受ける（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目11 余剰プロパティチェックと型チェックを区別する|項目11 余剰プロパティチェックと型チェックを区別する]]）。

```ts
interface ThingOne {
  shirtColor: string
}
interface ThingTwo {
  hairColor: string
}
type Thing = ThingOne | ThingTwo

const bothThings = { shirtColor: "red", hairColor: "blue" }
const thing1: ThingOne = bothThings // OK
const thing2: ThingTwo = bothThings // OK
```

### never 型のオプションプロパティで排他的論理和を表す

排他的論理和（A か B のどちらか一方）は、`never` 型のオプションプロパティでモデリングできる。`never` 型には代入できる値がないので、そのプロパティは持てなくなる。

```ts
interface OnlyThingOne {
  shirtColor: string
  hairColor?: never
}
interface OnlyThingTwo {
  hairColor: string
  shirtColor?: never
}
type ExclusiveThing = OnlyThingOne | OnlyThingTwo

// 以下はすべて型エラー
const thing1: OnlyThingOne = bothThings
const thing2: OnlyThingTwo = bothThings
const allThings: ExclusiveThing = { shirtColor: "red", hairColor: "blue" }
```

次のような汎用的な型を定義すれば、毎回 `never` を書かずに済む。この方法は、タグを追加できない場合に役立つ。

```ts
type XOR<T1, T2> =
  | (T1 & { [k in Exclude<keyof T2, keyof T1>]?: never })
  | (T2 & { [k in Exclude<keyof T1, keyof T2>]?: never })

type ExclusiveThing = XOR<ThingOne, ThingTwo>
```

### タグ付きユニオンで排他的論理和を表す

文字列が `'one'` と `'two'` の両方になることはないので、タグ付きユニオンでも排他的論理和を実現できる。タグを追加できる場合は、こちらが一般的である。

```ts
interface ThingOneTag {
  type: "one"
  shirtColor: string
}
interface ThingTwoTag {
  type: "two"
  hairColor: string
}
type Thing = ThingOneTag | ThingTwoTag
```

## キーワード

- [[discriminated-union|タグ付きユニオン]]
- [[structural-typing|構造的型付け]]
- [[excess-property-checking|余剰プロパティチェック]]
- [[bottom-type|ボトム型]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
