---
title: Clojure
aliases: []
description: Rich Hickey が 2007 年に開発した、JVM 上で動く動的型付けの関数型 Lisp 方言
tags: [word, プログラミング言語, 関数型プログラミング]
date: 2024-07-12
---

## TL;DR

2007 年に Rich Hickey が開発した、動的型付けの[[functional-programming|関数型プログラミング]]言語。[[lisp|Lisp]] の方言であり、[[jvm|JVM]] 上で動く。

## なぜ必要か

関数型言語でありながら、[[java|Java]] や [[javascript|JavaScript]] の資産をそのまま利用できる。[[concurrency|並行処理]]のために設計されており、Web 開発に必要なライブラリも一通りそろっている。

## 仕組み

Clojure 本体は JVM 上で動き、[[clojurescript|ClojureScript]] を使えば JavaScript 環境でも動く。.NET 上で動かす [ClojureCLR](https://clojure.org/about/clojureclr) も公式に提供されている。

プロジェクトの構築には、[[leiningen|Leiningen]] か [[clojure-cli|Clojure CLI]] を使う。最近は Clojure CLI が使われることが多い。[[clj-new|cli-new]] を使うと、Leiningen のテンプレートから Clojure CLI のプロジェクトを作成できる。

## 例

日本でも複数の会社が採用している（[採用企業の一覧](https://github.com/athos/japanese-clojure-companies)）。たとえばトヨクモでは、[[めだかのclojure.core学校]]を執筆したエンジニアが働いている。

## 自分の理解

[[common-lisp|Common Lisp]] なども触ったが、Clojure が一番好きである。関数型であること、`let` や関数の引数の書き方など可読性が高いこと、Java や JavaScript の偉大な資産の恩恵を受けられることが理由である。

Web 開発に必要なライブラリが一通りそろっていることは、学習のモチベーションを上げる上で大事である。マイグレーションまわりも言語レベルで統一したいので、Flyway は使いたくない。

## 関連

- [[clojurescript|ClojureScript]]
- [[common-lisp|Common Lisp]]
- [[lisp|Lisp]]
- [[repl-driven-development|REPL駆動開発]]

## 出典

- [ClojureCLR](https://clojure.org/about/clojureclr)
