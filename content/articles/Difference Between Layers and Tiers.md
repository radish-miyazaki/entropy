---
title: Difference Between Layers and Tiers
description: Layer はコードの論理的な分離、Tier はそれをどこに配置するかという物理的な構造を表す
tags: [article, アーキテクチャ]
date: 2024-08-13
article-authors: []
site: Baeldung
published:
url: https://www.baeldung.com/cs/layers-vs-tiers
---

## TL;DR

Layer と Tier は、日本語ではどちらも「層」と訳されるが、異なる概念である。Layer はコードの論理的な分離を、Tier は Layer をどこに配置するかという物理的な構造を表す。

## 内容

### Layer

> The term layer refers to a logical separation of code. In other words, it’s a coherent set of related functionality.

Layer はコードの論理的な分離を指す。言い換えると、関連する機能をまとまりにしたものである。物理的にどこで動くかは関係ない。

アプリケーションを Layer で構造化すると、コードベースをよりよく整理できる。移植性と保守性を高めることが、この構造を使う動機になる。[[layered-architecture|レイヤードアーキテクチャ]]や[[hexagonal-architecture|ヘキサゴナルアーキテクチャ]]など、さまざまなアーキテクチャが Layer の考え方を応用している。たとえばレイヤードアーキテクチャでは、UI レイヤー、ビジネスロジックレイヤー、データアクセスレイヤーがそれぞれ異なる責務を持ち、論理的に分離されている。

### Tier

> On the other hand, the term tier refers to the physical structure. Tiers define where to deploy the layers, without necessarily a one-to-one mapping. So when we talk of an application’s tiers, we mean its topology.

Tier は物理的な構造、つまりアプリケーションのトポロジーを指す。Tier は Layer をどこにデプロイするかを定める。アプリケーションが動く実行環境を考えて決める。

Layer と Tier は 1 対 1 に対応しなくてよい。同じアーキテクチャの構成要素でも、異なるサーバーに置いて別々にデプロイできる。アプリケーションを Tier で分割すると、より高いスケーラビリティを実現できる。

### 組み合わせの例

レイヤードアーキテクチャの 3 つの Layer を、2 つの Tier に配置することもできる。3 つの Tier に配置したものが、3 層アーキテクチャ（[[multitier-architecture|多層アーキテクチャ]]）である。

## キーワード

- [[layered-architecture|レイヤードアーキテクチャ]]
- [[hexagonal-architecture|ヘキサゴナルアーキテクチャ]]
- [[multitier-architecture|多層アーキテクチャ]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[手を動かしてわかるクリーンアーキテクチャ 第2章 従来の多層アーキテクチャの何が問題なのか？|手を動かしてわかるクリーンアーキテクチャ 第2章]]
