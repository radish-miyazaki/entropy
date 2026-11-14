---
title: サイドカー
aliases: []
description: メインのコンテナと同じインスタンス内で並走させる、補助的なコンテナ
tags: [word, コンテナ]
date: 2026-07-09
---

## TL;DR

メインのコンテナと同じインスタンス内で並走させる、補助的なコンテナ。

## 例

主な用途は、ログ収集、監視、認証プロキシ、DB 接続プロキシである。

Google Cloud の Cloud Run には、もともと 1 つのサービスに 1 つのコンテナという制約があった。2024 年にサイドカーコンテナが導入され、1 つのサービスで複数のコンテナを動かせるようになった。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[service-mesh|サービスメッシュ]]
- [[container-orchestration|コンテナオーケストレーション]]

## 出典

- [Cloud Run がマルチコンテナ デプロイをサポート - Google Cloud ブログ](https://cloud.google.com/blog/ja/products/serverless/cloud-run-now-supports-multi-container-deployments/)
