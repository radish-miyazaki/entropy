---
title: 良いコードは自己文書化されている
aliases: []
description: コード自体がドキュメントであり、コメントは要らないという主張
tags: [word, 設計]
date: 2023-12-25
---

## TL;DR

コード自体がドキュメントである、という主張。

## なぜ必要か

Wikipedia によると、コードを読みやすく理解しやすくし、古いシステムの保守や拡張の手間を減らし、コメントやマニュアルへの依存を減らすことを目指す。

## 仕組み

名前と構造の規約に頼る。シンボルの意味を表す、人が読める名前（`article.numberOfWords` など）を付け、読み手がアルゴリズムを理解しやすい明快な構造にする。うまくいくかどうかは、命名の統一や一貫性にかかっている。

## 注意点

Jef Raskin は、なぜそのプログラムを書いているのかという理由はコードでは説明できないので、コメントは依然として必要だと批判した。

## 自分の理解

Clean Craftsmanship では、[[test-driven-development|TDD]] の章でこの主張が繰り返し出てきた。一方、[[A Philosophy of Software Design]] はこれをやんわりと否定している（[[A Philosophy of Software Design 第12章 Why Write Comments？ The Four Excuses|第12章 Why Write Comments? The Four Excuses]]）。

## 関連

- [[nonobvious-code|明白でないコード]]

## 出典

- Clean Craftsmanship
- [[A Philosophy of Software Design 第12章 Why Write Comments？ The Four Excuses|A Philosophy of Software Design 第12章 Why Write Comments? The Four Excuses]]
- [Self-documenting code - Wikipedia](https://en.wikipedia.org/wiki/Self-documenting_code)
