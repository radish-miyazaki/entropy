---
title: Malli
aliases: []
description: スキーマをデータとして定義し、検証や変換に使う Clojure/ClojureScript のライブラリ
tags: [word, clojure]
date: 2026-11-14
---

## TL;DR

スキーマをデータとして定義する、[[clojure|Clojure]] と [[clojurescript|ClojureScript]] 向けのデータ仕様ライブラリ。metosin が開発しており、README では「高性能でデータ駆動のデータ仕様ライブラリ」と説明されている。

## なぜ必要か

Clojure は動的型付けなので、データの形が正しいかを実行時に確かめる手段が必要になる。たとえば [[biff|Biff]] では、スキーマレスなデータベースの XTDB に対して、Malli でスキーマを明確にし、不正なデータを防いでいる。

## 仕組み

README によると、スキーマはデータとして書き、既定では hiccup に倣ったベクタ構文（`[:string {:min 1, :max 10}]` など）を使う。マップ構文やより簡単な Lite 構文もある。主な機能は次のとおりである。

- 値の検証と変換
- スペルチェック付きのエラーメッセージ
- スキーマからの値の生成と、サンプル値からのスキーマの推論
- 関数スキーマと、その動的・静的なチェック
- JSON Schema や Swagger2 への変換

## 例

README の Quickstart では、定義したスキーマ `User` に対して `m/validate` で値を検証している。

```clojure
(m/validate User *1)
; => true
```

## 注意点

[[ClojureScript (Squint) で React フロントエンド開発 2025 年版|ClojureScript (Squint) で React フロントエンド開発 2025 年版]]によると、[[squint|Squint]] では既存の ClojureScript の資産を使えないので、Malli も使えない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]
- [[biff|Biff]]
- [[zod|Zod]]
- [[effect-schema|Effect Schema]]

## 出典

- [metosin/malli - GitHub](https://github.com/metosin/malli)
