---
title: ts-belt
aliases: []
description: TypeScript で関数型プログラミングをするための、高速なユーティリティライブラリ
tags: [word, typescript, fp]
date: 2025-04-30
---

## TL;DR

[[typescript|TypeScript]] で[[functional-programming|関数型プログラミング]]をするための、高速で実用的なユーティリティライブラリ。データを最初の引数に取る書き方で、`Option` と `Result` の型を備えている。

## 仕組み

主な特徴は次のとおり。

- **データを最初の引数に取る**: 公式は、このほうがコードが読みやすいとしている
- **`Option` と `Result`**: 値がないことや処理の結果を、例外に頼らずに表せる
- **イミュータブル**: すべての関数はイミュータブルなデータを返し、副作用を持たない
- **Tree Shaking**: 使わない関数をバンドルから除ける
- **速さ**: ReScript で書かれており、公式のベンチマークでは lodash、[[ramda|Ramda]]、Remeda より速い

TypeScript のほかに Flow にも対応している。モジュールは Array、Boolean、Function、Guards、Number、Object（Dict）、Option、Result、String がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ramda|Ramda]]

## 出典

- [ts-belt](https://mobily.github.io/ts-belt/)
