---
title: 閉路
aliases: [cycle]
description: グラフ理論で、始点と終点が同じ道のこと
tags: [word, グラフ理論]
date: 2025-05-09
---

## TL;DR

[[graph-theory|グラフ理論]]において、始点と終点が同じ道のこと。

## 仕組み

Wikipedia によると、閉路は出発点に戻るような辿り方で、頂点の重複がないものである。閉道（closed path）とも呼ぶ。グラフに閉路があるかどうかは、深さ優先探索で親ノードへの戻り辺が見つかるかどうかで調べられる。[[topological-sort|トポロジカルソート]]でも検出できる。

## 例

n 個の頂点を環状に並べ、隣り合う頂点どうしだけを辺で結んだグラフを閉路グラフと呼び、C_n と書く。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dag|DAG]]: 閉路のない[[directed-graph|有向グラフ]]
- [[topological-sort|トポロジカルソート]]

## 出典

- [閉路 - Wikipedia](https://ja.wikipedia.org/wiki/閉路)
