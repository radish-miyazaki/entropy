---
title: AWS Fargate
aliases: [Fargate]
description: Amazon ECS と Amazon EKS で、ホストマシンを意識せずにコンテナを実行できるサーバレスのコンピューティングエンジン
tags: [word, aws]
date: 2025-04-06
---

## TL;DR

[[amazon-ecs|Amazon ECS]] と Amazon EKS で、ホストマシンを意識せずに[[container|コンテナ]]を実行できるサーバレスのコンピューティングエンジン。

## なぜ必要か

Amazon ECS / EKS では、実行環境に [[amazon-ec2|Amazon EC2]] か Fargate を選べる。EC2 を選ぶと、ホストマシン上でコンテナを起動するので、OS や Docker Engine などホストマシンの管理と運用が必要になる。ホストマシンの[インスタンスタイプ](https://aws.amazon.com/jp/ec2/instance-types/)の選択、スケジューリング、オートスケーリングの調整も別に行わなければならない。

一方 Fargate を選ぶと、ホストマシンの選定と管理、OS やミドルウェアの保守、スケーリングといった作業から解放される。そのぶん、アプリケーションの開発に集中できる。

## 仕組み

ECS のタスクと EKS のポッドは、それぞれ専用のランタイム環境で動き、互いに分離される。料金は使ったコンピューティングリソースの分だけで、初期費用はかからない。

## 例

[[terraform|Terraform]] では、[ecs-fargate モジュール](https://registry.terraform.io/modules/umotif-public/ecs-fargate/aws/latest)を使って構築できる（[構築例](https://developer.dip-net.co.jp/entry/2020/09/10/TerraformでFargateを構築する)）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[amazon-ecs|Amazon ECS]]
- [[container-orchestration|コンテナオーケストレーション]]
- [[aws-gcp-service-mapping|AWS と GCP のサービスの対応表]]

## 出典

- [AWS Fargate](https://aws.amazon.com/jp/fargate/)
- [AWS Fargate とは？ - NTT 東日本](https://business.ntt-east.co.jp/content/cloudsolution/column-171.html)
