---
title: Amazon EC2
aliases: [EC2]
description: AWS のクラウド上で、必要な数だけ仮想サーバを起動して使えるコンピューティングサービス
tags: [word, aws, インフラ]
date: 2026-11-14
---

## TL;DR

Amazon Elastic Compute Cloud の略。[[aws|AWS]] のクラウド上で、オンデマンドでスケールできるコンピューティング能力を提供するサービスである。EC2 インスタンスは AWS のクラウド上の仮想サーバを指す。

## なぜ必要か

ハードウェアを自分で用意せずに、必要な数だけ仮想サーバを起動し、セキュリティ、ネットワーク、ストレージを設定できる。月次の処理やトラフィックの急増に合わせて台数を増やし、使わなくなったら減らせる。

## 仕組み

インスタンスを起動するときに指定するインスタンスタイプが、使えるハードウェアを決める。インスタンスタイプごとに、CPU、メモリ、ネットワーク、ストレージの組み合わせが異なる。OS や追加のソフトウェアは AMI（Amazon Machine Image）というテンプレートにまとめておく。永続的なデータは Amazon EBS のボリュームに置き、ログインにはキーペアを使う。セキュリティグループは仮想のファイアウォールで、インスタンスに届くプロトコル、ポート、送信元の IP アドレスの範囲を指定する。

料金はオンデマンド（秒単位、最低 60 秒）、Savings Plans、リザーブドインスタンス、スポットインスタンスなどから選べる。

## 例

- [[amazon-ecs|Amazon ECS]] では、コンテナの実行環境に EC2 か [[aws-fargate|AWS Fargate]] を選べる。EC2 を選ぶと、OS や Docker Engine などホストマシンの管理が必要になる。
- Packer でカスタマイズした AMI の ID を Terraform から参照して、EC2 インスタンスを作れる（[[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで 第1章 Infrastructure as Code（IaC）とTerraform|Terraformではじめる実践IaC 第1章]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[compute-engine|Compute Engine]]: Google Cloud で対応するサービス
- [[amazon-vpc|VPC]]
- [[aws-fargate|AWS Fargate]]

## 出典

- [What is Amazon EC2? - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)
