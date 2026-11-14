---
title: メトリクス
aliases: [メトリック]
description: 実行時に取得した、サービスの状態やリソースの利用状況の測定値
tags: [word, observability]
date: 2026-11-14
---

## TL;DR

実行時に取得したサービスの測定値。システムの状態やリソースの利用状況を統計的に表す。[[opentelemetry|OpenTelemetry]] では、トレース、ログと並ぶ主要なシグナルの 1 つである。

## なぜ必要か

OpenTelemetry のドキュメントによると、メトリクスはアプリケーションの可用性と性能を示す指標になる。カスタムのメトリクスを使えば、それらがユーザやビジネスにどう影響するかも分かる。集めたデータを使って、障害時にアラートを出したり、需要が高いときに自動でスケールしたりできる。

[[入門 OpenTelemetry ―現代的なオブザーバビリティシステムの構築と運用 第1章 最新のオブザーバビリティの現状|入門 OpenTelemetry]] によると、メトリクスの登場によって、エラーや例外だけでなく、データそのものに対してアラートを作れるようになった。

## 仕組み

OpenTelemetry では、計測に使う道具（instrument）を次のように分けている。

- Counter: 増えるだけの値を積み上げる（車の走行距離計のようなもの）
- UpDownCounter: 増減する値を積み上げる（キューの長さなど）
- Gauge: 読み取った時点の値を報告する（燃料計のようなもの）
- Histogram: リクエストのレイテンシなど、値の分布を集計する

それぞれに、エクスポートのたびに 1 回だけ値を集める非同期版もある。大量の測定値は、一定の時間枠ごとに集計（aggregation）されて送られる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[opentelemetry|OpenTelemetry]]
- [[observability|オブザーバビリティ]]
- [[distributed-tracing|分散トレーシング]]
- [[golden-signals|ゴールデンシグナル]]
- [[sli|SLI]]

## 出典

- [Metrics - OpenTelemetry](https://opentelemetry.io/docs/concepts/signals/metrics/)
- [[入門 OpenTelemetry ―現代的なオブザーバビリティシステムの構築と運用 第1章 最新のオブザーバビリティの現状|入門 OpenTelemetry 第1章 最新のオブザーバビリティの現状]]
