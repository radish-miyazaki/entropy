---
title: Terraformの教科書 第3章 Terraform プロバイダの紹介
description: Terraform のプロバイダの定義方法と、AWS と Google Cloud のプロバイダの設定例と主な引数をまとめた節
tags: [book-chapter, terraform]
date: 2026-07-08
book: "[[Terraformの教科書]]"
chapter: 3
---

## TL;DR

- [[terraform-provider|プロバイダ]]は `terraform init` でダウンロードされる実行可能な Plugin で、`required_providers` ブロックで定義する。
- AWS と Google Cloud のプロバイダを例に、設定の書き方と主な引数を見る。

## 内容

[[Terraformの教科書 第3章 Terraformをはじめよう|第3章 Terraformをはじめよう]]の 3.2 節。公式ドキュメントは https://developer.hashicorp.com/terraform/language/providers 。

### Terraform のプロバイダ

プロバイダは、`terraform init` の実行時にダウンロードされる実行可能な Plugin である（[[Terraformの教科書 第1章 IaCを知る|第1章]]を参照）。プロバイダは [[terraform-registry|Terraform Registry]] で配布されており、自分で作って配布することもできる。

使うプロバイダは `terraform` ブロックの中の `required_providers` ブロックで定義する。`provider` ブロックには、認証情報やプロジェクトの詳細など、初期化に必要な引数を書く。どのファイル（`.tf` / `.tf.json`）に書いてもよいが、慣習として `providers.tf` や `required_providers.tf` という名前のファイルにまとめるとよい。

引数はプロバイダごとに異なるが、どのプロバイダも `version` と `alias` のメタ引数に対応している。

```tf
provider "azurerm" {
  features {}
  alias = "nonprod_01_subscription"
}
```

### AWS のプロバイダ

[[aws|AWS]] のプロバイダ（https://registry.terraform.io/providers/hashicorp/aws/latest）は次のように書く。

```tf
terraform {
  required_version = ">= 1.7"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.32.1"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
  access_key = "..."
  secret_key = "..."
}
```

主な引数は次の 3 つで、どれも任意である（[一覧](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#provider-configuration)）。

- `access_key`: AWS のアクセスキー
- `secret_key`: アクセスキーに対応するシークレットキー
- `region`: リソースをデプロイするリージョン

それぞれ環境変数 `AWS_ACCESS_KEY_ID`、`AWS_SECRET_ACCESS_KEY`、`AWS_DEFAULT_REGION` から取得できる。プロファイルを指定した場合は、認証情報ファイルから取得することもできる。

### Google Cloud のプロバイダ

Google Cloud のプロバイダ（https://registry.terraform.io/providers/hashicorp/google/latest）は次のように書く。

```tf
terraform {
  required_version = ">= 1.7"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.12.0"
    }
  }
}

provider "google" {
  credentials = file("account.json")
  project     = "my-google-project-id"
  region      = "europe-west2"
  zone        = "europe-west2-b"
}
```

主な引数は次のとおりで、どれも任意である（[一覧](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/provider_reference)）。

- `credentials`: Google Cloud へのログイン情報を持つ JSON ファイルのパス。非推奨である
- `project`: リソースを管理する Google Cloud のプロジェクト名
- `region`: リソースを配置するリージョン
- `zone`: リージョン内の特定のゾーン

## キーワード

- [[terraform|Terraform]]
- [[terraform-provider|プロバイダ]]
- [[terraform-registry|Terraform Registry]]
- [[aws|AWS]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
