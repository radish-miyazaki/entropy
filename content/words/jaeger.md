---
title: Jaeger
aliases: []
description: Uber が 2016 年にオープンソースとして公開した分散トレーシングのプラットフォーム
tags: [word, opentelemetry, go]
date: 2024-10-02
---

## TL;DR

Uber が 2016 年にオープンソースとして公開した、[[distributed-tracing|分散トレーシング]]のプラットフォーム。CNCF に寄贈され、最初期の Graduated プロジェクトの 1 つになった。

## なぜ必要か

分散したシステムの処理の流れを監視し、トラブルシュートするために使う。性能のボトルネックや障害の根本原因を見つけたり、サービス間の依存関係を分析したりできる。

## 仕組み

[[opentelemetry|OpenTelemetry]] は、アプリケーションからトレースなどのテレメトリを送るための API と SDK を提供する。Jaeger はその送り先となるバックエンドで、受け取ったトレースを処理、集約、可視化する。Jaeger v2 は OpenTelemetry Collector をもとに作られている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[distributed-tracing|分散トレーシング]]
- [[opentelemetry|OpenTelemetry]]

## 出典

- [Jaeger documentation](https://www.jaegertracing.io/docs/latest/)
