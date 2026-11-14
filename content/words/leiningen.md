---
title: Leiningen
aliases: []
description: Clojure のプロジェクトを自動化するためのビルドツール
tags: [word, clojure]
date: 2024-08-01
---

## TL;DR

[[clojure|Clojure]] のプロジェクトを自動化するためのツール。公式サイトでは「Clojure を使う最も簡単な方法」とされている。

## 仕組み

プロジェクトの設定は `project.clj` に宣言的に書く。このファイルは、プロジェクト名とバージョンを受け取る `defproject` フォームで始まる。説明（`:description`）、依存ライブラリとそのバージョン（`:dependencies`）、エントリポイントの名前空間（`:main`）などを指定する。

使い方は `lein help tutorial` でチュートリアルを、`lein help $TASK` で各タスクの説明を見られる。

## 例

公式サイトに載っている `project.clj` の例を示す。

```clojure
(defproject leiningen.org "1.0.0"
  :description "Generate site for https://leiningen.org"
  :dependencies [[enlive "1.0.1"]
                 [cheshire "4.0.0"]
                 [org.markdownj/markdownj "0.3.0"]]
  :main leiningen.web)
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]
- [[clojure-cli|Clojure CLI]]

## 出典

- [Leiningen](https://leiningen.org/)
