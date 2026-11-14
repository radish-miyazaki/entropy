---
title: Spago
aliases: []
description: PureScript の公式パッケージマネージャ
tags: [word, purescript]
date: 2024-10-19
---

## TL;DR

[[purescript|PureScript]] の公式パッケージマネージャ。

## 仕組み

npm でインストールする。事前に `npm install -g purescript` で PureScript のコンパイラを入れておく。

```sh
$ npm install -g spago
$ spago --version
0.21.0
```

`spago init` は PureScript のプロジェクトを作成する。`npm init` に当たるコマンドである。

```sh
$ mkdir purescript-book
$ cd purescript-book
$ spago init
$ tree .
.
├── packages.dhall
├── spago.dhall
├── src
│   └── Main.purs
└── test
    └── Main.purs
```

- `packages.dhall`: Spago の設定ファイル
- `spago.dhall`: 依存するライブラリを書く
- `src/Main.purs`: プロジェクトのエントリポイントになるモジュール
- `test/Main.purs`: `src/Main.purs` のテスト

## 注意点

上の内容は Spago 0.21.0 で確かめたものである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[purescript|PureScript]]
- [[PureScript by Example]]

## 出典

- [purescript/spago](https://github.com/purescript/spago)
