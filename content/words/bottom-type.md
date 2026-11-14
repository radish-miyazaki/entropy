---
title: ボトム型
aliases: []
description: すべての型の部分型であり、値を 1 つも持たない型。TypeScript の never 型にあたる
tags: [word, 型システム]
date: 2026-11-14
---

## TL;DR

すべての型の部分型になる型。健全な型システムでは値を 1 つも持たず、空集合にあたる。[[typescript|TypeScript]] の `never`、[[rust|Rust]] の `!`、[[kotlin|Kotlin]] の `Nothing` がこれにあたる。

## なぜ必要か

「値が存在しえない」ことを型で表せる。戻り値の型がボトム型の関数は値を返せないので、例外を投げる関数や、プログラムを終了させる関数の戻り値の型に使う。逆に、すべての値を含む型はトップ型と呼ばれ、ボトム型と対になる。

## 仕組み

TypeScript のハンドブックによると、`never` は決して観測されない値を表す。戻り値の型が `never` なら、その関数は例外を投げるか、プログラムの実行を終える。また、ユニオン型の選択肢がすべて取り除かれたときにも `never` が現れる。

## 例

`typeof` で `string` と `number` を順に除くと、残りの分岐で `x` の型は `never` になる。

```ts
function fn(x: string | number) {
  if (typeof x === "string") {
    // ...
  } else if (typeof x === "number") {
    // ...
  } else {
    x // has type 'never'
  }
}
```

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目59 never型を使って網羅性チェックを行う|Effective TypeScript 項目59]] では、この性質を使って網羅性をチェックしている。すべての選択肢を処理した後の値を `never` 型の変数や引数に渡すと、選択肢を増やしたときに処理し忘れた分岐がコンパイルエラーになる。

## 注意点

Java の null 型はすべての参照型の部分型だが、`int` などのプリミティブ型の部分型ではないので、本当のボトム型ではない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]
- [[algebraic-data-type|代数的データ型]]

## 出典

- [Bottom type - Wikipedia](https://en.wikipedia.org/wiki/Bottom_type)
- [TypeScript: Documentation - More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目59 never型を使って網羅性チェックを行う|Effective TypeScript 第2版 項目59 never型を使って網羅性チェックを行う]]
