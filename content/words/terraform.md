---
title: Terraform
aliases: []
description: HashiCorp が開発した、クラウドやオンプレミスのリソースを宣言的な設定ファイルで構築・変更・バージョン管理する IaC ツール
tags: [word, terraform]
date: 2026-11-14
---

## TL;DR

[[hashicorp|HashiCorp]] が開発した [[infrastructure-as-code|Infrastructure as Code]] のツール。クラウドやオンプレミスのリソースを人が読める設定ファイルで定義し、同じワークフローで構築、変更、バージョン管理する。

## なぜ必要か

公式ドキュメントによると、Terraform はインフラを変更する前に実行計画を作り、承認を求めるので、安全に変更できる。最終的にあるべき状態を宣言的に書けば、そこに至る手順は Terraform が決める。設定ファイルはバージョン管理に置けるので、チームで共有しやすい。

## 仕組み

Terraform は、各サービスの API を通じてリソースを操作する。API とのやり取りは[[terraform-provider|プロバイダ]]というプラグインが受け持つ。

設定は [[hcl|HCL]] で `.tf` ファイルに書き、次の 3 段階で反映する。

1. Write: [[terraform-resource|リソース]]を定義する
2. Plan: 設定と既存のインフラを比べ、作成、更新、削除する内容の実行計画を作る
3. Apply: 承認された計画を、依存関係の順に実行する

実際のインフラは[[terraform-state|ステート]]ファイルで追跡し、設定と比べて変更の内容を決める。依存グラフを作るので、互いに依存しないリソースは並行して作られる。再利用できる構成は[[terraform-module|モジュール]]にまとめ、公開されたプロバイダやモジュールは [[terraform-registry|Terraform Registry]] から探せる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[infrastructure-as-code|Infrastructure as Code]]
- [[hashicorp|HashiCorp]]
- [[hcl|HCL]]
- [[cdk-for-terraform|CDK for Terraform]]
- [[aws-cdk|AWS CDK]]
- [[drift|Drift]]
- [[terraform-basic-blocks|Terraform の基本ブロックを整理する]]

## 出典

- [What is Terraform? - HashiCorp Developer](https://developer.hashicorp.com/terraform/intro)
