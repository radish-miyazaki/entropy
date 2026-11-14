---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目14 readonlyを使用して変更にまつわるエラーを避ける
description: 関数が引数を変更しないなら readonly や Readonly で型として示すよう勧め、その効果が浅くメソッドによる変更を防げない点にも注意を促す項目
tags: [book-chapter, typescript]
date: 2025-04-20
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 14
---

## TL;DR

- 関数が引数のオブジェクトを変更しないなら、その型を `Readonly` で包む。関数の契約が明確になり、不用意な変更を防げる。
- ただし `readonly` の効果は浅く、プロパティにしか効かない。メソッドによる変更は防げない。

## 内容

### readonly で変更を防ぐ

[[javascript|JavaScript]] のプリミティブはイミュータブルだが、配列やオブジェクトはミュータブルである。[[typescript|TypeScript]] では、プロパティに `readonly` 修飾子を付けると、そのプロパティの変更を型チェックで防げる。[`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype) [[utility-types|ユーティリティ型]]を使うと、すべてのプロパティに `readonly` を付けられる。

そのため、関数がオブジェクトを引数として受け取り、それを変更しないなら、その型を `Readonly` で包むとよい。関数の契約が明確になり、実装での不用意な変更を防げる。具体的には、引数が関数本体で変更されないことを TypeScript がチェックする。呼び出し元には関数が引数を変更しないことが伝わり、呼び出し元は `readonly` や `Readonly` のオブジェクトを関数に渡せるようになる。

### readonly は伝染する

ある関数の引数に `readonly` を付けると、その関数が呼び出す別の関数の引数も `readonly` にする必要が出てくる。これによって安全性はさらに上がる。しかし、ライブラリの関数のように型宣言を変えられない場合は、[[type-assertion|型アサーション]]を使うか、型宣言にパッチを当てる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目71 モジュールオーグメンテーションを使って型を改善する|項目71]]）必要がある。

### 注意点 1: 効果が浅い

`readonly` や `Readonly<T>` の効果は「浅い」。ネストしたオブジェクトのプロパティは変更できてしまう。

```ts
interface Outer {
  inner: { x: number }
}

const obj: Readonly<Outer> = { inner: { x: 0 } }
obj.inner = { x: 1 } // 型エラー
obj.inner.x = 1 // これは通る
```

効果を「深く」するには自分で型を定義する必要があるが、正しく実装するのは難しい。[ts-essentials](https://github.com/ts-essentials/ts-essentials) の `DeepReadonly` のようなライブラリを使うとよい。

```ts
import { DeepReadonly } from "ts-essentials"
type DeepReadonlyOuter = DeepReadonly<Outer>
```

### 注意点 2: プロパティにしか効かない

`readonly` はプロパティにしか影響せず、メソッドには影響しない。そのため、オブジェクトを変更するメソッドを呼べば変更できてしまう。

```ts
const date: Readonly<Date> = new Date()
date.setFullYear(2038)
```

一般に、あるクラスのミュータブル版とイミュータブル版は、別々のインタフェースとして定義する必要がある。たとえば `lib.es5.d.ts` には、[`Array<T>`](https://github.com/microsoft/TypeScript/blob/0a1aa6d6ebdfa16b82f4a6aaf282089b1d484e05/src/lib/es5.d.ts#L1304-L1486) と [`ReadonlyArray<T>`](https://github.com/microsoft/TypeScript/blob/0a1aa6d6ebdfa16b82f4a6aaf282089b1d484e05/src/lib/es5.d.ts#L1170-L1295) が別々に定義されている。この 2 つはよく使われるので、`T[]` と `readonly T[]` という専用の構文がある。

`T[]` は `readonly T[]` の変数に代入できるが、逆はできない（`T[]` は `readonly T[]` のサブタイプ）。もし逆ができたら、`readonly T[]` を変更できてしまう。

## キーワード

- [[utility-types|ユーティリティ型]]
- [[type-assertion|型アサーション]]
- [[subtyping|サブタイプ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
