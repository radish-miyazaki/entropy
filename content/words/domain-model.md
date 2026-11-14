---
title: ドメインモデル
aliases: []
description: ドメインの概念を、振る舞いとデータを含めて表したモデル
tags: [word, ddd]
date: 2026-11-14
---

## TL;DR

[[domain|ドメイン]]の概念を表したモデル。Martin Fowler の定義では、振る舞いとデータの両方を取り込んだ、ドメインのオブジェクトモデルである。

## なぜ必要か

Fowler によると、ビジネスロジックは非常に複雑になりうる。規則やロジックが多くのケースや振る舞いを表し、オブジェクトはこの複雑さを扱うために作られた。

[[Domain Modeling Made Functional]] の第 1 章によると、問題を解くには関連する情報だけを取り入れるべきである。そこで、問題空間のドメインのモデル（ドメインモデル）を作り、ドメインの必要な側面だけを取り出して解決空間に作り直す。

## 仕組み

Fowler のドメインモデルは、互いにつながったオブジェクトの網であり、各オブジェクトは企業のように大きなものから注文書の 1 行のように小さなものまで、意味のある個体を表す。

[[Domain Modeling Made Functional]] では、[[functional-programming|関数型プログラミング]]で型を組み合わせてドメインモデルを作る。関数型のドメインモデルでは、データと振る舞いが分かれている。解決空間では、ドメインと[[subdomain|サブドメイン]]が[[bounded-context|境界づけられたコンテキスト]]に対応し、それぞれのコンテキストがそれ自体小さなドメインモデルになる。

## 注意点

[[Domain Modeling Made Functional]] によると、ドメインモデルは[[persistence-ignorance|永続性非依存]]で設計し、データベースなどの永続化の仕組みを意識しない。外部システムのモデルに合わせるとドメインモデルが腐敗するので、[[anti-corruption-layer|腐敗防止層]]を置いて守る。要件が変わったときは、コードより先にドメインモデルを見直す。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[domain|ドメイン]]
- [[bounded-context|境界づけられたコンテキスト]]
- [[persistence-ignorance|永続性非依存]]
- [[anti-corruption-layer|腐敗防止層]]
- [[domain-driven-design|ドメイン駆動設計]]

## 出典

- [Domain Model - Martin Fowler](https://martinfowler.com/eaaCatalog/domainModel.html)
- [[Domain Modeling Made Functional 第1章 境界づけられたコンテキストを利用した解決手段の作成|Domain Modeling Made Functional 第1章]]
- [[Domain Modeling Made Functional 第3章 境界づけられたコンテキスト間の契約|Domain Modeling Made Functional 第3章 境界づけられたコンテキスト間の契約]]
- [[Domain Modeling Made Functional 第12章 テーブルはレコード型に直接マッピングする|Domain Modeling Made Functional 第12章 テーブルはレコード型に直接マッピングする]]
- [[Domain Modeling Made Functional 第13章 Evolving a Design and Keeping It Clean|Domain Modeling Made Functional 第13章]]
