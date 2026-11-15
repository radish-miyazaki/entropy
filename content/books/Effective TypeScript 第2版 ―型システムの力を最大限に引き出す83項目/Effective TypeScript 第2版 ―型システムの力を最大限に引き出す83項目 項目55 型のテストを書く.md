---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › 型のテストを書く
description: 型システムを使う方法と外部ツールを使う方法を比べながら、型のテストの書き方と注意点を説明する項目
tags: [book-chapter, typescript]
date: 2025-06-03
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 55
---

## TL;DR

- 型のテストには、型システムでテストする方法と、外部ツールでテストする方法がある。
- 型をテストするときは、等価性と代入可能性の違いに注意する。コールバックのパラメータや `this` の型もテストする。

## 内容

### なぜ型のテストが必要か

[[typescript|TypeScript]] は、他の言語に比べて型のテストの必要性が高い。理由は 2 つある。1 つは、型に膨大なロジックを持たせられることである。もう 1 つは、不健全な型が生まれやすいことである。

型をテストする方法は、大きく分けて 2 つある。型システムを使う方法と、外部ツールを使う方法である。[tsd](https://github.com/tsdjs/tsd) のように、両方を組み合わせたツールもある。

### 型システムを使ってテストする

1 つ目は [expect-type](https://github.com/mmkal/expect-type) を使う方法である。[[vitest|Vitest]] にも組み込まれており、自分のコードの型をテストするのに向いている。`any` や異なる関数型、`readonly` の有無といった違いも検出できる。

```ts
const anyVal: any = 1
expectTypeOf(anyVal).toEqualTypeOf<number>()
// エラー: Type 'number' does not satisfy the constraint 'never'.

const double = (x: number) => 2 * x
expectTypeOf(double).toEqualTypeOf<{ a: number; b: number }>()
// エラー: Type ... does not satisfy the constraint '"Expected: ..., Actual: function"'.

interface ABReadOnly {
  readonly a: string
  b: number
}
declare let ab: { a: string; b: number }
expectTypeOf(ab).toEqualTypeOf<ABReadOnly>()
// エラー: Arguments for the rest parameter 'MISMATCH' were not provided.
```

この方法は追加のツールを必要としない。型は構造的に比べられるので、`1 | 2` と `2 | 1` は同じ型として扱われる。言語サービスの機能が使えるので、型名を変えるとテストにも反映される。[[prettier|Prettier]] で通常のコードと同じように整形もされる。一方で、何がどこで一致しないかをエラーメッセージが教えてくれないので、分かりづらい。また、型がどう表示されるかはテストできない（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目56 型の表示に配慮する|項目56 型の表示に配慮する]]）。

2 つ目は [Type Challenges](https://github.com/type-challenges/type-challenges) のやり方である。これも自分のコードの型をテストするのに向いている。

```ts
export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

export type Expect<T extends true> = T

type Test1 = Expect<Equals<typeof double, (x: number) => number>>
type Test2 = Expect<Equals<typeof double, (x: string) => number>>
// 型エラー: Type 'false' does not satisfy the constraint 'true'.
```

expect-type より少し堅牢だが、やはりエラーメッセージは分かりづらい。また、TypeScript が型の等価性をどう判定するかは曖昧で、書き方の違いでエラーになったりならなかったりする。

```ts
type Test3 = Expect<Equals<1 | 2, 2 | 1>> // OK
type Test4 = Expect<Equals<[a: 1, b: 2], [1, 2]>> // OK
type Test5 = Expect<Equals<{ x: 1 } & { y: 2 }, { x: 1; y: 2 }>> // 型エラー
```

### 外部ツールを使ってテストする

[dtslint](https://github.com/microsoft/DefinitelyTyped-tools/tree/main/packages/dtslint) は、[[definitely-typed|DefinitelyTyped]] の型をテストするのに向いている。専用の形式のコメントでテストを書く。

```ts
const beatles = ["john", "paul", "george", "ringo"]
map(
  beatles,
  function (
    name, // $ExpectType string
    i, // $ExpectType number
    array, // $ExpectType string[]
  ) {
    this // $ExpectType string[]
    return name.length
  },
) // $ExpectType number[]
```

dtslint は、シンボルの型とコメントに書いた型を文字列として比べる。そのため、`number | string` と `string | number` は実質同じ型なのに、別の型と判定される。一方で、`string` と `any` を区別できる利点もある。

[eslint-plugin-expect-type](https://github.com/JoshuaKGoldberg/eslint-plugin-expect-type) は、自分のコードで型の表示もテストしたいときに向いている。dtslint と同じ `$ExpectType` コメントに加えて、[[twoslash|Twoslash]] 形式のコメントでも型を確かめられる。

```ts
const spiceGirls = ["scary", "sporty", "baby", "ginger", "posh"]
//    ^? const spiceGirls: string[]
```

外部ツールは型の表示に使われる文字列を 1 文字ずつ比べるので、書き手に型レベルのテクニックはいらない。エディタで型を調べるのと同じ感覚でテストでき、型がどう表示されるかもテストでき、自動修正もできる。その代わり、ツールのセットアップが必要で、`1 | 2` と `2 | 1` を区別するなどチェックが厳しすぎることがある。また、型がコメントの中にあるので、型の書式を変えたりリファクタリングしたりしたときに追従しづらい。

### 型をテストするときの注意

型をテストするときは、等価性と代入可能性の違いに注意する。特に関数型は、TypeScript が JavaScript の振る舞いをモデリングしているので、パラメータの数がより多い別の関数型に代入できる。

```ts
const add = (a: number, b: number) => a + b
assertType<(a: number, b: number) => number>(add) // OK

const double = (x: number) => 2 * x
assertType<(a: number, b: number) => number>(double) // これも OK になってしまう
```

コールバックを受け取る関数では、コールバックのパラメータの型もテストしたほうがよい。API の一部として `this` を提供しているなら、その型も忘れずにテストする。

```ts
declare function map<U, V>(array: U[], fn: (this: U[], u: U, i: number, array: U[]) => V): V[]

expectTypeOf<number[]>(
  map(beatles, function (name, i, array) {
    expectTypeOf(name).toEqualTypeOf<string>()
    expectTypeOf(i).toEqualTypeOf<number>()
    expectTypeOf(array).toEqualTypeOf<string[]>()
    expectTypeOf(this).toEqualTypeOf<string[]>()
    return name.length
  }),
).toEqualTypeOf<number[]>()
```

どのツールを使っても、型のテストを書くのが難しい場合もある。たとえば、任意の `string` を許しつつ、いくつかの値では補完が効くようにした `type Game = 'wordle' | 'crossword' | (string & {})` が期待どおりに動くかは確かめにくい。

## キーワード

- [[typescript|TypeScript]]
- [[vitest|Vitest]]
- [[twoslash|Twoslash]]
- [[definitely-typed|DefinitelyTyped]]
- [[prettier|Prettier]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
