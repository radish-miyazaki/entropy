---
title: Pyroscope
aliases: [Pryoscope]
description: 継続的プロファイリングのデータを集めて分析する、Grafana のオープンソースのシステム
tags: [word, プロファイリング]
date: 2025-10-03
---

## TL;DR

Grafana Pyroscope は、継続的[[profiling|プロファイリング]]のデータを集めて分析するオープンソースのシステムである。

## なぜ必要か

継続的プロファイリングを使うと、ワークロードがリソースをどう使っているかをコードの単位で把握できる。Pyroscope はプロファイルを保存・集約するので、性能のボトルネックを見つけやすくなる。Grafana と統合されており、プロファイルをメトリクス、ログ、トレースと関連付けて調べられる。

## 仕組み

プロファイルは、アプリケーションに組み込む SDK か、Grafana Alloy による自動計装で Pyroscope に送る。Pyroscope は水平スケールできるマイクロサービスで構成されており、Grafana Mimir、Loki、Tempo と同じ設計の考え方に沿っている。

集めたデータは Pyroscope の UI か Grafana で見る。フレームグラフで呼び出し関係とホットスポットを、表やグラフで詳しい統計と傾向を確認できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Grafana Pyroscope（公式ドキュメント）](https://grafana.com/docs/pyroscope/latest/)
- [pyroscope.io](https://pyroscope.io/)
