---
title: Replicant
aliases: []
description: 純粋関数とただのデータで UI を組み立てる、Clojure の UI ライブラリ
tags: [word, clojurescript]
date: 2026-01-31
---

## TL;DR

[[clojure|Clojure]] と [[clojurescript|ClojureScript]] で UI を作るためのライブラリ。純粋関数とただのデータで UI を組み立て、描画をドメインのロジックや状態から切り離す。

## なぜ必要か

UI が純粋関数で作られるので、データを渡して出力を確かめるだけでテストでき、ブラウザの自動操作がいらない。

## 仕組み

ビューは [[hiccup|Hiccup]] で書く。Hiccup はベクタ、キーワード、マップ、文字列といった Clojure のデータリテラルなので、追加のビルドの手順はいらない。Replicant は、Hiccup をサーバーで描画することも、ブラウザで DOM を更新することもできる。

状態を持つコンポーネントの仕組みを提供しない。UI の部品は Hiccup を返すただの関数なので、サーバーでもクライアントでも動く。イベントハンドラもデータとして書けるので、1 つのグローバルなハンドラでまとめて処理できる。

状態管理の仕組みも持たない。描画のたびにルートからドメインのデータを使って UI 全体を作り直す。atom、サブスクリプション、部分木だけの描画、コンポーネントのローカルな状態はない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[hiccup|Hiccup]]
- [[reagent|Reagent]]
- [[react|React]]

## 出典

- [Replicant（公式サイト）](https://replicant.fun/)
