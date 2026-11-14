---
title: コアドメイン
aliases: []
description: ビジネスの観点から、他のドメインより重要で、最も価値のあるドメイン
tags: [word, ddd]
date: 2026-11-14
---

## TL;DR

ビジネスの観点から、他のドメインより重要で、最も価値のある[[domain|ドメイン]]。[[domain-driven-design|ドメイン駆動設計]]では、コアドメインに焦点を当てて実装を始める。

## なぜ必要か

[[Domain Modeling Made Functional 第1章 境界づけられたコンテキストを利用した解決手段の作成|Domain Modeling Made Functional 第1章]] によると、重要なのは優先順位を付けることと、すべての[[bounded-context|境界づけられたコンテキスト]]を同時に実装しようとしないことである。最も価値のあるコンテキストに焦点を当て、そこから広げていく。

## 仕組み

同書では、ドメインはコアドメインのほかに、必要不可欠だがコアではない支援ドメインと、企業に固有ではない汎用ドメインに分けられる。コンテキスト間の関係は[[context-map|コンテキストマップ]]で示す。

[[Domain Modeling Made Functional 第3章 I／O を端に追いやる|同書 第3章]] によると、データベースやファイルシステムの読み書きといった I/O などの副作用を持つ関数は、コアドメインからは呼び出さないようにする。

## 注意点

コアドメインを見つけるのは難しく、思いもよらないものがコアドメインのこともある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[subdomain|サブドメイン]]
- [[bounded-context|境界づけられたコンテキスト]]
- [[context-map|コンテキストマップ]]
- [[domain-driven-design|ドメイン駆動設計]]

## 出典

- [[Domain Modeling Made Functional 第1章 境界づけられたコンテキストを利用した解決手段の作成|Domain Modeling Made Functional 第1章]]
- [[Domain Modeling Made Functional 第3章 I／O を端に追いやる|Domain Modeling Made Functional 第3章]]
