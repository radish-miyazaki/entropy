---
title: 分割コンパイル
aliases: [separate compilation]
description: 複数のソースファイルをそれぞれ独立にオブジェクトファイルへ変換し、リンカで実行ファイルを作る方式
tags: [word, コンパイラ]
date: 2025-01-24
---

## TL;DR

分割された複数のソースファイルを、それぞれ独立した機械語の集まり（オブジェクトファイル）に変換し、[[linker|リンカ]]で 1 つの実行ファイルを作ること。

## なぜ必要か

ソースファイルの一部を変更したとき、対応するオブジェクトファイルだけを作り直せばよい。作り直したオブジェクトファイルをほかのオブジェクトファイルとリンクして、実行ファイルを再構築する。

## 例

[[rust|Rust]] では、コンパイルの単位は[[crate|クレート]]である。Rust Reference によると、1 回のコンパイルは 1 つのクレートをソースの形で処理し、成功すれば実行ファイルかライブラリのどちらかのバイナリ形式のクレートを 1 つ作る。クレートは、コンパイルとリンクの単位でもある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[linker|リンカ]]
- [[name-mangling|マングリング]]

## 出典

- [[Effective Rust]]
- [Crates and source files - The Rust Reference](https://doc.rust-lang.org/reference/crates-and-source-files.html)
