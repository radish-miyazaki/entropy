---
title: Laravel
aliases: []
description: 表現力のある簡潔な構文を持つ PHP の Web アプリケーションフレームワーク
tags: [word, php, フレームワーク]
date: 2026-11-14
---

## TL;DR

表現力のある簡潔な構文を持つ、PHP の Web アプリケーションフレームワーク。依存性注入、データベースの抽象化層、キューとスケジュールジョブ、テストなどの機能をそろえている。

## なぜ必要か

公式ドキュメントは Laravel を「プログレッシブ」なフレームワークと呼んでいる。初心者はドキュメントやガイドで学べ、経験者は[[dependency-injection|依存性注入]]、ユニットテスト、キュー、リアルタイムイベントなどの道具を使える。PHP の性質と、Redis のような分散キャッシュへの組み込みの対応により、[[horizontal-scaling|水平スケーリング]]もしやすいとしている。

## 仕組み

使い方は大きく 2 つある。1 つはフルスタックのフレームワークとして、リクエストのルーティングから Blade テンプレートや Inertia によるフロントエンドの描画までを担う使い方で、最も一般的である。もう 1 つは、JavaScript の SPA やモバイルアプリの API バックエンドとして、認証やデータの保存・取得、キューや通知などを担う使い方である。

## 例

```shell
laravel new example-app
cd example-app
composer run dev
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ruby-on-rails|Ruby on Rails]]
- [[frankenphp|FrankenPHP]]

## 出典

- [Installation - Laravel 12.x](https://laravel.com/docs/12.x)
