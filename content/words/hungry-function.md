---
title: 空腹関数
aliases: [Hungry Function]
description: 自分自身を戻り値として返し、何度でも呼び出せる関数
tags: [word, typescript, fp]
date: 2025-06-13
---

## TL;DR

戻り値として自分自身を返す関数。自分を呼び出した結果ではなく、関数そのものを返す。その名のとおり、何度でも呼び出せる。

## 例

[[typescript|TypeScript]] では、型も再帰的に定義する。

```ts
type HungryFunc = (x: number) => HungryFunc
const hungryFunc = (x: number) => hungryFunc
```

`hungryFunc(0)(1)(2)` のように、続けていくらでも呼び出せる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[recursive-function|再帰関数]]
- [[higher-order-function|高階関数]]
