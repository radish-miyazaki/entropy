---
title: Stylelint
aliases: []
description: CSS 専用のリンターで、プラグインを使えば CSS-in-JS にも適用できる
tags: [word, css]
date: 2024-09-03
---

## TL;DR

[[css|CSS]] 専用の[[linter|リンター]]。プラグインを使えば、[[styled-components]] などの [[css-in-js|CSS-in-JS]] にも適用できる。

## なぜ必要か

開発に使ったブラウザでは意図どおりに見えても、他のブラウザでは表示が崩れていることがある。Stylelint を導入すると、こうしたバグを防げる。

## 注意点

[[eslint|ESLint]] はテンプレートリテラルの中身を無視する。そのため、CSS-in-JS のスタイルを Stylelint で検査しても ESLint とぶつからず、両者を共存させられる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[eslint|ESLint]]
- [[css-in-js|CSS-in-JS]]
- [[styled-components]]
- [[lint-staged]]

## 出典

- [Stylelint](https://stylelint.io/)
