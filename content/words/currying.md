---
title: カリー化
aliases: []
description: 複数の引数を取る関数を、最初の引数を受け取って残りの引数を取る関数を返す関数に変換すること
tags: [word, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

複数の引数を取る関数を、最初の引数を受け取り、残りの引数を取る関数を返す関数に変換すること。逆の変換をアンカリー化と呼ぶ。

## 仕組み

Wikipedia によると、ML や [[haskell|Haskell]] では、関数は常に 1 つの引数しか取らない。複数の引数を取る関数は、1 引数の関数を入れ子にしたものの糖衣構文にすぎない。[[Domain Modeling Made Functional 第8章 ものとしての関数|Domain Modeling Made Functional 第8章]] によると、[[fsharp|F#]] の関数もすべてカリー化されている。

名前は論理学者ハスケル・カリーにちなんでクリストファー・ストレイチーが付けたが、実際に考案したのはモーゼス・シェーンフィンケルとゴットロープ・フレーゲである。

## 例

- [[ramda|Ramda]] の関数は自動でカリー化されており、後ろの引数を省くと、残りの引数を受け取る新しい関数が返る
- [[effect-ts|Effect]] の多くの API は、引数をまとめて渡す書き方とカリー化した書き方の両方に対応している（[[effect-dual-api|Dual API]]）
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目28 クラスやカリー化を使って型パラメーターを段階的に割り当てる|Effective TypeScript 項目28]] では、型パラメータの一部だけを明示したいときに、カリー化で段階的に割り当てる

## 注意点

カリー化と部分適用はよく混同されるが、別の概念である。部分適用は関数の一部の引数に実際の値を与える操作で、カリー化は関数の形を変換するだけで引数への適用までは行わない。Domain Modeling Made Functional では、F# の部分適用をワークフローでの[[dependency-injection|依存性の注入]]に使っている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[functional-programming|関数型プログラミング]]
- [[higher-order-function|高階関数]]
- [[effect-dual-api|Dual API]]

## 出典

- [[Domain Modeling Made Functional 第8章 ものとしての関数|Domain Modeling Made Functional 第8章]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目28 クラスやカリー化を使って型パラメーターを段階的に割り当てる|Effective TypeScript 項目28]]
- [カリー化 - Wikipedia](https://ja.wikipedia.org/wiki/カリー化)
