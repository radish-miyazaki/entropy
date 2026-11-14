---
title: XML
aliases: [Extensible Markup Language]
description: SGML を制限した形のマークアップ言語。W3C が勧告している
tags: [word]
date: 2026-11-14
---

## TL;DR

[[w3c|W3C]] が勧告しているマークアップ言語で、SGML のサブセットである。SGML の文書を、[[html|HTML]] と同じように Web で扱えるようにすることを目指している。

## なぜ必要か

W3C の仕様の設計目標では、XML はインターネット上でそのまま使え、XML 文書を処理するプログラムを簡単に書けることを掲げている。人間が読めて分かりやすいことも目標の一つで、簡潔さはほとんど重視していない。省略できる機能は、できるだけ 0 にするとしている。

## 仕組み

XML は SGML を制限した形なので、XML 文書は SGML の文書としても正しい。

XML 文書は 1 つ以上の要素を持つ。要素の範囲は開始タグと終了タグで区切るか、空要素タグで表す。属性は名前と値の組で書く。

仕様の定める形に従っている文書を整形式（well-formed）の XML 文書という。さらに追加の制約を満たす文書は、妥当（valid）であるという。

## 例

- [[gpx|GPX]] は、位置データをやり取りするための XML ベースのフォーマットである
- [[document-database|ドキュメントデータベース]]は、[[json|JSON]] や XML のような半構造化データを保存する

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[html|HTML]]
- [[json|JSON]]
- [[w3c|W3C]]
- [[whatwg|WHATWG]]

## 出典

- [Extensible Markup Language (XML) 1.0 (Fifth Edition) - W3C](https://www.w3.org/TR/xml/)
