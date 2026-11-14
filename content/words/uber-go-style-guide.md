---
title: Uber Go Style Guide
aliases: []
description: Uber 社内の Go のコードで使われているパターンと規約をまとめたスタイルガイド
tags: [word, go, uber]
date: 2024-09-27
---

## TL;DR

Uber 社内の [[go|Go]] のコードで使われているパターンと規約をまとめたスタイルガイド。Go のコードを書くときにすべきこと、すべきでないことを詳しく説明している。

## なぜ必要か

ガイドによれば、ここでいう「スタイル」はソースコードの整形だけを指すのではない。整形は gofmt が担ってくれる。このガイドの目的は、エンジニアが Go の言語機能を生産的に使いながら、コードベースを管理しやすく保つことにある。

## 仕組み

ガイドは、Guidelines、Performance、Style、Patterns、Linting の節に分かれている。もとは Prashant Varanasi と Simon Newton が、同僚が Go を学ぶ助けとして書いたもので、フィードバックを受けて改訂されてきた。Effective Go、Go Common Mistakes、Go Code Review Comments を土台にしている。

## 例

ガイドには、たとえば次のような規約がある。

- インタフェースへのポインタはほぼ使わない。インタフェースは値として渡す（Pointers to Interfaces）
- `var _ http.Handler = (*Handler)(nil)` のように書き、型がインタフェースを満たすことをコンパイル時に確かめる（Verify Interface Compliance）
- エラーは一度だけ処理する。ログに出したうえで返すと、呼び出し元でも同じことが起き、ログが重複する（Handle Errors Once）
- 本番のコードでは [[panic|panic]] を避け、エラーを返して呼び出し側に処理を任せる（Don't Panic）
- 値と文字列の変換には `fmt` より速い `strconv` を使う（Prefer strconv over fmt）

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[when-in-go|Go に入っては Go に従え]]

## 出典

- [Uber Go Style Guide](https://github.com/uber-go/guide/blob/master/style.md)
- [日本語訳](https://github.com/knsh14/uber-style-guide-ja/blob/master/guide.md)
