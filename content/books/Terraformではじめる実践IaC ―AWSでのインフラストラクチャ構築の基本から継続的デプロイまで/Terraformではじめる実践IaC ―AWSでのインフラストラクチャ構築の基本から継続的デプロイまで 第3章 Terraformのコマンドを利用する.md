---
title: Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで 第3章 Terraformのコマンドを利用する
description: init、plan、apply などの主要コマンドと、ステートやワークスペースを管理するコマンドの使い方を説明する章
tags: [book-chapter, terraform]
date: 2025-10-10
book: "[[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで]]"
chapter: 3
---

## TL;DR

- [[terraform|Terraform]] の主要コマンドは `init`、`fmt`、`validate`、`plan`、`apply`、`destroy`、`import` である。
- [[terraform-state|ステート]]は `terraform state` で操作でき、チーム開発ではリモートに置いてロックをかける。

## 内容

### 主要コマンド

`terraform init` は、カレントディレクトリを作業ディレクトリとして初期化する。開発を始めるときや、既存のリポジトリをクローンしたときに実行する。このとき、ステートを保管するバックエンドも初期化される（デフォルトはローカルディスク）。[[terraform-provider|プロバイダ]]を追加するたびに `init` を実行し直す必要がある。

```hcl
provider "aws" {
  region = "ap-northeast-1"
}
```

これだけでは開発者ごとに使うバージョンがずれるので、プロバイダのバージョンと取得元、Terraform 本体のバージョンを `.tf` ファイルに書くことが多い。

```hcl
terraform {
  required_version = "~> 1.2.8"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.10.0"
    }
  }
}
```

バージョンを値だけで書くと完全一致になり、`~>` を付けるとパッチバージョンの違いを許す。`-upgrade` フラグを付けるとプロバイダを更新できるが、`required_providers` の記述は自動では直らない。`-backend-config` でステートのバックエンドを指定できる（`terraform.tf` に書いてあれば不要）。

`terraform fmt` は `.tf` ファイルを整形し、`terraform validate` は `.tf` ファイルが有効かを検査する。

`terraform plan` は、ステートに記録された現在の状態と、コードから導かれる設定との差分を表示する。差分には、データソースの読み取りと、リソースの作成・変更・削除がある。`-target` で特定のリソースの差分だけを確認できるが、これはエラーを解消するためのもので、常用するものではない。`-out` で差分を保存して `apply` に渡すと、`plan` の結果どおりに反映できる。`-destroy` を付けると、`destroy` したときの差分を確認できる。

```sh
terraform plan -target=module.ecr.aws_ecr_lifecycle_policy.policy
```

`terraform apply` は、ファイルの内容に沿ってリソースを構築・変更・削除する。`-auto-approve` で `yes` の入力を省ける。`-parallelism` で並列度を指定できる。リソース同士の依存関係に問題がなければ、作成は並列に進む。

`terraform destroy` は構築したリソースを削除する。`terraform apply -destroy` の別名なので、`-auto-approve` など `apply` のフラグやオプションも使える。

`terraform import` は、構築済みのリソースを Terraform の管理下に取り込む。ステート中のアドレスには `terraform state list` や `terraform state show` で表示される値を指定する。リソースの ID の形式はリソースの種類で異なるので、プロバイダの公式ドキュメントで確かめる。

```sh
terraform import ステート中のアドレス リソースのID
```

### ステートを管理するコマンド

`terraform state list` はステートに含まれるリソースの一覧を表示し、`terraform state show` は個々のリソースの内容を表示する。

`terraform state mv` は、ステートで管理されているリソースのアドレスを変更する。たとえば `aws_iam_role.role` を `aws_iam_role.new_role` に名前を変えて `apply` すると、`role` が削除されてから `new_role` が作成される。`state mv` を使えば、リソースを作り直さずにアドレスだけを付け替えられる。代わりに `moved` ブロックを使うこともできる。

```hcl
moved {
  from = aws_iam_role.role
  to   = aws_iam_role.new_role
}

resource "aws_iam_role" "new_role" {}
```

`terraform state rm` は、ステートから特定のリソースを取り除く。IAM ロールを別のステートに移すときのように、`terraform import` と組み合わせて使うことが多い。代わりに `removed` ブロックも使える。

```hcl
removed {
  from = aws_iam_role.role

  lifecycle {
    destroy = false
  }
}
```

### ステートの置き場所

ステートはデフォルトではローカルディスクに保存される。チームで開発するときは [[amazon-s3|S3]] のバケットなどに置く。複数人が同時に `apply` を実行するとステートの[[consistency|一貫性]]が失われるので、ロックによる排他制御が必要になる。AWS では [[amazon-dynamodb|Amazon DynamoDB]] を使うことが多かった。

```hcl
terraform {
  backend "s3" {
    bucket         = "バケット名"
    key            = "ステートのキー（= ファイルパス）"
    region         = "バケットのリージョン"
    dynamodb_table = "排他制御に使う DynamoDB テーブル"
  }
}
```

v1.11 以降は、S3 バックエンドだけでロックを管理できるようになった。

```hcl
terraform {
  backend "s3" {
    bucket       = "バケット名"
    key          = "ステートのキー（= ファイルパス）"
    region       = "バケットのリージョン"
    use_lockfile = true
  }
}
```

### ワークスペースを管理するコマンド

`terraform workspace new` で[[terraform-workspace|ワークスペース]]を作り、`list` で一覧と現在のワークスペースを確認し、`select` で切り替え、`delete` で削除する。`init` 直後のワークスペースは `default` だけで、`default` は削除できない。

コードからは `terraform.workspace` でワークスペース名を参照できる。これにより、同じ `.tf` ファイルとバックエンド設定で複数の環境を作れる。`count` と組み合わせれば、環境ごとにリソースを作るかどうかを切り替えられる。

```hcl
resource "リソース種別" "リソース名" {
  count = terraform.workspace == "prod" ? 1 : 0
}
```

ただし、このようなコードが増えると複雑になる。その場合は、特定のリソースだけを管理する `.tf` ファイルとステートを別に用意するなど、コードの構成を見直したほうがよい。

## キーワード

- [[terraform|Terraform]]
- [[terraform-state|ステート]]
- [[terraform-provider|プロバイダ]]
- [[terraform-workspace|ワークスペース]]
- [[amazon-s3|Amazon S3]]
- [[amazon-dynamodb|Amazon DynamoDB]]
- [[consistency|一貫性]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
