---
title: VPC
aliases: [Amazon VPC]
description: AWS 上に、自分で定義した論理的に分離された仮想ネットワークを作るサービス
tags: [word, aws, ネットワーク]
date: 2026-11-14
---

## TL;DR

Amazon Virtual Private Cloud の略。[[aws|AWS]] のリソースを、自分で定義した論理的に分離された仮想ネットワークの中で起動できるサービスである。

## なぜ必要か

自社のデータセンターで運用する従来のネットワークによく似たネットワークを、AWS のスケーラブルなインフラの上に作れる。どのリソースをインターネットに出し、どれを閉じたネットワークに置くかを、自分で設計できる。

## 仕組み

VPC を作ったら、サブネットを追加する。サブネットは VPC 内の IP アドレスの範囲で、1 つのアベイラビリティゾーンに属する。サブネットを作ると、[[amazon-ec2|EC2]] インスタンスなどのリソースを VPC にデプロイできる。

通信の行き先はルートテーブルで決める。インターネットゲートウェイを付けるとインターネットにつながり、VPC エンドポイントを使うとインターネットを通らずに AWS のサービスへ接続できる。VPC ピアリング接続で 2 つの VPC の間をルーティングしたり、Site-to-Site VPN でオンプレミスのネットワークとつないだりもできる。

各リージョンには、すぐに EC2 インスタンスを起動できるデフォルト VPC が用意されている。VPC そのものに追加の料金はかからないが、NAT ゲートウェイやパブリック IPv4 アドレスなどには料金がかかる。

## 例

[[Terraformの教科書 第3章 Terraform の出力を理解する|Terraformの教科書 第3章]]では、Terraform で VPC を作成し、その ID と CIDR ブロックを出力している。既存の VPC を `data` ブロックで読み込み、そこにサブネットを作る例もある（[[Terraformの教科書 第3章 Terraform のデータを理解する|Terraform のデータを理解する]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[amazon-ec2|Amazon EC2]]
- [[amazon-ecs|Amazon ECS]]
- [[aws-cdk|AWS CDK]]

## 出典

- [What is Amazon VPC? - Amazon Virtual Private Cloud](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
