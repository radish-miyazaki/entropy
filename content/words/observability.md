---
title: オブザーバビリティ
aliases: [Observability, 可観測性]
description: システムの内部構造を知らなくても、外から問いを投げることでシステムを理解できるようにする性質
tags: [word]
date: 2024-10-13
---

## TL;DR

システムの内部構造を知らなくても、そのシステムについて問いを投げることで、外から理解できるようにする性質。日本語では可観測性と訳される。

## なぜ必要か

[[opentelemetry|OpenTelemetry]] のドキュメントでは、次のように説明されている。

> Observability lets you understand a system from the outside by letting you ask questions about that system without knowing its inner workings. Furthermore, it allows you to easily troubleshoot and handle novel problems, that is, “unknown unknowns”. It also helps you answer the question “Why is this happening?”

未知の問題、いわゆる「未知の未知」にも対処でき、トラブルシューティングが容易になる。「なぜこれが起きているのか」という問いに答える助けにもなる。

## 仕組み

オブザーバビリティを実現するには、アプリケーションが適切に[[instrumentation|計装]]されている必要がある。

> To ask those questions about your system, your application must be properly instrumented. That is, the application code must emit signals such as traces, metrics, and logs.

計装とは、[[distributed-tracing|トレース]]や[[span|スパン]]、イベントなどを出力する実装を通じて、アプリケーションを観測できるようにすることである。主な構成要素は次のとおり。

- イベント: ある時点で何があったかを記録したもの。「データベースに `INSERT` を発行した」「ステータスコード 200 を返した」といった情報が、1 行ずつログとして出力される
- [[span|スパン]]: プログラム中の、ある操作の開始から終了までの範囲を表すもの。イベントがどの文脈で発行されたかを与え、親子関係で処理の入れ子を表す
- [[distributed-tracing|トレース]]: 1 つのリクエストの処理で、どのスパンやイベントが発行されたかを追跡する方法。トレース ID にスパンが結び付けられる
- [[structured-logging|構造化ログ]]: これらの要素を、JSON（JSON Lines）や LTSV、logfmt など機械が読み取りやすい形式で保存するログ。各ログが共通のフィールドを持つので、後から検索して追跡しやすい

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[distributed-tracing|分散トレーシング]]
- [[instrumentation|計装]]
- [[span|スパン]]
- [[structured-logging|構造化ログ]]
- [[opentelemetry|OpenTelemetry]]
- [[rust-tracing|tracing]]

## 出典

- [Observability primer - OpenTelemetry](https://opentelemetry.io/docs/concepts/observability-primer/#what-is-observability)
- [Span - OpenTelemetry](https://opentelemetry.io/ja/docs/concepts/observability-primer/#span)
- [Distributed traces - OpenTelemetry](https://opentelemetry.io/ja/docs/concepts/observability-primer/#distributed-traces)
