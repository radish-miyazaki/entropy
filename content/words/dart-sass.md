---
title: Dart Sass
aliases: []
description: Sass の主要な実装。新しい機能はほかの実装より先に入る
tags: [word, css]
date: 2024-09-10
---

## TL;DR

Sass の主要な実装（primary implementation）。新しい機能は、ほかの実装より先に Dart Sass に入る。

## 仕組み

次の形で配布されている。

- スタンドアロンのコマンドラインツール: Dart VM 上で動く。`sass source/index.scss css/index.css` のように使う
- Dart のライブラリ: `pubspec.yaml` に `sass` を追加する
- JavaScript のライブラリ: npm の `sass`（純粋な JavaScript）と `sass-embedded` パッケージ。純粋な JavaScript 版は、スタンドアロン版より遅い
- Embedded Sass プロトコル: ほかの言語から Dart Sass をサブプロセスとして動かす。Node.js、Go、Java、Ruby、Rust、.NET、PHP 向けのラッパーがある

## 注意点

公式サイトのリリース一覧では、LibSass と Ruby Sass は開発が終わった実装として扱われている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- Sass

## 出典

- [Dart Sass](https://sass-lang.com/dart-sass/)
