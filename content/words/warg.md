---
title: Warg
aliases: []
description: WebAssembly のパッケージを配布するための、開発中のオープンソースのレジストリプロトコル
tags: [word, webassembly]
date: 2024-10-18
---

## TL;DR

ライブラリとして作った [[webassembly-component|WebAssembly Component]] などを配布するためのプロトコル。[[bytecode-alliance|Bytecode Alliance]] が開発している。

## 仕組み

公式サイトによると、Warg は WebAssembly のパッケージのためのオープンソースのレジストリプロトコルで、まだ開発中である。インデックスを提供し、複数のレジストリにまたがる名前空間のパッケージを参照できるようにする。パッケージには、Component のようなコードと、[[wit|WIT]] の world のようなインタフェースの定義の両方を含められる。

次の方針を掲げている。

- [[webassembly-component-model|Component Model]] に合わせ、パッケージに標準的な名前とバージョンを付ける
- 独立したレジストリがそれぞれの名前空間を管理し、互いに参照できる
- パッケージの中身をどこにどう保存するかは決めない
- Certificate Transparency にならった「Package Transparency」で、サプライチェーンの安全性を高める

## 例

Warg を使えるレジストリには、[[wa-dev|wa.dev]] と、Bytecode Alliance が提供するリファレンス実装の [WebAssembly Registry](https://github.com/bytecodealliance/registry/) がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[wa-dev|wa.dev]]
- [[cargo-component]]

## 出典

- [Warg](https://warg.io/)
