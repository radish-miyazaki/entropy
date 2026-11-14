---
title: Performance Schema
aliases: []
description: MySQL サーバの実行時の動作を監視し、内部イベントをテーブルに記録する機能
tags: [word, mysql]
date: 2024-12-22
---

## TL;DR

[[mysql|MySQL]] サーバの実行時の動作を監視する機能。待機、ステージ、ステートメント、トランザクションなどのサーバ内部のイベントを集め、`performance_schema` データベースのテーブルに記録する。

## 仕組み

Performance Schema はストレージエンジンとして実装されており、デフォルトで有効になっている。有効かどうかは次で確かめる。

```sql
SHOW VARIABLES LIKE 'performance_schema';
```

テーブルは、スレッドごとの最新のイベント（`events_waits_current` など）、直近のイベントの履歴（`*_history`、`*_history_long`）、全イベントの集計（`events_waits_summary_global_by_event_name` など）、監視対象のインスタンス（`file_instances` など）、監視の設定（`setup_instruments`、`setup_consumers`）に分かれる。何を計測するかは `setup_instruments`、計測した情報をどこに保存するかは `setup_consumers` で切り替える。

## 例

待機時間の合計が長いイベントを調べるには、集計のテーブルを使う。

```sql
SELECT EVENT_NAME, SUM_TIMER_WAIT
FROM performance_schema.events_waits_summary_global_by_event_name
ORDER BY SUM_TIMER_WAIT DESC LIMIT 10;
```

## 注意点

イベントのタイマーの値はピコ秒単位の概算値である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[mysql|MySQL]]

## 出典

- [パフォーマンススキーマクイックスタート - MySQL 8.0 リファレンスマニュアル](https://dev.mysql.com/doc/refman/8.0/ja/performance-schema-quick-start.html)
- [ISUCON でも使える！お手軽にパフォーマンス改善入門（MySQL Performance Schema 編）](https://speakerdeck.com/ikezoemakoto/phpkanhuarensu2024-isucondemoshi-eru-oshou-qing-nipahuomansugai-shan-ru-men-mysql-performance-schemabian)
