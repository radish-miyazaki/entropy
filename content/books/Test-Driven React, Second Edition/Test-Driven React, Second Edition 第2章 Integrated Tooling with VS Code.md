---
title: Test-Driven React, Second Edition 第2章 Integrated Tooling with VS Code
aliases: [Integrated Tooling with VS Code]
description: TDD の迅速な反復を支えるため、TypeScript、ESLint、Prettier、Wallaby を VS Code に統合して自動で即座にフィードバックを得る章
tags: [book-chapter]
date: 2024-08-29
book: "[[Test-Driven React, Second Edition]]"
chapter: 2
---

## TL;DR

- TDD の迅速な反復には、自動化された待ち時間のないフィードバックが欠かせない。
- [[visual-studio-code|Visual Studio Code]] に型チェック、リンター、フォーマッター、テストランナーを統合して、それを実現する。

## 内容

[[Test-Driven React, Second Edition 第1章 Test-Driven Development with Jest|第1章]]で見たとおり、[[test-driven-development|TDD]] の本質は「迅速な反復」である。そのためには、機能を小さな部品に分け、部品を 1 つ置くたびにフィードバックを得ることが重要になる。このフィードバックは、理想的には自動化されていて、待ち時間がないべきである。

この章では、[[visual-studio-code|Visual Studio Code]] に次のツールを統合して、これを実現する。

- [[typescript|TypeScript]]: 変数が型に合った使われ方をしているかをチェックする
- [[eslint|ESLint]]: よくあるミスやコードスタイルの問題を見つける
- [[prettier|Prettier]]: コードを自動でフォーマットする
- [[wallaby|Wallaby]]: コードとテストの間のギャップを埋め、リアルタイムでフィードバックを返す

テストが通るかを確かめるたびにコマンドを実行しなければならないのは、コードとテストの間にギャップがあるからである。Wallaby はこのギャップを埋め、コマンドを打たなくてもフィードバックが返ってくるようにする。

## キーワード

- [[visual-studio-code|Visual Studio Code]]
- [[typescript|TypeScript]]
- [[eslint|ESLint]]
- [[prettier|Prettier]]
- [[wallaby|Wallaby]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
