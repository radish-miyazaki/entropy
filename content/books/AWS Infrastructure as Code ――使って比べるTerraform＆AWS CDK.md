---
title: ［詳解］AWS Infrastructure as Code ――使って比べるTerraform＆AWS CDK
aliases: [AWS Infrastructure as Code ――使って比べるTerraform＆AWS CDK]
description: AWS のリソースを対象に、Terraform と AWS CDK の使い方と仕組みを比べながら IaC の汎用的なスキルを身につける本
tags: [book]
date: 2025-07-01
book-authors: []
publisher: 技術評論社
isbn: 9784297147242
---

## TL;DR

- [[aws|AWS]] のリソースを対象に、[[infrastructure-as-code|Infrastructure as Code（IaC）]]を実践的に解説する本である。
- 幅広いシステムに対応できる [[terraform|Terraform]] と、リソースを抽象的に記述できる [[aws-cdk|AWS CDK]] を取り上げ、[[amazon-vpc|VPC]] や [[amazon-ecs|Amazon ECS]] の構築を通じて両者を比べる。

## 対象読者

IaC をこれから始める人と、Terraform か AWS CDK のどちらかをすでに使っている人に向けた本である。両ツールに共通する宣言的なコードの書き方と、コードの書き方や差分を取る仕組みの違いを掘り下げる。サンプルコードは [tabito-hara/gihyo-aws-iac-book-sample](https://github.com/tabito-hara/gihyo-aws-iac-book-sample) にある。

## 目次

1. クラウドとInfrastructure as Code
2. IaC環境の構築
3. ［体験］IaCによるリソースのデプロイ
4. Terraform詳細解説
5. AWS CDK詳細解説
6. VPCのIaCによる記述
7. ECSサービスのIaCによる記述
8. Terraform & AWS CDK注意すべき相違点
9. 既存リソースのインポート
10. Lambda関数のデプロイ
11. IaCにおけるLambda関数の活用

%%

## 感想

全体を通しての評価や気づき。書くときはこのコメントを外す
%%

## 関連

- [[infrastructure-as-code|Infrastructure as Code]]
- [[terraform|Terraform]]
- [[aws-cdk|AWS CDK]]
- [[cdk-for-terraform|CDK for Terraform]]
- [[Terraformの教科書]]
- [[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで]]
- [出版社の書籍ページ](https://gihyo.jp/book/2025/978-4-297-14724-2)
