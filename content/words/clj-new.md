---
title: clj-new
aliases: []
description: Clojure CLI だけで、Leiningen などのテンプレートから Clojure のプロジェクトを作るツール
tags: [word, clojure, clojure-cli]
date: 2024-11-27
---

## TL;DR

[[clojure|Clojure]] のプロジェクトを作るツールである。[[leiningen|Leiningen]]、Boot、clj-template のテンプレートから、`clojure` コマンド（[[clojure-cli|Clojure CLI]]）だけでプロジェクトを作れる。

## 仕組み

組み込みのテンプレートとして、Hello World のアプリケーションを作る `app`、ライブラリを作る `lib`、自分のテンプレートを作る `template` がある。

## 例

ツールとしてインストールした後、次のように実行する。

```sh
clojure -Tclj-new app :name myname/myapp
clojure -Tclj-new lib :name myname/mylib
```

## 注意点

作者は、tools.build をもとにした、より新しくシンプルな deps-new を勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure-cli|Clojure CLI]]
- [[leiningen|Leiningen]]
- [[antq|Antq]]

## 出典

- [seancorfield/clj-new - GitHub](https://github.com/seancorfield/clj-new)
