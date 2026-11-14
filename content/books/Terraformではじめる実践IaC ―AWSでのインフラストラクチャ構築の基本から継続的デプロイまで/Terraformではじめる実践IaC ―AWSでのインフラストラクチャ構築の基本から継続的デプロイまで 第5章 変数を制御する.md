---
title: Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで 第5章 変数を制御する
description: variable ブロックのパラメータと、type や validation で期待しない値の代入を防ぎ、堅牢な変数を定義する方法を説明する章
tags: [book-chapter, terraform]
date: 2025-10-10
book: "[[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで]]"
chapter: 5
---

## TL;DR

- `variable` ブロックには `default`、`type`、`description`、`validation`、`sensitive`、`nullable` を指定できる。
- `type` と `validation` を組み合わせると、期待しない値の代入を防ぐ堅牢な変数を定義できる。

## 内容

### variable ブロックのパラメータ

[[terraform|Terraform]] の `variable` ブロックでは、次のパラメータを指定できる。どれも省略できる。

- `default`: 値が渡されなかったときのデフォルト値
- `type`: 型
- `description`: 説明文
- `validation`: 値のルール
- `sensitive`: パスワードや API キーのような秘匿性の高い値かどうか
- `nullable`: `null` を許すかどうか

### type による制御

`type` を指定すると、期待と異なる型の値が代入されるのを防げる。

```hcl
variable "ebs_storage_size" {
  description = "EBS storage size indicated by number."
  type        = number
}
```

### validation による制御

`validation` ブロックでは、`condition` に書いた式で値を評価し、結果が `false` ならエラーにする。エラーメッセージは `error_message` で指定する。

```hcl
variable "s3_arn" {
  description = "ARN of the S3 bucket to output logs."
  type        = string

  validation {
    condition     = can(regex("^arn:aws:s3:::", var.s3_arn))
    error_message = "s3_arn should start with arn:aws:s3:::"
  }
}
```

v1.9 からは、`validation` の式から他の変数、データリソース、ローカル変数を参照できるようになった。これにより、ある変数の値に応じて別の変数の値を検査できる。

```hcl
variable "create_fargate_cluster" {
  description = "Whether to create a new cluster."
  type        = bool
  default     = false
}

variable "fargate_cluster_endpoint" {
  description = "Endpoint of the existing cluster to use."
  type        = string
  default     = ""

  validation {
    condition     = var.create_fargate_cluster == false ? length(var.fargate_cluster_endpoint) > 0 : true
    error_message = "You must specify a value for fargate_cluster_endpoint if create_fargate_cluster is false."
  }
}
```

### より厳格な制御

`object` 型の変数では、フィールドごとに `validation` で値を検査できる。次の例では、インスタンスタイプが `t` で始まり、プライベート IP が `10.0.10.` で始まることを求めている。

```hcl
variable "sample_ec2_setting" {
  type = object({
    instance_type = string
    private_ip    = string
  })

  validation {
    condition     = can(regex("^t", var.sample_ec2_setting.instance_type)) && can(regex("^10.0.10.", var.sample_ec2_setting.private_ip))
    error_message = "The instance_type must be t type and private_ip must be 10.0.10.x."
  }
}
```

`object` のリストを `for_each` で回せば、型で決めたパラメータをループの中で使える。

```hcl
resource "aws_security_group_rule" "sample" {
  for_each = { for setting in var.sample_rule_setting : setting.description => setting }

  security_group_id = "sg-xxxxxx"
  type              = each.value.type
  from_port         = each.value.from_port
  to_port           = each.value.to_port
  protocol          = each.value.protocol
  cidr_blocks       = each.value.cidr_blocks
  description       = each.value.description
}

variable "sample_rule_setting" {
  type = list(object({
    type        = string
    from_port   = string
    to_port     = string
    protocol    = string
    cidr_blocks = list(string)
    description = string
  }))
}
```

## キーワード

- [[terraform|Terraform]]
- [[hcl|HCL]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
