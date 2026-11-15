---
title: Programming Clojure, Third Edition › Clojure におけるモデルのまとめ
description: ref、atom、agent は直前の状態を更新関数に渡す統一された更新モデルに従い、これに var と Java のロックを加えた 5 つのモデルを用途ごとに使い分ける
tags: [book-chapter, clojure]
date: 2023-09-05
book: "[[Programming Clojure, Third Edition]]"
chapter: 6
---

## TL;DR

- ref、atom、agent は、直前の状態を更新関数に渡して新しい状態を得る、統一された更新モデルに従う。`commute` や `send` は最適化のための補助関数である。
- ref、atom、agent、var に Java のロックを加えた 5 つのモデルを、協調的か、同期的か、更新中に使える関数で使い分ける。

## 内容

### 統一された更新モデル

ref、atom、agent はいずれも、自身の**直前の状態を更新関数に渡して、新しい状態を得る**という機能を持っていた。この統一されたモデルが [[clojure|Clojure]] の中心となる概念の一つである。

統一モデルに従う関数と、その他の補助関数を次にまとめる。

| 更新方法               | ref       | atom     | agent      |
| ---------------------- | --------- | -------- | ---------- |
| 統一的な更新関数       | `alter`   | `swap!`  | `send-off` |
| 交換可能な関数         | `commute` | N/A      | N/A        |
| ブロックしない関数     | N/A       | N/A      | `send`     |
| 値を設定するだけの関数 | `ref-set` | `reset!` | N/A        |

「統一的な更新関数」が ref、atom、agent を更新する最も基本的な方法である。一方、補助関数（`commute`、`send`）は最適化のために使い、使うかどうかは任意である。

### Clojure におけるモデルのまとめ

ここまで、ref、atom、agent、var という Clojure の 4 つのモデルを見てきた。Clojure は Java 上で動いているので、Java のロックを基本としたモデルを使うこともできる。これを表にまとめる。

| モデル        | 用途                           | 更新中に使える関数 |
| ------------- | ------------------------------ | ------------------ |
| ref と STM    | 協調的、同期的な更新           | 純粋               |
| atom          | 非協調的、同期的な更新         | 純粋               |
| agent         | 非協調的、非同期的な更新       | すべて             |
| var           | スレッドローカルな動的スコープ | すべて             |
| Java のロック | 協調的、同期的な更新           | すべて             |

## キーワード

- [[clojure-ref|ref]]
- [[clojure-atom|atom]]
- [[clojure-agent|agent]]
- [[clojure-var|var]]
- [[software-transactional-memory|STM]]
- [[mutex|ロック]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
