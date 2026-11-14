---
title: FsCheck
aliases: []
description: F# でプロパティベーステストを行うためのテスティングフレームワーク
tags: [word, fsharp, テスト]
date: 2024-07-31
---

## TL;DR

[[fsharp|F#]] で[[property-based-testing|プロパティベーステスト]]を行うための[[testing-framework|テスティングフレームワーク]]。

## 仕組み

関数やメソッド、オブジェクトが満たすべき性質（プロパティ）を書くと、FsCheck がランダムに生成した多数の値でそれを確かめる。テストに使う値の生成器（ジェネレータ）と、失敗した値を小さくする方法（シュリンカ）を柔軟に記述できる。プロパティが成り立たないときは、最小の反例を自動で表示する。

仕様は F# のほか、C# や VB でも書ける。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[property-based-testing|プロパティベーステスト]]
- [[expecto|Expecto]]: FsCheck を使ったプロパティベーステストの API を持つ

## 出典

- [FsCheck](https://fscheck.github.io/FsCheck/)
