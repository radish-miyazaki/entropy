---
title: REPL駆動開発
aliases: []
description: REPL で動いているプログラムと対話し、式を 1 つずつ評価しながら開発するやり方
tags: [word, clojure, common-lisp]
date: 2024-01-08
---

## TL;DR

REPL（Read-Eval-Print Loop）で動いているプログラムと対話し、式を 1 つずつ評価しながらプログラムを作っていく開発のやり方。[[clojure|Clojure]] や [[common-lisp|Common Lisp]] でよく使われる。

## なぜ必要か

Clojure の公式ガイドによると、多くの Clojure のプログラマは、REPL がもたらす短いフィードバックループを、Clojure を使う一番の理由に挙げている。プログラマが求めるのは、手作業だけのツールでも、すべて自動化したスクリプトでも得られない、自動化と即興の組み合わせである。

## 仕組み

Clojure の公式ガイドでは、REPL を、動いている Clojure のプログラムと対話し、コードの式を 1 つずつ評価してプログラムを書き換えられる環境と説明している。新しい機能を作るときは、自分がコンピュータになったつもりで小さな作業を手で行い、それを少しずつ自動化していく。デバッグでは、問題をすばやく再現し、症状を観察し、実験を重ねて原因を絞り込める。

REPL は、開発環境の起動、テストの実行、一度だけのデータベースへの問い合わせ、リモートのマシンの操作、ライブラリや API の学習などにも使われる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]
- [[common-lisp|Common Lisp]]

## 出典

- [Programming at the REPL: Introduction - Clojure](https://clojure.org/guides/repl/introduction)
- [REPL Driven Programming](https://tyano.shelfinc.com/post/48110396231/repl-driven-programming)
