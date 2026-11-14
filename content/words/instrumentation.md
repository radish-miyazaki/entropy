---
title: 計装
aliases: []
description: システムの各コンポーネントのコードが、トレースや測定値などのシグナルを出すようにすること
tags: [word, オブザーバビリティ]
date: 2026-11-14
---

## TL;DR

システムの各コンポーネントのコードが、分散トレースのデータ、測定値、イベントの記録などのシグナルを出すようにすること。英語では instrumentation と呼ぶ。

## なぜ必要か

[[opentelemetry|OpenTelemetry]] のドキュメントでは、システムを観測できるようにするには計装が必要だとしている。[[observability|オブザーバビリティ]]を実現するには、アプリケーションが適切に計装されていなければならない。

## 仕組み

OpenTelemetry では、計装の方法を 2 つに分けている。

コードベースの計装は、アプリケーションの中で OpenTelemetry の API を使う。アプリケーションの内部のロジックまで深く観測できるが、自分でコードを書くので、アプリケーションの変更が必要になる。

ゼロコードの計装は、コードを変えずに、ライブラリや実行環境からテレメトリを得る。手始めに使う場合や、アプリケーションを変更できない場合に向くが、アプリケーションの境界で起きることしか分からない。2 つは組み合わせて使える。

[[入門 OpenTelemetry ―現代的なオブザーバビリティシステムの構築と運用]] によると、シグナルは、テレメトリを生成する実装である計装と、解析ツールにネットワーク経由でデータを送る伝送システムで構成される。

## 例

- [[rust-tracing|tracing]] では、計装するには Subscriber の実装が必要で、基本的には公式が提供する `tracing-subscriber` を使う。
- Go のプロファイラ pprof でも、コードに計装しないとプロファイルは取れない（[[今日から始める pprof]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[observability|オブザーバビリティ]]
- [[opentelemetry|OpenTelemetry]]
- [[distributed-tracing|分散トレーシング]]
- [[rust-tracing|tracing]]

## 出典

- [Instrumentation | OpenTelemetry](https://opentelemetry.io/docs/concepts/instrumentation/)
- [[入門 OpenTelemetry ―現代的なオブザーバビリティシステムの構築と運用 第1章 最新のオブザーバビリティの現状|入門 OpenTelemetry 第1章]]
