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

## 仕組み

公式サイトによると、モダンな CSS の構文と機能に対応した 150 を超える組み込みルールを持つ。ルールの目的は 2 つある。1 つはエラーを避けることで、不正な grid area、重複したセレクタ、プロパティ名の打ち間違いなどを見つける。もう 1 つは規約を守らせることで、特定の単位を禁止したり、ID セレクタの数に上限を設けたりできる。

直せる問題は自動で修正する。プラグインで独自のルールを作れ、設定は共有して拡張できる。HTML、Markdown、CSS-in-JS のテンプレートリテラルからスタイルを取り出せ、SCSS、Sass、Less のような CSS に似た言語も解析できる。

## 注意点

[[eslint|ESLint]] はテンプレートリテラルの中身を無視する。そのため、CSS-in-JS のスタイルを Stylelint で検査しても ESLint とぶつからず、両者を共存させられる。

公式サイトは [[prettier|Prettier]] のようなフォーマッタと併用することを勧めている。両者は役割が補い合う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[eslint|ESLint]]
- [[css-in-js|CSS-in-JS]]
- [[styled-components]]
- [[lint-staged]]
- [[prettier|Prettier]]

## 出典

- [Stylelint](https://stylelint.io/)
