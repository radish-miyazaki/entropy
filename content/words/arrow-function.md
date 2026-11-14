---
title: アロー関数
aliases: []
description: JavaScript の、従来の関数式を短く書ける式。自分の this を持たず、外側の this を使う
tags: [word, javascript]
date: 2026-11-14
---

## TL;DR

JavaScript で、従来の関数式の代わりに `(a, b) => a + b` のように短く書ける関数の式。従来の関数式とは意味に違いがあり、使い方にも意図的な制限がある。自分の `this` を持たず、それを囲むスコープの `this` を使う。

## なぜ必要か

[[javascript-this|JavaScript の this]] は、関数の呼ばれ方によって値が変わる。ES2015 で導入されたアロー関数は、自分では `this` を結び付けず、それを囲む構文上のコンテキストの `this` を保持する。コールバックの中で外側の `this` を使いたいときに、`bind` で固定する必要がなくなる。

## 仕組み

本体が式 1 つなら、その値がそのまま戻り値になる。`{ }` のブロックで書いたときは、`return` が必要である。引数が 1 つだけなら、括弧を省ける。

## 例

```js
const add = (a, b) => a + b
const add2 = (a, b) => {
  console.log(a, b)
  return a + b
}

const obj = {
  count: 10,
  doSomethingLater() {
    setTimeout(() => {
      this.count++ // this は外側のメソッドの this（obj）
    }, 300)
  },
}
```

## 注意点

- 式の本体でオブジェクトリテラルを返すときは、`() => ({ foo: 1 })` のように括弧で囲む。括弧がないと `{ }` がブロックとして解釈される。
- `this`、`arguments`、`super` を持たないので、メソッドには向かない。`arguments` の代わりには残余引数を使う。
- コンストラクタとして `new` で呼べず、`yield` も使えない。
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目69 コールバックのthisがAPIの一部なら、それに型を与える|Effective TypeScript 項目69]] によると、ES2022 以降はクラスフィールドにアロー関数を使えば、その中の `this` は正しくインスタンスを指す。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[javascript-this|JavaScript の this]]
- [[anonymous-function|無名関数]]

## 出典

- [Arrow function expressions - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [[javascript-this|JavaScript の this]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目69 コールバックのthisがAPIの一部なら、それに型を与える|Effective TypeScript 第2版 項目69]]
