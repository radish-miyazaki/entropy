---
title: Swift
aliases: []
description: 安全、高速、表現力の高さを目指した汎用プログラミング言語
tags: [word, プログラミング言語, swift]
date: 2026-11-14
---

## TL;DR

初心者にも扱いやすく、熟練者にも強力であることを目指した汎用プログラミング言語。システムプログラミングから、モバイル・デスクトップのアプリ、クラウドのサービスまでを対象にしている。

## なぜ必要か

[Swift.org](https://www.swift.org/about/) によると、Swift は C 系の言語より安全になるよう設計されている。変数は使う前に初期化しなければならず、オブジェクトはデフォルトで `nil` になれないので、`nil` のオブジェクトを作ったり使ったりするコードはコンパイラが拒否する。性能は C 系の言語に匹敵することを目指している。

## 仕組み

主な機能に、型推論、`nil` の可能性を明示するオプショナル、ジェネリクス、プロトコル、クロージャ、`do`・`guard`・`defer` によるエラー処理と制御フロー、自動のメモリ管理がある。Apple のプラットフォームのほか、Linux や Windows でも動き、Android、[[webassembly|WebAssembly]]、組み込みシステムも対象にしている。2015 年 12 月 3 日に、Apache 2.0 ライセンスでオープンソースになった。

## 例

[[swiftwasm|SwiftWasm]] は Swift のコードを WebAssembly にコンパイルするツールである。Goodnotes は Swift で書かれた iOS アプリを SwiftWasm で Web などに展開した。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[swiftwasm|SwiftWasm]]
- [[webassembly|WebAssembly]]
- [[kotlin|Kotlin]]

## 出典

- [About Swift - Swift.org](https://www.swift.org/about/)
