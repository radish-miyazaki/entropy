---
title: テレメトリ
aliases: []
description: システムとその振る舞いについて、システム自身が出力するデータ
tags: [word, observability]
date: 2026-11-14
---

## TL;DR

システムとその振る舞いについて、システム自身が出力するデータ。トレース、[[metrics|メトリクス]]、ログなどの種類があり、[[observability|オブザーバビリティ]]の材料になる。

## なぜ必要か

[[opentelemetry|OpenTelemetry]] の Observability primer によると、オブザーバビリティとは、内部の仕組みを知らなくてもシステムを外から理解できることである。そのためには、アプリケーションのコードが[[instrumentation|計装]]され、トレース、メトリクス、ログといったシグナルを出力している必要がある。

[[入門 OpenTelemetry ―現代的なオブザーバビリティシステムの構築と運用]] によると、ばらばらなツールでテレメトリを集める従来のやり方には課題がある。その課題は高品質で、標準に基づいた、一貫性のあるテレメトリがないことから生じている。

## 仕組み

Observability primer では、テレメトリの代表的なシグナルを次のように説明している。

- ログ: サービスなどが出力する、タイムスタンプ付きのメッセージ
- メトリクス: インフラやアプリケーションの数値データを、一定期間で集計したもの
- トレース: 1 つのリクエストが通った経路の記録（[[distributed-tracing|分散トレーシング]]）

OpenTelemetry Collector は、テレメトリを受け取り、処理し、送り出すための、ベンダーに依存しない実装である。

## 例

[[今日から始める pprof]] によると、CNCF のオブザーバビリティホワイトペーパーでは、ログ、メトリクス、トレースと並ぶ重要なテレメトリとして、継続的なプロファイルも挙げられている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[observability|オブザーバビリティ]]
- [[opentelemetry|OpenTelemetry]]
- [[instrumentation|計装]]
- [[metrics|メトリクス]]
- [[distributed-tracing|分散トレーシング]]

## 出典

- [[入門 OpenTelemetry ―現代的なオブザーバビリティシステムの構築と運用]]
- [Observability primer - OpenTelemetry](https://opentelemetry.io/docs/concepts/observability-primer/)
- [Glossary - OpenTelemetry](https://opentelemetry.io/docs/concepts/glossary/)
