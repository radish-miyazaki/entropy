---
title: リテラル型
aliases: []
description: TypeScript で、string や number ではなく特定の値そのものを表す型
tags: [word, typescript, 型]
date: 2026-11-14
---

## TL;DR

[[typescript|TypeScript]] で、`string` や `number` のような一般的な型ではなく、`"left"` や `0` のような特定の値そのものを表す型。

## なぜ必要か

値を 1 つしか持てない変数はあまり役に立たないので、リテラル型は単体ではほとんど使わない。複数のリテラル型をユニオン型にまとめると、関数が受け取れる値を決まった集合に絞れる。

## 仕組み

`let` で宣言した変数は後で変わりうるので、TypeScript は `string` と推論する。`const` で宣言した変数は値が変わらないので、リテラル型と推論する。`boolean` も、`true | false` というユニオン型の別名である。

## 例

```ts
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}

printText("Hello, world", "left")
printText("G'day, mate", "centre") // エラー
```

## 注意点

オブジェクトで初期化すると、プロパティは後で変わりうるとみなされ、`"GET"` ではなく `string` と推論される。リテラル型が必要なら、型アサーションか `as const` を使う。

```ts
const req = { url: "https://example.com", method: "GET" } as const
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]

## 出典

- [Everyday Types - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
