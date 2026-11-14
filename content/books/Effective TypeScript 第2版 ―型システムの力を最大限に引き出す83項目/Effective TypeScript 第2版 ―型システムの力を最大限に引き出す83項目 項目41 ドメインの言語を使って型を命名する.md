---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目41 ドメインの言語を使って型を命名する
description: 型の名前には扱っているドメインで一般的に使われる用語を正しく使い、曖昧な名前を避け、何であるかに基づいて命名すべきだと説く項目
tags: [book-chapter, typescript, 命名]
date: 2025-05-16
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 41
---

## TL;DR

- 型を命名するときは、扱っている[[domain|ドメイン]]で一般的に使われる名前を正しく使う。
- 曖昧で意味のない名前を避け、型の形状ではなく「何であるか」に基づいて命名する。

## 内容

この項目での「ドメイン」は、ソフトウェアが扱う問題領域を指す。

### ドメインの用語を使う

命名するときは、できるかぎり扱っているドメインで一般的に使われる名前を採用し、独自の用語を作らない。その分野の人々が理解しやすくなり、コードの可読性と抽象度が上がる。また、ドメインの名前は正しい意味で使う。独自の解釈で用語を使うと混乱を招く。

### 名前の区別に意味を持たせる

文章と違い、コードでは同じものに異なる名前を使わない。名前を区別するなら、その区別に意味を持たせる（[[A Philosophy of Software Design 第14章 Choosing Names|A Philosophy of Software Design 第14章 Choosing Names]]）。

### 曖昧な名前を避ける

`Data`、`Info`、`Thing`、`Item`、`Object`、`Entity` のような[[vague-name|曖昧な名前]]は避ける。ただし、ドメインで特定の意味を持つ場合は問題ない。

### 何であるかに基づいて命名する

型が何を持つか（形状）や、どのように作られたかよりも、それが何であるかに基づいて命名する。たとえば `INodeList` より `Directory` のほうが好ましい。

## キーワード

- [[typescript|TypeScript]]
- [[domain|ドメイン]]
- [[vague-name|曖昧な名前]]
- [[ubiquitous-language|ユビキタス言語]]

## 自分の理解

この話は型に限らず、プロパティや変数の命名にも当てはまる（[[A Philosophy of Software Design 第14章 Choosing Names|A Philosophy of Software Design 第14章 Choosing Names]]）。
