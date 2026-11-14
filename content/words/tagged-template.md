---
title: タグ付きテンプレート
aliases: []
description: テンプレートリテラルの前に関数を置き、そのリテラルを関数で処理する JavaScript の構文
tags: [word, javascript]
date: 2024-09-03
---

## TL;DR

[[javascript|JavaScript]] のテンプレートリテラルの前に関数（タグ）を置き、そのリテラルを関数で処理する構文。タグ関数の戻り値がそのままテンプレートリテラルの値になるので、文字列でなくてもよい。

## 仕組み

タグ関数の第 1 引数には、テンプレートの文字列部分を要素とする配列が渡される。この配列の長さは埋め込んだ式の数に 1 を足したものになる。第 2 引数以降には、`${...}` の各式を評価した値が順に渡される。

第 1 引数の配列の `raw` プロパティには、エスケープシーケンスを処理する前の文字列が入っている。組み込みの `String.raw` はこの raw の文字列を連結して返すタグ関数である。

## 例

```js
const person = "Mike"
const age = 28

function myTag(strings, personExp, ageExp) {
  const ageStr = ageExp < 100 ? "youngster" : "centenarian"
  return `${strings[0]}${personExp}${strings[1]}${ageStr}${strings[2]}`
}

myTag`That ${person} is a ${age}.` // "That Mike is a youngster."
```

[[styled-components]] は、タグ付きテンプレートでスタイルを受け取ってコンポーネントを作る。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[styled-components]]

## 出典

- [テンプレートリテラル - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals)
