---
title: ClojureScript
aliases: []
description: Clojure で書いたコードを JavaScript にコンパイルする altJS の一種
tags: [word, clojure, プログラミング言語]
date: 2024-01-07
---

## TL;DR

[[clojure|Clojure]] で書いたコードを [[javascript|JavaScript]] にコンパイルする altJS の一種。[[shadow-cljs]] などのツールを使ってコンパイルする。

## なぜ必要か

公式サイトの Rationale によると、ブラウザのように JavaScript しかプログラムできない環境は多い。一方で、JavaScript で堅牢なプログラムを書くには、多くの規律と慣習が必要になる。JavaScript は広く使われていて置き換えられないので、ClojureScript は JavaScript を出力の対象とし、書く言語を堅牢で簡潔な Clojure に置き換える。これで、Clojure のデータ構造や関数型プログラミング、マクロを、JavaScript が動くあらゆる環境で使える。

## 仕組み

公式サイトでは、ClojureScript を「JavaScript をターゲットとする Clojure のコンパイラ」と説明している。出力するコードは、Google Closure Compiler の高度な最適化モードに合わせて作られている。JavaScript が動く環境の広さ、Clojure の対話的な開発、Google Closure によるプログラム全体の最適化を組み合わせている。アプリケーションはライブラリのコードをすべて使うことはまれなので、プログラム全体を最適化して使われないコードを取り除けば、出力の大きさはアプリケーションが実際に使う分だけで済む。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]
- [[shadow-cljs]]
- [[reagent|Reagent]]

## 出典

- [ClojureScript](https://clojurescript.org/)
- [Rationale - ClojureScript](https://clojurescript.org/about/rationale)
