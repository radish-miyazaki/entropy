---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目12 可能なら関数式全体に型を適用する
description: 関数式を使って関数全体に関数型を適用すると、繰り返しが減り、型と実装を分けられ、他の関数のシグネチャにも合わせられると説く項目
tags: [book-chapter, typescript]
date: 2025-04-19
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 12
---

## TL;DR

- 関数式を使うと、関数全体に関数型を適用できる。
- 関数型を使うと繰り返しが減り、型と実装を分けられ、`typeof fetch` のように他の関数のシグネチャにも合わせられる。

## 内容

### 関数文と関数式

関数は、関数文でも関数式でも定義できる。

```ts
function rollDice(sides: number): number { ... } // 関数文
const rollDice = function (sides: number): number { ... }; // 関数式
const rollDice = (sides: number): number => { ... }; // 関数式
```

関数式を使うと、関数全体に対して型宣言（関数型）を適用できる。

```ts
type DiceRollFn = (sides: number) => number;
const rollDice: DiceRollFn = (sides) => { ... };
```

### 関数型を使う利点

1 つ目の利点は、繰り返しを減らせることである（[[dry|DRY]]）。ライブラリを提供するなら、よく使うコールバックの型宣言を提供するとよい。

2 つ目は、型と関数の実装を切り離すことで、ロジックを明確にできることである。

3 つ目は、他の関数のシグネチャに合わせられることである。たとえば、レスポンスのステータスをチェックする `fetch` を作るとする。シグネチャは次のように書けるが、

```ts
async function checkedFetch(input: RequestInfo, init?: RequestInit) { ... }
```

関数型を適用すると、より簡潔に書ける。

```ts
const checkedFetch: typeof fetch = async (input, init) => { ... };
```

戻り値の型だけを変えたいときは、レストパラメータと [`Parameters`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype) [[utility-types|ユーティリティ型]]を使えばよい。ただし、この書き方は関数型を適用するより面倒である。個々の引数の型を書き出すのとどちらがよいかは、状況に応じて判断する。

```ts
async function fetchANumber(
  ...args: Parameters<typeof fetch>
): Promise<number> {
  ...
}
```

### 関数型とコールバック

`Array` の `map` や `filter` のようにコールバックを受け取る関数を使うと、[[typescript|TypeScript]] はコールバックの引数の型を推論する。そして、推論した型をコールバックとして渡した関数式に適用する。

## キーワード

- [[dry|DRY]]
- [[utility-types|ユーティリティ型]]
- [[type-inference|型推論]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
