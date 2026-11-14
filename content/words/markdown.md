---
title: Markdown
aliases: []
description: メールや Usenet の書式の慣習をもとにした、構造化された文書を書くためのプレーンテキストの形式
tags: [word]
date: 2024-11-15
---

## TL;DR

構造化された文書を書くためのプレーンテキストの形式である。メールや Usenet の書式の慣習をもとにしている。

## なぜ必要か

作者の John Gruber によると、Markdown の設計で最も重視したのは読みやすさである。Markdown の文書は、タグや書式の指示で装飾したようには見えず、プレーンテキストのままでも公開できることを目指している。

## 仕組み

Gruber の Markdown は 2 つのものを指す。1 つはプレーンテキストの書式の構文で、もう 1 つは、その構文で書いたテキストを [[html|HTML]] に変換する Perl 製のツールである。ツールは、標準では XHTML 形式のタグを出力する。

## 注意点

Gruber による元の構文の説明は、構文を曖昧さなく定めていない。そのため実装ごとに解釈が大きく分かれてきた。これに対して、曖昧さのない標準の仕様とテストスイートを定めたのが [CommonMark](https://commonmark.org/) である。仕様書は https://spec.commonmark.org/ で公開されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Markdown - Daring Fireball](https://daringfireball.net/projects/markdown/)
- [CommonMark](https://commonmark.org/)
- [CommonMark Spec](https://spec.commonmark.org/)
