---
title: AWS と GCP のサービスの対応表
aliases: []
description: AWS のサービスと、それに対応する GCP のサービスを分野ごとに並べた表
tags: [word, aws, gcp]
date: 2025-04-06
---

## TL;DR

[[aws|AWS]] のサービスと、それに対応する GCP のサービスを分野ごとに並べた表。自分が使ったことがある、または今後使いそうなサービスだけを抜き出している。

## 例

### コンピューティング

| AWS                          | GCP                                | 概要                                                        |
| ---------------------------- | ---------------------------------- | ----------------------------------------------------------- |
| [[amazon-ec2\|Amazon EC2]]   | [[compute-engine\|Compute Engine]] | セルフマネージドな仮想サーバを提供する（[[iaas\|IaaS]]）    |
| AWS Lambda                   | Cloud Functions                    | サーバレスでコードを実行する環境を提供する                  |
| [[aws-fargate\|AWS Fargate]] | Cloud Run                          | サーバレスで[[container\|コンテナ]]を実行する環境を提供する |
| [[amazon-ecs\|Amazon ECS]]   | Cloud Run                          | [[container-orchestration\|コンテナオーケストレーション]]   |
| Amazon ECR                   | Google Container Registry          | コンテナイメージを一元管理する                              |
| AWS AppSync                  | Cloud Functions（？）              |                                                             |

### ストレージ / データベース

| AWS                                  | GCP                                | 概要                                                                                  |
| ------------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------- |
| [[amazon-s3\|Amazon S3]]             | Cloud Storage                      | オブジェクトストレージ                                                                |
| Amazon EFS                           | Filestore                          | フルマネージドでスケーラブルなファイルストレージ                                      |
| Amazon RDS                           | Cloud SQL                          | フルマネージドな RDB（[[mysql\|MySQL]]、[[postgresql\|PostgreSQL]]、SQL Server など） |
| Amazon Aurora                        | Cloud SQL                          | フルマネージドで、MySQL と PostgreSQL に互換性のある高性能な RDB                      |
| AWS Backup                           | Backup and DR Service              | 各ストレージサービスのバックアップを一元管理する                                      |
| [[amazon-dynamodb\|Amazon DynamoDB]] | [[cloud-bigtable\|Cloud Bigtable]] | フルマネージドな [[nosql\|NoSQL]] データベース                                        |
| Amazon ElastiCache                   | Memorystore                        | フルマネージドなインメモリデータベース（Redis）                                       |
| Amazon DocumentDB                    | Firestore                          | フルマネージドな[[document-database\|ドキュメントデータベース]]（MongoDB 互換）       |
| Amazon Elasticsearch                 | -                                  |                                                                                       |
| Amazon Redshift                      | BigQuery                           | フルマネージドなデータウェアハウス                                                    |

### ネットワーク

| AWS                | GCP         | 概要                                                         |
| ------------------ | ----------- | ------------------------------------------------------------ |
| Amazon VPC         | Google VPC  | 仮想ネットワークを作り、クラウド内でリソースを分離・管理する |
| Amazon CloudFront  | Cloud CDN   | [[cdn\|CDN]]                                                 |
| Amazon Route 53    | Cloud DNS   | [[dns\|DNS]]                                                 |
| Amazon API Gateway | API Gateway | API を作成・公開・管理するためのフルマネージドサービス       |

### セキュリティ

| AWS          | GCP          | 概要                                       |
| ------------ | ------------ | ------------------------------------------ |
| [[iam\|IAM]] | [[iam\|IAM]] | ユーザやグループに対してアクセス制御を行う |
| AWS WAF      | Cloud Armor  | WAF                                        |
| AWS Shield   | Cloud Armor  | DDoS 攻撃からアプリケーションを保護する    |

### フロントエンド / モバイル

| AWS            | GCP               | 概要 |
| -------------- | ----------------- | ---- |
| AWS Amplify    | Firebase（？）    |      |
| Amazon Cognito | Identity Platform |      |

### メッセージング / イベント管理

| AWS        | GCP     | 概要                                                                                       |
| ---------- | ------- | ------------------------------------------------------------------------------------------ |
| Amazon SQS | Pub/Sub | メッセージキューイング。メッセージを一時的に保存し、非同期なメッセージの受け渡しを実現する |
| Amazon SNS | Pub/Sub | プッシュ通知やメール送信を行う                                                             |
| Amazon MQ  | Pub/Sub | フルマネージドなメッセージブローカー                                                       |

### 開発支援

| AWS              | GCP          | 概要    |
| ---------------- | ------------ | ------- |
| AWS CodePipeline | Cloud Build  | CI / CD |
| AWS CodeBuild    | Cloud Build  |         |
| AWS CodeDeploy   | Cloud Deploy |         |

### モニタリング

| AWS               | GCP              | 概要 |
| ----------------- | ---------------- | ---- |
| Amazon CloudWatch | Cloud Monitoring |      |

## 注意点

対応関係があいまいなものには「（？）」を付けている。表はまだ作りかけである。サービスの名前や対応は変わることがあるので、最新の対応は Google Cloud の[サービス比較](https://cloud.google.com/docs/get-started/aws-azure-gcp-service-comparison?hl=ja)で確かめる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[aws|AWS]]

## 出典

- [AWS、Azure、Google Cloud のサービス比較](https://cloud.google.com/docs/get-started/aws-azure-gcp-service-comparison?hl=ja)
- https://qiita.com/engiMeer/items/2af9a698b4bf4f76dd98
- https://qiita.com/hayao_k/items/906ac1fba9e239e08ae8
- https://sal-blog.com/compare-aws-azure-googlecloud/
