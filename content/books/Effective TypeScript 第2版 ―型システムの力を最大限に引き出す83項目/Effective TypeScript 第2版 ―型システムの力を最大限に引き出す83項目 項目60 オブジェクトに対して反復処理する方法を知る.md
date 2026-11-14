---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目60 オブジェクトに対して反復処理する方法を知る
description: オブジェクトの反復処理でキーが string と推論される理由と、Object.entries やキーの列挙、Map を使った回避策を説明する項目
tags: [book-chapter, typescript]
date: 2025-05-05
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 60
---

## TL;DR

- オブジェクトを反復処理すると、型を指定していてもキーの型が `string` と推論されることが多い。
- キーと値の両方を反復処理するなら `Object.entries` を使う。キーの型を絞りたいなら、キーを明示的に列挙するか `Map` を使う。

## 内容

### キーが string と推論される理由

オブジェクトを反復処理すると、型を指定していてもキーの型が `string` と推論されることがよくある。主な理由は 2 つある。

1 つ目は、関数のパラメータとして受け取るオブジェクトが、型にないキーを含んでいる可能性があるからである。これは TypeScript が[[structural-typing|構造的型付け]]を採用しているためである。

```ts
const foo = (abc: ABC) => {
  for (const k in abc) {
    const v = abc[k]
    //        ~~~~~~ Element implicitly has an 'any' type because ...
  }
  // k の型は string
}

const x = { a: "1", b: "2", c: 3, d: new Date() }
foo(x) // OK
```

2 つ目は、[[prototype-pollution|プロトタイプ汚染]]の可能性があるからである。`Object.prototype` に定義したプロパティは、他のすべてのオブジェクトに継承される。継承したプロパティは `for-in` ループで列挙されるので、TypeScript は安全側に倒してキーの型を `string` と推論する。

### Object.entries を使う

`Object.entries` は継承したプロパティを含まない。そのため、キーと値の両方を反復処理するなら `Object.entries` を使うのがよい。

```ts
const foo = (abc: ABC) => {
  for (const [k, v] of Object.entries(abc)) {
    //          ^? const k: string
    console.log(v)
    //          ^? const v: any
  }
}
```

ただし、キーの型は `string`、値の型は `any` になるので扱いづらい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目30 入力には寛容に、出力には厳格に|項目30 入力には寛容に、出力には厳格に]]）。

### その他の回避策

オブジェクトがイミュータブルだと分かっているなら、`for-in` ループの中でキーの型を指定する。ミュータブルな場合は、実行時のキーと値が型と食い違うことがあり、混乱のもとになるので避ける（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目9 型アノテーションを型アサーションより優先的に使用する|項目9 型アノテーションを型アサーションより優先的に使用する]]）。

```ts
for (const kStr in abc) {
  let k = kStr as keyof ABC
  //  ^? let k: keyof ABC (= 'a' | 'b' | 'c')
  const v = abc[k]
  //    ^? const v: string | number
}
```

必要なキーを明示的に列挙する方法もある。

```ts
const keys = ["a", "b", "c"] as const
for (const k of keys) {
  //       ^? const k: 'a' | 'b' | 'c'
  const v = abc[k]
  //    ^? const v: string | number
}
```

オブジェクトの代わりに `Map` を使う方法もある（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目16 インデックスシグネチャよりも適切な代替手段を使う|項目16 インデックスシグネチャよりも適切な代替手段を使う]]）。

```ts
const m = new Map([
  ["one", "uno"],
  ["two", "dos"],
  ["three", "tres"],
])
//    ^? const m: Map<string, string>

for (const [k, v] of m.entries()) {
  // k: string, v: string
  console.log(v)
}
```

## キーワード

- [[structural-typing|構造的型付け]]
- [[prototype-pollution|プロトタイプ汚染]]
- [[type-assertion|型アサーション]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
