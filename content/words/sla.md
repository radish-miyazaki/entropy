---
title: SLA
aliases: [Service Level Agreement]
description: サービス提供者とクライアントの間で交わす、サービスレベルに関する合意
tags: [word, sre]
date: 2024-11-06
---

## TL;DR

Service Level Agreement（サービスレベル契約）の略。サービス提供者とクライアントの間で交わす、サービスレベルに関する合意である。

## 仕組み

Google の SRE 本の定義では、SLA は利用者との明示的または暗黙的な契約で、そこに含まれる [[slo|SLO]] を満たした（または満たせなかった）ときの結果を定めたものである。結果は返金や違約金のような金銭的なものが多いが、それ以外の形もある。

## 注意点

SLA を達成できなかったときは、返金や減額などの対応が必要になる。

SRE 本は、SLO と SLA を見分けるには「目標を満たせなかったら何が起きるか」を考えるとよいとしている。はっきりした結果が決まっていなければ、それはおそらく SLA ではなく SLO である。実際には、SLO のことを SLA と呼ぶ人も多い。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[slo|SLO]]
- [[sli|SLI]]
- [[sre|SRE]]

## 出典

- [Service Level Objectives - Site Reliability Engineering](https://sre.google/sre-book/service-level-objectives/)
