---
title: シャドーイング
aliases: [シャドウイング]
description: 内側のスコープで外側と同じ名前の変数を宣言し、外側の変数を隠すこと
tags: [word, プログラミング]
date: 2026-11-14
---

## TL;DR

内側のスコープで、外側のスコープと同じ名前の変数を宣言すること。内側のスコープでは、外側の変数が隠れて参照できなくなる。

## 仕組み

Wikipedia によると、内側のスコープはブロック、メソッド、内部クラスなどである。そのスコープの中で名前を参照すると内側の変数に解決され、スコープを抜けると外側の変数が再び見えるようになる。

言語によって扱いは異なる。[[javascript|JavaScript]] では、ES6 で導入されたブロックスコープの `let` と `const` でシャドーイングができる。[[rust|Rust]] では内側のブロックの `let` で外側の変数を隠せるほか、同じスコープの中で同じ名前を束縛し直すこともできる。[[java|Java]] は、同じメソッドの中の入れ子のブロックでローカル変数を宣言し直すことを禁じている。

## 例

```js
let total = 10
{
  let total = 99 // 外側の total を隠す
  console.log(total) // 99
}
console.log(total) // 10
```

## 注意点

ESLint のドキュメントによると、シャドーイングはコードを読むときに混乱を招き、内側のスコープから外側の変数にアクセスできなくする。[[eslint|ESLint]] の `no-shadow` ルールを使うと、シャドーイングを禁止できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[eslint|ESLint]]
- [[closure|クロージャ]]

## 出典

- [Variable shadowing - Wikipedia](https://en.wikipedia.org/wiki/Variable_shadowing)
- [no-shadow - ESLint](https://eslint.org/docs/latest/rules/no-shadow)
