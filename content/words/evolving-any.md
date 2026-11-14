---
title: 進化する型
aliases: []
description: TypeScript で、型注釈なしに null や undefined、空配列で初期化した変数の型が、代入に応じて変化する仕組み
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

[[typescript|TypeScript]] で、型アノテーションなしに `null` や `undefined`、空配列で初期化した変数の型が、その後の代入に応じて変化する仕組み。英語では evolving any と呼ばれる。

## なぜ必要か

TypeScript 2.1 のリリースノートによると、以前の TypeScript は、変数の型が分からないと `any` を選んでいた。その結果、その変数の型チェックが効かなくなっていた。2.1 からは、後で代入される値から型を推論するようになり、`noImplicitAny` を有効にしたときの暗黙の any のエラーも大きく減った。

## 仕組み

この推論は、`noImplicitAny` を有効にしたときだけ働く。型アノテーションなしで宣言した変数は暗黙の `any` になるが、制御フロー解析によって、各時点の型はそこまでに代入された値の型になる。空配列で初期化した変数は暗黙の `any[]` になり、`push`、`unshift`、添字への代入のたびに要素の型が進化する。

## 例

```ts
function range(start: number, limit: number) {
  const nums = []
  //    ^? const nums: any[]
  for (let i = start; i < limit; i++) {
    nums.push(i)
  }
  return nums
  //     ^? const nums: number[]
}
```

## 注意点

進化する型が分かるのは、コードを上から順にたどれる範囲だけである。クロージャの中のように、いつ実行されるか分からない場所で変数を読むと、暗黙の any のエラーになる。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目25 進化する型を理解する|Effective TypeScript]] によると、関数呼び出しを通じては進化しない。

同書の訳者は、型チェッカが部分的に働かず予期しない値が入るおそれがあるとして、このパターンを推奨していない。明示的に型アノテーションを付けたほうが、意図しないエラーを検出できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]
- [[excess-property-checking|余剰プロパティチェック]]

## 出典

- [TypeScript 2.1 - TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目25 進化する型を理解する]]
