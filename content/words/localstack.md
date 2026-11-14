---
title: LocalStack
aliases: []
description: AWS などのクラウド環境を手元のコンテナでエミュレートし、実際のクラウドにデプロイせずに開発・テストできるようにするプラットフォーム
tags: [word, aws]
date: 2026-07-09
---

## TL;DR

クラウド環境を自分のインフラ上でエミュレートする、ローカルのクラウド開発プラットフォーム。実際のクラウドにデプロイせずに開発やテストができる。

## なぜ必要か

公式ドキュメントによると、LocalStack を使えば、AWS のアカウントやクラウドの費用なしに開発とテストができる。変更をローカルの AWS のサービスに対して試せるので、デプロイを待つ時間も省ける。CI でのインテグレーションテストや、[[terraform|Terraform]]、[[aws-cdk|AWS CDK]]、CloudFormation などの [[infrastructure-as-code|IaC]] のテンプレートの検証、新しい AWS のサービスを試すのにも使える。

## 仕組み

軽量なコンテナとして動き、通常は Docker で起動する。開発者のノート PC、CI のランナー、共用のインフラ、Kubernetes 上で動かせる。エミュレートできるのは [[aws|AWS]] の 120 以上のサービスと Snowflake で、Azure 版はパブリックプレビューである。

## 例

ローカルでの開発とデバッグ、本番前のテスト、GitHub Actions などの CI/CD パイプライン、必要なときだけ作るステージング環境、AI エージェントのサンドボックスなどに使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [LocalStack](https://www.localstack.cloud/)
- [Getting Started - LocalStack Docs](https://docs.localstack.cloud/getting-started/)
