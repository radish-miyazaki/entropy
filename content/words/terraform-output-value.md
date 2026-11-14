---
title: 出力値
aliases: []
description: Terraform で、インフラの情報をモジュールの外に公開するための値。output ブロックで宣言する
tags: [word, terraform]
date: 2026-11-14
---

## TL;DR

[[terraform|Terraform]] で、インフラの情報を[[terraform-module|モジュール]]の外に公開するための値。`output` ブロックで宣言する。

## なぜ必要か

公式ドキュメントによると、出力値には次の使い道がある。

- 子モジュールのリソースの属性を、親モジュールに渡す
- ルートモジュールの値を CLI の出力に表示する
- 別の構成から、`terraform_remote_state` データソースを通じてルートモジュールの出力値を読む
- Terraform の操作の結果を、自動化のツールに渡す

## 仕組み

`output` ブロックの `value` に公開する値を書く。親モジュールは子モジュールの出力値を `module.<CHILD_MODULE_NAME>.<OUTPUT_NAME>` の形で参照する。

## 例

```hcl
output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.web.id
}
```

## 注意点

`sensitive = true` を付けると CLI の出力では値が隠れるが、値は[[terraform-state|ステート]]に保存される。`terraform output` に `-json` や `-raw` を付けると、平文で表示される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[terraform-input-variable|入力変数]]
- [[terraform-module|モジュール]]
- [[terraform-data-source|データソース]]

## 出典

- [Output values - HashiCorp Developer](https://developer.hashicorp.com/terraform/language/values/outputs)
