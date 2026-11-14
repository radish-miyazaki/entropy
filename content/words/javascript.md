---
title: JavaScript
aliases: [JS]
description: 第一級関数を持つ軽量なプログラミング言語。Web ページのスクリプト言語として知られ、ECMAScript として標準化されている
tags: [word, プログラミング言語, web]
date: 2026-11-14
---

## TL;DR

第一級関数を持つ、軽量なインタプリタ型（または JIT コンパイル型）のプログラミング言語である。Web ページのスクリプト言語として最もよく知られている。標準仕様は ECMAScript Language Specification（ECMA-262）である。

## なぜ必要か

[[web-browser|ブラウザ]]で動くスクリプト言語として、[[html|HTML]] から作られた DOM の木を読み書きし、Web ページに動きを付けられる。ブラウザの外でも、Node.js や Apache CouchDB、Adobe Acrobat などの環境で使われている。

## 仕組み

[[mdn|MDN]] によると、JavaScript はプロトタイプベースで、ガベージコレクションを持つ動的な言語である。命令型、関数型、オブジェクト指向など、複数のパラダイムに対応している。

## 例

[[typescript|TypeScript]] は JavaScript のスーパーセットなので、すべての JavaScript のプログラムは TypeScript のプログラムでもあるが、逆は成り立たない（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目1 TypeScriptとJavaScriptの関係を理解する|Effective TypeScript 第2版 項目1]]）。他にも [[coffeescript|CoffeeScript]] や [[clojurescript|ClojureScript]] のように、JavaScript に変換して動かす言語がある。

## 注意点

`this` の値は、関数の呼び出し方によって変わる（[[javascript-this|JavaScript の this]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]
- [[html|HTML]]
- [[mdn|MDN]]
- [[deno|Deno]]
- [[bun|Bun]]
- [[jsdoc|JSDoc]]
- [[javascript-this|JavaScript の this]]

## 出典

- [JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目1 TypeScriptとJavaScriptの関係を理解する|Effective TypeScript 第2版 項目1]]
