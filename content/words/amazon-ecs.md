---
title: Amazon ECS
aliases: []
description: AWS が提供する、フルマネージドのコンテナオーケストレーションサービス
tags: [word, aws]
date: 2024-10-02
---

## TL;DR

[[aws|AWS]] が提供する、フルマネージドの[[container-orchestration|コンテナオーケストレーション]]サービス。正式名は Amazon Elastic Container Service。コンテナ化したアプリケーションのデプロイ、管理、スケールを助ける。

## 仕組み

コンテナを動かす基盤（キャパシティ）は、次から選べる。

- Amazon EC2 のインスタンス。インスタンスの種類や数を自分で管理する
- [[aws-fargate|AWS Fargate]]。サーバーレスで、サーバの管理やキャパシティの計画が要らない
- Amazon ECS Managed Instances。EC2 のインスタンスを使いつつ、プロビジョニングやパッチ適用を AWS に任せる
- Amazon ECS Anywhere。オンプレミスのサーバや VM をクラスタに登録する

アプリケーションは、設計図にあたるタスク定義をもとに、クラスタの上で動く。バッチ処理のように仕事を終えると止まるものをタスク、ステートレスで動き続けるものをサービスと呼ぶ。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[aws-fargate|AWS Fargate]]
- [[container-orchestration|コンテナオーケストレーション]]

## 出典

- [Amazon ECS](https://aws.amazon.com/jp/ecs/)
- [What is Amazon Elastic Container Service?](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)
