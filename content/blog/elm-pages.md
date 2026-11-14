---
title: elm-pages
description: elm-pages でプロジェクトを作成して開発サーバを立ち上げた。pnpm ではエラーが出たので npm を使い、ビルドと開発サーバ用に Lamdera を入れる必要があった
tags: [blog, elm]
date: 2025-06-10
draft: false
---

## TL;DR

- [elm-pages](https://elm-pages.com/) のプロジェクトを作成し、開発サーバを立ち上げた。
- pnpm ではエラーが出たので、npm を使った。
- ビルド（`elm-pages build`）や開発サーバの立ち上げ（`elm-pages dev`）には [[lamdera|Lamdera]] が必要である。

## 背景

[[elm|Elm]] で Web サイトを作るためのフレームワークである [elm-pages](https://elm-pages.com/) を試した。

## 環境

- macOS（Apple Silicon）
- Lamdera 1.3.2

## 検証

### プロジェクトを作成する

最初は pnpm を使ったがエラーが出たので、npm でプロジェクトを作成した。

```sh
$ npx elm-pages init my-project
$ cd my-project
$ npm i
$ npx elm-pages dev
```

### Lamdera を入れる

`elm-pages build` によるビルドや、`elm-pages dev` による開発サーバの立ち上げには Lamdera が必要である。[Lamdera のダウンロードページ](https://dashboard.lamdera.app/docs/download#os-x)の手順に従い、バイナリを取得して実行権限を付けた。

```sh
$ sudo curl https://static.lamdera.com/bin/lamdera-1.3.2-macos-arm64 -o /usr/local/bin/lamdera
$ sudo chmod a+x /usr/local/bin/lamdera
```

## 結果

npm で作成したプロジェクトで、`npx elm-pages dev` により開発サーバを立ち上げられた。

## キーワード

- [[elm|Elm]]
- [[lamdera|Lamdera]]

## 参考

- [elm-pages](https://elm-pages.com/)
- [Lamdera - Download](https://dashboard.lamdera.app/docs/download#os-x)
