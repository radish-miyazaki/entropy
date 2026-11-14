---
title: Terraformの教科書 第3章 Terraform の変数を理解する
description: variable ブロックで入力変数を宣言し、環境変数・tfvars ファイル・コマンドライン・デフォルト値で値を渡す方法をまとめた節
tags: [book-chapter, terraform]
date: 2026-07-08
book: "[[Terraformの教科書]]"
chapter: 3
---

## TL;DR

- [[terraform-input-variable|入力変数]]は `variable` ブロックで宣言し、`var.<変数名>` で参照する。
- 値は環境変数、tfvars ファイル、コマンド実行時の入力、デフォルト値で渡せる。

## 内容

[[Terraformの教科書 第3章 Terraformをはじめよう|第3章 Terraformをはじめよう]]の 3.4 節。公式ドキュメントは https://developer.hashicorp.com/terraform/language/values/variables 。

### Terraform の変数

変数を使う目的は、他のプログラミング言語と同じく、重複を減らすこと（[[dry|DRY]]）である。他の言語と異なるのは、Terraform のコードを実行するときに値を入力できる点である。

変数は `variable` ブロックで宣言し、`resource` ブロックなどからは `var.<変数名>` で参照する。慣習として `variables.tf` ファイルにまとめて宣言する。

### 値の渡し方

1 つ目は環境変数で、`TF_VAR_<変数名>` の形で渡す。

```sh
export TF_VAR_rgname=example-rg
```

2 つ目はファイルである。`terraform.tfvars`、`terraform.tfvars.json`、`*.auto.tfvars`、`*.auto.tfvars.json` は自動で読み込まれる。

```hcl
rgname = "Terraform-rg"
```

`testing.tfvars` のように他の名前を付けたファイルは、`-var-file` オプションで指定する。

```sh
terraform apply -var-file="testing.tfvars"
```

3 つ目はコマンド実行時の入力である。値が与えられていない変数があると、実行時に値を入力するよう求められる。

```sh
$ terraform apply
var.rglocation
Resource Group location like West Europe etc.
Enter a value:
```

4 つ目はデフォルト値で、`variable` ブロックの `default` に書く。

```tf
variable "rgname" {
  description = "リソースグループ名を指定する（必須）"
  type        = string
  default     = "example-rg"
}
```

同じ変数に複数の方法で値を渡した場合、公式ドキュメントによると、優先度の高い順に `-var` / `-var-file` オプション、`*.auto.tfvars` ファイル、`terraform.tfvars.json`、`terraform.tfvars`、環境変数、`default` となる。入力を求められるのは、`default` がなく、どの方法でも値が渡されなかったときである。

### AWS での例

[[Terraformの教科書 第3章 Terraform のリソースを理解する|3.3 節]]の [[aws|AWS]] のコードを、変数を使って書き換える。

```tf
# main.tf
resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type
}
```

```tf
# variables.tf
variable "ami" {
  description = "AMI の名称を指定する"
  type        = string
}

variable "instance_type" {
  description = "インスタンスタイプの名称を指定する"
  type        = string
}
```

### Google Cloud での例

3.3 節の Google Cloud のコードも、同じように書き換えられる。

```tf
# main.tf
resource "google_project" "my_project" {
  name       = var.myproject_name
  project_id = var.project_id
  org_id     = var.org_id
}

resource "google_app_engine_application" "app" {
  project     = google_project.my_project.project_id
  location_id = var.location_id
}
```

```tf
# variables.tf
variable "myproject_name" {
  description = "Google プロジェクト名を指定する"
  type        = string
}

variable "project_id" {
  description = "プロジェクトIDを指定する"
  type        = string
}

variable "org_id" {
  description = "組織IDを指定する"
  type        = string
}

variable "location_id" {
  description = "ロケーションを指定する"
  type        = string
}
```

## キーワード

- [[terraform|Terraform]]
- [[terraform-input-variable|入力変数]]
- [[dry|DRY]]
- [[aws|AWS]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
