---
title: OpenTelemetry
aliases: []
description: サービスのテレメトリデータを作成・管理するためのツールやコンポーネントの集まり
tags: [word, observability]
date: 2024-09-28
---

## TL;DR

サービスから送られるテレメトリデータを作成・管理するために設計された、ツールやコンポーネントの集まり。各言語の API や SDK が含まれる。

## なぜ必要か

使いたいサービスが OpenTelemetry に対応していれば、アプリケーションに OpenTelemetry を入れるだけで、さまざまなメトリクスのサービスを少ない手間で使える。

公式ドキュメントによると、OpenTelemetry は特定のベンダーに依存しない。生成したデータはユーザが所有するので、ベンダーロックインを避けられる。また、1 組の API と規約を覚えればよい。

## 仕組み

扱うシグナルは、トレース、[[metrics|メトリクス]]、ログである。主な構成要素は次のとおり。

- 全体の仕様（Specification）
- テレメトリデータの形を定める OTLP プロトコル
- テレメトリの名前付けを標準化するセマンティック規約
- テレメトリを生成する API と、仕様を実装してデータをエクスポートする各言語の SDK
- よく使われるフレームワーク向けの計装ライブラリと、コードを変えずに使える自動計装
- データを受け取り、加工してエクスポートするプロキシの Collector

OpenTracing と OpenCensus を統合してできた CNCF のプロジェクトである。

## 例

対応しているサービスには [[jaeger|Jaeger]] などがある。対応サービスの一覧は公式サイトにある。

## 注意点

OpenTelemetry 自体は[[observability|オブザーバビリティ]]のバックエンドではない。データの保存や可視化は、他のツールに任せる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[observability|オブザーバビリティ]]
- [[jaeger|Jaeger]]

## 出典

- [OpenTelemetry](https://opentelemetry.io/)
- [What is OpenTelemetry?](https://opentelemetry.io/docs/what-is-opentelemetry/)
- [Language APIs & SDKs](https://opentelemetry.io/docs/languages/)
- [Vendors](https://opentelemetry.io/ecosystem/vendors/)
