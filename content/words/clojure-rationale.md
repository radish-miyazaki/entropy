---
title: Clojure をつくったわけ
aliases: []
description: Rich Hickey が Clojure を作った理由を説明した文書
tags: [word, clojure]
date: 2024-01-14
---

## TL;DR

[[rich-hickey|Rich Hickey]] が [[clojure|Clojure]] を作った理由を説明した文書「Rationale」。原文は Clojure の公式サイトにあり、日本語訳もある。

## 仕組み

Rich Hickey は、次の 4 つを兼ね備えた言語を求めたが、既存の言語には見つからなかった。

- **[[lisp|Lisp]] であること**: 小さなコアと、コードをデータとして扱う考え方を評価した。そのうえで、後方互換性に縛られない現代的な Lisp を目指した
- **[[functional-programming|関数型プログラミング]]のための言語であること**: 変更可能なデータ構造を危険とみなし、不変で永続的なデータ構造を使う
- **確立されたプラットフォームと共生すること**: 独自のランタイムを定義せず、利用者がすでに信頼している [[jvm|JVM]] の上で動く
- **並行処理のために設計されていること**: 不変性で多くの困難を取り除き、残る状態の変更には Software Transactional Memory とエージェントを使う

公式サイトでは、Clojure を「強力な並行処理のサポートを持つ、JVM のための関数型 Lisp」とまとめている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]

## 出典

- [Clojure をつくったわけ（日本語訳）](https://www.geidai.ac.jp/~marui/clojure/rationale/)
- [Rationale - Clojure](https://clojure.org/about/rationale)
- [Rationale - Clojure 日本語ドキュメント](https://japan-clojurians.github.io/clojure-site-ja/about/rationale)
