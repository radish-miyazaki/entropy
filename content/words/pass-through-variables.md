---
title: Pass-through variables
aliases: []
description: 長い一連のメソッドを通じて受け渡される変数
tags: [word, 設計]
date: 2023-12-21
---

## TL;DR

長い一連のメソッドを通じて受け渡される変数のこと。

## 仕組み

最善の解決策は、[[context-object|コンテキストオブジェクト]]を導入することである。[[go|Go]] の `context` パッケージを思い浮かべると分かりやすい。導入するときは、次の点に気をつける。

- コンテキストの変数はイミュータブルにする
- コンテキストオブジェクトを必要なクラスの中に保存しておき、コンテキストオブジェクト自体が Pass-through variables になるのを防ぐ

## 自分の理解

[[props-drilling|props drilling]] をイメージすると分かりやすい。

## 関連

- [[pass-through-methods|Pass-through methods]]
- [[context-object|コンテキストオブジェクト]]
- [[props-drilling|props drilling]]
