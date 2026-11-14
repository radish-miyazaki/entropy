---
title: CSS
aliases: []
description: HTML や XML で書かれた文書の体裁や見栄えを表現するためのスタイルシート言語
tags: [word, css, web]
date: 2026-11-14
---

## TL;DR

Cascading Style Sheets の略。HTML や XML（SVG、MathML などを含む）で書かれた文書の体裁や見栄えを表現するためのスタイルシート言語。[[w3c|W3C]] が標準化している。

## なぜ必要か

MDN によると、CSS は要素が画面上で（あるいは紙や音声といった別のメディア上で）どう表現されるかを定義する。W3C も、CSS をオープンな Web プラットフォームの中核となる言語の 1 つとし、Web の文書にフォント、色、余白などのスタイルを加えるために使うと説明している。

## 仕組み

CSS1、CSS2.1、CSS3 といった版数は、CSS 2.1 以降は使われていない。仕様の範囲が大きくなり、機能ごとに進み具合が違ってきたので、今は機能ごとのモジュールに分けて勧告を出している。各モジュールは「CSS Color Module Level 5」のようにレベルを持つ。W3C は毎年、実装できる状態になった部分をまとめたスナップショットを公開している。

[[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側 第1章 ブラウザを知る──Webサイトを表示するアプリケーション|［作って学ぶ］ブラウザのしくみ 第1章]] によると、ブラウザは CSS を文字列からトークンに、トークンから CSSOM というツリー構造に変換して、各ノードのスタイルや大きさ、位置を決める。

## 注意点

同じ要素に競合する宣言があるときは、[[css-specificity|詳細度]]でどれを適用するかが決まる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[css-specificity|詳細度]]
- [[css-in-js|CSS-in-JS]]
- [[stylelint|Stylelint]]
- [[mdn|MDN]]
- [[w3c|W3C]]

## 出典

- [[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側 第1章 ブラウザを知る──Webサイトを表示するアプリケーション|［作って学ぶ］ブラウザのしくみ 第1章]]
- [CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS)
- [Cascading Style Sheets - W3C](https://www.w3.org/Style/CSS/Overview.en.html)
