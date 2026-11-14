---
title: duti
aliases: []
description: macOS でファイルの種類ごとのデフォルトアプリケーションを設定する CLI ツール
tags: [word, macos, cli]
date: 2025-01-07
---

## TL;DR

Apple の [[uniform-type-identifiers|Uniform Type Identifiers]]（UTI）を使って、macOS のドキュメントの種類ごとにデフォルトアプリケーションを設定する CLI ツールである。

## 例

`.txt` ファイルを開くデフォルトアプリケーションを CotEditor にするには、次のように実行する。`com.coteditor.CotEditor` はアプリケーションのバンドル ID、`public.plain-text` はプレーンテキストを表す UTI である。

```sh
$ duti -s com.coteditor.CotEditor public.plain-text all
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[coteditor-cli|CotEditor を CLI から開く]]

## 出典

- [moretension/duti](https://github.com/moretension/duti)
