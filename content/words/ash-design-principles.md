---
title: Ash Design Principles
aliases: []
description: Ash Framework が掲げる設計原則。宣言的な設計、規約より設定、現実主義などからなる
tags: [word, elixir, ash-framework]
date: 2025-04-25
---

## TL;DR

[[ash-framework|Ash Framework]] の公式ドキュメントにある設計原則。宣言的な設計、規約より設定、現実主義の優先などを掲げている。

## 仕組み

### Anything, not Everything

Ash は「何でもできる」フレームワークだが、「何でもそろっている」フレームワークではない。そのため、必要に応じて拡張やカスタマイズができることを重視している。

### Declarative, Introspectable, Derivable

宣言的で、内容を外から調べられ、そこから導き出せる、という原則である。Ash の中心にある考え方は [[declarative-design-pattern|declarative design pattern]] である。すべての構成は設定として明示的に定義され、コードはその設定に従って自動的に動く。「リソース」も、そうした設定の 1 つにすぎない。

### Configuration over Convention

Ash は「規約より設定」に立つ。これは [[ruby-on-rails|Ruby on Rails]] でよく語られる [[convention-over-configuration|設定より規約]]と逆の考え方である。ファイル名や置き場所から自動で意味を決めるような暗黙のルールには頼らない。代わりにすべてを明示的に設定し、柔軟性、保守性、可読性の高い設計を目指す。

### Pragmatism First

Ash は理想を掲げつつも、開発者が実際に抱える問題の解決を最優先にする。変更は慎重に行い、すでに使っている開発者の負担を小さくする。破壊的変更はできるだけ避け、起きる場合は分かりやすく簡潔な移行手順を示す。

### Community

Ash のコミュニティは厳格な行動規範に従う。経験や経歴を問わず、すばやく効果的に、時間がたっても保守しやすいソフトウェアを作れるよう協力している。

### Domain Driven Design?

Ash は [[domain-driven-design|ドメイン駆動設計]]のフレームワークではない。Ash を一言で表すなら「リソース指向の宣言的設計フレームワーク」である。DDD が目指すものには共感しつつも、その複雑さと実装中心の考え方には懐疑的で、よりシンプルな方法を採っている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ash-framework|Ash Framework]]
- [[declarative-design-pattern|declarative design pattern]]

## 出典

- [Design Principles - Ash](https://hexdocs.pm/ash/design-principles.html)
