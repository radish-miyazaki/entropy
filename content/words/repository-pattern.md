---
title: リポジトリパターン
aliases: []
description: ミュータブルを前提としたオブジェクト指向プログラミングで、永続化を隠蔽するためのパターン
tags: [word]
date: 2024-08-09
---

## TL;DR

ミュータブルを前提とした[[object-oriented-programming|オブジェクト指向プログラミング]]において、[[persistence|永続化]]を隠蔽するためのパターン。エリック・エヴァンスのドメイン駆動設計で、データベースにアクセスするためのパターンとして紹介されている。

## なぜ必要か

Martin Fowler の『Patterns of Enterprise Application Architecture』によると、この層を足すと、重複するクエリのロジックを減らせる。ドメインとデータマッピングをきれいに分け、依存を一方向にでき、永続化の層をよりオブジェクト指向的に扱える。

## 仕組み

Martin Fowler の定義では、リポジトリは、ドメインの層とデータマッピングの層の間を、[[domain-object|ドメインオブジェクト]]を扱うコレクションのようなインタフェースで仲介する。メモリ上にあるドメインオブジェクトのコレクションのように振る舞う。クライアントはクエリの条件を宣言的に組み立ててリポジトリに渡し、データのマッピングはリポジトリが受け持つ。

## 注意点

[[functional-programming|関数型プログラミング]]では、このパターンを採用する必要はない。すべてを関数としてモデリングし、[[Domain Modeling Made Functional 第12章 永続化を端に追いやる|永続化を端に追いやる]]と、永続化を隠蔽する必要がなくなる。必要な関数だけをパラメータで受け取って使えるので、保守もしやすい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[persistence|永続化]]
- [[Implementing the Repository pattern]]

## 出典

- [Repository - Patterns of Enterprise Application Architecture](https://martinfowler.com/eaaCatalog/repository.html)
- [[Domain Modeling Made Functional 第12章 永続化を端に追いやる|Domain Modeling Made Functional 第12章 永続化を端に追いやる]]
