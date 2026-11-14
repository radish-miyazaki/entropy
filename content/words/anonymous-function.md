---
title: 無名関数
aliases: []
description: 名前（識別子）に束縛されていない関数の定義。高階関数の引数としてよく使う
tags: [word, プログラミング言語]
date: 2026-11-14
---

## TL;DR

名前（識別子）に束縛されていない関数の定義。関数リテラル、ラムダ関数、ブロックとも呼ぶ。[[higher-order-function|高階関数]]に渡す引数としてよく使われる。

## なぜ必要か

一度しか使わない短い処理なら、名前付きの関数を別に定義するより、その場に書いたほうが軽く読みやすい。sort、map、filter、fold などの高階関数に渡して振る舞いを変えるときや、関数を返す高階関数の戻り値を作るときに使う。どの無名関数も名前付きの関数で置き換えられるので、使うかどうかはスタイルの問題である。

## 仕組み

Alonzo Church が 1936 年に考えた[[lambda-calculus|ラムダ計算]]では、すべての関数が無名である。プログラミング言語では、1958 年の Lisp から無名関数が使われている。無名関数が定義された環境の変数を捕まえると、クロージャになる。

## 例

言語ごとに書き方が異なる。

- Python: `lambda x: len(x)`。式しか書けず、文は書けない
- JavaScript: `x => x + 1`（[[arrow-function|アロー関数]]）
- Gleam: `let add_one = fn(a) { a + 1 }`。名前付きの関数と同じく `add_one(1)` で呼び出せる
- Lua: 名前付きの関数と同じく `function ~ end` で書く

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[higher-order-function|高階関数]]
- [[lambda-calculus|ラムダ計算]]
- [[arrow-function|アロー関数]]

## 出典

- [Anonymous function - Wikipedia](https://en.wikipedia.org/wiki/Anonymous_function)
- [[Gleam： Functions]]
- [[omarchy-lua-basics|Omarchy を触る上で知っておきたい最低限の Lua の知識]]
