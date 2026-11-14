---
title: HTML
aliases: []
description: Web の中心となるマークアップ言語で、要素とテキストの木構造で文書を表す
tags: [word, web]
date: 2026-11-14
---

## TL;DR

World Wide Web の中心となるマークアップ言語である。HTML の文書は要素とテキストの木構造で、仕様は要素の意味と入れ子のルールを定めている。現在は [[whatwg|WHATWG]] が HTML Living Standard として仕様を管理している。

## なぜ必要か

HTML は、文書の内容をメディアに依存しない形で記述する。見た目は CSS のようなスタイル言語で、動きは [[javascript|JavaScript]] などのスクリプトで、HTML とは別に指定する。

## 仕組み

[[web-browser|ブラウザ]]は HTML のマークアップを解析して、メモリ上の木構造（DOM）を作る。HTML の仕様も、主にこの DOM の木を前提に書かれている。スクリプトは DOM の API を通じて、この木を読んだり変更したりできる。

[[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側]] によると、HTML をブラウザに実装するとは、文字列を字句解析でトークンに分け、構文解析で DOM ツリーを組み立て、画面に描画することである。どちらのアルゴリズムも、HTML Living Standard でステートマシンとして定められている。

## 例

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Sample</title>
  </head>
  <body>
    <p>Hello, world!</p>
  </body>
</html>
```

## 注意点

HTML の仕様は、CERN と IETF で改訂された後、1995 年から [[w3c|W3C]] で開発された。W3C は 1998 年に HTML の改訂をやめて XHTML に移ったので、2004 年に Apple、Mozilla、Opera が WHATWG で開発を続けた。WHATWG は 2011 年から、仕様を版で固定せずに更新し続ける Living Standard の形を取っている。2019 年には WHATWG と W3C が、HTML の仕様を 1 つにまとめて共同で進めることに合意した。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[whatwg|WHATWG]]
- [[w3c|W3C]]
- [[javascript|JavaScript]]
- [[mdn|MDN]]
- [[html-unknown-element|HTMLUnknownElement]]

## 出典

- [HTML Standard 1 Introduction](https://html.spec.whatwg.org/multipage/introduction.html)
- [[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側 第4章 HTMLを解析する──HTMLからDOMツリーへの変換|［作って学ぶ］ブラウザのしくみ 第4章]]
