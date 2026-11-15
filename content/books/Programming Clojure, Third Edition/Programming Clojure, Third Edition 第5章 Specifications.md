---
title: Programming Clojure, Third Edition › Specifications
description: Clojure 1.9 で入った spec で、データ構造や関数の入出力の仕様を定義し、データの検証、関数の引数のチェック、自動生成テストに使う章
tags: [book-chapter, clojure]
date: 2023-09-02
book: "[[Programming Clojure, Third Edition]]"
chapter: 5
---

## TL;DR

- 汎用的なコレクションでデータを表す Clojure のコードは、明示的な型が不足して理解しづらい。Clojure 1.9 で入った spec は、データ構造や関数の入出力の仕様を書いて、暗黙的な構造を明示的にする。
- spec は述語を組み合わせて定義し、データの検証と無効な理由の説明、`s/fdef` による関数の引数のチェック、サンプルデータの生成、自動生成テストに使える。

## 内容

[[clojure-spec|spec]] の定義と実行時の利用、spec を組み合わせたデータ検証、`s/fdef` による関数の引数のチェックとテストの自動生成を順に見ていく。各節のまとめは次のページにある。

- [[Programming Clojure, Third Edition 第5章 はじめに]]
- [[Programming Clojure, Third Edition 第5章 spec を定義する]]
- [[Programming Clojure, Third Edition 第5章 データを検証する]]
- [[Programming Clojure, Third Edition 第5章 関数を検証する]]
- [[Programming Clojure, Third Edition 第5章 関数の自動生成テスト]]

## キーワード

- [[clojure-spec|spec]]
- [[dynamic-typing|動的型付け]]
- [[static-typing|静的型付け]]
- [[predicate|述語]]
- [[tuple|タプル]]
- [[arity|アリティ]]
- [[higher-order-function|高階関数]]
- [[instrumentation|インストゥルメント化]]
- [[property-based-testing|プロパティベーステスト]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
