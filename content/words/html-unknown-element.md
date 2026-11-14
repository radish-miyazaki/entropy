---
title: HTMLUnknownElement
aliases: []
description: 不正な HTML 要素を表すインタフェース
tags: [word, html, web-api]
date: 2024-11-15
---

## TL;DR

不正な HTML 要素を表す[[interface|インタフェース]]である。

## 仕組み

HTMLElement インタフェースを継承しているため、継承したプロパティは使える。HTML Standard では次のように定義されている。

```webidl
[Exposed=Window]
interface HTMLUnknownElement : HTMLElement {
  // Note: intentionally no [HTMLConstructor]
};
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [HTMLUnknownElement - MDN](https://developer.mozilla.org/ja/docs/Web/API/HTMLUnknownElement)
- [HTML Standard](https://html.spec.whatwg.org/multipage/dom.html#htmlunknownelement)
