---
title: Lisp
aliases: []
description: 1958 年に John McCarthy が開発を始めた、括弧で囲んだ前置記法を特徴とするプログラミング言語の系統
tags: [word, プログラミング言語]
date: 2026-11-14
---

## TL;DR

1958 年に John McCarthy が MIT で開発を始めた、プログラミング言語の系統。すべてを括弧で囲んだ前置記法を特徴とし、今も使われている高水準言語としては Fortran に次いで古い。名前は List Processor に由来する。

## 仕組み

コードは S 式（括弧で囲んだリスト）で書き、先頭に関数名、続けて引数を並べる。プログラム自体が、プログラムが操作するリストでできているので、ソースコードをデータとして扱える。これにより、マクロで新しい構文やドメイン固有言語を作れる。

Wikipedia によると、Lisp は木構造のデータ、自動的な[[garbage-collection|ガベージコレクション]]、動的型付け、[[higher-order-function|高階関数]]、再帰、REPL などを先駆けて取り入れた。

## 例

主な方言には [[common-lisp|Common Lisp]]、[[scheme|Scheme]]、[[racket|Racket]]、[[clojure|Clojure]] があり、スクリプト用には Emacs Lisp がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[common-lisp|Common Lisp]]
- [[scheme|Scheme]]
- [[racket|Racket]]
- [[clojure|Clojure]]
- [[lfe|LFE]]
- [[hygienic-macro|衛生的マクロ]]

## 出典

- [Lisp (programming language) - Wikipedia](<https://en.wikipedia.org/wiki/Lisp_(programming_language)>)
