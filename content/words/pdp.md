---
title: PDP
aliases: [Policy Decision Point]
description: ポリシーに基づいてアクセス要求を評価し、許可か拒否かを判定するコンポーネント
tags: [word, 認可]
date: 2025-06-15
---

## TL;DR

Policy Decision Point の略。ポリシー言語で書かれたポリシーに基づいてアクセス要求を評価し、許可（Allow）か拒否（Deny）かを判定する。

## 仕組み

PDP は判定だけを行う。判定結果を受けて実際にアクセスを制御するのは [[policy-enforcement-point|Policy Enforcement Point]]（PEP）である。

RFC 3198（Terminology for Policy-Based Management）では、PDP を「自分自身、または判定を求める他のネットワーク要素のために、ポリシーの判定を行う論理的な実体」と定義している。同じ RFC で、PEP は「ポリシーの判定を実施する論理的な実体」と定義されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[policy-enforcement-point|Policy Enforcement Point]]
- [[cedar|Cedar]]
- [[access-control-models|Access Control Model の一覧]]

## 出典

- [RFC 3198: Terminology for Policy-Based Management](https://www.rfc-editor.org/rfc/rfc3198)
