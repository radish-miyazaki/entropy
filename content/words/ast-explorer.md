---
title: AST explorer
aliases: []
description: さまざまなパーサが生成する AST を、ブラウザ上で確認できる Web ツール
tags: [word, ast]
date: 2024-09-24
---

## TL;DR

さまざまなパーサが生成する [[abstract-syntax-tree|AST]] を確認できる Web ツール（[astexplorer.net](https://astexplorer.net/)）。エディタにコードを貼り付けると、生成された AST を見られる。

## 仕組み

JavaScript のパーサが最も充実しており、acorn、Babel、espree、TypeScript などから選べる。ほかにも CSS、GraphQL、HTML、JSON、Markdown、SQL、YAML など多くの言語に対応している。

[[babel|Babel]]、[[eslint|ESLint]]、jscodeshift、postcss などの変換（transform）も試せるので、プラグインの試作に使える。AST のノードにカーソルを合わせると、対応するソースコードが強調表示される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[abstract-syntax-tree|AST]]
- [[babel|Babel]]
- [[eslint|ESLint]]

## 出典

- [fkling/astexplorer - GitHub](https://github.com/fkling/astexplorer)
