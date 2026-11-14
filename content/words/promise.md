---
title: Promise
aliases: []
description: 非同期処理が最終的に完了したか失敗したかと、その結果の値を表す JavaScript のオブジェクト
tags: [word, javascript]
date: 2026-11-14
---

## TL;DR

非同期処理が最終的に完了したか失敗したかと、その結果の値を表す [[javascript|JavaScript]] のオブジェクト。作った時点ではまだ分からない値の代理として振る舞う。

## なぜ必要か

コールバックで非同期処理を書くと、ネストが深くなり、実行順序がコードの順序と逆になるなど、[[readability|可読性]]が低かった。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目27 コールバックの代わりにasync関数を使用して型の流れを改善する|Effective TypeScript 項目27]] では、組み合わせやすさと型の流れを考えて、非同期処理はコールバックではなく Promise で書くよう勧めている。

## 仕組み

Promise は次の 3 つの状態のどれかをとる。

- pending（待機）: 初期状態。履行も拒否もされていない
- fulfilled（履行）: 処理が成功した
- rejected（拒否）: 処理が失敗した

履行か拒否のどちらかになり、pending でなくなった状態を settled（決定）と呼ぶ。

`then()`、`catch()`、`finally()` で、Promise が決定した後の処理を登録する。これらは新しい Promise を返すので、つなげて書ける。ハンドラが値を返せば新しい Promise はその値で履行され、エラーを投げればそのエラーで拒否される。拒否はどこかで処理されるまでチェーンを伝わる。

複数の Promise をまとめて扱う静的メソッドもある。

- `Promise.all()`: すべてが履行されたら履行し、どれかが拒否されたら拒否する
- `Promise.allSettled()`: すべてが決定したら履行する
- `Promise.any()`: どれかが履行されたら履行し、すべてが拒否されたら拒否する
- `Promise.race()`: どれかが決定したら、同じ結果で決定する

## 例

```js
myPromise
  .then((value) => `${value} and bar`)
  .then((value) => `${value} and bar again`)
  .catch((err) => {
    console.error(err)
  })
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[async-await|async/await]]
- [[javascript|JavaScript]]

## 出典

- [Promise - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目27 コールバックの代わりにasync関数を使用して型の流れを改善する|Effective TypeScript 第2版 項目27 コールバックの代わりにasync関数を使用して型の流れを改善する]]
