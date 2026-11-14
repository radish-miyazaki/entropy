---
title: Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで 第1章 Infrastructure as Code（IaC）とTerraform
description: IaC のメリットと IaC ツールの分類を整理し、HCL で宣言的にインフラを記述する Terraform の特徴を紹介する章
tags: [book-chapter, terraform]
date: 2025-10-09
book: "[[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで]]"
chapter: 1
---

## TL;DR

- [[infrastructure-as-code|IaC]] を使うと、作業の正確さを保ち、改善を確実に反映できる。
- [[terraform|Terraform]] は宣言型の IaC ツールで、プロバイダを介して複数のクラウドや SaaS を同じ書き方で管理できる。

## 内容

### IaC のメリット

インフラをコードで管理すると、同じコードからは同じ操作が実行されるので、作業の正確さが保たれる。コードを直せば、解釈のぶれなく次回から確実に反映される。管理コンソールの画面が変わるたびに手順書を直す手間もなくなる。

ただし、緊急時などには管理コンソールから直接リソースを操作することも十分にありうる。すべてを IaC に頼ればよいわけではない。

### IaC ツールの分類

IaC ツールは、記述方法で 2 つに分けられる。手続き型はインフラを構築する手順を書き、宣言型はリソースが最終的にどうなってほしいかを書く。Terraform は宣言型である。

適用範囲でも分けられる。

- クラウドリソースを中心に、サービスの基盤となるリソースを構成するツール: Terraform、Pulumi、AWS CloudFormation、Google Cloud Deployment Manager、Bicep
- OS より上のカーネルパラメータやミドルウェアを構成するツール: [[ansible|Ansible]]、Chef、[[packer|Packer]]、Puppet
- アプリケーションをパッケージングするツール: Docker、Cloud Native Buildpacks

これらは組み合わせて使える。たとえば Packer で AMI（Amazon Machine Image）をカスタマイズするとき、Ansible を Packer の[プロビジョナー](https://developer.hashicorp.com/packer/docs/provisioners)として使う。Packer の実行が終わるとカスタム AMI の ID が得られるので、それを Terraform から参照して [[amazon-ec2|EC2]] インスタンスを作る。

```hcl
data "aws_ami" "sample_ami" {
  most_recent = true
  owners      = ["self"]

  filter {
    name   = "tag:Name"
    values = ["sample-ami"]
  }
}

resource "aws_instance" "sample_instance" {
  ami           = data.aws_ami.sample_ami.id
  instance_type = "t3.medium"

  tags = {
    Name = "sample-instance"
  }
}
```

### Terraform の特徴

Terraform は [[hashicorp|HashiCorp]] が開発している IaC ツールである。1 つのクラウドだけでなく、複数のクラウドやオンプレミスのリソースも対象にできる。コンピューティング、ストレージ、ネットワークのリソースに加えて、[[dns|DNS]] のような上位のリソースや、さまざまな SaaS も管理できる。開発・運用のプロセスに組み込めば、コードを書き、差分を確認し（`plan`）、適用する（`apply`）サイクルを繰り返して、継続的にインフラを構築・管理できる。

設定は [[hcl|HCL]]（HashiCorp Configuration Language）で拡張子 `.tf` のファイルに書く。v0.13 以降は HCL v2 で書く。Terraform はこの `.tf` ファイルを解釈してインフラを構築する。構築するときには、対象に応じて[[terraform-module|モジュール]]、[[terraform-provider|プロバイダ]]、[[terraform-state|ステート]]などの要素が必要になる。

Terraform の最大のメリットは、AWS、Google Cloud、Microsoft Azure などのマルチクラウドで使えることである。クラウドベンダーが提供するツールは、状態管理をクラウドに任せられる、実行バイナリのバージョン管理がいらない、変更差分の検知をマネージドな機能で通知できる、といった利点を持つ。そのため、単一のクラウドだけを使うなら Terraform の恩恵は小さいように見える。それでも Terraform には、条件分岐や繰り返しをある程度プログラマブルに書けることと、Linter やドキュメンテーションツールなどのエコシステムが豊富なことという利点がある。

また、API を提供しているサービスであれば、プロバイダを介して Terraform で管理できる。プロバイダは、HCL で書いたコードを各サービスに向けて実行するプラグインである。公開されているものを使うことも、自分で開発することもできる。

### IaC にするかどうかの判断基準

リソースを IaC で管理するかどうかは、そのリソースを何度繰り返し作るか、どれくらいの頻度で作るかで判断する。

## キーワード

- [[infrastructure-as-code|Infrastructure as Code]]
- [[terraform|Terraform]]
- [[hcl|HCL]]
- [[terraform-provider|プロバイダ]]
- [[terraform-module|モジュール]]
- [[terraform-state|ステート]]
- [[hashicorp|HashiCorp]]
- [[packer|Packer]]
- [[ansible|Ansible]]
- [[amazon-ec2|Amazon EC2]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
