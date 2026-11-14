---
title: Squint
aliases: []
description: コンパイラと標準ライブラリを備えた、ClojureScript の軽量な方言
tags: [word, clojure]
date: 2025-05-16
---

## TL;DR

> Squint is a light-weight dialect of ClojureScript with a compiler and standard library.

コンパイラと標準ライブラリを備えた、[[clojurescript|ClojureScript]] の軽量な方言。[[javascript|JavaScript]] とのやり取りの軽さやバンドルサイズを重視している。

## なぜ必要か

ClojureScript の完全な代わりではなく、小さな JavaScript を生成したい場面に向いている。公式では、Cloudflare Workers、Node.js のスクリプト、GitHub Actions などを用途に挙げている。

## 仕組み

標準ライブラリは ClojureScript のものではなく、一部を再実装した `squint-cljs/core.js` を使う。データ構造は JavaScript の組み込みのものだけで、マップはオブジェクト、ベクターは配列になる。キーワードは文字列に変換される。`assoc` や `conj` は浅いコピーを返し、`assoc!` や `conj!` はその場で書き換える。出力は ES モジュールで、既定の拡張子は `.mjs`。設定はプロジェクトのルートの `squint.edn` に書く。

`npm install squint-cljs` で入れ、`npx squint run example.cljs` でコンパイルと実行をまとめて行える。[[vite|Vite]] のプラグインや [[react|React]] 向けの例もある。ClojureScript と同じ標準ライブラリやデータ構造の挙動がほしいときは、同じ作者の [Cherry](https://github.com/squint-cljs/cherry) が案内されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojurescript|ClojureScript]]
- [[clojure|Clojure]]
- [[try-squint|Squint を触ってみる]]
- [[squint-react-vite|Squint + React + Vite のプロジェクトを作成する]]
- [[squint-react-vite-tailwind|Squint + React + Vite のプロジェクトに Tailwind CSS を導入する]]
- [[ClojureScript (Squint) で React フロントエンド開発 2025 年版]]

## 出典

- [squint-cljs/squint](https://github.com/squint-cljs/squint)
