---
title: イベントソーシング
aliases: []
description: 集約の現在の状態ではなく、集約に起きたすべての変化を一連のイベントとして永続化するデータモデリング手法
tags: [word]
date: 2024-08-09
---

## TL;DR

時間軸の視点を取り入れたデータモデリング手法（Event sourcing）。[[aggregate|集約]]の現在の状態を記録する代わりに、集約のライフサイクルで起きたすべての変化を、一連のイベントとして[[persistence|永続化]]する。

## 仕組み

状態に変化があるたびに、状態そのものを書き換えるのではなく、その変化をイベントとして追記する。Microsoft の Azure アーキテクチャセンターでは、次のように説明している。

> データの現在の状態だけを格納する代わりに、追加専用ストアを使用して、そのデータに対して実行された一連のすべてのアクションを記録します。

[[cqrs|CQRS]] の文脈でよく見かける永続化の手法である。

## 自分の理解

[[git|Git]] のようなバージョン管理システムのイメージである。

## 関連

- [[cqrs|CQRS]]
- [[aggregate|集約]]
- [[domain-event|ドメインイベント]]

## 出典

- https://learn.microsoft.com/ja-jp/azure/architecture/patterns/event-sourcing
- [[Domain Modeling Made Functional 第12章 コマンドとクエリを分離する|Domain Modeling Made Functional 第12章 コマンドとクエリを分離する]]
