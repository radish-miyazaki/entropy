---
title: CAP 定理
aliases: [CAP theorem]
description: 分散データストアは、一貫性、可用性、分断耐性の 3 つのうち、同時に 2 つまでしか保証できないという定理
tags: [word, データベース]
date: 2025-02-22
---

## TL;DR

分散データストアは、一貫性（Consistency）、可用性（Availability）、分断耐性（Partition tolerance）の 3 つのうち、同時に 2 つまでしか保証できないという定理。Eric Brewer が予想として示し、2002 年に Seth Gilbert と Nancy Lynch が証明した。

## 仕組み

英語版 Wikipedia の「CAP theorem」によると、3 つの性質は次のように定義される。

- 一貫性: すべての読み込みが最新の書き込みの結果かエラーを受け取る
- 可用性: 障害の起きていないノードは、すべてのリクエストに応答する。ただし、最新のデータを返すとは限らない
- 分断耐性: ノード間のメッセージが任意の数だけ失われても、システムは動き続ける

[[distributed-system|分散システム]]ではネットワークの分断を避けられないので、分断が起きたときは一貫性と可用性のどちらかを選ぶことになる。分断が起きていなければ、両方を満たせる。

## 例

[[acid|ACID]] に基づく RDBMS は、一般に一貫性を優先する。[[base|BASE]] に基づく NoSQL は、可用性を優先するものが多い。ただし、MongoDB や Redis は分断が起きたときに一貫性を優先する。

## 注意点

CAP 定理の一貫性は、ACID の一貫性とは意味が違う。また、一貫性と可用性の選択が必要になるのは分断が起きたときだけなので、Brewer 自身も「3 つのうち 2 つ」という言い方は誤解を招くと述べている。分断がないときにも遅延と一貫性のトレードオフがあることを加えて拡張したものに、PACELC がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[acid|ACID]]
- [[base|BASE]]
- [[consistency|一貫性]]
- [[distributed-system|分散システム]]

## 出典

- [CAP theorem - Wikipedia](https://en.wikipedia.org/wiki/CAP_theorem)
