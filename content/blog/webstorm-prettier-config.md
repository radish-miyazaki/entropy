---
title: WebStorm の自動 Prettier 構成は .prettierc が必要
description: WebStorm の自動 Prettier 構成は、最も近い node_modules の Prettier と、最も近い .prettierrc.* 構成ファイルを探して使う
tags: [blog, ide, prettier, intellij-idea]
date: 2024-10-24
draft: false
---

## TL;DR

- WebStorm の「自動 Prettier 構成」は、最も近い `node_modules` にある [[prettier|Prettier]] を使い、最も近い `.prettierrc.*` 構成ファイルを探す。構成ファイルがないと、自動では有効にならない。

## 検証

[WebStorm のヘルプ](https://pleiades.io/help/webstorm/prettier.html)には、次のように書かれている。

> 自動 Prettier 構成: このモードでは、WebStorm は最も近い node_modules (再フォーマットするファイルと同じフォルダーまたはその親フォルダーにある) の Prettier パッケージを使用し、**最も近い .prettierrc.\* 構成ファイルを検索**します。

IDE の設定画面からも、同じ説明を確認できた。

## 考察

`.prettierrc.*` が必要だということは、設定画面だけでは分かりづらい。

## キーワード

- [[prettier|Prettier]]

## 参考

- https://pleiades.io/help/webstorm/prettier.html
