---
title: Layer と Tier の違い
aliases: [Difference Between Layers and Tiers]
description: Layer はコードの論理的な分離、Tier はそれをどこに配置するかという物理的な構造を表す
tags: [word, アーキテクチャ]
date: 2024-08-13
---

## TL;DR

Layer と Tier は、日本語ではどちらも「層」と訳されるが、異なる概念である。Layer はコードの論理的な分離を、Tier は Layer をどこに配置するかという物理的な構造を表す。

## 仕組み

### Layer

Layer は、コードの論理的な分離を指す。言い換えると、関連する機能をまとまりにしたものである。物理的にどこで動くかは関係ない。

アプリケーションを Layer で構造化するのは、コードベースをよりよく整理するためである。移植性と保守性を高めることが、この構造を使う動機になる。[[layered-architecture|レイヤードアーキテクチャ]]や[[hexagonal-architecture|ヘキサゴナルアーキテクチャ]]など、さまざまなアーキテクチャが Layer の考え方を応用している。たとえばレイヤードアーキテクチャでは、UI レイヤー、ビジネスロジックレイヤー、データアクセスレイヤーがそれぞれ異なる責務を持ち、論理的に分離されている。

### Tier

Tier は物理的な構造、つまりアプリケーションのトポロジーを指す。Tier は、Layer をどこにデプロイするかを定める。アプリケーションが動く実行環境を考えて決める。

Layer と Tier は 1 対 1 に対応しなくてよい。同じアーキテクチャの構成要素でも、異なるサーバーに置いて別々にデプロイできる。アプリケーションを Tier で分割すると、より高いスケーラビリティを実現できる。

## 例

レイヤードアーキテクチャの 3 つの Layer を、2 つの Tier に配置することもできる。3 つの Tier に配置したものが、3 層アーキテクチャ（[[multitier-architecture|多層アーキテクチャ]]）である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[layered-architecture|レイヤードアーキテクチャ]]
- [[multitier-architecture|多層アーキテクチャ]]
- [[hexagonal-architecture|ヘキサゴナルアーキテクチャ]]

## 出典

- [Difference Between Layers and Tiers - Baeldung](https://www.baeldung.com/cs/layers-vs-tiers)
- [[手を動かしてわかるクリーンアーキテクチャ 第2章 従来の多層アーキテクチャの何が問題なのか？|手を動かしてわかるクリーンアーキテクチャ 第2章]]
