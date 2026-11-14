---
title: AWS CDK
aliases: [CDK]
description: 汎用のプログラミング言語でクラウドのインフラを定義し、AWS CloudFormation を通じてプロビジョニングする OSS のフレームワーク
tags: [word, aws, iac]
date: 2026-11-14
---

## TL;DR

AWS Cloud Development Kit の略。クラウドのインフラをコードで定義し、AWS CloudFormation を通じてプロビジョニングする、オープンソースのソフトウェア開発フレームワークである。

## なぜ必要か

TypeScript、JavaScript、Python、Java、C#/.NET、Go といった汎用のプログラミング言語でインフラを書ける。引数、条件分岐、ループ、合成、継承などの言語の機能を使え、IDE の補完も効く。インフラ、アプリケーションのコード、設定を 1 か所にまとめ、コードレビュー、単体テスト、バージョン管理といったソフトウェア開発の慣行をインフラにも当てはめられる。[[AWS Infrastructure as Code ――使って比べるTerraform＆AWS CDK]] では、リソースを抽象的に記述できる点を Terraform との違いとして取り上げている。

## 仕組み

AWS CDK は、Construct Library と CDK Toolkit の 2 つからなる。Construct Library は、コンストラクトと呼ぶ再利用できる部品の集まりである。低レベルのコンストラクトは個々の CloudFormation リソースとそのプロパティを表し、高レベルのコンストラクトは、安全な既定値を備えた大きな部品を少ないコードで定義する。コンストラクトを組み合わせてスタックとアプリを作り、CloudFormation でデプロイする。CDK Toolkit は、合成（synth）やデプロイを行う CLI とライブラリである。

## 例

公式ドキュメントの例では、[[amazon-vpc|VPC]]、[[amazon-ecs|Amazon ECS]] のクラスター、ロードバランサ付きの [[aws-fargate|AWS Fargate]] サービスを数十行で定義している。このコードから 500 行を超える CloudFormation のテンプレートが生成され、50 を超えるリソースがデプロイされる。

```ts
const vpc = new ec2.Vpc(this, "MyVpc", { maxAzs: 3 })
const cluster = new ecs.Cluster(this, "MyCluster", { vpc: vpc })
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cdk-for-terraform|CDK for Terraform]]: AWS CDK の考え方とライブラリを土台に、Terraform の設定を生成する
- [[amazon-vpc|VPC]]
- [[amazon-ecs|Amazon ECS]]

## 出典

- [What is the AWS CDK? - AWS Cloud Development Kit](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [[AWS Infrastructure as Code ――使って比べるTerraform＆AWS CDK]]
