---
title: JSDoc
aliases: []
description: JavaScript のコードに書いたコメントから API ドキュメントを生成するツールと、そのコメントの書き方
tags: [word, javascript, ドキュメント]
date: 2026-11-14
---

## TL;DR

[[javascript|JavaScript]] の API ドキュメントを生成するツールである。Javadoc や phpDocumentor に似ている。`/**` で始まるコメントに `@param` などのタグを書き、そこから HTML のドキュメントを作る。

## なぜ必要か

コメントからドキュメントを生成できる。また、[[typescript|TypeScript]] は JavaScript ファイルの JSDoc を型情報として読むので、`checkJs` や `// @ts-check` を有効にすれば、JavaScript のまま型チェックを受けられる。

## 仕組み

JSDoc のコメントは、ドキュメントにするコードの直前に置く。JSDoc のパーサに認識されるには、コメントが `/**` で始まっている必要がある。コメントを書いたら、`jsdoc book.js` のようにコマンドを実行すると、カレントディレクトリに `out/` ディレクトリが作られ、HTML のドキュメントが出力される。

TypeScript は、`@type`、`@param`、`@returns`、`@typedef`、`@template` などのタグを型情報として扱う。ここに挙がっていないタグ（`@async` など）はまだ対応していない。TypeScript のファイルでは、`@deprecated` や `@see` などのドキュメント用のタグだけが使える。

## 例

```js
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {}
```

## 注意点

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、JavaScript ファイルの先頭に `// @ts-check` を書けば型チェックを試せるが、チェックはかなり緩い。最終的なゴールは TypeScript への置き換えなので、JSDoc で完璧に型を付けることに時間をかけない。また、TypeScript に移行すると JSDoc の型が強制されなくなるので、型安全性を失うことがある。

[[tsdoc|TSDoc]] のページによると、JSDoc は文法が厳密に定められておらず、JSDoc をもとにしたツールはそれぞれ独自に拡張している。TSDoc は、TypeScript のドキュメントコメントの書き方を標準化するための提案である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[tsdoc|TSDoc]]
- [[typescript|TypeScript]]
- [[javascript|JavaScript]]

## 出典

- [Getting Started with JSDoc 3](https://jsdoc.app/about-getting-started)
- [JSDoc Reference - TypeScript](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目80 @ts-checkとJSDocを使ってTypeScriptを試す|Effective TypeScript 第2版 項目80]]
- [[tsdoc|TSDoc]]
