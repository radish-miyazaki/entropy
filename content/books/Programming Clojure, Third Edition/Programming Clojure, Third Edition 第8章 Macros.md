---
title: Programming Clojure, Third Edition 第8章 Macros
description: マクロを書くべき場面のルール、unless や chain を例にした構文クォートと auto-gensym を使うマクロの書き方、特殊形式を起点にしたマクロの分類を学ぶ章
tags: [book-chapter, clojure]
date: 2023-09-16
book: "[[Programming Clojure, Third Edition]]"
chapter: 8
---

## TL;DR

- マクロは複雑なので、関数で実現できるなら書かない。パターンをカプセル化する唯一の方法であるときと、呼び出し側が楽になるときに書く。
- マクロは構文クォート、アンクォート、スプライシングアンクォートでテンプレートのように書き、ローカルな名前には auto-gensym を使ってシンボルの捕捉を避ける。
- カプセル化できないパターンは特殊形式のまわりに起きる。マクロは条件的な評価、var の定義、Java の呼び出し、評価の遅延、評価を包む、lambda を避ける、のカテゴリに分類できる。

## 内容

[[clojure|Clojure]] の[[macro|マクロ]]をいつ書くべきか、どう書くか、どんな種類があるかを扱う。各節のまとめは次のページにある。

- [[Programming Clojure, Third Edition 第8章 いつマクロを使うべきか]]
- [[Programming Clojure, Third Edition 第8章 フロー制御のマクロを書く]]
- [[Programming Clojure, Third Edition 第8章 マクロを簡単にする]]
- [[Programming Clojure, Third Edition 第8章 マクロの分類学]]

## キーワード

- [[macro|マクロ]]
- [[special-form|特殊形式]]
- [[syntax-quote|構文クォート]]
- [[unquote|アンクォート]]
- [[gensym|gensym]]
- [[hygienic-macro|衛生的マクロ]]
- [[design-pattern|デザインパターン]]
- [[lazy-evaluation|遅延評価]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
