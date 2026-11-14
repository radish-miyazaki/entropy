---
title: 実践プロパティベーステスト ― PropErとErlang/Elixirではじめよう
aliases: [実践プロパティベーステスト, "Property-Based Testing with PropEr, Erlang, and Elixir"]
description: Erlang/Elixir の PropEr を使い、プロパティベーステストの基礎からステートフルなシステムへの応用までを学ぶ本
tags: [book, elixir, erlang, proper, propcheck]
date: 2025-03-05
book-authors: []
publisher: ラムダノート
isbn:
---

## TL;DR

- [[property-based-testing|プロパティベーステスト]]は、大量のテストケースを自動生成して実行し、どんな入力でどんな問題が起きるかを調べるテスト手法である。人間が書くのは「入力に対してコードが返すべき値」ではなく、「入力に対するコードの振る舞い」を表す実行可能なコード（プロパティ）である。
- 本書は [[erlang|Erlang]] / [[elixir|Elixir]] のフレームワーク PropEr を使い、基礎から、互いに独立でないテストケースや状態に依存するシステムに対するテストまでを扱う。

## 目次

第 I 部 基礎

1. 第1章 プロパティベーステストの基礎
2. 第2章 プロパティを書く
3. 第3章 プロパティで考える
4. 第4章 カスタムジェネレーター

第 II 部 実践で学ぶステートレスプロパティ

5. 第5章 信頼できるテスト
6. 第6章 プロパティ駆動開発
7. 第7章 収縮
8. 第8章 標的型プロパティ

第 III 部 ステートフルプロパティ

9. 第9章 ステートフルプロパティ
10. 第10章 ケーススタディ：書籍の貸出システム
11. 第11章 有限状態機械プロパティ

%%

## 感想

全体を通しての評価や気づき。書くときはこのコメントを外す
%%

## 関連

- [[property-based-testing|プロパティベーステスト]]
- [[erlang|Erlang]]
- [[elixir|Elixir]]
- [ラムダノートの書籍ページ](https://www.lambdanote.com/collections/proper-erlang-elixir)
- [原著 Property-Based Testing with PropEr, Erlang, and Elixir](https://pragprog.com/titles/fhproper/property-based-testing-with-proper-erlang-and-elixir/)
- [propertesting.com](https://propertesting.com/toc.html)
