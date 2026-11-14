---
title: SRE
aliases: [Site Reliability Engineering]
description: Google が提唱した、システムの信頼性を重視するシステム管理とサービス運用のアプローチ
tags: [word, sre]
date: 2024-11-06
---

## TL;DR

Site Reliability Engineering（サイト信頼性エンジニアリング）の略。Google が提唱した、システム管理とサービス運用に対するアプローチで、システムの信頼性を重視する点が特徴である。

## なぜ必要か

開発者と運用者が連携し、高い信頼性を保ちながらサイトやシステムを安定して動かすことを目指す。

## 仕組み

信頼性を測る重要な指標として、[[sli|SLI]]、[[slo|SLO]]、[[sla|SLA]] の 3 つを使う。

Google の SRE 本によると、SRE は「ソフトウェアエンジニアに運用チームを設計させたときに起きること」である。Google では、チケット対応、オンコール、手作業といった運用の仕事を SRE の時間の 50 % までに抑え、残りをエンジニアリングに充てる。運用の負荷が上限を超えたら、超えた分は開発チームに戻す。

また、SRE 本は、ほとんどのものにとって 100 % は信頼性の目標として間違っているとしている。1 から可用性の目標を引いた分を「エラーバジェット」と呼び、それを使い切らない範囲で、リスクのあるリリースを許す。たとえば目標が 99.99 % なら、エラーバジェットは 0.01 % である。

## 注意点

[[devops|DevOps]] とは目的が異なる。DevOps はリリースサイクルの短縮を主な目的とする。両者の関係は [[class-sre-implements-devops|class SRE implements DevOps]] という言葉で表される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[sli|SLI]]
- [[slo|SLO]]
- [[sla|SLA]]
- [[class-sre-implements-devops|class SRE implements DevOps]]
- [[devops|DevOps]]

## 出典

- [Introduction - Site Reliability Engineering](https://sre.google/sre-book/introduction/)
- [SRE（サイト信頼性エンジニアリング）とは - IBM](https://www.ibm.com/jp-ja/topics/site-reliability-engineering)
- [SRE とは - 富士通クラウドダイレクト](https://clouddirect.jp.fujitsu.com/service/navi-tech-sre)
