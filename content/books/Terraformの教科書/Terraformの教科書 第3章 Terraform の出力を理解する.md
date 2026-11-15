---
title: Terraformの教科書 › Terraform の出力を理解する
description: output ブロックで出力値を定義する方法、主なユースケース、description・sensitive・depends_on 引数をまとめた節
tags: [book-chapter, terraform]
date: 2026-07-09
book: "[[Terraformの教科書]]"
chapter: 3
---

## TL;DR

- [[terraform-output-value|出力値]]は、リソースやモジュールなどが持つ属性から必要な情報だけを取り出して外部に公開する仕組みで、`output` ブロックで定義する。
- 他の構成からの参照、CLI での表示、リモートステート経由のアクセスに使う。

## 内容

[[Terraformの教科書 第3章 Terraformをはじめよう|第3章 Terraformをはじめよう]]の 3.5 節。公式ドキュメントは https://developer.hashicorp.com/terraform/language/values/outputs 。

### Terraform の出力値

[[terraform|Terraform]] は、管理しているすべてのリソースについて、他のブロックから参照できるエクスポート属性（exported attributes）を提供している。出力値は、この属性から必要な情報だけを取り出して外部に公開する仕組みである。出力値は `output` ブロックで定義し、慣習として `outputs.tf` ファイルにまとめる。

### 主なユースケース

1 つ目は、リソース、モジュール、データソースの間での参照である。あるブロックの出力を参照すると、参照する側との間に依存関係が生まれ、別のブロックからその値を使えるようになる。たとえば VPC を定義済みなら、その VPC の ID を参照してサブネットのリソースに渡せる。

2 つ目は CLI での表示である。`terraform output` コマンドで、ルートモジュールの出力値を確認できる。

3 つ目はリモートステート経由のアクセスである。リモートの[[terraform-state|ステート]]を使っている場合、別の構成から `terraform_remote_state` データソースを通じて、そのルートモジュールの出力値にアクセスできる。

### AWS での例

[[aws|AWS]] で [[amazon-vpc|VPC]] を作成し、その ID と CIDR ブロックを出力する。VPC リソースが出力する属性は[公式の一覧](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc#attribute-reference)にある。

```tf
resource "aws_vpc" "terraform-vpc" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"
  tags = {
    Enviroment = "Terraform-lab"
  }
}

output "id" {
  value = aws_vpc.terraform-vpc.id
}

output "cidr_block" {
  value = aws_vpc.terraform-vpc.cidr_block
}
```

サブネットを作成するときに、VPC の ID を参照する。

```tf
resource "aws_subnet" "terraform-subnet" {
  vpc_id     = aws_vpc.terraform-vpc.id
  cidr_block = "10.0.0.0/24"

  tags = {
    Enviroment = "Terraform-lab"
  }
}
```

### Google Cloud での例

[[Terraformの教科書 第3章 Terraform のリソースを理解する|3.3 節]]の Google App Engine のアプリケーションについて、ID と名前を出力する。出力される属性は[公式の一覧](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/app_engine_application#attributes-reference)にある。

```tf
output "id" {
  value = google_app_engine_application.app.id
}

output "value" {
  value = google_app_engine_application.app.name
}
```

### output の引数

`output` ブロックは `description`、`sensitive`、`depends_on` などの引数に対応している。

[`description`](https://developer.hashicorp.com/terraform/language/block/output#description) は説明文である。

```tf
output "instance_id_addr" {
  value       = aws_instance.server.private_ip
  description = "メインサーバのインスタンスのプライベートIPアドレス"
}
```

[`sensitive`](https://developer.hashicorp.com/terraform/language/block/output#sensitive) を `true` にすると、`plan` や `apply` の実行時に CLI に値を表示しない。ただし、リソースの引数で値が参照されている場合など、別の理由で表示されることはある。また、ステートファイルには記録されるので、ファイルにアクセスできる人は値を平文で読める。

```tf
output "db_password" {
  value       = aws_db_instance.db.password
  description = "データベースへのログインパスワード"
  sensitive   = true
}
```

[`depends_on`](https://developer.hashicorp.com/terraform/language/block/output#depends_on) は依存関係を明示する。リソース、モジュール、データソースにも同じ引数があり、目的も同じである。Terraform が依存関係グラフを正しく把握し、作成や読み込みを適切な順序で行えるようにする。

```tf
output "instance_ip_addr" {
  value       = aws_instance.server.private_ip
  description = "メインサーバのインスタンスのプライベートIPアドレス"

  depends_on = [
    # サービスに到達可能にするため、IPアドレスが実際に使用される前に、セキュリティグループを作成する
    aws_security_group_rule.local_access,
  ]
}
```

`depends_on` は最後の手段として使い、使うときは理由をコメントに書くべきである。`depends_on` を使うと、Terraform は上流のオブジェクトにどんな変更が起きるかを把握しきれず、値を known after apply（適用後に判明）として扱う保守的なプランを作りがちになる。その結果、必要以上に多くのリソースが置き換えの対象になることがある。

## キーワード

- [[terraform|Terraform]]
- [[terraform-output-value|出力値]]
- [[terraform-state|ステート]]
- [[amazon-vpc|VPC]]
- [[aws|AWS]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
