---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目75 DOMの型階層を理解する
description: EventTarget から HTMLElement までの DOM の型階層を理解し、TypeScript で具体的な要素の型を得る方法を知る項目
tags: [book-chapter, typescript]
date: 2025-05-06
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 75
---

## TL;DR

- [[dom|DOM]] の型は `EventTarget`、`Node`、`Element`、`HTMLElement` の順に階層になっていて、[[typescript|TypeScript]] ではこの階層の理解がより重要になる。
- `getElementById` のように汎用的な型が返るときは、型アサーションか `instanceof` による実行時チェックで具体的な型にする。

## 内容

### DOM の型階層

DOM の型は、たとえば次のような包含関係になっている。

$$
\text{HTMLParagraphElement} \subseteq \text{HTMLElement} \subseteq \text{Element} \subseteq \text{Node} \subseteq \text{EventTarget}
$$

| 型                | 例                            |
| ----------------- | ----------------------------- |
| EventTarget       | `window`、`XMLHttpRequest`    |
| Node              | `document`、`Text`、`Comment` |
| Element           | `HTMLElement`、`SVGElement`   |
| HTMLElement       | `<i>`、`<b>`                  |
| HTMLButtonElement | `<button>`                    |

これらは TypeScript の型であるだけでなく、[[javascript|JavaScript]] の実行時の値でもある。

- [`EventTarget`](https://developer.mozilla.org/ja/docs/Web/API/EventTarget): DOM の型の最上位にある。イベントリスナの追加と削除、イベントのディスパッチしかできない
- [`Node`](https://developer.mozilla.org/ja/docs/Web/API/Node): テキストやコメント、`Element` を含む。`childNodes` プロパティは子の `Node` を `NodeList` で返す
- [`Element`](https://developer.mozilla.org/ja/docs/Web/API/Element): `SVGElement`、`HTMLElement`、`MathMLElement` など、すべての要素オブジェクトを含む。`children` プロパティは子の `Element` を `HTMLCollection` で返す
- [`HTMLElement`](https://developer.mozilla.org/ja/docs/Web/API/HTMLElement): HTML の `Element` で、`HTMLImageElement` や `HTMLInputElement` など任意の HTML 要素を含む

`HTMLCollection` は名前に反して、`HTMLElement` だけを含むわけではない。[MDN](https://developer.mozilla.org/ja/docs/Web/API/HTMLCollection) は次のように説明している。

> このインターフェイスは歴史的な理由で HTMLCollection と呼ばれています（現代の DOM より前では、このインターフェイスを実装する集合が、アイテムとして HTML 要素しか持てませんでした）。

### TypeScript で具体的な型を得る

TypeScript の DOM の型定義は、具体的な型を得られるように[[literal-type|リテラル型]]を多用している。

```ts
const p = document.getElementsByTagName("p")[0]
//    ^? const p: HTMLParagraphElement
const button = document.createElement("button")
//    ^? const button: HTMLButtonElement
const div = document.querySelector("div")
//    ^? const div: HTMLDivElement | null
```

しかし、`getElementById` などは `HTMLElement` 型を返す。

```ts
const div = document.getElementById("my-div")
//    ^? const div: HTMLElement | null
```

`#my-div` が `div` であると事前に分かっているなら、[[type-assertion|型アサーション]]を使えばよい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目9 型アノテーションを型アサーションより優先的に使用する|項目9]]）。

```ts
const div = document.getElementById("my-div") as HTMLDivElement
```

分からない場合は、実行時にチェックする。

```ts
const div = document.getElementById("my-div")
if (div instanceof HTMLDivElement) {
  console.log(div)
  //          ^? const div: HTMLDivElement
}
```

### Event の型階層

イベントの型の最上位は `Event` で、その下に `UIEvent`、`MouseEvent`、`TouchEvent`、`KeyboardEvent` などの具体的なイベントがある。

## キーワード

- [[typescript|TypeScript]]
- [[javascript|JavaScript]]
- [[dom|DOM]]
- [[literal-type|リテラル型]]
- [[type-assertion|型アサーション]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
