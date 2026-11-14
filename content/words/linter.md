---
title: リンター
aliases: []
description: ソースコードを実行せずに解析し、バグにつながりやすい書き方やスタイルの問題を指摘するツール
tags: [word, 静的解析]
date: 2026-11-14
---

## TL;DR

ソースコードを実行せずに解析し、バグにつながりやすい書き方やスタイルの問題を指摘するツール。名前は C 言語の静的解析ツール Lint に由来する。

## なぜ必要か

Wikipedia によると、リンターは JavaScript や [[python|Python]] のような動的型付けの言語で特に役に立つ。インタプリタが実行時に課すルールが少ないので、リンターがなければ見過ごされるエラーを見つけられる。

## 仕組み

Lint は 1978 年に Bell Labs の Stephen C. Johnson が作った。使われない変数や関数、値を設定する前に使われる変数、到達できないコード、関数の引数の型の不一致、移植性のないキャストなどを指摘した。

Lint の検査の多くは、後に最適化コンパイラに取り込まれた。現在のリンターは非推奨の呼び出しや書式の問題なども検出する。[[eslint|ESLint]] のように、問題を自動で直せるものもある。

## 例

- [[eslint|ESLint]]: JavaScript
- [[stylelint|Stylelint]]: CSS
- [[revive|revive]]: Go
- [[clippy|Clippy]]: Rust
- [[shellcheck|ShellCheck]]: シェルスクリプト

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[eslint|ESLint]]
- [[prettier|Prettier]]

## 出典

- [Lint (software) - Wikipedia](<https://en.wikipedia.org/wiki/Lint_(software)>)
