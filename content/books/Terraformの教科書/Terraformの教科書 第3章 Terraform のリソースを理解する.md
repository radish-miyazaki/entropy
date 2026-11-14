---
title: Terraformの教科書 第3章 Terraform のリソースを理解する
description: resource ブロックでインフラオブジェクトを定義する方法と、AWS と Google Cloud のリソースの例をまとめた節
tags: [book-chapter, terraform]
date: 2026-07-08
book: "[[Terraformの教科書]]"
chapter: 3
---

## TL;DR

- [[terraform-resource|リソース]]は、Terraform にどのインフラオブジェクトを作成・更新・削除するかを伝えるもので、`resource` ブロックで定義する。
- `resource "<リソースの種類>" "<ローカル名>"` の形で書き、ローカル名で他のブロックから参照する。

## 内容

[[Terraformの教科書 第3章 Terraformをはじめよう|第3章 Terraformをはじめよう]]の 3.3 節。公式ドキュメントは https://developer.hashicorp.com/terraform/language/resources 。

### Terraform のリソース

リソースは、[[terraform|Terraform]] に対して、どのインフラオブジェクトを作成・更新・削除しようとしているかを伝える。対象は、コンピューティング、VPC、Web アプリケーション、データベースなどである。

リソースは `resource` ブロックで定義する。最初のラベルはリソースの種類で、[[terraform-provider|プロバイダ]]が提供する名前を使う。種類の名前の先頭にはプロバイダ名が付く（例: `google_app_engine_application`）。2 番目のラベルはローカル名で、他の `resource` ブロックなどからそのリソースを参照するときに使う。参照の例は、下の Google Cloud の例や、[[Terraformの教科書 第3章 Terraform の出力を理解する|3.5 節]]にある。

### AWS のリソース

[[aws|AWS]] の EC2 インスタンス（[aws_instance](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance)）は次のように書く。

```tf
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
}
```

### Google Cloud のリソース

Google App Engine のアプリケーション（[google_app_engine_application](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/app_engine_application)）は次のように書く。`project` に、同じ構成で定義したプロジェクトのリソースを `google_project.my_project.project_id` の形で参照している。

```tf
resource "google_project" "my_project" {
  name       = "My Project"
  project_id = "your-project-id"
  org_id     = "1234567"
}

resource "google_app_engine_application" "app" {
  project     = google_project.my_project.project_id
  location_id = "us-central"
}
```

## キーワード

- [[terraform|Terraform]]
- [[terraform-resource|リソース]]
- [[terraform-provider|プロバイダ]]
- [[aws|AWS]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
