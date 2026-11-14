---
title: LFE
aliases: []
description: BEAM（Erlang VM）上で動く Lisp。Lisp Flavoured Erlang の略
tags: [word, プログラミング言語]
date: 2024-07-31
---

## TL;DR

Lisp Flavoured Erlang の略。名前のとおり、[[beam|BEAM]]（Erlang VM）上で動く [[lisp|Lisp]] である。[[java|Java]] に対する [[clojure|Clojure]] のような位置づけにある。

## なぜ必要か

公式サイトは「気軽な Lisp ではなく、分散アプリケーションを作りたい人のための Lisp」と説明している。[[erlang|Erlang]] の耐障害性や高い並行性、[[otp|OTP]] との統合を、Lisp の構文で使える。

## 仕組み

関数と変数の名前空間が分かれた Lisp-2 であり、マクロや同図像性（homoiconicity）を持つ。REPL の中で関数やマクロを定義できる。Erlang と同じく、グローバルな値や変更可能なデータを持たず、ガード付きのパターンマッチやホットコードアップグレードを使える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[erlang|Erlang]]
- [[elixir|Elixir]]
- [[gleam|Gleam]]
- [[clojure|Clojure]]

## 出典

- [LFE](https://lfe.io/)
- [LFE (programming language) - Wikipedia](<https://en.wikipedia.org/wiki/LFE_(programming_language)>)
