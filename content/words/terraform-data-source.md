---
title: データソース
aliases: []
description: Terraform で、外部の情報をリソースとして管理せずに読み取るための仕組み
tags: [word, terraform]
date: 2026-11-14
---

## TL;DR

[[terraform|Terraform]] で、[[terraform-provider|プロバイダ]]から情報を読み取るための仕組み。読むだけで、リソースを作成・変更しない。`data` ブロックで宣言する。

## なぜ必要か

公式ドキュメントによると、データソースを使うと、API や別のワークスペース、関数の結果などから、Terraform が管理していないオブジェクトの情報を取得して設定の中で使える。

## 仕組み

`data` ブロックにはデータソースの種類とローカル名の 2 つのラベルを付け、プロバイダが定める検索条件を引数に書く。取得した値は `data.<TYPE>.<LABEL>.<ATTRIBUTE>` の形で参照する。

Terraform はふつう plan の段階でデータソースを読む。ただし、引数が apply まで分からない値に依存している場合や、その plan で変更される管理対象のリソースに依存している場合は、読み取りを apply まで遅らせる。

## 例

```hcl
data "aws_ami" "example" {
  most_recent = true
  owners      = ["self"]
  tags = {
    Name = "app-server"
  }
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.example.id
  instance_type = "t1.micro"
}
```

## 注意点

読み取りが apply まで遅れると、plan の時点では結果が分からないので、その値を使うリソースも apply まで作れない。データソースが取得した値は [[terraform-state|ステート]]に保存されるので、秘密の値を扱うときは [[ephemeral-resource|Ephemeral resource]] を検討する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[terraform-resource|リソース]]
- [[terraform-provider|プロバイダ]]
- [[ephemeral-resource|Ephemeral resource]]

## 出典

- [Data sources - HashiCorp Developer](https://developer.hashicorp.com/terraform/language/data-sources)
