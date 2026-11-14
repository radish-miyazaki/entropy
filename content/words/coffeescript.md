---
title: CoffeeScript
aliases: []
description: JavaScript にコンパイルされる、簡潔な構文の言語
tags: [word, プログラミング言語, javascript]
date: 2024-08-30
---

## TL;DR

[[javascript|JavaScript]] にコンパイルされる、簡潔な構文の言語。「It’s just JavaScript（ただの JavaScript だ）」を原則としている。

## 仕組み

CoffeeScript のコードは、同じ意味の JavaScript に一対一で変換される。実行時に解釈される部分はない。コンパイル結果は読みやすく、手書きの JavaScript とほぼ同じ速さで動く。現行のメジャーバージョンは CoffeeScript 2 である。CoffeeScript 2 のコンパイラは、ES2015 以降の新しい JavaScript の構文を出力する。既存の JavaScript のライブラリは、CoffeeScript からそのまま使える。

構文の特徴として、ブロックをインデントで表すので、波括弧やセミコロンはふつう要らない。関数は `->` で書き、`this` を束縛したいときは `=>` を使う。配列やオブジェクト、範囲を回す内包表記や、`class` と `extends` によるクラスも使える。

## 例

公式サイトの例では、次の CoffeeScript を

```coffee
square = (x) -> x * x
cube = (x) -> square(x) * x
```

次の JavaScript にコンパイルする。

```js
var cube, square
square = function (x) {
  return x * x
}
cube = function (x) {
  return square(x) * x
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [CoffeeScript](https://coffeescript.org/)
