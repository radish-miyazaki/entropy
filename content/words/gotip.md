---
title: gotip
aliases: []
description: 開発中の Go を、普段の go コマンドと同じ使い方で試すためのツール
tags: [word, golang]
date: 2024-12-22
---

## TL;DR

開発中の [[go|Go]] をビルドして実行するためのツール。普段の `go` コマンドと同じ使い方で、リリース前の機能を試せる。

## 仕組み

`gotip` をインストールしたあと、`gotip download` で開発ツリーを取り込む。最新の状態に更新したいときも、`gotip download` をもう一度実行する。ブランチ名や CL の番号を渡すと、それを取り込める。

```sh
$ go install golang.org/dl/gotip@latest
$ gotip download          # main ブランチを取り込む
$ gotip download BRANCH   # 別のブランチを取り込む
$ gotip download NUMBER   # 特定の CL を取り込む
```

## 注意点

gotip は既定で `GOTOOLCHAIN=auto` を設定するので、`go env -w` で設定した値の影響を受けない。変えたいときは環境変数の `GOTOOLCHAIN` で上書きする。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [gotip - pkg.go.dev](https://pkg.go.dev/golang.org/dl/gotip)
