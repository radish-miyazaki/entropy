---
title: Ash Framework
aliases: []
description: 「リソース」の定義から DB や API などを宣言的に組み立てる、Elixir のアプリケーションフレームワーク
tags: [word, elixir]
date: 2025-04-24
---

## TL;DR

[[elixir|Elixir]] のアプリケーションフレームワーク。中心となる「リソース」を定義すると、そこからデータベース、API、状態遷移、ジョブ処理などを宣言的に組み立てられる。拡張性を重視している。

## なぜ必要か

Ash の標語は「Model your domain, derive the rest」である。[[domain|ドメイン]]をモデリングすれば、アプリケーションの大部分はリソースから導き出せる。そのため、開発者はビジネスロジックに集中できる。

公式ドキュメントは、Ash を「force multiplier」（力を何倍にもするもの）と呼んでいる。コンポーネントどうしの[[consistency|一貫性]]を生かし、少ないコードで多くのことを実現するという考え方である。リソースを一度定義すればデータベースや API をすぐに用意できるので、初期開発の効率が大きく上がる。コードに一貫性があり再利用しやすいので、長期の保守もしやすくなる。それでいて、柔軟性や堅牢性、豊かなエコシステムといった Elixir の強みは損なわれない。

## 仕組み

Ash はドメインを「リソース」と「アクション」で表す。アクションは `:publish_post` のような名前の付いた操作で、ビジネスロジック、バリデーション、認可を持つ。リソースは、関係するアクションと、それが扱うデータをまとめたものである。アクションは型付きで、外から内容を調べられる。そのため、ほかのツールがアクションを読み取って機能を組み立てられる。

リソースの定義が [[single-source-of-truth|信頼できる唯一の情報源]]になり、データベースの構造、GraphQL や REST のエンドポイント、認可のルールなどがそこから導かれる。永続化や API は、AshPostgres、AshGraphql、AshJsonApi などの拡張パッケージで足す。

Ash は Web フレームワークではなく、アプリケーション層を作るフレームワークである。[[phoenix|Phoenix]] と置き換えるものではなく、組み合わせて使うように設計されている。

設計の考え方は [[ash-design-principles|Ash Design Principles]] にまとまっている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ash-design-principles|Ash Design Principles]]
- [[declarative-design-pattern|declarative design pattern]]
- [[igniter|Igniter]]

## 出典

- [Ash Framework](https://ash-hq.org/)
- [Ash のドキュメント](https://hexdocs.pm/ash/readme.html)
- [What is Ash?](https://hexdocs.pm/ash/what-is-ash.html)
- [[Ash Framework： Create Declarative Elixir Web Apps|Ash Framework: Create Declarative Elixir Web Apps]]（作者の Zach Daniel による本）
- [作者の Zach Daniel による来日時の講演スライド](https://drive.google.com/file/d/1LK4qMBskZ9na6H73E91ViCtVVlbmcbEa/view)
- [ElixirConf 2023 の講演](https://www.youtube.com/watch?v=c4iou77kOFc)
- [ytnobody.github.io の記事](https://ytnobody.github.io/wyton/2024/12/15/2024-12-15-001/)
- [Qiita の記事](https://qiita.com/GeekMasahiro/items/fc0b81462745a570a718)
