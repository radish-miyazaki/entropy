---
title: ジェネレータ
aliases: []
description: 実行を途中で止めて値を 1 つずつ返し、次に呼ばれたときに続きから再開する関数と、その関数が返すオブジェクト
tags: [word, javascript]
date: 2026-11-14
---

## TL;DR

実行を `yield` で途中で止めて値を 1 つずつ返し、次に呼ばれたときに続きから再開する関数（ジェネレータ関数）と、その関数が返すオブジェクト。JavaScript では `function*` で定義し、返る `Generator` オブジェクトは反復可能プロトコルとイテレータプロトコルの両方に準拠する。

## なぜ必要か

ジェネレータ関数の値は、必要になるまで評価されないので、無限に続くデータ列のような、すべてを先に作れないデータ構造も定義できる。反復可能なので、`for...of` などで配列と同じように扱える。

## 仕組み

ジェネレータ関数を呼ぶと、本体はすぐには実行されず、`Generator` オブジェクトが返る。`next()` を呼ぶたびに次の `yield` まで実行が進み、その値を返す。`return()` は止まっている位置に `return` 文があるかのように振る舞ってジェネレータを終わらせ、`throw()` は同じ位置で例外を投げる。

## 例

```js
function* infinite() {
  let index = 0
  while (true) {
    yield index++
  }
}

const gen = infinite()
console.log(gen.next().value) // 0
console.log(gen.next().value) // 1
```

[[effect-gen|Effect.gen]] は、ジェネレータ関数を使って `async` / `await` に近い書き方で Effect を組み立てる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-gen|Effect.gen]]
- [[typescript|TypeScript]]

## 出典

- [Generator - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Generator)
