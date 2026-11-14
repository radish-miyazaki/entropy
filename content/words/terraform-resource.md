---
title: リソース
aliases: []
description: Terraform で作成・管理するインフラのオブジェクト。resource ブロックで宣言する
tags: [word, terraform]
date: 2026-11-14
---

## TL;DR

[[terraform|Terraform]] で作成・管理したいインフラのオブジェクト。`resource` ブロックで宣言する。リソースの種類は[[terraform-provider|プロバイダ]]が提供する。

## 仕組み

`resource` ブロックにはリソースの種類とラベルの 2 つを付ける。ラベルは Terraform が[[terraform-state|ステート]]の中でリソースを追跡するための名前で、インフラそのものは変えない。設定の中では `<TYPE>.<LABEL>.<ATTRIBUTE>` の形で属性を参照する。

公式ドキュメントによると、Terraform はリソースを次のように扱う。

- 設定にあるが、まだ存在しないリソースを作成する
- 引数が変わったリソースを更新する。その場で更新できなければ、削除して作り直す
- ステートにあるが設定から消えたリソースを削除する

`count`、`for_each`、`depends_on`、`provider`、`lifecycle` のメタ引数で、リソースの扱い方を変えられる。`count` と `for_each` は同時に使えない。

## 例

```hcl
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[terraform-data-source|データソース]]
- [[terraform-provider|プロバイダ]]
- [[terraform-state|ステート]]
- [[ephemeral-resource|Ephemeral resource]]

## 出典

- [Resources overview - HashiCorp Developer](https://developer.hashicorp.com/terraform/language/resources)
- [resource block reference - HashiCorp Developer](https://developer.hashicorp.com/terraform/language/block/resource)
