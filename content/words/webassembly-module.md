---
title: WebAssembly Module
aliases: []
description: ビルドの成果物である WASM ファイル。type、code、function、export、import などのセクションで構成される
tags: [word, webassembly]
date: 2024-10-18
---

## TL;DR

ビルドの成果物である [[webassembly|WebAssembly]] のファイルのこと。

## 仕組み

WebAssembly Module は、次のセクションで構成される。

- **type section**: 関数のシグネチャを定義する
- **code section**: 関数の本体を定義する
- **function section**: type section と code section を結びつけて関数を定義する。定義した関数は、モジュール内の関数から呼ばれるか、モジュールの外から呼ばれる
- **export section**: モジュールの外から呼ばれる関数を定義する
- **import section**: モジュール内で使う、外部の関数を定義する

## 注意点

構造を持つデータの表現を定めていないので、モジュールどうしや JavaScript との間で複雑なデータをやり取りしにくい。これを解決するのが [[webassembly-component-model|WebAssembly Component Model]] である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[webassembly-instance|WebAssembly Instance]]
- [[webassembly-component|WebAssembly Component]]
- [[webassembly-component-model|WebAssembly Component Model]]
- [[wat|WAT]]

## 出典

- [[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]
- [WebAssembly Introduction](https://rsms.me/wasm-intro)
