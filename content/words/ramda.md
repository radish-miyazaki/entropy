---
title: Ramda
aliases: [Ramda.js]
description: 関数型のスタイルで書くための JavaScript のユーティリティライブラリ
tags: [word, javascript, typescript, fp]
date: 2025-04-30
---

## TL;DR

[[javascript|JavaScript]] のプログラマ向けの、実用的な[[functional-programming|関数型プログラミング]]のライブラリ。小さな関数をつなげたパイプラインを、ユーザのデータを書き換えずに書ける。

## なぜ必要か

公式サイトによると、関数型の色合いを持つライブラリはすでにいくつもあるが、Ramda はより絞った目的で作られた。関数型のスタイルのためだけに設計され、ユーザのデータを決して書き換えないライブラリを目指している。

## 仕組み

Ramda は次の 3 つを設計の柱にしている。

- イミュータブルで副作用がない: Ramda の関数はユーザのデータを書き換えない。ただし、それを強制はしない
- 自動[[currying|カリー化]]: 後ろの引数を省くと、残りの引数を受け取る新しい関数が返る
- データを最後の引数に取る: 操作の対象となるデータを最後に渡すので、カリー化や関数の連結がしやすい

## 例

```js
import * as R from "ramda"

R.map(R.identity, [1, 2, 3]) // [1, 2, 3]
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ts-belt]]

## 出典

- [Ramda Documentation](https://ramdajs.com/)
