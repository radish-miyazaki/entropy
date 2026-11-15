---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › 数値型のインデックスシグネチャを避ける
description: JavaScript のオブジェクトのキーは文字列かシンボルなので、数値のインデックスシグネチャは避け、Array、タプル型、ArrayLike、Iterable を使うよう勧める項目
tags: [book-chapter, typescript]
date: 2025-04-21
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 17
---

## TL;DR

- [[javascript|JavaScript]] のオブジェクトのキーは文字列かシンボルであり、配列のインデックスも実際には文字列である。
- 数値の[[index-signature|インデックスシグネチャ]]は誤解を招くので避け、`Array`、タプル型、`ArrayLike`、`Iterable` を使う。

## 内容

### JavaScript のキーは文字列

JavaScript のオブジェクトのキーは、文字列かシンボルである。他の言語にあるような「ハッシュ可能（hashable）」という概念はない。文字列やシンボル以外の値をキーにしようとすると、`toString` メソッドが呼ばれて文字列に変換される。

配列もオブジェクトなので、インデックスは文字列に変換されている。そのため、文字列でも要素にアクセスできる。

```js
x = [1, 2, 3]
x["1"] // 2
Object.keys(x) // ['0', '1', '2']
```

### TypeScript でのモデリング

[[typescript|TypeScript]] は、数値のキーを許し、文字列のキーと区別することで、これをモデリングしている。[`es5.d.ts`](https://github.com/microsoft/TypeScript/blob/0a1aa6d6ebdfa16b82f4a6aaf282089b1d484e05/src/lib/es5.d.ts#L1485) では、`Array` は次のように定義されている。

```ts
interface Array<T> {
  // ...
  [n: number]: T
}
```

そのため、配列を文字列でインデックスすると型エラーになる。ただし、`'1'` のような数値の文字列は暗黙に数値として扱われるので、`xs['1']` はエラーにならない。

```ts
const xs = [1, 2, 3]
const inputEl = document.getElementsByTagName("input")[0]

xs[1] // OK
const xN = xs[inputEl.value] // inputEl.value は string なので型エラー
```

しかし、実体は依然として文字列である（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目3 コード生成は型に依存しないことを理解する|項目3]]）。`Object.keys(xs)` は `['0', '1', '2']` を返す。

### 数値のインデックスシグネチャの代わり

以上から、数値のキーが存在するという誤解を読み手に与えかねないので、インデックスシグネチャに `number` を使うのは避けるべきである。数値でインデックスしたいときは、代わりに `Array<T>`、タプル型、`ArrayLike<T>`、`Iterable<T>` を使う。

`push` や `concat` のような破壊的な操作が不要なら、[`ArrayLike<T>`](https://github.com/microsoft/TypeScript/blob/62b172b515452b3fe19f4f2da81d4869caedc904/src/lib/es5.d.ts#L1552-L1555) を使う。`ArrayLike<T>` は、`length` と数値のインデックスシグネチャだけを持つ型である。

```ts
function checkedAccess<T>(xs: ArrayLike<T>, i: number): T {
  if (i >= 0 && i < xs.length) return xs[i]

  throw new Error(`Attempt to access ${i} which is past end of array.`)
}
```

単に反復処理ができればよいなら、[`Iterable<T>`](https://github.com/microsoft/TypeScript/blob/62b172b515452b3fe19f4f2da81d4869caedc904/src/lib/es2015.iterable.d.ts#L30-L32) を使う。関数の引数をこの型にすれば、ジェネレータも渡せるようになる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目30 入力には寛容に、出力には厳格に|項目30]]）。

```ts
function sum(xs: Iterable<number>): number {
  let sum = 0
  for (const x of xs) {
    sum += x
  }
  return sum
}
```

## キーワード

- [[index-signature|インデックスシグネチャ]]
- [[javascript|JavaScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
