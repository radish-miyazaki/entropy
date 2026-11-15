---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › 不必要な型パラメーターを避ける
description: 型パラメータは複数の値の型を関連づけるためのものなので、シグネチャに 2 回以上登場しない型パラメータは取り除くべきだと説く項目
tags: [book-chapter, typescript]
date: 2025-06-03
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 51
---

## TL;DR

- 型パラメータは型を関連づけるためのものなので、シグネチャに 2 回以上登場させる。
- 1 回しか登場しない型パラメータは削除するか、`unknown` などに置き換える。

## 内容

### 型パラメータは 2 回以上登場させる

[TypeScript Handbook](https://microsoft.github.io/TypeScript-New-Handbook/everything/#guidelines-for-writing-good-generic-functions) には次のように書かれている。

> type parameters are for relating the types of multiple values. If a type parameter is only used once in the function signature, it's not relating anything.

型パラメータは型を関連づけるためのものなので、シグネチャに 2 回以上登場させる必要がある。`const identity = <T>(arg: T): T => arg` はその例である。

### 不必要な型パラメータの例

`const third = <A, B, C>(a: A, b: B, c: C): C => c` では、`A` と `B` が 1 回しか登場しない。型パラメータが `C` だけになるように書き直す。

`declare function parseYAML<T>(input: string): T` では、`T` が戻り値にしか登場しない。戻り値だけのジェネリクスは[[type-assertion|型アサーション]]と同じ効果で、危険である。`const w: Weight = parseYAML('')` の `Weight` を他のどんな型に置き換えても型エラーにならない。ジェネリクスをやめて戻り値を `unknown` にすると、利用者に `parseYAML('') as Weight` と明示的なアサーションを書かせられる。このように、不必要な型パラメータの多くは `unknown` で置き換えられる。

`const printProperty = <T, K extends keyof T>(obj: T, key: K) => { console.log(obj[key]) }` では、`K` が 1 回しか登場しない。パラメータの型を `keyof T` にすればよい。

```ts
const printProperty = <T>(obj: T, key: keyof T) => {
  console.log(obj[key])
}
```

クラスでも同じことが言える。

```ts
class Joiner<T extends string | number> {
  join(els: T[]) {
    return els.map((el) => String(el)).join(",")
  }
}
```

`T` は `join` でしか使われないので、まずメソッドに移せる。さらに `T` は 1 回しか登場しないので、`join(els: (string | number)[])` として削除できる。そもそも JavaScript ではラッパークラスは不要なので、`const join = (els: (string | number)[]) => { ... }` という単体の関数にすればよい。

`const getLength = <T extends Lengthy>(x: T) => x.length` も `T` が 1 回しか登場しない。`(x: Lengthy)`、`(x: { length: number })`、組み込み型の `ArrayLike` を使った `(x: ArrayLike<number>)` のいずれかに書き直せる。

### 型推論も考慮する

このルールは[[type-inference|型推論]]も考慮して当てはめる。次のコードでは `K` が 1 回しか登場しないが、戻り値の型が `T[K]` と推論されるので問題ない。

```ts
const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key]
}
```

例外もある。`declare function processUnrelatedTypes<A, B>(a: A, b: B): void` を `(a: unknown, b: unknown)` に直すと、修正前は互いに代入できなかった `a` と `b` が、修正後は代入できるようになる。これを避けるには、[[function-overloading|オーバーロード]]を使って呼び出し側と実装側で異なるシグネチャを作る（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目52 オーバーロードシグネチャより条件型を優先的に使用する|項目52 オーバーロードシグネチャより条件型を優先的に使用する]]）。ただしこのケースはまれなので、基本的にはこのルールに従う。

## キーワード

- [[typescript|TypeScript]]
- [[generics|ジェネリクス]]
- [[type-assertion|型アサーション]]
- [[type-inference|型推論]]
- [[function-overloading|オーバーロード]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
