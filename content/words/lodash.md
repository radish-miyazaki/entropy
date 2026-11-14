---
title: Lodash
aliases: []
description: 配列やオブジェクト、文字列の操作を助ける JavaScript のユーティリティライブラリ
tags: [word, javascript, ライブラリ]
date: 2026-11-14
---

## TL;DR

モジュール性と性能を重視した、JavaScript のユーティリティライブラリ。配列、数値、オブジェクト、文字列の扱いを楽にする。MIT ライセンスで公開されている。

## なぜ必要か

公式サイトによると、Lodash のメソッドは、配列やオブジェクト、文字列の走査、値の操作や判定、関数の合成に役立つ。

## 仕組み

`npm i --save lodash` で入れ、`require('lodash')` で全体を読み込む。小さいコアだけの `lodash/core` や、関数型プログラミング向けの `lodash/fp` もある。

## 例

```js
_.defaults({ a: 1 }, { a: 3, b: 2 })
// → { a: 1, b: 2 }

_.partition([1, 2, 3, 4], (n) => n % 2)
// → [[1, 3], [2, 4]]
```

`defaults` は、既にあるプロパティを上書きせずに、足りないプロパティを補う。`partition` は、条件によって配列を 2 つに分ける。

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] では、ループの代わりに Lodash のような関数型のライブラリを使うと、型の流れがよくなるとしている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ramda|Ramda]]
- [[functional-programming|関数型プログラミング]]

## 出典

- [Lodash](https://lodash.com/)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目26 関数型の標準APIやライブラリを使って型の流れを促進する|Effective TypeScript 第2版 項目26]]
