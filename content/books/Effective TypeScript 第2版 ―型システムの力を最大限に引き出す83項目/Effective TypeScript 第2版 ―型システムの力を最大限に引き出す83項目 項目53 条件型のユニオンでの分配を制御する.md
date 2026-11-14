---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目53 条件型のユニオンでの分配を制御する
description: 条件型がユニオン型に分配されるのは型パラメータがそのまま条件に使われたときだけであることを利用し、分配を有効・無効にする方法を示す項目
tags: [book-chapter, typescript]
date: 2025-04-12
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 53
---

## TL;DR

- [[conditional-types|条件型]]がユニオン型に分配されるのは、条件に型パラメータがそのまま使われている（`T extends ...`）場合だけである。
- 分配を無効にするには、条件を 1 要素のタプルで包む（`[T] extends [...]`）。

## 内容

### 分配が起きる理由

`(string | number) extends string` は `false` である。それでも次の `double` に `string | number` を渡すと、`string | number` が返る。

```ts
declare function double<T extends string | number>(x: T): T extends string ? string : number

double("a") // string を返す
double(1) // number を返す
double("a" as string | number) // string | number を返す
```

条件型が[[union-type|ユニオン型]]の各要素に「分配」されるので、`string | number` が返る。

```ts
(string | number) extends string ? string : number
-> (string extends string ? string : number | number extends string ? string : number)
-> string | number
```

訳者の解説によると、本書の中でも特に難しいトピックの 1 つである。この項目では、分配がどんな条件で起きるのか、それを利用して分配を有効・無効にする方法を示している。

### 分配を無効にする

条件型が分配されるのは、条件に型パラメータがそのまま使われている場合だけである。そのため、条件を 1 要素のタプルで包めば分配を無効にできる。

```ts
// 修正前
type Comparable<T> = T extends Date
  ? Date | number
  : T extends number
    ? number
    : T extends string
      ? string
      : never
declare function isLessThan<T>(a: T, b: Comparable<T>): boolean

isLessThan(Math.random() < 0.5 ? new Date() : "A", "B") // OK
```

```ts
// 修正後
type Comparable<T> = [T] extends [Date]
  ? Date | number
  : [T] extends [number]
    ? number
    : [T] extends [string]
      ? string
      : never

isLessThan(Math.random() < 0.5 ? new Date() : "A", "B") // 型エラー
```

### 分配させる

逆に分配させたいときは、条件が `T extends ...` の形になるようにする。

```ts
// 修正前
type NTuple<T, N extends number> = NTupleHelp<T, N, []>
type NTupleHelp<T, N extends number, Acc extends T[]> = Acc["length"] extends N
  ? Acc
  : NTupleHelp<T, N, [T, ...Acc]>

type PairOrTriple = NTuple<bigint, 2 | 3> // [bigint, bigint]
```

```ts
// 修正後
type NTuple<T, N extends number> = N extends number ? NTupleHelp<T, N, []> : never

type PairOrTriple = NTuple<bigint, 2 | 3> // [bigint, bigint] | [bigint, bigint, bigint]
```

### boolean と never に注意する

`boolean` は `true` と `false` のユニオン型なので、条件型に使うと分配が起きる。

```ts
type CelebrateIfTrue<V> = V extends true ? "Huzzah!" : never
type SurpriseParty = CelebrateIfTrue<boolean>
// = CelebrateIfTrue<true> | CelebrateIfTrue<false>
// = 'Huzzah!' | never
// = 'Huzzah!'
```

`never` は空のユニオンとして扱われる。条件型に使うと分配する対象がないので、`never` が返る。

```ts
type AllowIn<T> = T extends { password: "open-sesame" } ? "Yes" : "No"
type N = AllowIn<never> // never
```

どちらも、条件を 1 要素のタプルで包めば避けられる。ただし `never` はすべての型のサブタイプなので、包むだけだと `AllowIn<never>` が `'Yes'` になる。先に `never` かどうかを判定する一手間が必要である。

```ts
type CelebrateIfTrue<V> = [V] extends [true] ? "Huzzah!" : never

type AllowIn<T> = [T] extends [never]
  ? "No"
  : [T] extends [{ password: "open-sesame" }]
    ? "Yes"
    : "No"
```

## キーワード

- [[typescript|TypeScript]]
- [[conditional-types|条件型]]
- [[union-type|ユニオン型]]

## 自分の理解

条件型の分配は『プログラミング TypeScript』にも出てきたが、完全に忘れていた。
