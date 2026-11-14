---
title: トランスパイル
aliases: []
description: あるプログラミング言語のソースコードを、同程度の抽象度の言語のソースコードに変換すること
tags: [word, コンパイラ]
date: 2026-11-14
---

## TL;DR

あるプログラミング言語のソースコードを入力に取り、同じ言語か別の言語の、同等のソースコードを出力すること。これを行うツールをトランスパイラ（source-to-source compiler）と呼ぶ。

## なぜ必要か

ブラウザなどの実行環境が直接は動かせない言語や、新しいバージョンの構文で書いたコードを、動かせる形に変えるために使う。TypeScript のドキュメントによると、型アノテーションは JavaScript の一部ではないので、TypeScript をそのまま実行できるブラウザやランタイムはない。そのため、TypeScript 固有のコードを取り除く・変換するコンパイラが必要になる。

## 仕組み

Wikipedia によると、従来のコンパイラは高水準の言語を低水準の言語に翻訳するが、トランスパイラはほぼ同じ抽象度の言語どうしを変換する。

TypeScript のコンパイラ `tsc` は、型アノテーションを消し、新しい ECMAScript の構文を古いバージョンの構文に書き換える。新しいバージョンから古いバージョンへの変換をダウンレベリングと呼ぶ。たとえばテンプレート文字列は、ES5 向けには `concat` による文字列の連結に書き換えられる。

## 例

- [[typescript|TypeScript]] から [[javascript|JavaScript]] への変換
- [[babel|Babel]] による ECMAScript 2015 以降の JavaScript から ES5 への変換
- [[coffeescript|CoffeeScript]] から JavaScript への変換

## 注意点

トランスパイルした後のコードは元のコードと見た目が変わるので、デバッグのときに元の位置と対応させるには[[source-map|ソースマップ]]を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[source-map|ソースマップ]]
- [[babel|Babel]]
- [[typescript|TypeScript]]
- [[type-erasure|型消去]]

## 出典

- [Source-to-source compiler - Wikipedia](https://en.wikipedia.org/wiki/Source-to-source_compiler)
- [TypeScript: Documentation - The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
