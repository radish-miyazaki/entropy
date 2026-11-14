---
title: Babel
aliases: []
description: 新しい JavaScript や JSX を、実行環境で動くコードに変換する JavaScript のコンパイラ
tags: [word, javascript]
date: 2024-09-03
---

## TL;DR

[[javascript|JavaScript]] のコンパイラ。新しい構文や [[jsx|JSX]] で書いたコードを、実行環境で動く JavaScript に変換する。

## なぜ必要か

当初は、最新の [[ecmascript|ECMAScript]] で書いたコードを、Internet Explorer のような古いブラウザで実行できるコードに変換するために使われていた。[[react|React]] が登場すると、JSX を JavaScript に変換する主要なツールになった。

## 注意点

今は [[typescript|TypeScript]] 自体が [[tsx|TSX]] を変換したり、特定のバージョンの ECMAScript に向けてコンパイルしたりできる。そのため、Babel はあまり使われなくなった。

ただし、TypeScript と併用すれば、Babel のプラグイン機能の柔軟性を活用できる。[[styled-components]] はその例である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[jsx|JSX]]
- [[typescript|TypeScript]]
- [[styled-components]]

## 出典

- [Babel](https://babeljs.io/)
- [Plugins - Babel](https://babeljs.io/docs/plugins)
