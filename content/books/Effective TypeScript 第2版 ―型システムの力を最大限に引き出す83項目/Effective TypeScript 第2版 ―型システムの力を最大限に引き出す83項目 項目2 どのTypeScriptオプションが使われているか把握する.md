---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目2 どのTypeScriptオプションが使われているか把握する
description: 100 を超えるコンパイラオプションのうち、少なくとも noImplicitAny と strictNullChecks を理解し、できるだけ早く有効にするよう勧める項目
tags: [book-chapter, typescript]
date: 2025-04-15
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 2
---

## TL;DR

- [[typescript|TypeScript]] には [100 を超えるコンパイラオプション](https://www.typescriptlang.org/tsconfig/)があり、少なくとも `noImplicitAny` と `strictNullChecks` は把握しておく必要がある。
- どちらもプロジェクトが大きくなるほど有効にしにくくなるので、できるだけ早く有効にする。

## 内容

### noImplicitAny

[`noImplicitAny`](https://www.typescriptlang.org/tsconfig/#noImplicitAny) は、暗黙の `any` を許すかどうかを指定する。暗黙の `any` とは、`any` と書いていないのに、型が `any`（型が不明）と推論されることである。TypeScript は型情報があるときに最もよく機能するので、基本的には `true` にする。

`false` にしてよいのは、JavaScript から TypeScript へ移行している最中だけである。その場合も、できるだけ早く `true` にする。

### strictNullChecks

[`strictNullChecks`](https://www.typescriptlang.org/tsconfig/#strictNullChecks) は、`null` と `undefined` をすべての型の値として許すかどうかを指定する。有効にすると、`undefined is not an object` のような `null` や `undefined` が絡むエラーを捕捉しやすくなる。

一方で、TypeScript を書く難しさも上がる。そのため、TypeScript の初学者がいるチームでは `false` にする選択もある（優先度は `noImplicitAny` のほうが高い）。ただし、プロジェクトが大きくなるほど有効にしにくくなるので、できるだけ早く有効にしたほうがよい。

### strict とそれより厳しいオプション

[`strict`](https://www.typescriptlang.org/tsconfig/#strict) を `true` にすると、上の 2 つを含む次のオプションをまとめて有効にできる。`tsc --init` で生成した設定では、`strict: true` になっている。

- [`alwaysStrict`](https://www.typescriptlang.org/tsconfig/#alwaysStrict)
- [`strictBindCallApply`](https://www.typescriptlang.org/tsconfig/#strictBindCallApply)
- [`strictBuiltinIteratorReturn`](https://www.typescriptlang.org/tsconfig/#strictBuiltinIteratorReturn)
- [`strictFunctionTypes`](https://www.typescriptlang.org/tsconfig/#strictFunctionTypes)
- [`strictPropertyInitialization`](https://www.typescriptlang.org/tsconfig/#strictPropertyInitialization)
- [`noImplicitThis`](https://www.typescriptlang.org/tsconfig/#noImplicitThis)
- [`useUnknownInCatchVariables`](https://www.typescriptlang.org/tsconfig/#useUnknownInCatchVariables)

`strict` より厳しいオプションもある。たとえば [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) を有効にすると、[[index-signature|インデックスシグネチャ]]のプロパティや配列の要素を参照するときに、`undefined` のチェックが必須になる。次のコードはエラーになる。

```ts
const tenses = ["past", "present", "future"]
tenses[3].toUpperCase() // エラー
```

ただし、範囲内の有効なアクセスにもチェックが必要になるので、`tenses[0].toUpperCase()` もエラーになる。

## キーワード

- tsconfig.json
- [[any-type|any 型]]
- [[index-signature|インデックスシグネチャ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
