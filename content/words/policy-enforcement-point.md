---
title: Policy Enforcement Point
aliases: [PEP（認可）]
description: PDP の判定を受けて、実際にアクセス制御を行うコンポーネント
tags: [word, 認可]
date: 2025-06-15
---

## TL;DR

[[pdp|PDP]] の判定をもとに、実際にアクセス制御を行うコンポーネントである。略して PEP と呼ぶ。

## 仕組み

ポリシーベース管理の用語を定めた RFC 3198 の定義では、PEP は「ポリシーの判定を強制する論理的なエンティティ」である。これに対して PDP は、自分自身や、判定を求めてきた他のネットワーク要素のためにポリシーの判定を行う論理的なエンティティと定義されている。どちらの定義も、RFC 2753（A Framework for Policy-based Admission Control）にもとづく。

つまり、判定（decision）と強制（enforcement）を別の役割に分け、PEP は判定を求めて、その結果を実行する側になる。RFC 3198 では、PDP と PEP の間でポリシー情報をやりとりする [[tcp|TCP]] ベースのプロトコルとして COPS（RFC 2748）を挙げている。

## 例

Web アプリケーションでは、API Gateway やバックエンドの実装が PEP の役割を担う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[pdp|PDP]]
- [[cedar|Cedar]]
- [[access-control-models|Access Control Model の一覧]]

## 出典

- [RFC 3198 - Terminology for Policy-Based Management](https://www.rfc-editor.org/rfc/rfc3198.html)
