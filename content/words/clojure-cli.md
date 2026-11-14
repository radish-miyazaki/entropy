---
title: Clojure CLI
aliases: []
description: deps.edn を読んで依存関係を解決し、Clojure のプログラムやツールを実行するコマンドラインツール
tags: [word, clojure]
date: 2024-11-27
---

## TL;DR

[[clojure|Clojure]] のプログラムを JVM 上で実行するためのコマンドラインツール。`clojure` または `clj` で呼び出し、`deps.edn` に書いた依存関係からクラスパスを組み立てる。

## 仕組み

`deps.edn` は依存関係、パス、エイリアスを宣言する EDN 形式の設定ファイルである。エイリアスはキーワードで名前を付けた追加の設定で、`-A:test:dev` のように指定して適用する。`clj` は `clojure` に `rlwrap` を加えたもので、REPL での行編集がしやすい。

実行の仕方には次の種類がある。

- 引数なし（`-A` 付きも含む）: REPL を起動する
- `-X`: キーワード引数のマップを受け取る関数を実行する
- `-T`: ツールを実行する。プロジェクトのクラスパスは含まれない
- `-M`: `clojure.main` を実行する（`-m` で main の名前空間を指定するなど）

### ツール

ツールは、プロジェクトのクラスパスとは別に動くライブラリの関数である。名前を付けてインストールしておくと、どのプロジェクトからでも使える。

```sh
# インストール
$ clj -Ttools install io.github.clojure/tools.deps.graph '{:git/tag "v1.0.63"}' :as deps-graph
$ clj -Ttools install-latest :lib io.github.clojure/tools.deps.graph :as deps-graph

# インストール済みのツールの一覧
$ clj -Ttools list
TOOL     LIB                              TYPE  VERSION
antq     com.github.liquidz/antq          :git  2.11.1250
clj-new  com.github.seancorfield/clj-new  :git  v1.3.415
tools    io.github.clojure/tools.tools    :git  v0.3.4
```

ツールのヘルプは `help/doc` で見る。ヘルプの関数は `:deps` エイリアスに組み込まれているので、`-A:deps` を付けて実行する。

```sh
$ clj -A:deps -Tantq help/doc
-------------------------
antq.tool/help
([& _])
-------------------------
antq.tool/outdated
([& [options]])
  ...
```

## 例

上の一覧のように、[[antq|Antq]]（依存関係の更新確認）や [[clj-new]]（テンプレートからのプロジェクト作成）をツールとして入れておける。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]
- [[leiningen|Leiningen]]
- [[antq|Antq]]
- [[clj-new]]

## 出典

- [Clojure CLI Reference](https://clojure.org/reference/clojure_cli)
