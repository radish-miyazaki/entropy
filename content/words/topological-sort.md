---
title: トポロジカルソート
aliases: [topological sort]
description: DAG の各ノードを、どのノードも出力先のノードより前に来るように並べるソート
tags: [word, グラフ理論, アルゴリズム]
date: 2025-05-09
---

## TL;DR

[[dag|DAG]] の各ノードに順序を付け、どのノードも出力先のノードより前に来るように並べ替えるソートのこと。

## 仕組み

DAG のすべてのノードを一列に並べ、各辺が「前のノードから後ろのノードへ」向くようにする。並べ替えた後は、辺の向きがすべて一方向にそろう。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dag|DAG]]
- [[cycle-graph-theory|閉路]]
- [[graph-theory|グラフ理論]]

## 出典

- [トポロジカルソート - Wikipedia](https://ja.wikipedia.org/wiki/トポロジカルソート)
- [トポロジカルソートを解説 - アルゴリズムロジック](https://algo-logic.info/topological-sort/)
- [トポロジカルソート - yukashun.com](https://yukashun.com/topological_sort/)
