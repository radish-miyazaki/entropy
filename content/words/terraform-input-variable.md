---
title: 入力変数
aliases: []
description: Terraform のモジュールに外から値を渡すための変数。variable ブロックで宣言する
tags: [word, terraform]
date: 2026-11-14
---

## TL;DR

[[terraform|Terraform]] の[[terraform-module|モジュール]]に、実行時に外から値を渡すための変数。`variable` ブロックで宣言し、`var.<NAME>` で参照する。

## なぜ必要か

公式ドキュメントによると、値を直接書き込んだモジュールは柔軟性がなく、再利用しにくい。入力変数はモジュールの入力のインターフェースになり、利用者はソースを書き換えずに振る舞いを変えられる。

## 仕組み

`variable` ブロックには型を表す `type`、説明の `description`、既定値の `default` を書ける。`default` がなければ、Terraform は plan の前に値の入力を求める。`validation` で値の条件を検査でき、`sensitive` を付けると CLI の出力に値が表示されなくなる。

値は次の方法で渡せる。上にあるものほど優先度が高い。

1. コマンドラインの `-var` と `-var-file`（HCP Terraform の変数も含む）
2. `*.auto.tfvars`（字句順）
3. `terraform.tfvars.json`
4. `terraform.tfvars`
5. `TF_VAR_` で始まる環境変数
6. `variable` ブロックの `default`

## 例

```hcl
variable "instance_type" {
  type        = string
  description = "EC2 instance type for the web server"
  default     = "t2.micro"
}

resource "aws_instance" "web" {
  instance_type = var.instance_type
}
```

## 注意点

`sensitive` を付けても、値は[[terraform-state|ステート]]に保存される。ステートと plan ファイルからも除くには `ephemeral` を付ける。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[terraform-output-value|出力値]]
- [[terraform-module|モジュール]]
- [[ephemeral-resource|Ephemeral resource]]

## 出典

- [Input variables - HashiCorp Developer](https://developer.hashicorp.com/terraform/language/values/variables)
