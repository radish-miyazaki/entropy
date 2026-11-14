---
title: 分割代入
aliases: [分割束縛, destructuring assignment]
description: 配列やオブジェクトなどのデータ構造の中の値を、個別の変数に取り出して束縛する構文
tags: [word, javascript, clojure]
date: 2026-11-14
---

## TL;DR

配列やオブジェクトなどのデータ構造の中の値を、個別の変数に取り出す構文。JavaScript では分割代入、[[clojure|Clojure]] では分割束縛と呼ぶ。

## なぜ必要か

構造の中の値に、短いコードで名前を付けられる。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目|Effective TypeScript]] の項目 23 と項目 79 によると、分割代入を使うと変数の名前に一貫性が生まれ、コードも簡潔になる。

## 仕組み

MDN によると、JavaScript の分割代入は、配列の要素やオブジェクトのプロパティを別々の変数に取り出す構文で、代入の左辺など、値を受け取る場所で使える。配列のリテラルと同じ形を左辺に書くと、逆の操作として要素が変数に入る。オブジェクトのプロパティは別の名前の変数に取り出せる。プロパティがないか `undefined` のときに使う既定値も指定できるが、`null` のときは既定値を使わない。パターンの最後に `...rest` を書くと、残りの要素やプロパティを新しい配列やオブジェクトにまとめられる。

Clojure の公式ガイドによると、分割束縛はデータ構造の中の値に簡潔に名前を束縛する方法である。順序のあるコレクションをベクタのパターンで位置ごとに取り出す順次的な分割束縛と、マップのパターンでキーごとに取り出す連想的な分割束縛がある。連想的な分割束縛では、`:keys` でキーと同じ名前の変数を作り、`:or` でキーがないときの既定値を与え、`:as` で値全体に名前を付けられる。

## 例

```js
const [a, , b] = [1, 2, 3] // a = 1, b = 3
const { p: foo, q = 2 } = { p: 42 } // foo = 42, q = 2
const { x, ...others } = { x: 1, y: 2, z: 3 } // others = { y: 2, z: 3 }
```

```clojure
(let [{:keys [category], :or {category "none"}} {}]
  (println category)) ; none
```

## 注意点

JavaScript の `...rest` は新しいオブジェクトや配列を作るが、中身を深くコピーはしない。値がオブジェクトの参照なら、同じものを指したままになる。

[[Clojure Brain Teasers]] によると、Clojure の `:or` の既定値の式が同じフォームの別の束縛に依存していると、`:keys` に並べる順序で結果が変わる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]

## 出典

- [Destructuring - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)
- [Clojure - Destructuring in Clojure](https://clojure.org/guides/destructuring)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目79 モダンなJavaScriptを書く|Effective TypeScript 第2版 項目79]]
- [[Clojure Brain Teasers Runtime and Library|Clojure Brain Teasers Runtime and Library]]
