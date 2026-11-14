---
title: スパン
aliases: []
description: リクエストの処理経路の中の 1 つの作業や操作を表す単位で、トレースを構成する要素
tags: [word, opentelemetry]
date: 2026-11-14
---

## TL;DR

リクエストの処理経路の中の、1 つの作業や操作を表す単位。[[distributed-tracing|トレース]]はスパンを組み合わせて作られる。

## なぜ必要か

[OpenTelemetry のドキュメント](https://opentelemetry.io/docs/concepts/signals/traces/)によると、スパンは文脈、相関、階層を持つ[[structured-logging|構造化ログ]]のようなものである。親子関係で処理の入れ子を表せるので、別のプロセスやサービス、マシンで作られたスパンをまとめて、システムの処理を端から端まで見通せる。

## 仕組み

同じトレース ID を持つスパンの集まりがトレースであり、親スパン ID によって階層ができる。親スパン ID を持たないスパンがルートスパンで、操作全体の開始と終了を表す。スパンは主に次の情報を持つ。

- 名前、開始と終了のタイムスタンプ
- スパンコンテキスト: トレース ID やスパン ID など、サービス間で伝播する部分
- 属性: 操作を説明するキーと値のメタデータ
- イベント: スパンの期間中のある時点に付ける、時刻付きの注釈
- リンク: 因果関係のある別のスパンとの関連
- ステータス: Unset、Error、Ok のどれか
- 種類: Client、Server、Internal、Producer、Consumer のどれか。指定しなければ Internal になる

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[distributed-tracing|分散トレーシング]]
- [[observability|オブザーバビリティ]]
- [[opentelemetry|OpenTelemetry]]
- [[structured-logging|構造化ログ]]
- [[rust-tracing|tracing]]

## 出典

- [Traces - OpenTelemetry](https://opentelemetry.io/docs/concepts/signals/traces/)
