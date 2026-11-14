---
title: サイドカー
aliases: []
description: メインのコンテナと同じインスタンス内で並走させる、補助的なコンテナ
tags: [word, コンテナ]
date: 2026-07-09
---

## TL;DR

メインのコンテナと同じインスタンス内で並走させる、補助的なコンテナ。

## なぜ必要か

[[kubernetes|Kubernetes]] のドキュメントによると、サイドカーコンテナは、メインのアプリケーションのコードを直接変えずに、ログ収集、監視、セキュリティ、データ同期などの機能を足して、アプリケーションコンテナの機能を広げるために使う。

## 仕組み

Kubernetes では、サイドカーコンテナは init コンテナの特殊な形として実装されている。`initContainers` の要素に `restartPolicy: Always` を指定すると、そのコンテナは Pod の起動後も止まらず、Pod が動いている間ずっと実行される。

サイドカーコンテナはメインのコンテナとネットワークとストレージの名前空間を共有するので、`emptyDir` ボリュームなどを通してデータを受け渡せる。一方で、ライフサイクルはアプリケーションコンテナから独立しており、個別に起動、停止、再起動できる。Pod が終了するとき、kubelet はメインのコンテナが完全に止まるまでサイドカーコンテナの終了を待ち、その後に定義と逆の順で止める。

## 例

主な用途はログ収集、監視、認証プロキシ、DB 接続プロキシである。

Google Cloud の Cloud Run には、もともと 1 つのサービスに 1 つのコンテナという制約があった。2024 年にサイドカーコンテナが導入され、1 つのサービスで複数のコンテナを動かせるようになった。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[service-mesh|サービスメッシュ]]
- [[container-orchestration|コンテナオーケストレーション]]

## 出典

- [Sidecar Containers - Kubernetes](https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/)
- [Cloud Run がマルチコンテナ デプロイをサポート - Google Cloud ブログ](https://cloud.google.com/blog/ja/products/serverless/cloud-run-now-supports-multi-container-deployments/)
