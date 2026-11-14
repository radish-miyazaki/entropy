---
title: Software Architecture
aliases: [ソフトウェアアーキテクチャ]
description: ソフトウェアを構成するコンポーネント、その外部から見える性質、それらの関係からなる、ソフトウェアの構造
tags: [word, アーキテクチャ]
date: 2025-03-28
---

## TL;DR

ソフトウェアを構成するコンポーネント、その外部から見える性質、それらの関係からなる、ソフトウェアの構造。万人が合意した厳密な定義はない。

## なぜ必要か

Martin Fowler によると、悪いアーキテクチャは、ソフトウェアを理解しにくく変えにくくする余計なもの（cruft）が増える大きな原因になる。内部の品質が高ければ、新しい機能をより速く届けられる。Wikipedia によると、アーキテクチャの主な目的は、[[abstraction|抽象化]]と問題の分割でシステムの複雑さを減らすことである。

## 仕組み

Fowler は Ralph Johnson にならい、アーキテクチャを「熟練した開発者が共有している、システム設計についての理解」と捉えている。Johnson は「アーキテクチャとは重要なもののことだ。それが何であれ」とも述べている。Fowler はこれを、何が重要かを見極め、それをよい状態に保つことがアーキテクトの仕事だと読んでいる。また、よいアーキテクチャは自らの進化を支えるものだとしている。

## 例

アーキテクチャのスタイルにはクライアントサーバ、パイプとフィルター、[[microservices|マイクロサービス]]、[[hexagonal-architecture|ヘキサゴナルアーキテクチャ]]、[[clean-architecture|クリーンアーキテクチャ]]、MVC などがある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clean-architecture|クリーンアーキテクチャ]]
- [[layered-architecture|レイヤードアーキテクチャ]]
- [[hexagonal-architecture|ヘキサゴナルアーキテクチャ]]

## 出典

- [ソフトウェアアーキテクチャ - Wikipedia](https://ja.wikipedia.org/wiki/ソフトウェアアーキテクチャ)
- [Software Architecture Guide - Martin Fowler](https://martinfowler.com/architecture/)
