---
title: Antq
aliases: []
description: Clojure のプロジェクトで、古くなった依存関係を指摘するツール
tags: [word, clojure, clojure-cli]
date: 2024-11-27
---

## TL;DR

[[clojure|Clojure]] のプロジェクトで、古くなった依存関係を指摘するツールである。`--upgrade` オプションを付けると、依存関係の更新もできる。

## 仕組み

`deps.edn`（[[clojure-cli|Clojure CLI]]）、`shadow-cljs.edn`、`project.clj`（[[leiningen|Leiningen]]）、`build.boot`、`pom.xml`、`bb.edn` のほか、CircleCI や GitHub Actions の設定ファイルも読める。

## 例

プロジェクトのルートで次のコマンドを実行すると、インストールせずに試せる。

```sh
clojure -Sdeps '{:deps {com.github.liquidz/antq {:mvn/version "2.11.1276"}}}' -M -m antq.core
```

普段使うときは、`deps.edn` にエイリアスを追加して `clojure -M:outdated` で実行する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure-cli|Clojure CLI]]
- [[clj-new]]

## 出典

- [liquidz/antq - GitHub](https://github.com/liquidz/antq)
