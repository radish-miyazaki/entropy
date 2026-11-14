---
title: GO Feature Flag
aliases: []
description: Go で書かれた、OpenFeature に対応したセルフホスト型のフィーチャーフラグ管理システム
tags: [word, go]
date: 2025-04-11
---

## TL;DR

[[go|Go]] で[[feature-flag|フィーチャーフラグ]]を管理するためのライブラリ。OpenFeature に対応したオープンソースの管理システムで、自分たちのインフラ上で動かす。

## 仕組み

フラグの設定はファイルに書き、S3、Google Cloud、GitHub、[[kubernetes|Kubernetes]] などから読み込める。自分たちのインフラ上でリレープロキシを動かし、アプリケーションは OpenFeature の SDK を使って、リレープロキシに対してフラグを評価する。SDK は Go のほか、Java、.NET、[[python|Python]]、[[javascript|JavaScript]] / [[typescript|TypeScript]]、PHP、Ruby、[[rust|Rust]] などで提供されている。

## 例

- 段階的なロールアウト: 一定の期間で、対象のユーザを 0% から 100% まで広げる。
- A/B テスト: ユーザを複数のグループに分け、それぞれの使われ方を追跡する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [GO Feature Flag](https://gofeatureflag.org/)
