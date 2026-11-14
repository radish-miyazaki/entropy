---
title: Lamdera
aliases: []
description: フロントエンドとバックエンドの両方を型安全な Elm で書く、フルスタック Web アプリのためのプラットフォーム
tags: [word, elm]
date: 2025-06-10
---

## TL;DR

フルスタックの [[elm|Elm]] で Web アプリを作るためのプラットフォーム。フロントエンドとバックエンドの両方を、型安全な Elm で書ける。

## 仕組み

Lamdera のプロジェクトは、ふつうの Elm プロジェクトに、フロントエンドとバックエンドを型安全に構成するためのパッケージとファイルを足したものである。Lamdera のコンパイラは公式の Elm コンパイラを拡張したもので、Elm 0.19 のフロントエンドのプロジェクトにもそのまま使える。

`lamdera init` でプロジェクトを作り、`lamdera live` でフルスタックの開発サーバを起動する。開発サーバはライブリロードとホットリロードに対応している。

## 注意点

コンパイラは無料のオープンソースだが、Lamdera のプラットフォームは無料枠のある有料サービスである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[elm|Elm]]
- [[elm-land|Elm Land]]

## 出典

- [Lamdera](https://www.lamdera.com/)
- [lamdera/compiler](https://github.com/lamdera/compiler)
