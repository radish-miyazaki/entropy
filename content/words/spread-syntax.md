---
title: スプレッド構文
aliases: []
description: 配列などの反復可能オブジェクトやオブジェクトのプロパティを、その場に展開する JavaScript の構文
tags: [word, javascript]
date: 2026-11-14
---

## TL;DR

`...` で、配列などの反復可能オブジェクトを関数の引数や配列の要素として展開したり、オブジェクトのプロパティを別のオブジェクトリテラルに展開したりする [[javascript|JavaScript]] の構文。

## 仕組み

[MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax) によると、使える場所は関数呼び出しの引数リスト、配列リテラル、オブジェクトリテラルの 3 つである。関数呼び出しと配列リテラルでは反復可能な値だけを展開でき、オブジェクトリテラルでは値自身の列挙可能なプロパティを列挙する。同じ名前のプロパティは、後から指定したものが優先される。

見た目は残余構文と同じだが、役割は逆である。スプレッド構文は配列などを個々の要素に展開し、残余構文は複数の要素を集めて 1 つにまとめる。

## 例

```js
const parts = ["shoulders", "knees"]
const lyrics = ["head", ...parts, "and", "toes"]

const obj1 = { foo: "bar", x: 42 }
const obj2 = { foo: "baz", y: 13 }
const merged = { x: 41, ...obj1, ...obj2, y: 9 } // { x: 42, foo: "baz", y: 9 }
```

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目21 オブジェクトを一度に構築する|Effective TypeScript 項目21]] では、オブジェクトにプロパティを追加するとき、スプレッド構文を使えば型安全に追加できるとしている。

## 注意点

スプレッド構文によるコピーは 1 段階だけの浅いコピーなので、多次元配列やネストしたオブジェクトのコピーでは、内側の値が共有される。また、`Object.assign()` と違い、セッターを呼び出さない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[destructuring|分割代入]]
- [[javascript|JavaScript]]
- [[typescript|TypeScript]]

## 出典

- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目21 オブジェクトを一度に構築する|Effective TypeScript 項目21 オブジェクトを一度に構築する]]
- [スプレッド構文 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
