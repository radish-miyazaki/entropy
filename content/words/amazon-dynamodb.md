---
title: Amazon DynamoDB
aliases: [DynamoDB]
description: AWS が提供する、サーバレスでフルマネージドな分散型の NoSQL キーバリューデータベース
tags: [word, aws]
date: 2025-04-06
---

## TL;DR

[[aws|AWS]] が提供する、サーバレスでフルマネージドな分散型の [[nosql|NoSQL]] キーバリューデータベース。規模を問わず 1 桁ミリ秒の性能を出せる。

## なぜ必要か

バックアップ、セキュリティ、モニタリングなどのデータベース管理を AWS に任せられる。インフラの管理やダウンタイムを伴うメンテナンスが不要で、需要に応じてすぐにスケールし、リクエストごとに課金される。

## 仕組み

グローバルテーブルを使うと、複数のリージョンで読み書きできるマルチアクティブなデータベースになり、最大 99.999% の可用性を得られる。

## 例

- ローカルでは [[docker|Docker]] 上で [DynamoDB Local](https://hub.docker.com/r/amazon/dynamodb-local) を動かせる。
- [[go|Go]] から操作するなら [guregu/dynamo](https://github.com/guregu/dynamo) が便利である。タグを使って構造体にマッピングできる。
- [[terraform|Terraform]] では [aws_dynamodb_table](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table) で作成する。

## 自分の理解

フルマネージドな Apache Cassandra というイメージを持っているが、合っているかは分からない。

## 関連

- [[cloud-bigtable|Cloud Bigtable]]: GCP で対応するサービス
- [[aws-gcp-service-mapping|AWS と GCP のサービスの対応表]]

## 出典

- [Amazon DynamoDB](https://aws.amazon.com/jp/dynamodb/)
