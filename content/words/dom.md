---
title: DOM
aliases: [Document Object Model]
description: HTML などの文書の構造をノードとオブジェクトの木として表し、プログラムから操作できるようにするモデルと API
tags: [word, web]
date: 2026-11-14
---

## TL;DR

HTML などの文書の構造を、ノードとオブジェクトからなる木としてメモリ上に表し、プログラムから操作できるようにするモデルと API。仕様は [[whatwg|WHATWG]] の DOM Standard で定められている。

## なぜ必要か

MDN によると、DOM は Web ページとスクリプトやプログラミング言語をつなぐ。文書をノードとオブジェクトとして表すので、プログラムからページを読み書きできる。

## 仕組み

DOM Standard によると、DOM はイベント、処理の中断、ノードの木について、プラットフォームに依存しないモデルを定める。木は有限の階層構造で、各オブジェクトは親と、順序の付いた子のリストを持つ。イベントを受け取れるオブジェクトは `EventTarget` である。

MDN によると、ブラウザは HTML を解析して DOM ツリーを作り、それを使って文書を表示する。DOM は特定のプログラミング言語に依存しないように設計されているが、Web 開発ではほとんど JavaScript から使う。

## 例

```js
const paragraphs = document.querySelectorAll("p")
alert(paragraphs[0].nodeName) // 最初の <p> 要素
```

[[typescript|TypeScript]] は、`window` や `document` などの DOM API の型を標準で同梱している。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目|Effective TypeScript]] の項目 75 によると、DOM の型は `EventTarget`、`Node`、`Element`、`HTMLElement` の順に階層になっていて、具体的な要素の型が分からずにエラーになることがある。

## 注意点

Node.js には DOM API がないので、React のコンポーネントをテストするときは、jsdom や happy-dom のような DOM API をシミュレートするライブラリを使う（[[testing-library|Testing Library]]）。

2019 年には、HTML と DOM の仕様策定を [[w3c|W3C]] ではなく WHATWG が主体となって行うことが発表された。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[whatwg|WHATWG]]
- [[w3c|W3C]]
- [[testing-library|Testing Library]]

## 出典

- [DOM Standard](https://dom.spec.whatwg.org/)
- [Introduction to the DOM - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [TypeScript: Documentation - Type Declarations](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目75 DOMの型階層を理解する|Effective TypeScript 第2版 項目75]]
