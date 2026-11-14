---
title: Rationale（Clojure をつくったわけ）
description: Rich Hickey が Clojure を作った理由を、Lisp・関数型・JVM との共生・並行処理の 4 つの要求から説明した文書
tags: [article, clojure]
date: 2024-01-14
article-authors: [Rich Hickey]
site: Clojure
published:
url: https://clojure.org/about/rationale
---

## TL;DR

Rich Hickey が [[clojure|Clojure]] を作った理由を説明した文書。Lisp であり、関数型で、確立されたプラットフォームと共生し、並行処理のために設計された言語が既存の言語に見つからなかったので、Clojure を作った。

## 内容

Rich Hickey は、次の 4 つを兼ね備えた言語を求めたが、既存の言語には見つからなかった。

- [[lisp|Lisp]] であること: 小さなコアと、コードをデータとして扱う考え方を評価した。そのうえで、後方互換性に縛られない現代的な Lisp を目指した
- [[functional-programming|関数型プログラミング]]のための言語であること: 変更可能なデータ構造を危険とみなし、不変で永続的なデータ構造を使う
- 確立されたプラットフォームと共生すること: 独自のランタイムを定義せず、利用者がすでに信頼している [[jvm|JVM]] の上で動く
- 並行処理のために設計されていること: 不変性で多くの困難を取り除き、残る状態の変更には Software Transactional Memory とエージェントを使う

公式サイトでは、Clojure を「強力な並行処理のサポートを持つ、JVM のための関数型 Lisp」とまとめている。

原文は Clojure の公式サイトにあり、[日本語訳](https://www.geidai.ac.jp/~marui/clojure/rationale/)と [Clojure 日本語ドキュメントのページ](https://japan-clojurians.github.io/clojure-site-ja/about/rationale)もある。

## キーワード

- [[clojure|Clojure]]
- [[lisp|Lisp]]
- [[functional-programming|関数型プログラミング]]
- [[jvm|JVM]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]
- Rich Hickey
