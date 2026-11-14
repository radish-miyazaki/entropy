---
title: 入門 OpenTelemetry ―現代的なオブザーバビリティシステムの構築と運用 第4章 OpenTelemetryのアーキテクチャ
description: OpenTelemetry の API と SDK、インフラストラクチャのテレメトリ、OTLP と Collector によるテレメトリパイプラインの構成を説明する章
tags: [book-chapter, opentelemetry]
date: 2025-07-04
book: "[[入門 OpenTelemetry ―現代的なオブザーバビリティシステムの構築と運用]]"
chapter: 4
---

## TL;DR

- アプリケーションは OpenTelemetry API で計装し、その呼び出しを OpenTelemetry SDK が処理する。
- 集めたテレメトリは、OTLP と OpenTelemetry Collector からなるパイプラインで解析ツールに送る。長期ストレージや分析、GUI は OpenTelemetry に含まれない。

## 内容

### アプリケーションテレメトリ

[[opentelemetry|OpenTelemetry]] は、よく使われる OSS ライブラリ向けの計装ライブラリを提供している。アプリケーションのコードやビジネスロジックを計装したいときは、OpenTelemetry API を使う。OSS ライブラリ向けの計装ライブラリも、内部ではこの API を使っている。OpenTelemetry API は、OpenTelemetry が使われているときだけ自動的に有効になる。

### OpenTelemetry SDK

ライブラリやビジネスロジックからの OpenTelemetry API の呼び出しを実際に処理するには、OpenTelemetry のクライアントである OpenTelemetry SDK を入れる必要がある。SDK は、サンプリングのアルゴリズム、ライフサイクルフック、エクスポータからなるプラグインフレームワークで、環境変数や YAML で設定する。

### インフラストラクチャテレメトリ

大規模な分散システムには多くのインフラストラクチャがあり、その健全性は非常に重要である。たとえば、アプリケーションが動くホスト、インスタンスを管理するプラットフォーム、クラウドプロバイダが提供するネットワークやデータベースのサービスなどがある。

OpenTelemetry は [[kubernetes|Kubernetes]] や他のクラウドサービスに組み込まれつつある。ただし、OpenTelemetry がなくても、多くのインフラサービスは何らかの[[telemetry|テレメトリ]]を生成している。OpenTelemetry は、そうした既存のデータを集めて、アプリケーションからのテレメトリのパイプラインに加えるためのコンポーネントを多数提供している。

### テレメトリパイプライン

アプリケーションやインフラストラクチャから集めたテレメトリは、保存や分析のためにオブザーバビリティツールに送る必要がある。しかし、特に大規模な分散システムでは問題が起きやすい。負荷の高いシステムではテレメトリの量が膨大になり、エグレス、負荷分散、バックプレッシャといったネットワークの問題が大きくなる。また、古いシステムではオブザーバビリティツールが継ぎはぎで配置されていることが多く、さまざまなデータ処理の要件を抱えながら、大量のテレメトリを処理してさまざまな場所に転送しなければならない。

OpenTelemetry は、これを解消するための主要なコンポーネントとして、OTLP（OpenTelemetry Protocol）と OpenTelemetry Collector の 2 つを持っている。

### OpenTelemetry に含まれないもの

OpenTelemetry には、長期ストレージ、分析、GUI などは含まれていない。OpenTelemetry の目的は、あらゆる解析ツールと連携し、開発者がより高度で斬新なツールを将来たくさん作れるようにすることにある。そのため、独自のオブザーバビリティバックエンドは意図的に含めていない。

### OpenTelemetry Demo

OpenTelemetry の動作を試せるデモとして、[OpenTelemetry Demo](https://opentelemetry.io/ecosystem/demo/) が公開されている。

## キーワード

- [[opentelemetry|OpenTelemetry]]
- [[telemetry|テレメトリ]]
- OTLP
- OpenTelemetry Collector
- [[kubernetes|Kubernetes]]
- [[observability|オブザーバビリティ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
