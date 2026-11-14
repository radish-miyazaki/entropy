---
title: オーバーロード
aliases: []
description: 同じ名前の関数を、異なる引数の型や数で呼び出せるようにする仕組み
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

同じ名前の関数を、異なる引数の型や数で呼び出せるようにする仕組み。[[typescript|TypeScript]] では、複数のオーバーロードシグネチャを書き、その後に関数の本体を書く。

## 仕組み

TypeScript Handbook によると、オーバーロードした関数は、通常 2 つ以上のオーバーロードシグネチャと、1 つの実装シグネチャからなる。実装シグネチャは外からは見えず、呼び出し側が使えるのはオーバーロードシグネチャだけである。実装シグネチャは、すべてのオーバーロードと互換でなければならない。

## 例

```ts
function makeDate(timestamp: number): Date
function makeDate(m: number, d: number, y: number): Date
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d)
  } else {
    return new Date(mOrTimestamp)
  }
}

makeDate(12345678) // OK
makeDate(5, 5, 5) // OK
makeDate(1, 3) // Error: No overload expects 2 arguments...
```

## 注意点

オーバーロードは、ユニオン型の引数をどのシグネチャにも当てはめられない。TypeScript Handbook は、できるだけオーバーロードより、ユニオン型の引数を使うよう勧めている。

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目52 オーバーロードシグネチャより条件型を優先的に使用する|Effective TypeScript]] では、戻り値の型が引数の型によって変わる場合も、オーバーロードより条件型を優先するとしている。条件型はユニオン型に分配されるので、ユニオン型の引数も扱える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]
- [[generics|ジェネリクス]]

## 出典

- [More on Functions - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目52 オーバーロードシグネチャより条件型を優先的に使用する]]
