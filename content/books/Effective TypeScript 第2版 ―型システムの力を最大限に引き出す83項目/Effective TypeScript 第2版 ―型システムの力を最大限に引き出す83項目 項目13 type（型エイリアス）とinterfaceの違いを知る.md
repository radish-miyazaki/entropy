---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目13 type（型エイリアス）とinterfaceの違いを知る
description: type と interface の共通点と違いを整理し、スタイルが決まっていないプロジェクトではオブジェクト型に interface を使うよう勧める項目
tags: [book-chapter, typescript]
date: 2025-04-19
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 13
---

## TL;DR

- `type` と `interface` の共通点と違いを理解する。`interface` には[[declaration-merging|宣言のマージ]]があり、`type` には型のインライン化がある。
- オブジェクトの型には、確立したスタイルがあればそれに従い、なければ `interface` を優先して使う。

## 内容

### 共通点

`type` と `interface` は、多くのことを同じようにできる。値を初期化するときに余分なプロパティを付けると、どちらでも全く同じエラーが起きる。どちらでも[[generics|ジェネリクス]]を使え、再帰的な型も書ける（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目57 再帰的なジェネリック型は末尾再帰にする|項目57]]）。[[index-signature|インデックスシグネチャ]]も使える。

```ts
type TDict = { [key: string]: string }
interface IDict {
  [key: string]: string
}
```

関数型も定義できる。JavaScript の関数は呼び出し可能なオブジェクトなので、`interface` でも、`type` のオブジェクト型の書き方でも関数型を表せる。

```ts
type TFn = (x: number) => string
interface IFn {
  (x: number): string
}
type TFnAlt = { (x: number): string }
```

どちらもクラスで `implements` できる。

### 違い

`interface` では[[union-type|ユニオン型]]を表現できない。一般に `type` のほうが高機能で、ユニオン型のほかに[[mapped-type|マップ型]]や[[conditional-type|条件型]]も使える。`type` は `interface` を拡張できるが、`interface` が拡張できるのは `interface` としても定義できるオブジェクト型だけである。そのため、ユニオン型は `interface` で拡張できない。

`interface` の拡張は、`type` の拡張より少し厳格である。次の例で、`type` の交差型はエラーにならないが、使い物にならない型になる。一方、`interface` の `extends` はエラーになる。

```ts
interface Person {
  name: string
  age: string
}

// エラーにはならないが使えない
type TPerson = Person & { age: number }

// Interface 'IPerson' incorrectly extends interface 'Person'.
// Types of property 'age' are incompatible.
//   Type 'number' is not assignable to type 'string'.
interface IPerson extends Person {
  age: number
}
```

元の型と互換性があれば、サブタイプでプロパティの型を変えても問題ない（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目7 型を値の集合として考える|項目7]]）。ただし、インデックスシグネチャの場合は注意が必要である（[microsoft/TypeScript#15300](https://github.com/microsoft/TypeScript/issues/15300)）。

`type` は、タプルや配列の型を自然に表現できる。

```ts
type Pair = [a: number, b: number]
type StringList = string[]
type NamedNums = [string, ...number[]]
```

同じモジュールにある同名の `interface` は、宣言のマージによって 1 つにまとめられる。これは主に型宣言ファイルで使われる。

```ts
interface IState {
  name: string
  capital: string
}
interface IState {
  population: number
}
const wyoming: IState = { name: "Wyoming", capital: "Cheyenne", population: 578_000 } // OK
```

### インライン化

`interface` は常に名前で参照されるが、型エイリアスはその定義に置き換えられる（インライン化される）ことがある。TypeScript は[[structural-typing|構造的型付け]]なので、代入可能性には影響しない。しかし、エラーメッセージや型の表示、`.d.ts` ファイルには影響する。

```ts
export function getHummer() {
  type Hummingbird = { name: string; weightGrams: number }
  const ruby: Hummingbird = { name: "Ruby-throated", weightGrams: 1.4 }
  return ruby
}
```

`tsconfig.json` で `declaration: true` にすると、次の `.d.ts` ファイルが生成される。型エイリアスを定義した関数本体は型宣言ファイルに残らないので、TypeScript は型エイリアスをインライン化している。

```ts
export declare function getHummer(): {
  name: string
  weightGrams: number
}
```

ここで `type` の代わりに `interface` を使うと、`Return type of exported function has or is using private name 'Hummingbird'.` というエラーになる。`Hummingbird` を名前で参照しようとするが、型宣言ファイルではその名前を使えないからである。また、インライン化によって型が極端に重複し、コンパイラのパフォーマンスに影響することもある（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目78 コンパイラーのパフォーマンスに注意を払う|項目78]]）。

### どちらを使うか

ユニオン型などの複雑な型には、`type` しか選択肢がない。関数型、タプル型、配列型は、`type` のほうが簡潔に書ける。

オブジェクト型は、スタイルが確立しているならそれに従う。新しいプロジェクトなどスタイルが確立していないなら、`interface` を優先して使う。型名がエラーメッセージや型の表示で一貫して使われることと、正しく拡張しているかを厳格にチェックできることが理由である。

[The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) にも次のように書かれている。

> For the most part, you can choose based on personal preference, and TypeScript will tell you if it needs something to be the other kind of declaration. If you would like a heuristic, use interface until you need to use features from type.

[[typescript-eslint|typescript-eslint]] の [consistent-type-definitions](https://typescript-eslint.io/rules/consistent-type-definitions/) ルールを使うと、`type` と `interface` のどちらかに統一できる。デフォルトでは `interface` を優先する。

## キーワード

- [[declaration-merging|宣言のマージ]]
- [[union-type|ユニオン型]]
- [[mapped-type|マップ型]]
- [[conditional-type|条件型]]
- [[generics|ジェネリクス]]
- [[index-signature|インデックスシグネチャ]]
- [[structural-typing|構造的型付け]]
- [[typescript-eslint|typescript-eslint]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
