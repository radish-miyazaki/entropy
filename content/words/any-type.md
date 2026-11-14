---
title: any 型
aliases: [any]
description: TypeScript で、型チェックを無効にしたい値に使う特別な型
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

[[typescript|TypeScript]] の特別な型で、ある値で型チェックのエラーを出したくないときに使う。`any` 型の値には、ほぼ何でもできる。

## なぜ必要か

TypeScript の公式ハンドブックによると、ある行のコードが正しいことを TypeScript に納得させるためだけに、長い型を書きたくないときに便利である。

## 仕組み

`any` 型の値には、任意のプロパティにアクセスでき（その結果も `any` になる）、関数として呼び出せ、どんな型の値とも相互に代入できる。構文として正しいことなら、ほぼ何でもコンパイルエラーにならない。

型を書かず、文脈からも推論できないとき、コンパイラは多くの場合 `any` を割り当てる。これを暗黙の `any` と呼ぶ。コンパイラオプションの `noImplicitAny` を有効にすると、暗黙の `any` をエラーにできる。

## 例

```ts
let obj: any = { x: 0 }
// どの行もコンパイルエラーにならない
obj.foo()
obj()
obj.bar = 100
obj = "hello"
const n: number = obj
```

## 注意点

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目5 any型の使用を制限する|Effective TypeScript 項目5]] によると、`any` を使うと、型安全性、関数の契約、エディタの補完やリネームなどの支援を失い、リファクタリングによるバグも見つけにくくなる。型設計も隠してしまうので、できるだけ使わない。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目2 どのTypeScriptオプションが使われているか把握する|項目2]] では、`noImplicitAny` をできるだけ早く有効にするよう勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]

## 出典

- [Everyday Types - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目5 any型の使用を制限する|Effective TypeScript 第2版 項目5 any型の使用を制限する]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目2 どのTypeScriptオプションが使われているか把握する|Effective TypeScript 第2版 項目2 どのTypeScriptオプションが使われているか把握する]]
