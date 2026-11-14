---
title: Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで 第4章 Terraformの基本文法
description: resource、data、variable、locals、module、output の各ブロックと、count、for_each、for、条件式による繰り返しや分岐を説明する章
tags: [book-chapter, terraform]
date: 2025-10-10
book: "[[Terraformではじめる実践IaC ―AWSでのインフラストラクチャ構築の基本から継続的デプロイまで]]"
chapter: 4
---

## TL;DR

- [[terraform|Terraform]] のコードは `resource`、`data`、`variable`、`locals`、`module`、`output` の各ブロックで組み立てる。
- 同じ種類のリソースを複数作るには `count` か `for_each` を使う。`count` は要素の削除で意図しない作り直しが起きやすい。

## 内容

### resource

[`resource`](https://developer.hashicorp.com/terraform/language/block/resource) は、インフラを構成するリソースを定義する。リソース種別とリソース名を指定し、この組み合わせはステート内で一意でなければならない。

リソースそのものの設定ではなく、振る舞いを決める引数をメタ引数と呼ぶ。`depends_on` はリソース間の依存関係を明示する。`lifecycle` はリソースの作成・削除・変更時の挙動を変えるもので、削除を禁止する `prevent_destroy`、削除の前に新しいリソースを作る `create_before_destroy`、変更を無視する属性を並べる `ignore_changes`、再作成のきっかけになるリソースを並べる `replace_triggered_by` を指定できる。

`provider` は、使う[[terraform-provider|プロバイダ]]を指定する。`aws_vpc` のようなリソースを書けば [[aws|AWS]] プロバイダが暗黙に使われ、リージョンなどの設定も暗黙に決まる。1 つのコードで複数のリージョンや AWS アカウントを操作するには、`alias` を付けたプロバイダを定義し、リソースごとに明示する。

```hcl
provider "aws" {
  alias  = "ap_northeast_1"
  region = "ap-northeast-1"
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

resource "aws_vpc" "vpc_us_east_1" {
  provider = aws.us_east_1
}
```

### data

[`data`](https://developer.hashicorp.com/terraform/language/block/data) は、Terraform の外や別のステートで定義された情報を参照する。次のように書くと、`data.aws_vpc.vpc.id` のように VPC の設定を取得できる。

```hcl
data "aws_vpc" "vpc" {
  tags = {
    ServiceName = "web"
    Env         = "prod"
  }
}
```

### variable

[`variable`](https://developer.hashicorp.com/terraform/language/block/variable) は、`resource` や `data` に外から値を渡すための変数を定義する。値は `-var=変数名=値` か、`変数名=値` を並べたファイルを `-var-file=ファイルパス` で渡す。

型には、何でも代入できる `any`（基本的に使わない）、`number`、`string`、`bool` のほか、次の複合型がある。

- `object`: 決められたキーと、それぞれ決められた型の値を持つ
- `map`: 任意のキーと、決められた型の値を持つ
- `list`: すべての要素が同じ型の配列
- `tuple`: 位置ごとに型が決まった配列

```hcl
variable "personal_information" {
  type = object({
    name    = string
    age     = number
    address = string
  })
}

variable "tags" {
  type = map(string)
}

variable "lst" {
  type = list(number) # lst = [1, 2, 3]
}

variable "tpl" {
  type = tuple([string, number, bool]) # tpl = ["one", 2, true]
}
```

### locals

[`locals`](https://developer.hashicorp.com/terraform/language/block/locals) はローカル変数を定義する。リソースや変数、他のローカル変数の値から新しい値を作るときに使う。主な使い道は、複数のリソースで共通する値の定義と、外から渡された値やリソースの属性を加工した結果の保持である。後者はコードが難しくなりやすいので、その場合は構成そのものを見直したほうがよい。

```hcl
locals {
  tags = merge(var.essential_tags, var.additional_tags)
}

resource "a" "a" {
  tags = local.tags
}
```

### module

[`module`](https://developer.hashicorp.com/terraform/language/block/module) は、VPC とサブネットのように一緒に定義すると扱いやすいリソースをまとめた[[terraform-module|モジュール]]を呼び出す。Terraform Registry や [[github|GitHub]] で公開されているものも、ローカルに定義したものも使える。Registry のモジュールは `version` 引数でバージョンを指定できる。

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.19.0"
}

module "vpc_github" {
  source = "git@github.com:Fufuhu/aws_vpc_terraform.git//modules/vpc?ref=v0.2.0"
}

module "vpc_local" {
  source = "./modules/vpc"
}
```

### output

[`output`](https://developer.hashicorp.com/terraform/language/block/output) は、モジュール内で作った値を外に公開する。使い道は、作ったリソースの値を `apply` 時に確認すること、モジュールの外で使うこと、リモートステートとして読み取ることの 3 つである。

```hcl
output "vpc_id" {
  value = aws_vpc.vpc.id
}
```

### count

`count` は、1 つの `resource` から同じ種類のリソースを複数作る。

```hcl
locals {
  bucket_settings = [
    { name_suffix = "ichi" },
    { name_suffix = "ni" },
    { name_suffix = "san" },
  ]
}

resource "aws_s3_bucket" "buckets" {
  count  = length(local.bucket_settings)
  bucket = "sample-${local.bucket_settings[count.index].name_suffix}"
}
```

ここで `ni` の要素を消して `apply` すると、`buckets[1]` は `ni` から `san` のバケットに変わる。[[amazon-s3|S3]] のバケット名は変更できないので、バケットは削除されて作り直され、`buckets[2]` は削除される。そのため `count` は、稼働中に変更できるリソースや、順序に意味があり末尾から削除されることが期待されるリソースだけに使うとよい。

### for_each

`for_each` も 1 つの `resource` から複数のリソースを作るが、`count` と違ってマップや文字列のセットを渡せる。

```hcl
locals {
  files = {
    "sample1.txt" = { content = "This is a sample file 1." }
    "sample2.txt" = { content = "This is a sample file 2." }
  }
}

resource "local_file" "files" {
  for_each = local.files

  filename = each.key
  content  = each.value.content
}
```

### for と条件式

`for` 式は、既存の配列から新しい配列を作る。`for i, v in ...` と書けば、インデックスと要素の両方を取り出せる。条件分岐には三項演算子を使う。

```hcl
locals {
  sports    = ["football", "baseball", "rugby", "basketball"]
  sentences = [for sport in local.sports : "${sport} is one of the major sports"]

  num    = 4
  result = local.num == 4 ? "4です。" : "4ではありません。"
}
```

## キーワード

- [[terraform|Terraform]]
- [[hcl|HCL]]
- [[terraform-provider|プロバイダ]]
- [[terraform-module|モジュール]]
- [[terraform-state|ステート]]
- [[amazon-s3|Amazon S3]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
