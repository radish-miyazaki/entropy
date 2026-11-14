---
title: 可変フォント
aliases: []
description: 幅、太さ、スタイルなどのバリエーションを 1 つのファイルに収めた OpenType フォント
tags: [word]
date: 2024-09-19
---

## TL;DR

幅、太さ、スタイルごとに別々のフォントファイルを用意する代わりに、書体のさまざまなバリエーションを 1 つのファイルに収めたフォント。OpenType フォント仕様を発展させたものである。

## なぜ必要か

MDN によると、従来は 1 つの書体を幅、太さ、スタイルの組み合わせごとに別々のフォントとして作っていた。本文を表示するだけでも、通常、イタリック、太字、太字イタリックの 4 ファイルが要る。可変フォントはすべての組み合わせを 1 ファイルに収めるので、単一のフォントよりは大きくなるが、たいていは本文用の 4 ファイルと同じくらいか、それより小さい。

## 仕組み

可変フォントは、書体のある側面がとりうる範囲を「バリエーション軸」で表す。軸には登録済みの軸とカスタム軸がある。登録済みの軸は太さ（`wght`）、幅（`wdth`）、イタリック（`ital`）、傾き（`slnt`）、オプティカルサイズ（`opsz`）の 5 つで、それぞれ `font-weight`、`font-stretch`、`font-style`、`font-optical-sizing` で指定できる。カスタム軸は書体デザイナーが定義する 4 文字のタグで、`font-variation-settings` で指定する。

```css
font-weight: 375;
font-variation-settings: "GRAD" 88;
```

## 例

[[nextjs-font|next/font]] で Google Fonts を読み込むとき、可変フォントでないフォントは `weight` の指定が必須になる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nextjs-font|next/font]]
- [[google-fonts|Google Fonts]]

## 出典

- [可変フォントガイド - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_fonts/Variable_fonts_guide)
