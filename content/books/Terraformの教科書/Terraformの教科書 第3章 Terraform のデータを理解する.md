---
title: Terraformの教科書 第3章 Terraform のデータを理解する
description: data ブロックで既存のインフラの状態や設定を読み込むデータソースを、AWS と Google Cloud の例でまとめた節
tags: [book-chapter, terraform]
date: 2026-07-09
book: "[[Terraformの教科書]]"
chapter: 3
---

## TL;DR

- [[terraform-data-source|データソース]]は、既存のインフラの状態や設定を読み込む仕組みで、`data` ブロックで定義する。

## 内容

[[Terraformの教科書 第3章 Terraformをはじめよう|第3章 Terraformをはじめよう]]の 3.6 節。公式ドキュメントは https://developer.hashicorp.com/terraform/language/data-sources 。

### AWS での例

既存の [[amazon-vpc|VPC]] にサブネットを作成する。`data` ブロックで VPC を読み込み、`data.aws_vpc.example` の形で参照する。`aws_vpc` データソースが出力する属性は[公式の一覧](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/vpc#attribute-reference)にある。

```tf
variable "vpc_id" {}

data "aws_vpc" "example" {
  id = var.vpc_id
}

resource "aws_subnet" "example" {
  vpc_id            = data.aws_vpc.example.id
  availability_zone = "us-west-2a"
  cidr_block        = cidrsubnet(data.aws_vpc.example.cidr_block, 4, 1)
}
```

### Google Cloud での例

既存の Google Compute Engine の仮想マシンインスタンスの詳細を取得する。出力される属性は[公式の一覧](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_instance#attributes-reference)にある。

```tf
data "google_compute_instance" "example" {
  name = "Terraform-server"
  zone = "us-central1-a"
}
```

## キーワード

- [[terraform|Terraform]]
- [[terraform-data-source|データソース]]
- [[amazon-vpc|VPC]]
- [[aws|AWS]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
