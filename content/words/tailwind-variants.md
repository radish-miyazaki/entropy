---
title: Tailwind Variants
aliases: []
description: Tailwind CSS のクラスを、型付きのバリアントで再利用できるコンポーネントのスタイルとして定義するライブラリ
tags: [word, tailwind-css]
date: 2025-03-10
---

## TL;DR

[[tailwind-css|Tailwind CSS]] のためのバリアント API。className の条件分岐を手で書く代わりに、型付きのバリアントで、再利用できるコンポーネントのスタイルを定義する。

## 仕組み

ベースのスタイルと、color や size のようなバリアントを定義すると、呼び出し側で型付きの props として使える。結果は普通のクラス文字列なので、React、Vue、Svelte など特定のフレームワークに依存しない。

主な機能は次のとおり。

- デフォルトのバリアント: 既定値を決めて、呼び出し側の記述を短くする
- 複合バリアント: 複数のバリアントの組み合わせに一致したときだけ、追加のクラスを当てる
- スロット: カードやダイアログのような複数の部品からなるコンポーネントを、名前付きのスロットでまとめてスタイリングする
- クラスの衝突の解決: 呼び出し側から渡した `class` や `className` を、tailwind-merge で既存のクラスとマージする
- 拡張: `extend` で、親のスタイルやバリアントを引き継ぐ

## 注意点

CSS-in-JS のライブラリではなく、Tailwind CSS 以外のクラス名を扱うものでもない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[tailwind-css|Tailwind CSS]]

## 出典

- [Tailwind Variants](https://www.tailwind-variants.org/)
