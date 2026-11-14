---
title: Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで 第2章 Terraformを使ったインフラストラクチャの構築
description: コーディング、plan、apply、destroy というインフラ構築のサイクルと、モジュール・プロバイダ・ステート・ワークスペースという Terraform の構成要素を説明する章
tags: [book-chapter, terraform]
date: 2025-10-10
book: "[[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで]]"
chapter: 2
---

## TL;DR

- [[terraform|Terraform]] では、コードを書き、`plan` で差分を確かめ、`apply` で適用するサイクルを回してインフラを構築する。
- 構成要素は[[terraform-module|モジュール]]、[[terraform-provider|プロバイダ]]、[[terraform-state|ステート]]で、[[terraform-workspace|ワークスペース]]を使うと同じコードから複数の環境を作れる。

## 内容

### インフラ構築のサイクル

Terraform でのインフラ構築は、コーディング、動作確認、環境への適用、環境の破棄という流れで進む。

コーディングでは、まず `provider` ブロックを書く。Terraform は、書いたコードを各サービスの API やコマンドとして実行するためにプロバイダを使う。

```hcl
provider "aws" {}
```

次に `terraform init` を実行してプロバイダを取得し、設定ファイル（`.tf`）にリソースを書く。

```hcl
resource "terraform_data" "sample" {
  provisioner "local-exec" {
    command = "echo \"Hello, Terraform\""
  }
}
```

ファイルの分け方や粒度に決まりはない。`aws_instance` だけをまとめるように Terraform のリソース単位で分けることも、ロードバランサ、ターゲットグループ、API サーバのリソースをまとめるように機能単位で分けることもある。`terraform fmt` でコードを整形し、`terraform validate` で構文を検査できる。[tflint](https://github.com/terraform-linters/tflint) などのサードパーティ製ツールを使えば静的解析もできる。

動作確認では `terraform plan` で変更内容を確かめる。意図したリソースが作成・削除されるか、パラメータの変更が意図どおりかに特に注意する。

問題がなければ `terraform apply` で環境に適用する。`plan` と同じように変更内容が表示されるので、確認して `yes` を入力する。必要に応じて、[Terratest](https://terratest.gruntwork.io/) などのツールで意図どおりの構成になったかを確かめるとよい。環境全体は `terraform destroy` で破棄できる。

### モジュール

モジュールは、まとめて使うリソースの集まりで、コードの再利用性を高める。作ったモジュールは [Terraform Registry](https://registry.terraform.io/) に登録したり、[[github|GitHub]] などのバージョン管理システムに置いたりして配布できる。ローカルのモジュールは `source` にディレクトリを指定して読み込む。

```hcl
module "sample" {
  source = "./モジュールの配置ディレクトリ"
  変数名  = 値
}
```

モジュール内で作った値は `output` で外に渡し、`module.<モジュール名>.<output 名>` で参照する。

```hcl
locals {
  output_value = module.sample.output_value
}
```

### モジュールの設計

モジュールを使うと、特定のアーキテクチャパターンやクラウドサービスの集まりを 1 つの単位として扱えるので、同じ構成を複製したり、サービスごとに分割したりできる。最適な構成を考えるときは、[[microservices|マイクロサービス]]の考え方が参考になる。

リソース間の依存は、パラメータの受け渡しによって暗黙に表される（`depends_on` で明示もできる）。受け渡しには、モジュール内部でのものとモジュール間でのものがある。Terraform では、モジュール同士を[[loose-coupling|疎結合]]にして独立性を高めるために、モジュール間の受け渡しをできるだけ減らすことが大事である。`output` の数が増えてきたら、モジュールの単位を見直したり統合したりしたほうがよい。

分割の粒度も、受け渡すパラメータが少なくなるように決める。たとえば LB、[[aws-fargate|Fargate]]、DB（RDS）からなる構成では、LB と Fargate の間で多くのパラメータを受け渡すので、3 つを別々のモジュールにするより、LB と Fargate をまとめ、DB を別のモジュールにするほうがよい。

### プロバイダ

主要なクラウドやそのサービスの機能は、プロバイダとして実装されている。多くは Terraform Registry に登録されている。プロバイダを明示しなくても、リソースの種類から必要なプロバイダが読み込まれる。たとえば `aws_vpc` を書けば AWS プロバイダが使われ、そのとき AWS CLI の `default` プロファイルの設定が使われる。

### ステート

ステートは、`terraform apply` で構築したインフラを管理するファイルである。`apply` を実行すると、Terraform はステートに記録されたリソースの状態と `.tf` ファイルの内容との差分を埋めるようにリソースを操作する。デフォルトではローカルに保存される。

`terraform state` で直接操作することもできるが、基本は `plan` と `apply` で操作する。他で管理しているリソースを取り込むなど、コードを大きく変えるときだけ、`terraform state rm` と `terraform import` の組み合わせや `terraform state mv` を使う。

### ワークスペース

ワークスペースは、ステートを分けて、リソースを独立して管理する仕組みである。何も指定しなければ `default` ワークスペースが使われる。主なコマンドは次のとおり。

- `terraform workspace new <ワークスペース名>`: 作成
- `terraform workspace show`: 現在のワークスペースを表示
- `terraform workspace list`: 一覧を表示
- `terraform workspace select`: 切り替え
- `terraform workspace delete <ワークスペース名>`: 削除

最大のメリットは、同じコードで開発、ステージング、本番などの複数の環境を立ち上げられることである。`terraform.workspace` を使えば、環境ごとに値を変えられる。

```hcl
resource "aws_instance" "sample_instance" {
  ami           = local.instance_setting[terraform.workspace].ami
  instance_type = local.instance_setting[terraform.workspace].type

  tags = {
    Name = "${terraform.workspace}-instance"
    Env  = terraform.workspace
  }
}

locals {
  instance_setting = {
    stg = {
      type = "t3.medium"
      ami  = "ami-xxxxxxxxxxxxxxxxx"
    }
    prod = {
      type = "r5.large"
      ami  = "ami-yyyyyyyyyyyyyyyyy"
    }
  }
}
```

リソースへの権限を環境ごとに分けられるのも利点である。たとえば、ステージングは開発者も変更できるが本番は管理者だけ、という運用は [[amazon-s3|S3]] のポリシーで実現できる。

一方で、どの環境も同じ構成にする必要がある。環境ごとの違いを無理にロジックで吸収しようとすると、コードが複雑になりがちである。回避策は 2 つある。1 つはワークスペースを使わずにディレクトリを分けてコードを分けること、もう 1 つはワークスペース名に応じてリソースを作るかどうかを切り替えることである。

```hcl
resource "何かしらのリソース" "リソース名" {
  count = terraform.workspace == "dev" ? 0 : 1
}
```

## キーワード

- [[terraform|Terraform]]
- [[terraform-module|モジュール]]
- [[terraform-provider|プロバイダ]]
- [[terraform-state|ステート]]
- [[terraform-workspace|ワークスペース]]
- [[microservices|マイクロサービス]]
- [[loose-coupling|疎結合]]
- [[aws-fargate|AWS Fargate]]
- [[amazon-s3|Amazon S3]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
