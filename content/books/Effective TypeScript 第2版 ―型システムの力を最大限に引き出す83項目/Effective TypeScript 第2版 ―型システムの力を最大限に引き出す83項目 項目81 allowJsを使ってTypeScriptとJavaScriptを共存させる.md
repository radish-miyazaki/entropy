---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目81 allowJsを使ってTypeScriptとJavaScriptを共存させる
description: 大規模な JavaScript プロジェクトを移行するときは allowJs を有効にし、JavaScript と TypeScript のコードを共存させながら進める項目
tags: [book-chapter, typescript]
date: 2025-05-02
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 81
---

## TL;DR

- 大規模な [[javascript|JavaScript]] のプロジェクトを [[typescript|TypeScript]] に移行するときは、`allowJs` を有効にして両方のコードを共存させる。

## 内容

大規模な JavaScript のプロジェクトを TypeScript に移行するときは、[`allowJs`](https://www.typescriptlang.org/tsconfig/#allowJs) コンパイラオプションを有効にして、JavaScript のコードと TypeScript のコードを共存させるとよい。`allowJs` を有効にしても、`@ts-check` を使わない限り、JavaScript のファイルには構文エラーしか表示されない。

こうすると、TypeScript をビルドの流れに組み込める（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目82 依存関係グラフの下から上へモジュールごとに移行する|項目82]]）。また、個々の[[module|モジュール]]を TypeScript に移行しながら、テストを実行し続けられる。

## キーワード

- [[typescript|TypeScript]]
- [[javascript|JavaScript]]
- [[module|モジュール]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
